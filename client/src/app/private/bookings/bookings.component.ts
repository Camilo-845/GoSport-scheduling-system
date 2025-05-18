import { BackButtonComponent } from '@/components/back-button/back-button.component';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingService } from './services';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [BackButtonComponent, BookingListComponent],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsComponent {
  bookingService = inject(BookingService);
  router = inject(Router);
  bookings = computed(() => {
    const bookingsMap = this.bookingService.state().bookings;
    return Array.from(bookingsMap.values());
  });

  backRoute = [AppRoutes.private.root];

  constructor() {
    this.bookingService.getBookingsByUser(true);
  }
}
