import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './Components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import(
        './Components/register-component/register-component.component'
      ).then((c) => c.RegisterComponentComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./Components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'dashboard/cart',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./Components/cart/cart.component').then((c) => c.CartComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./Components/forgot-password/forgot-password.component').then(
        (c) => c.ForgotPasswordComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./Components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
