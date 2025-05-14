import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  userService = inject(UserService);
  user = computed(() => this.userService.state().user);
  router = inject(Router);

  onEdit() {
    this.router.navigate([
      `${AppRoutes.private.root}/${AppRoutes.private.editUserInfo}`,
    ]);
  }
  onChangePassword() {
    this.router.navigate([
      `${AppRoutes.private.root}/${AppRoutes.private.changePassword}`,
    ]);
  }
  constructor() {
    this.userService.getUserInfo();
  }
}
