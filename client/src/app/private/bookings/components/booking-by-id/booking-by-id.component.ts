import { BackButtonComponent } from '@/components/back-button/back-button.component';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { BookingDetailComponent } from '../../components/booking-detail/booking-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';
import { CourtDetailsService } from '@/private/courts/services';
import { CourtDetailsComponent } from '@/private/courts/components/court-details/court-details.component';
import { BookingDetailsService } from '../../services';
import { firstValueFrom } from 'rxjs';
import { UserService } from '@/private/user/services/user.service';

@Component({
  selector: 'app-booking-by-id',
  standalone: true,
  imports: [BackButtonComponent, BookingDetailComponent, CourtDetailsComponent],
  templateUrl: './booking-by-id.component.html',
  styleUrl: './booking-by-id.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingByIdComponent {
  bookingDetailsService = inject(BookingDetailsService);
  courtDetailsService = inject(CourtDetailsService);
  userService = inject(UserService);
  router = inject(Router);

  backRoute = [AppRoutes.private.root, AppRoutes.private.bookings.root];
  private readonly route = inject(ActivatedRoute);

  bookingDetails = computed(
    () => this.bookingDetailsService.state().bookingDetails,
  );
  courtDetails = computed(() => this.courtDetailsService.state().courtDetails);
  userId = computed(() => this.userService.state().user);

  constructor() {
    const bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
    if (!isNaN(bookingId)) {
      this.bookingDetailsService.getBookingDetails(bookingId);
    } else {
      this.router.navigate([AppRoutes.private.root]);
    }

    effect(() => {
      const booking = this.bookingDetails();
      if (booking?.idCancha) {
        this.courtDetailsService.getCourtDetails(booking.idCancha);
      }
    });
  }

  async removeBooking(bookingId: number) {
    try {
      if (this.userId()?.idUsuario == this.bookingDetails().idUsuario) {
        await firstValueFrom(
          this.bookingDetailsService.removeBooking(bookingId),
        );
        this.router.navigate(this.backRoute);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
