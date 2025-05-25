<script lang="ts">
    import { writable, derived } from 'svelte/store';
    import { authStore } from '$lib/stores/auth';
    import { getQuotes } from '$lib/utils/api';
    import QuoteCard from '$lib/components/QuoteCard.svelte';
    import type { Quote } from '$lib/types/auth';
    
    const keyword = writable<string>('');
    const isLoading = writable<boolean>(false);
    const error = writable<string | null>(null);
    const quotes = writable<Quote[]>([]);
    
    const isButtonDisabled = derived(
        [keyword, isLoading],
        ([$keyword, $isLoading]) => !$keyword.trim() || $isLoading
    );
    
    async function fetchQuotes(): Promise<void> {
        isLoading.set(true);
        error.set(null);
        
        try {
            const results = await getQuotes($keyword);
            quotes.set(results);
        } catch (err) {
            error.set(err instanceof Error ? err.message : 'Failed to fetch quotes');
            quotes.set([]);
        } finally {
            isLoading.set(false);
        }
    }
    
    function handleKeyPress(event: KeyboardEvent): void {
        if (event.key === 'Enter' && !$isButtonDisabled) {
            fetchQuotes();
        }
    }
</script>

<div class="page-container">
    <h1>Quote Generator</h1>
    <h2>Get compelling and impactful quotes instantly — for presentations, posts, or inspiration.</h2>
    
    <div class="search-container">
        <input 
            type="text" 
            bind:value={$keyword}
            on:keypress={handleKeyPress}
            placeholder="Enter a keyword (e.g., motivation)"
        />
        <button 
            on:click={fetchQuotes} 
            disabled={$isButtonDisabled}
            class:loading={$isLoading}
        >
            {#if $isLoading}
                <span class="spinner"></span>
            {:else}
                Get Quotes
            {/if}
        </button>
    </div>
    
    {#if $error}
        <p class="error">{$error}</p>
    {/if}

    
    <div class="quotes-container">
        {#each $quotes as quote (quote._id)}
            <QuoteCard {quote} />
        {:else}
            <!-- {#if $keyword && !$isLoading}
                <p class="no-results">No quotes found for "{$keyword}"</p>
            {/if} -->
        {/each}
    </div>
</div>
<style>
    .page-container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        padding-top: 3rem;
    }


    h1 {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 3rem;
        color: var(--text-primary);
        font-size: 45px;
    }
    h2 {
        font-size: 1rem;
        text-align: center;
        margin-bottom: 4rem;
        color: var(--text-primary);
        font-size: 18px;
    }
    
    .search-container {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    input {
        flex: 1;
        padding: 0.75rem 1.25rem;
        border: 2px solid var(--accent-secondary);
        border-radius: 0.5rem;
        font-size: 1rem;
        /* background: rgba(255, 255, 255, 0.1); */
        color: var(--text-primary);
        transition: border-color 0.2s ease;
    }
    
    input:focus {
        outline: none;
        border-color: var(--accent-primary);
    }
    
    button {
        padding: 0.75rem 1.5rem;
        background: var(--accent-primary);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    button:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px var(--shadow-light);
    }
    
    button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .loading {
        position: relative;
        color: transparent;
    }
    
    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1.25rem;
        height: 1.25rem;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    .error {
        color: #ef4444;
        text-align: center;
        margin: 1rem 0;
        padding: 0.5rem;
        background: rgba(239, 68, 68, 0.1);
        border-radius: 0.25rem;
    }
    

    
    .quotes-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 2rem;
    }
    :global(.auth-active) .page-container {
        padding-top: 3rem !important;
    }
</style>