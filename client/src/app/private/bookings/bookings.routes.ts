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
      {
        path: 'create',
        loadComponent: () =>
          import('./components/booking-create/booking-create.component').then(
            (m) => m.BookingCreateComponent,
          ),
      },
      {
        path: ':bookingId',
        loadComponent: () =>
          import('./components/booking-by-id/booking-by-id.component').then(
            (m) => m.BookingByIdComponent,
          ),
      },
    ],
  },
];
