import { inject, Injectable, signal } from '@angular/core';
import { Booking } from '../models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingDetailsService {
  state = signal({
    bookingDetails: {} as Booking,
  });

  private readonly baseUrl = `${environment.apiUrl}/booking`;

  http = inject(HttpClient);

  getBookingDetails(bookingId: number) {
    this.http
      .get<Booking>(`${this.baseUrl}/${bookingId}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
      )
      .subscribe((result) => {
        if (result) {
          this.state.update((state) => {
            state.bookingDetails = result;
            return { ...state };
          });
        }
      });
  }
}
