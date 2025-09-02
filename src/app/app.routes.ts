import { Routes } from '@angular/router';
import { PresentationComponent } from './features/info/info.component';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { DrewardComponent } from './features/dreward/dreward.component';
import { NotfoundComponent } from './features/errors/notfound.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ForbiddenComponent } from './features/errors/forbidden.component';
import { ServerErrorComponent } from './features/errors/server-error.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [      
            {path: 'info',component: PresentationComponent, data: {title: 'Info'}},
            {path: 'signin',component: LoginComponent, data: {title: 'Signin'}},
            {path: 'profile', component: ProfileComponent, data: {title: 'Profile'}},
            {path: 'drewards', component: DrewardComponent, data: {title: 'Daily Reward'}},

            {path: '', redirectTo: 'info', pathMatch: 'full'},
            {path: 'forbidden', component: ForbiddenComponent },
            {path: 'imbad', component: ServerErrorComponent },
            {path: '**', component: NotfoundComponent },
        ]
    },
];
