import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { SportListComponent } from './components/sport-list/sport-list.component';
import { SportService } from './services';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';
import { BackButtonComponent } from '@/components/back-button/back-button.component';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [SportListComponent, BackButtonComponent],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsComponent {
  sportService = inject(SportService);
  router = inject(Router);
  sports = computed(() => {
    const sportsMap = this.sportService.state().sports;
    return Array.from(sportsMap.values());
  });

  backRoute = [AppRoutes.private.root];

  constructor() {
    this.sportService.getSports();
  }

  goMoreSports() {
    this.router.navigate([
      `${AppRoutes.private.root}/${AppRoutes.private.sports}`,
    ]);
  }
}
