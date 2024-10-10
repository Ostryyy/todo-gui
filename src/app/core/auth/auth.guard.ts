import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authStore = inject(AuthStore);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.authStore.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
