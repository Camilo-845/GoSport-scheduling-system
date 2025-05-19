import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CourtDetailsService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';
import { BackButtonComponent } from '@/components/back-button/back-button.component';
import { CourtDetailsComponent } from '../court-details/court-details.component';
import { BookingService } from '@/private/bookings/services';
import { BookingDetailComponent } from '@/private/bookings/components/booking-detail/booking-detail.component';

@Component({
  selector: 'app-court-by-id',
  standalone: true,
  imports: [BackButtonComponent, CourtDetailsComponent, BookingDetailComponent],
  templateUrl: './court-by-id.component.html',
  styleUrl: './court-by-id.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtByIdComponent {
  courtDetailsService = inject(CourtDetailsService);
  bookingsService = inject(BookingService);
  router = inject(Router);

  backRoute = [AppRoutes.private.root, AppRoutes.private.courts];
  private readonly route = inject(ActivatedRoute);

  courtDetails = computed(() => this.courtDetailsService.state().courtDetails);
  bookings = computed(() => {
    const bookingsMap = this.bookingsService.state().bookings;
    return Array.from(bookingsMap.values());
  });

  constructor() {
    const courtId = Number(this.route.snapshot.paramMap.get('courtId'));
    if (!isNaN(courtId)) {
      this.courtDetailsService.getCourtDetails(courtId);
      this.bookingsService.getBookingsByCourt(courtId, true);
    } else {
      this.router.navigate([AppRoutes.private.root]);
    }
  }

  onCreateBooking() {
    this.router.navigate(
      [
        AppRoutes.private.root,
        AppRoutes.private.bookings.root,
        AppRoutes.private.bookings.create,
      ],
      {
        queryParams: { courtId: this.route.snapshot.paramMap.get('courtId') },
      },
    );
  }
}
