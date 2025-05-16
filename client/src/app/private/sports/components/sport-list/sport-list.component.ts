import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SportDetailsComponent } from '../sport-details/sport-details.component';
import { Sport } from '../../models';

@Component({
  selector: 'app-sport-list',
  standalone: true,
  imports: [SportDetailsComponent],
  templateUrl: './sport-list.component.html',
  styleUrl: './sport-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportListComponent {
  sports = input.required<Sport[]>();
}
