import { inject, Injectable, signal } from '@angular/core';
import { Court } from '../models/court.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { AppInitService } from '@/services';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  configService = inject(AppInitService);
  constructor() {
    this.baseUrl = `${this.configService.get('apiUrl')}/court`;
  }
  state = signal({
    courts: new Map<number, Court>(),
  });
  private readonly baseUrl = `${environment.apiUrl}/court`;

  http = inject(HttpClient);

  getCourts(reset?: boolean) {
    this.http
      .get<Court[]>(this.baseUrl)
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
              state.courts.clear();
            }
            result.forEach((element) => {
              state.courts.set(element.idCancha, element);
            });
            return { ...state };
          });
        }
      });
  }
}
