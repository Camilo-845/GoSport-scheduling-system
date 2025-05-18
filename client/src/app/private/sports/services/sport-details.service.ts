import { inject, Injectable, signal } from '@angular/core';
import { Sport } from '../models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Court } from '@/private/courts/models/court.model';

@Injectable({
  providedIn: 'root',
})
export class SportDetailsService {
  state = signal({
    sportDetails: {} as Sport,
    sportCourts: new Map<number, Court>(),
  });

  private readonly baseUrl = `${environment.apiUrl}/sport`;

  http = inject(HttpClient);

  getSportDetails(sportId: number) {
    this.http
      .get<Sport>(`${this.baseUrl}/${sportId}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
      )
      .subscribe((result) => {
        if (result) {
          this.state.update((state) => {
            state.sportDetails = result;
            return { ...state };
          });
        }
      });
  }

  getSportCourts(sportId: number) {
    this.http
      .get<Court[]>(`${this.baseUrl}/${sportId}/courts`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
      )
      .subscribe((result) => {
        if (result) {
          this.state.update((state) => {
            state.sportCourts.clear();
            result.forEach((el) => {
              const court = el;
              state.sportCourts.set(court.idCancha, court);
            });
            return { ...state };
          });
        }
      });
  }
}
