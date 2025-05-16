import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Sport } from '../../models';

@Component({
  selector: 'app-sport-details',
  standalone: true,
  imports: [],
  templateUrl: './sport-details.component.html',
  styleUrl: './sport-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportDetailsComponent {
  sport = input.required<Sport>();
}
