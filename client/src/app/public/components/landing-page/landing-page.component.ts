import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
