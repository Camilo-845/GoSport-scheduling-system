import { Routes } from '@angular/router';
import { AppRoutes } from '@/app.routes';

export const router: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./envents.component').then((m) => m.EnventsComponent),
      },
      {
        path: AppRoutes.private.events.create,
        loadComponent: () =>
          import('./components/event-create/event-create.component').then(
            (m) => m.EventCreateComponent,
          ),
      },
      {
        path: ':eventId',
        loadComponent: () =>
          import('./components/event-by-id/event-by-id.component').then(
            (m) => m.EventByIdComponent,
          ),
      },
    ],
  },
];
