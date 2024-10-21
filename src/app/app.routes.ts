import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
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
    path: '',
    loadComponent: () =>
      import('./features/tasks/task-list.component').then(
        (c) => c.TaskListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
