import { Routes } from '@angular/router';

export const router: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./courts.component').then((m) => m.CourtsComponent),
      },
      {
        path: ':courtId',
        loadComponent: () =>
          import('./components/court-by-id/court-by-id.component').then(
            (m) => m.CourtByIdComponent,
          ),
      },
    ],
  },
];
