import { inject, Injectable, signal } from '@angular/core';
import { Booking } from '../models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { AppInitService } from '@/services';

@Injectable({
  providedIn: 'root',
})
export class BookingDetailsService {
  configService = inject(AppInitService);
  constructor() {
    this.baseUrl = `${this.configService.get('apiUrl')}/booking`;
  }

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

  removeBooking(bookingId: number) {
    return this.http.delete<void>(`${this.baseUrl}/${bookingId}`);
  }
}
