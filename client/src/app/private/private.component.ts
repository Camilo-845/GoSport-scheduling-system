import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateComponent {

}
