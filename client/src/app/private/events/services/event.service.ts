import { inject, Injectable, signal } from '@angular/core';
import {
  createEventSchema,
  Event_model,
  GetEventResponse,
} from '../models/event.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { createEventAdapter, getEventsResponse } from '@/adapters';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  state = signal({
    events: new Map<number, Event_model>(),
  });
  private readonly baseUrl = `${environment.apiUrl}/event`;

  http = inject(HttpClient);

  getEvents() {
    this.http
      .get<GetEventResponse[]>(this.baseUrl)
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
              const event = getEventsResponse(element);
              state.events.set(event.id_evento, event);
            });
            return { ...state };
          });
        }
      });
  }
  joinToEvent(idEvento: number) {
    return this.http.post<void>(`${this.baseUrl}/${idEvento}/participant`, {});
  }

  createEvent(event: createEventSchema) {
    return this.http.post<void>(this.baseUrl, createEventAdapter(event));
  }
}
