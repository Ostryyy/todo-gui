import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
    canActivate: [AuthGuard],
  },
];
