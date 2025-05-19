import { AppRoutes } from '@/app.routes';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  router = inject(Router);
  navToLogin() {
    this.router.navigate([AppRoutes.public.login]);
  }
  navToRegister() {
    this.router.navigate([AppRoutes.public.register]);
  }
  isMenuOpen = false;
}
