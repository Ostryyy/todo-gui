import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState({
    isLoading: false,
  }),
  withMethods((store) => ({
    setLoading(status: boolean) {
      patchState(store, {
        isLoading: status,
      });
    },
  }))
);
