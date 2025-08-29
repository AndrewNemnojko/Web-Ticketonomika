import { Component, inject} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { routeTransition } from '../../../../route-transition';
import { filter } from 'rxjs';
import { NavBarComponent } from '../navbar/nav-bar.component';
import { UserService } from '../../../core/services/user.service';
import { NavLink } from '../../models/nav-link.model';

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

  currentUser = this.userService.currentUser;

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuOpen = false;
        document.body.style.overflow = '';
      });
    this.userService.getCurrentUser();
  }

  links: NavLink[]=[
    { label: 'Профіль', icon: '/svg/person.svg', route: 'profile', visible: !!this.currentUser() },
    { label: 'Щоденний бокс', icon: '/svg/box.svg', route: 'drewards', visible: !!this.currentUser() },
    { label: 'Рейтинги (soon)', icon: '/svg/stat.svg', route: 'stats', visible: !!this.currentUser() },
    { label: 'Матеріали (soon)', icon: '/svg/material.svg', route: 'materials', visible: !!this.currentUser() },
    { label: 'Біржа (soon)', icon: '/svg/burse.svg', route: 'burse', visible: !!this.currentUser() },
    { label: 'Казино (зачинено)', icon: '/svg/casino.svg', route: 'casino', visible: !!this.currentUser() },
    { label: 'Увійти', icon: '/svg/key.svg', route: 'signin', visible: !this.currentUser() },
    { label: 'Про тікетономіку', icon: '/svg/info.svg', route: 'ticketonomika', visible: true },
  ];
}
