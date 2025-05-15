import { Routes } from '@angular/router';
import { authGuard, isLoggedGuard } from './guards';

export const AppRoutes = {
  public: {
    root: '',
    register: 'register',
    login: 'login',
    notFound: '404',
  },
  private: {
    root: 'private',
    home: 'home',
    user: 'user',
    editUserInfo: 'editUserInfo',
    changePassword: 'changePassword',
    events: 'events',
  },
};
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [isLoggedGuard],
    loadComponent: () =>
      import('./public/components/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent,
      ),
  },
  {
    path: AppRoutes.public.login,
    canActivate: [isLoggedGuard],
    loadComponent: () =>
      import('./public/components/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: AppRoutes.public.register,
    canActivate: [isLoggedGuard],
    loadComponent: () =>
      import('./public/components/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: AppRoutes.private.root,
    canActivateChild: [authGuard],
    loadChildren: () =>
      import('./private/private.routes').then((m) => m.router),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
