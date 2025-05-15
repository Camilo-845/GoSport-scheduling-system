import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Event_model } from '../../models/event.model';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [EventDetailsComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListComponent {
  events = input.required<Event_model[]>();
}
