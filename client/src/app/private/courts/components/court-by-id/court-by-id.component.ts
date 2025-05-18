import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CourtDetailsService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';
import { BackButtonComponent } from '@/components/back-button/back-button.component';
import { CourtDetailsComponent } from '../court-details/court-details.component';

@Component({
  selector: 'app-court-by-id',
  standalone: true,
  imports: [BackButtonComponent, CourtDetailsComponent],
  templateUrl: './court-by-id.component.html',
  styleUrl: './court-by-id.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtByIdComponent {
  courtDetailsService = inject(CourtDetailsService);
  router = inject(Router);

  backRoute = [AppRoutes.private.root, AppRoutes.private.courts];
  private readonly route = inject(ActivatedRoute);

  courtDetails = computed(() => this.courtDetailsService.state().courtDetails);

  constructor() {
    const courtId = Number(this.route.snapshot.paramMap.get('courtId'));
    if (!isNaN(courtId)) {
      this.courtDetailsService.getCourtDetails(courtId);
    } else {
      this.router.navigate([AppRoutes.private.root]);
    }
  }
}
