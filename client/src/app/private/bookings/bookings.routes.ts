import { Routes } from '@angular/router';

export const router: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./bookings.component').then((m) => m.BookingsComponent),
      },
    ],
  },
];
