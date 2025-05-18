import { Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { AppRoutes } from '@/app.routes';

export const router: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoutes.private.home,
      },
      {
        path: AppRoutes.private.home,
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: AppRoutes.private.user,
        loadComponent: () =>
          import('./user/user.component').then((m) => m.UserComponent),
      },
      {
        path: AppRoutes.private.editUserInfo,
        loadComponent: () =>
          import(
            './user/components/update-user-info/update-user-info.component'
          ).then((m) => m.UpdateUserInfoComponent),
      },
      {
        path: AppRoutes.private.changePassword,
        loadComponent: () =>
          import(
            './user/components/change-password/change-password.component'
          ).then((m) => m.ChangePasswordComponent),
      },
      {
        path: AppRoutes.private.events.root,
        loadChildren: () =>
          import('./events/events.routes').then((m) => m.router),
      },
      {
        path: AppRoutes.private.sports,
        loadChildren: () =>
          import('./sports/sports.routes').then((m) => m.router),
      },
      {
        path: AppRoutes.private.courts,
        loadChildren: () =>
          import('./courts/courts.routes').then((m) => m.router),
      },
    ],
  },
];
