import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Court } from '../../models/court.model';
import { CourtDetailsComponent } from '../court-details/court-details.component';

@Component({
  selector: 'app-court-list',
  standalone: true,
  imports: [CourtDetailsComponent],
  templateUrl: './court-list.component.html',
  styleUrl: './court-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtListComponent {
  courts = input.required<Court[]>();
}
