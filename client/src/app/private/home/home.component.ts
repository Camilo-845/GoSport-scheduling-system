import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventPreviewListComponent } from '../events/components';
import { SportPreviewListComponent } from '../sports/components/sport-preview-list/sport-preview-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventPreviewListComponent, SportPreviewListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
