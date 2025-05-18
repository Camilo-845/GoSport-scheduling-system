import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Sport } from '../../models';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';

@Component({
  selector: 'app-sport-details',
  standalone: true,
  imports: [],
  templateUrl: './sport-details.component.html',
  styleUrl: './sport-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportDetailsComponent {
  sport = input.required<Sport>();
  router = inject(Router);

  onGoToDetails(idSport: number) {
    this.router.navigate([
      AppRoutes.private.root,
      AppRoutes.private.sports,
      idSport,
    ]);
  }
}
