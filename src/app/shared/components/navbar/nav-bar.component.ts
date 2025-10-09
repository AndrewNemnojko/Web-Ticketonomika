import { Component, inject } from '@angular/core';
import { NavLink } from '../../models/nav-link.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ModalService } from '../modal/modal.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  isAuth = false;

  constructor(private modal: ModalService) {
    this.authService.isAuthenticated$.subscribe((isAuth) => {
      this.isAuth = isAuth;
      console.log(isAuth);
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
      label: 'Щоденний бокс',
      icon: '/svg/box.svg',
      route: 'drewards',
      authOnly: true,
      open: true,
    },
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
      open: false,
    },
    {
      label: 'Біржа',
      icon: '/svg/market.svg',
      route: 'market',
      authOnly: true,
      open: false,
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
