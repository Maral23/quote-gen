// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initialTheme = browser 
    ? localStorage.getItem('theme') || 'light'
    : 'light';

export const theme = writable<string>(initialTheme);

if (browser) {
    theme.subscribe((value) => {
        localStorage.setItem('theme', value);
        document.documentElement.setAttribute('data-theme', value);
    });
    
    // Initialize immediately
    document.documentElement.setAttribute('data-theme', initialTheme);
}