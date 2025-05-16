import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { SportService } from '../../services';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';
import { SportListComponent } from '../sport-list/sport-list.component';

@Component({
  selector: 'app-sport-preview-list',
  standalone: true,
  imports: [SportListComponent],
  templateUrl: './sport-preview-list.component.html',
  styleUrl: './sport-preview-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportPreviewListComponent {
  sportService = inject(SportService);
  router = inject(Router);
  sports = computed(() => {
    const sportsMap = this.sportService.state().sports;
    return Array.from(sportsMap.values()).slice(0, 6);
  });

  constructor() {
    this.sportService.getSports();
  }

  goMoreSports() {
    this.router.navigate([
      `${AppRoutes.private.root}/${AppRoutes.private.sports}`,
    ]);
  }
}
