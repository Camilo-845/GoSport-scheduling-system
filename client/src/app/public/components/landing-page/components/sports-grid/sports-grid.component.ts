import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sports-grid',
  standalone: true,
  imports: [],
  templateUrl: './sports-grid.component.html',
  styleUrl: './sports-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SportsGridComponent {

}
