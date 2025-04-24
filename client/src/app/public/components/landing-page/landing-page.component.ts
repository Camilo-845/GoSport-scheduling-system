import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from '@/components/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
