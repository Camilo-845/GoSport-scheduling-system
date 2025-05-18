import { inject, Injectable, signal } from '@angular/core';
import { Court } from '../models/court.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourtDetailsService {
  state = signal({
    courtDetails: {} as Court,
  });

  private readonly baseUrl = `${environment.apiUrl}/court`;

  http = inject(HttpClient);

  getCourtDetails(courtId: number) {
    this.http.get<Court>(`${this.baseUrl}/${courtId}`).subscribe((result) => {
      if (result) {
        this.state.update((state) => {
          state.courtDetails = result;
          return { ...state };
        });
      }
    });
  }
}
