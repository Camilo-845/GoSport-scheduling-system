import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Court } from '../../models/court.model';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';

@Component({
  selector: 'app-court-details',
  standalone: true,
  imports: [],
  templateUrl: './court-details.component.html',
  styleUrl: './court-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtDetailsComponent {
  court = input.required<Court>();
  fullPage = input<boolean>(false);

  router = inject(Router);

  onGoToDetails(idCourt: number) {
    if (!this.fullPage()) {
      this.router.navigate([
        AppRoutes.private.root,
        AppRoutes.private.courts,
        idCourt,
      ]);
    }
  }
}
