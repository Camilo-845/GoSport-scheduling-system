import { Routes } from '@angular/router';

export const router: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./sports.component').then((m) => m.SportsComponent),
      },
      {
        path: ':sportId',
        loadComponent: () =>
          import('./components/sport-by-id/sport-by-id.component').then(
            (m) => m.SportByIdComponent,
          ),
      },
    ],
  },
];
