import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthStore } from './auth.store';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private authStore = inject(AuthStore);
  private http = inject(HttpClient);
  private router = inject(Router);

  login(user: User): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { ...user })
      .pipe(
        tap((response) => {
          if (response.token) {
            this.authStore.login(user.username, response.token);
          }
        })
      );
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { ...user });
  }

  connTest(){
    return this.http.get(`${this.apiUrl}/conn-test`);
  }

  logout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
