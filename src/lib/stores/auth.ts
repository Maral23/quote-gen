import { writable } from 'svelte/store';
import type { AuthStore, User } from '$lib/types/auth';


const initialAuthState: AuthStore = {
  user: null,
  isAuthenticated: false
};

export const authStore = writable(initialAuthState);

export function setAuth(user: User | null) {
    authStore.set({
        user,
        isAuthenticated: !!user
    });
}

export function clearAuth() {
  authStore.set(initialAuthState);
}

export function getAuth(): AuthStore {
  let value: AuthStore;
  authStore.subscribe((v) => (value = v))();
  return value!;
}


