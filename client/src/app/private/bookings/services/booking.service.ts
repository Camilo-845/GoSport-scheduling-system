import { inject, Injectable, signal } from '@angular/core';
import { Booking } from '../models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  state = signal({
    bookings: new Map<number, Booking>(),
  });

  private readonly baseUrl = `${environment.apiUrl}/booking`;

  http = inject(HttpClient);

  getBookingsByUser(reset: boolean) {
    this.http
      .get<Booking[]>(`${this.baseUrl}/user`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
      )
      .subscribe((result) => {
        if (result) {
          this.state.update((state) => {
            if (reset) {
              state.bookings.clear();
            }
            result.forEach((element) => {
              const booking = element;
              state.bookings.set(booking.idReserva, booking);
            });
            return { ...state };
          });
        }
      });
  }
  getBookingsByCourt(courtId: number, reset: boolean) {
    this.http
      .get<Booking[]>(`${this.baseUrl}/court/${courtId}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
      )
      .subscribe((result) => {
        if (result) {
          this.state.update((state) => {
            if (reset) {
              state.bookings.clear();
            }
            result.forEach((element) => {
              const booking = element;
              state.bookings.set(booking.idReserva, booking);
            });
            return { ...state };
          });
        }
      });
  }
}
