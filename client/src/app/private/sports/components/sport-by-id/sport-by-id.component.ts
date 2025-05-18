import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { SportDetailsService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';
import { BackButtonComponent } from '@/components/back-button/back-button.component';
import { CourtDetailsComponent } from '@/private/courts/components/court-details/court-details.component';

@Component({
  selector: 'app-sport-by-id',
  standalone: true,
  imports: [BackButtonComponent, CourtDetailsComponent],
  templateUrl: './sport-by-id.component.html',
  styleUrl: './sport-by-id.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportByIdComponent {
  sportDetailsService = inject(SportDetailsService);
  router = inject(Router);

  backRoute = [AppRoutes.private.root, AppRoutes.private.sports];
  private readonly route = inject(ActivatedRoute);

  sportDetails = computed(() => this.sportDetailsService.state().sportDetails);
  sportCourts = computed(() => {
    const courtMap = this.sportDetailsService.state().sportCourts;
    return Array.from(courtMap.values());
  });

  constructor() {
    const sportId = Number(this.route.snapshot.paramMap.get('sportId'));
    if (!isNaN(sportId)) {
      this.sportDetailsService.getSportDetails(sportId);
      this.sportDetailsService.getSportCourts(sportId);
    } else {
      this.router.navigate([AppRoutes.private.root]);
    }
  }
}
