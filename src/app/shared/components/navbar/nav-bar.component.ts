import { Component, inject } from '@angular/core';
import { NavLink } from '../../models/nav-link.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  isAuth = false;
  constructor(authService: AuthService) {
    authService.isAuthenticated$.subscribe((isAuth) => {
      this.isAuth = isAuth;
      console.log(isAuth);
    });
  }

  links: NavLink[] = [
    {
      label: 'Щоденний бокс',
      icon: '/svg/box.svg',
      route: 'drewards',
      authOnly: true,
    },
    {
      label: 'Рейтинги (soon)',
      icon: '/svg/stat.svg',
      route: 'stats',
      authOnly: true,
    },
    {
      label: 'Матеріали (soon)',
      icon: '/svg/material.svg',
      route: 'materials',
      authOnly: true,
    },
    {
      label: 'Біржа (soon)',
      icon: '/svg/market.svg',
      route: 'market',
      authOnly: true,
    },
    {
      label: 'Казино (зачинено)',
      icon: '/svg/casino.svg',
      route: 'casino',
      authOnly: true,
    },
    {
      label: 'Увійти',
      icon: '/svg/key.svg',
      route: 'signin',
      authOnly: false,
    },
    {
      label: 'Про тікетономіку',
      icon: '/svg/info.svg',
      route: 'info',
    },
  ];
}
