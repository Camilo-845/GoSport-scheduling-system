import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { EventListComponent } from '../event-list/event-list.component';
import { EventService } from '../../services';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';

@Component({
  selector: 'app-event-preview-list',
  standalone: true,
  imports: [EventListComponent],
  templateUrl: './event-preview-list.component.html',
  styleUrl: './event-preview-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventPreviewListComponent {
  eventService = inject(EventService);
  router = inject(Router);
  events = computed(() => {
    const eventsMap = this.eventService.state().events;
    return Array.from(eventsMap.values()).slice(0, 5);
  });

  constructor() {
    this.eventService.getEvents();
  }

  goMoreEvents() {
    this.router.navigate([
      `${AppRoutes.private.root}/${AppRoutes.private.events.root}`,
    ]);
  }
}
