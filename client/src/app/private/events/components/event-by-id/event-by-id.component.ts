import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { EventDetailsService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { BackButtonComponent } from '@/components/back-button/back-button.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-event-by-id',
  standalone: true,
  imports: [EventDetailsComponent, BackButtonComponent],
  templateUrl: './event-by-id.component.html',
  styleUrl: './event-by-id.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventByIdComponent implements OnInit {
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  eventDetailsService = inject(EventDetailsService);
  router = inject(Router);

  backRoute = [AppRoutes.private.root];
  private readonly route = inject(ActivatedRoute);

  eventParticipants = computed(() => {
    const userMap = this.eventDetailsService.state().eventParticipants;
    return Array.from(userMap.values());
  });

  eventDetails = computed(() => this.eventDetailsService.state().eventDetails);

  async removeEventParticipant(eventId: number) {
    try {
      await firstValueFrom(
        this.eventDetailsService.removeEventParticipant(eventId),
      );
      this.eventDetailsService.getEventDetails(eventId);
      this.eventDetailsService.getEventParticipants(eventId);
    } catch (error) {}
  }

  constructor() {
    const eventId = Number(this.route.snapshot.paramMap.get('eventId'));

    if (!isNaN(eventId)) {
      this.eventDetailsService.getEventDetails(eventId);
      this.eventDetailsService.getEventParticipants(eventId);
    } else {
      this.router.navigate([AppRoutes.private.root]);
    }
  }
}
