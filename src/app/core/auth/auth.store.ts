import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export interface IAuthMessage {
  type: 'err' | 'info';
  text: string;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState({
    isAuthenticated: false,
    user: null as string | null,
    token: null as string | null,
    loginMessage: undefined as IAuthMessage | undefined,
    registerMessage: undefined as IAuthMessage | undefined,
  }),
  withMethods((store) => ({
    login(user: string, token: string): void {
      patchState(store, {
        isAuthenticated: true,
        user,
        token,
        loginMessage: undefined,
      });
      localStorage.setItem('token', token);
    },
    logout(message?: IAuthMessage): void {
      patchState(store, {
        isAuthenticated: false,
        user: null,
        token: null,
        loginMessage: undefined,
        registerMessage: undefined,
      });
      if (message) this.setLoginMessage(message);
      localStorage.removeItem('token');
    },
    loadTokenFromStorage(): void {
      const token = localStorage.getItem('token');
      if (token) {
        patchState(store, {
          isAuthenticated: true,
          token,
          loginMessage: undefined,
          registerMessage: undefined,
        });
      }
    },
    isLoggedIn(): boolean {
      return store.isAuthenticated();
    },
    setLoginMessage(message: IAuthMessage): void {
      patchState(store, {
        loginMessage: message,
      });
    },
    setRegisterMessage(message: IAuthMessage): void {
      patchState(store, {
        registerMessage: message,
      });
    },
    clearLoginMessage(): void {
      patchState(store, {
        loginMessage: undefined,
      });
    },
    clearRegisterMessage(): void {
      patchState(store, {
        registerMessage: undefined,
      });
    },
  }))
);
