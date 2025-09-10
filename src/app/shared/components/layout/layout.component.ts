import { Component, inject} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { routeTransition } from '../../../../route-transition';
import { filter } from 'rxjs';
import { NavBarComponent } from '../navbar/nav-bar.component';
import { UserService } from '../../../core/services/user.service';
import { NavLink } from '../../models/nav-link.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-public-board',
  imports: [RouterOutlet, NavBarComponent, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    routeTransition
  ]
})
export class LayoutComponent  {

  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  currentUser = this.userService.currentUser;

  navMenuOpen = false;
  contextMenuOpen = false;

  isAuth(): boolean{
    return this.authService.isAuthenticated();
  }

  toggleContextMenu(){
    if (this.navMenuOpen) {
      this.navMenuOpen = false
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

  logout(){
    this.authService.logout();
    this.router.navigate(['/info']);
  }

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.navMenuOpen = false;
        this.contextMenuOpen = false;
        document.body.style.overflow = '';
      });
    this.userService.getCurrentUser();
  }

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet?.isActivated 
    ? outlet.activatedRoute.snapshot.url.join('/') 
    : '';
  }
}
