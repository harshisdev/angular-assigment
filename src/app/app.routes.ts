import { Routes } from '@angular/router';

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
    loadComponent: () =>
      import('./Components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'dashboard/cart',
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
];
