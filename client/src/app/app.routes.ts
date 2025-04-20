import { Routes } from '@angular/router';
import { authGuard } from './guards';

export const AppRoutes = {
  public: {
    register: 'register',
    login: 'login',
    notFound: '404',
  },
  private: {
    root: 'private',
    home: 'home',
  },
};
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `/${AppRoutes.private.root}/${AppRoutes.private.home}`,
  },
  {
    path: AppRoutes.public.login,
    loadComponent: () =>
      import('./public/components/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: AppRoutes.public.register,
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
    path: '*',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
