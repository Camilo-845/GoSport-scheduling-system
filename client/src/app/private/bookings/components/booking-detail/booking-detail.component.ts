import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Booking } from '../../models';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingDetailComponent {
  booking = input.required<Booking>();
  router = inject(Router);

  onGoToDetails(idBooking: number) {
    this.router.navigate([
      AppRoutes.private.root,
      AppRoutes.private.bookings.root,
      idBooking,
    ]);
  }

  formattedDate = computed(() => {
    const date = new Date(this.booking().fecha); // ejemplo
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
    });
  });
  formattedInitHour = computed(() => {
    const time = new Date(`1970-01-01T${this.booking().horaInicio}`);
    return time.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  });
  formattedEndHour = computed(() => {
    const time = new Date(`1970-01-01T${this.booking().horaFin}`);
    return time.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  });
}
