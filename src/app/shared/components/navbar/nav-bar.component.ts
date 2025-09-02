import { Component, inject, Input } from '@angular/core';
import { NavLink } from '../../models/nav-link.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  
  private userService = inject(AuthService);

  isAuth = this.userService.isAuthenticated();

  links: NavLink[]=[
    { label: 'Профіль', icon: '/svg/person.svg', route: 'profile', visible:  this.isAuth },
    { label: 'Щоденний бокс', icon: '/svg/box.svg', route: 'drewards', visible: this.isAuth },
    { label: 'Рейтинги (soon)', icon: '/svg/stat.svg', route: 'stats', visible: this.isAuth },
    { label: 'Матеріали (soon)', icon: '/svg/material.svg', route: 'materials', visible: this.isAuth },
    { label: 'Біржа (soon)', icon: '/svg/market.svg', route: 'market', visible: this.isAuth },
    { label: 'Казино (зачинено)', icon: '/svg/casino.svg', route: 'casino', visible: this.isAuth },
    { label: 'Увійти', icon: '/svg/key.svg', route: 'signin', visible: !this.isAuth },
    { label: 'Про тікетономіку', icon: '/svg/info.svg', route: 'info', visible: true },
  ];
}
