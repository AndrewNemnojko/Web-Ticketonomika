import { Routes } from '@angular/router';
import { PresentationComponent } from './features/info/info.component';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotfoundComponent } from './features/errors/notfound.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ForbiddenComponent } from './features/errors/forbidden.component';
import { ServerErrorComponent } from './features/errors/server-error.component';
import { MaterialsPageComponent } from './features/materials/materials-page/materials-page.component';
import { MarketPageComponent } from './features/market/market-page/market-page.component';
import { TodayRewardComponent } from './features/dreward/components/today-reward/today-reward.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'info',
        component: PresentationComponent,
        data: { title: 'Info' },
      },
      {
        path: 'signin',
        component: LoginComponent,
        data: { title: 'Signin' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Profile' },
      },
      {
        path: 'materials',
        component: MaterialsPageComponent,
        data: { title: 'Materials' },
      },
      {
        path: 'market',
        component: MarketPageComponent,
        data: { title: 'Market' },
      },

      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: 'imbad', component: ServerErrorComponent },
      { path: '**', component: NotfoundComponent },
    ],
  },
];
