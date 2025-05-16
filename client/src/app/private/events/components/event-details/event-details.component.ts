import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Event_model } from '../../models/event.model';
import { EventService } from '../../services';
import { firstValueFrom } from 'rxjs';

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
  eventService = inject(EventService);

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
      this.eventService.getEvents();
    } catch (error) {
      console.error(error);
    }
  }
}
