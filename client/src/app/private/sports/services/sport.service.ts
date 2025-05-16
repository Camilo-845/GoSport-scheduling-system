import { inject, Injectable, signal } from '@angular/core';
import { GetSportResponse, Sport } from '../models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { getSportsRepose } from '@/adapters';
@Injectable({
  providedIn: 'root',
})
export class SportService {
  state = signal({
    sports: new Map<number, Sport>(),
  });
  private readonly baseUrl = `${environment.apiUrl}/sport`;

  http = inject(HttpClient);

  getSports() {
    this.http
      .get<GetSportResponse[]>(this.baseUrl)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
      )
      .subscribe((result) => {
        if (result) {
          this.state.update((state) => {
            result.forEach((element) => {
              const sport = getSportsRepose(element);
              state.sports.set(sport.id_deporte, sport);
            });
            return { ...state };
          });
        }
      });
  }
}
