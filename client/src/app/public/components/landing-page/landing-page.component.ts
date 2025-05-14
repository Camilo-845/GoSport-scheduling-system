import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '@/components/footer/footer.component';
import { SportsGridComponent } from './components/sports-grid/sports-grid.component';
import { CtaSectionComponent } from './components/cta-section/cta-section.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    SportsGridComponent,
    CtaSectionComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
