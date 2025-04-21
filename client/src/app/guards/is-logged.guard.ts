import { AppRoutes } from '@/app.routes';
import { localKeys, LocalManagerService } from '@/services';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedGuard: CanActivateFn = () => {
  const localManager = inject(LocalManagerService);
  const router = inject(Router);

  const token = localManager.getElement(localKeys.token);
  if (token) {
    router.navigate([AppRoutes.private.root], { replaceUrl: true });
  }

  return true;
};
