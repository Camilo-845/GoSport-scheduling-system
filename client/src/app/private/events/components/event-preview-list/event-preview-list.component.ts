import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-event-preview-list',
  standalone: true,
  imports: [],
  templateUrl: './event-preview-list.component.html',
  styleUrl: './event-preview-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPreviewListComponent {

}
