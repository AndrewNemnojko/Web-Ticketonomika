import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { routeTransition } from '../../../../route-transition';
import { filter, Subscription } from 'rxjs';
import { NavBarComponent } from '../navbar/nav-bar.component';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ModalService } from '../modal/modal.service';
import { DrewardService } from '../../../features/dreward/services/dreward.service';
import { TodayRewardComponent } from '../../../features/dreward/components/today-reward/today-reward.component';

@Component({
  selector: 'app-public-board',
  imports: [RouterOutlet, NavBarComponent, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [routeTransition],
})
export class LayoutComponent implements OnDestroy, OnInit {
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  private rewardsService = inject(DrewardService);

  navMenuOpen = false;
  contextMenuOpen = false;

  isAuthenticated = false;
  rewardAvalible = signal<boolean>(false);


  private routerSub!: Subscription;
  private authSub!: Subscription;

  constructor(private modal: ModalService) {}

  get authClass(): string {
    return this.isAuthenticated ? '' : 'unauth';
  }

  toggleContextMenu() {
    if (this.navMenuOpen) {
      this.navMenuOpen = false;
      document.body.style.overflow = '';
    }
    this.contextMenuOpen = !this.contextMenuOpen;
  }

  toggleNavMenu() {
    this.navMenuOpen = !this.navMenuOpen;

    if (this.navMenuOpen) {
      document.body.style.overflow = 'hidden';
      this.contextMenuOpen = false;
    } else {
      document.body.style.overflow = '';
    }
  }

  logout() {
    const modal$ = this.modal.open(ConfirmModalComponent, {
      title: 'Вихід з аккаунта',
      success: 'Вийти',
      abort: 'Передумав'
    });

    modal$.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.authService.logout();
        this.router.navigate(['/info']);
      }
    });
  }

  @ViewChild('mainContainer', { static: true })
  mainContainer!: ElementRef<HTMLDivElement>;

  private CloseAllMenu() {
    this.navMenuOpen = false;
    this.contextMenuOpen = false;
    document.body.style.overflow = '';
    this.modal.close();
  }

  private ScrollToTop() {
    const options: ScrollToOptions = { top: 0, behavior: 'smooth' };
    if (window.innerWidth <= 780) {
      window.scrollTo(options);
    } else {
      this.mainContainer.nativeElement.scrollTo(options);
    }
  }

  async ngOnInit() {
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.CloseAllMenu();
        this.ScrollToTop();
        this.cd.detectChanges();
      });

    this.authSub = this.authService.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
      this.cd.detectChanges();
    });

    const available = await this.rewardsService.isBoxAvailable();
    this.rewardAvalible.set(available);
  }

  openBox(){
    this.modal.open(TodayRewardComponent, undefined ,false, "100%")
      .subscribe(result => {
        if (result) console.log('Saved name:', result);
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    this.authSub.unsubscribe();
  }

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet?.isActivated
      ? outlet.activatedRoute.snapshot.url.join('/')
      : '';
  }
}
