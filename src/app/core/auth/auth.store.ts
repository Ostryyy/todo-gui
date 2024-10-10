import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState({
    isAuthenticated: false,
    user: null as string | null,
    token: null as string | null,
  }),
  withMethods((store) => ({
    login(user: string, token: string): void {
      patchState(store, {
        isAuthenticated: true,
        user,
        token,
      });
      localStorage.setItem('token', token);
    },
    logout(): void {
      patchState(store, {
        isAuthenticated: false,
        user: null,
        token: null,
      });
      localStorage.removeItem('token');
    },
    loadTokenFromStorage(): void {
      const token = localStorage.getItem('token');
      if (token) {
        patchState(store, {
          isAuthenticated: true,
          token,
        });
      }
    },
    isLoggedIn(): boolean {
      return store.isAuthenticated();
    },
  }))
);
