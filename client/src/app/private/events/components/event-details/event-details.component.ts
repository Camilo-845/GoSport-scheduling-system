import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Event_model } from '../../models/event.model';
import { EventDetailsService, EventService } from '../../services';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsComponent {
  event = input.required<Event_model>();
  fullPage = input<boolean>();

  eventService = inject(EventService);
  EventDetailsService = inject(EventDetailsService);
  router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  formattedDate = computed(() => {
    const date = new Date(this.event().fecha); // ejemplo
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
    });
  });
  formattedHour = computed(() => {
    const time = new Date(`1970-01-01T${this.event().hora_inicio}`);
    return time.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  });

  async joinToEvent(eventId: number) {
    try {
      await firstValueFrom(this.eventService.joinToEvent(eventId));
      if (!this.fullPage()) {
        this.eventService.getEvents();
      } else {
        this.EventDetailsService.getEventDetails(eventId);
        this.EventDetailsService.getEventParticipants(eventId);
      }
    } catch (error) {
      console.error(error);
    }
  }

  openFullDetails(eventId: number) {
    if (!this.fullPage()) {
      this.router.navigate([
        AppRoutes.private.root,
        AppRoutes.private.events.root,
        eventId,
      ]);
    }
  }
}
