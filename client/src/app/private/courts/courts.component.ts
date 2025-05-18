import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CourtService } from './services';
import { CourtListComponent } from './components/court-list/court-list.component';
import { BackButtonComponent } from '@/components/back-button/back-button.component';
import { AppRoutes } from '@/app.routes';

@Component({
  selector: 'app-courts',
  standalone: true,
  imports: [CourtListComponent, BackButtonComponent],
  templateUrl: './courts.component.html',
  styleUrl: './courts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtsComponent {
  courtService = inject(CourtService);
  courts = computed(() => {
    const courtsMap = this.courtService.state().courts;
    return Array.from(courtsMap.values());
  });

  backRoute = [AppRoutes.private.root];

  constructor() {
    this.courtService.getCourts(true);
  }
}
