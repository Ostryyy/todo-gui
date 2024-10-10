import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthStore } from './core/auth/auth.store';
import { AppStore } from './app.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'gui';
  protected appStore = inject(AppStore);
  protected authStore = inject(AuthStore);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.authStore.loadTokenFromStorage();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.appStore.setLoading(true);
      } else if (event instanceof NavigationEnd) {
        this.appStore.setLoading(false);
      }
    });
  }

  logout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
