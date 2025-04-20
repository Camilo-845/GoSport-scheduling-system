import { AppRoutes } from '@/app.routes';
import { localKeys, LocalManagerService } from '@/services';
import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authGuard: CanActivateChildFn = () => {
  const localManager = inject(LocalManagerService);
  const router = inject(Router);

  const token = localManager.getElement(localKeys.token);
  if (!token) {
    router.navigate([AppRoutes.public.login], { replaceUrl: true });
  }

  return true;
};
