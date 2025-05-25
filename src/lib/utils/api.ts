// src/lib/utils/api.ts
import { getAuth } from '$lib/stores/auth';
import type { Quote } from '$lib/types/auth';

// Remove ALL token handling - cookies are automatic
export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const response = await fetch(url, {
        ...options,
        credentials: 'include' // This sends cookies automatically
    });
    
    if (response.status === 401) {
        window.location.href = '/login';
        throw new Error('Unauthorized');
    }
    
    return response;
}

export async function getQuotes(keyword: string): Promise<Quote[]> {
    const response = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ keyword })
    });
    
    if (!response.ok) throw new Error('Failed to generate quotes');
    return response.json();
}

export async function saveQuote(quote: Quote): Promise<Quote> {
    const response = await fetch('/api/quotes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote }),
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save quote');
    }

    return await response.json(); // Return saved quote
}

export async function getSavedQuotes(): Promise<Quote[]> {
    const response = await fetchWithAuth('/api/quotes');
    return response.json();
}

export async function removeQuote(quoteId: string): Promise<void> {
    await fetchWithAuth('/api/quotes/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId })
    });
}