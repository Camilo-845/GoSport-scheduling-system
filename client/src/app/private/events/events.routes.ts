import { Routes } from '@angular/router';
import { EnventsComponent } from './envents.component';
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
    ],
  },
];
