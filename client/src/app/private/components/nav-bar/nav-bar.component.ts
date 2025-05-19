import { AppRoutes } from '@/app.routes';
import { UserService } from '@/private/user/services/user.service';
import { LocalManagerService } from '@/services';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
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
  userService = inject(UserService);
  localManagerService = inject(LocalManagerService);
  user = computed(() => this.userService.state().user);
  router = inject(Router);
  isMenuOpen = false;

  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  goToRoot() {
    this.router.navigate([AppRoutes.private.root]);
  }
  goToProfile() {
    this.router.navigate([
      `${AppRoutes.private.root}/${AppRoutes.private.user}`,
    ]);
  }
  goToMyBookings() {
    this.router.navigate([
      `${AppRoutes.private.root}/${AppRoutes.private.bookings.root}`,
    ]);
  }

  logout() {
    this.localManagerService.clearStorage();
    window.location.reload();
  }
  constructor() {
    this.userService.getUserInfo();
  }
}
