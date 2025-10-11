import { Component, inject, signal } from '@angular/core';
import { NavLink } from '../../models/nav-link.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ModalService } from '../modal/modal.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { DrewardService } from '../../../features/dreward/services/dreward.service';
import { TodayRewardComponent } from '../../../features/dreward/components/today-reward/today-reward.component';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private rewardsService = inject(DrewardService);
  isAuth = false;
  rewardAvalible = signal<boolean>(false);

  constructor(private modal: ModalService) {
    this.authService.isAuthenticated$.subscribe((isAuth) => {
      this.isAuth = isAuth;
      console.log(isAuth);
    });
    
  }

  async ngOnInit(){
    const available = await this.rewardsService.isBoxAvailable();
    this.rewardAvalible.set(available);
  }

  openBox(){
    this.modal.open(TodayRewardComponent, undefined ,false, "100%")
      .subscribe(result => {
        if (result) console.log('Saved name:', result);
    });
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



  links: NavLink[] = [
    {
      label: 'Рейтинги',
      icon: '/svg/stat.svg',
      route: 'stats',
      authOnly: true,
      open: false,
    },
    {
      label: 'Матеріали',
      icon: '/svg/material.svg',
      route: 'materials',
      authOnly: true,
      open: true,
    },
    {
      label: 'Біржа',
      icon: '/svg/market.svg',
      route: 'market',
      authOnly: true,
      open: true,
    },
    {
      label: 'Казино',
      icon: '/svg/casino.svg',
      route: 'casino',
      authOnly: true,
      open: false,
    },
    {
      label: 'Увійти',
      icon: '/svg/key.svg',
      route: 'signin',
      authOnly: false,
      open: true,
    },
    {
      label: 'Тікетономіка',
      icon: '/svg/info.svg',
      route: 'info',
      open: true,
    },
  ];
}
