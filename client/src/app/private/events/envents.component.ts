import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { EventListComponent } from './components';
import { EventService } from './services';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';
import { BackButtonComponent } from '@/components/back-button/back-button.component';

@Component({
  selector: 'app-envents',
  standalone: true,
  templateUrl: './envents.component.html',
  imports: [EventListComponent, BackButtonComponent],
  styleUrl: './envents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnventsComponent {
  eventService = inject(EventService);
  events = computed(() => {
    const eventsMap = this.eventService.state().events;
    return Array.from(eventsMap.values());
  });
  router = inject(Router);

  backRoute = [AppRoutes.private.root];
  constructor() {
    this.eventService.getEvents();
  }

  onCreateEvent() {
    this.router.navigate([
      AppRoutes.private.root,
      AppRoutes.private.events.root,
      AppRoutes.private.events.create,
    ]);
  }
}
