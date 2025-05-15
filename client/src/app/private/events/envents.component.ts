import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { EventListComponent } from './components';
import { EventService } from './services';

@Component({
  selector: 'app-envents',
  standalone: true,
  imports: [EventListComponent],
  templateUrl: './envents.component.html',
  styleUrl: './envents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnventsComponent {
  eventService = inject(EventService);
  events = computed(() => {
    const eventsMap = this.eventService.state().events;
    return Array.from(eventsMap.values());
  });

  constructor() {
    this.eventService.getEvents();
  }
}
