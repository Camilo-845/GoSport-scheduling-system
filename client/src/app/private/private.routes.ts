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
    ],
  },
];
