import { User } from '@/private/user/models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event_model, GetEventResponse } from '../models/event.model';
import { getEventsResponse } from '@/adapters';
import { AppInitService } from '@/services';

@Injectable({
  providedIn: 'root',
})
export class EventDetailsService {
  configService = inject(AppInitService);
  constructor() {
    this.baseUrl = `${this.configService.get('apiUrl')}/event`;
  }
  state = signal({
    eventDetails: {} as Event_model,
    eventParticipants: new Map<number, User>(),
  });

  private readonly baseUrl = `${environment.apiUrl}/event`;

  http = inject(HttpClient);

  getEventParticipants(eventId: number) {
    this.http
      .get<User[]>(`${this.baseUrl}/${eventId}/participants`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
      )
      .subscribe((result) => {
        if (result) {
          this.state.update((state) => {
            state.eventParticipants.clear();
            result.forEach((el) => {
              const user = el;
              state.eventParticipants.set(user.idUsuario, user);
            });
            return { ...state };
          });
        }
      });
  }

  getEventDetails(eventId: number) {
    this.http
      .get<GetEventResponse>(`${this.baseUrl}/${eventId}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
      )
      .subscribe((result) => {
        if (result) {
          this.state.update((state) => {
            state.eventDetails = getEventsResponse(result);
            return { ...state };
          });
        }
      });
  }

  removeEventParticipant(eventId: number) {
    return this.http.delete(`${this.baseUrl}/${eventId}/participants`);
  }
}
