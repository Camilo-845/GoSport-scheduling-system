import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Booking } from '../../models';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [BookingDetailComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingListComponent {
  bookings = input.required<Booking[]>();
}
