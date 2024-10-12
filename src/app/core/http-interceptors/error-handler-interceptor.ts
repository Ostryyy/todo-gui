import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private authStore = inject(AuthStore);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.statusText === 'Unauthorized' && error.error?.error === 'Invalid token') {
          this.authStore.logout({
            type: 'info',
            text: 'Invalid token. Please log in again!',
          });
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
