<script lang="ts">
    import { onMount, beforeUpdate } from 'svelte';
    import { authStore } from '$lib/stores/auth';
    import { getSavedQuotes } from '$lib/utils/api';
    import QuoteCard from '$lib/components/QuoteCard.svelte';
    import { goto } from '$app/navigation';
    import type { Quote } from '$lib/types/auth';
    
    let savedQuotes: Quote[] = [];
    let isLoading = true;
    let error = '';
    let refreshController: AbortController;

    // Properly typed event handler
    const handleQuoteSaved = (event: Event) => {
        const customEvent = event as CustomEvent<Quote>;
        if (!savedQuotes.some(q => q._id === customEvent.detail._id)) {
            savedQuotes = [customEvent.detail, ...savedQuotes];
        }
    };

    onMount(() => {
        refreshController = new AbortController();
        
        // Add event listener with proper typing
        window.addEventListener('quote-saved', handleQuoteSaved, {
            signal: refreshController.signal
        });

        // Separate async operation
        const initialize = async () => {
            await loadQuotes();
            const interval = setInterval(loadQuotes, 30000);
            return () => clearInterval(interval);
        };

        const cleanupPromise = initialize();
        
        return () => {
            refreshController.abort();
            cleanupPromise.then(cleanup => cleanup?.());
        };
    });

    // Handle navigation changes
    beforeUpdate(async () => {
        if ($authStore.isAuthenticated) {
            await loadQuotes();
        }
    });

    async function loadQuotes() {
        if (!$authStore.isAuthenticated) {
            await goto('/login');
            return;
        }
        
        try {
            const freshQuotes = await getSavedQuotes();
            savedQuotes = freshQuotes;
            error = '';
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to load quotes';
            console.error('Load error:', error);
        } finally {
            isLoading = false;
        }
    }

</script>

<div class="page-container">
    <h1>Your Saved Quotes</h1>
    
    {#if isLoading}
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading your quotes...</p>
        </div>
    {:else if error}
        <p class="error">{error}</p>
    {:else if savedQuotes.length === 0}
        <p class="empty-state">You haven't saved any quotes yet.</p>
    {:else}
        <div class="quotes-container">
            {#each savedQuotes as quote (quote._id)}
                <QuoteCard 
                    {quote} 
                    saved 
                />
            {/each}
        </div>
    {/if}
</div>

<style>
    .page-container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding-top: 1rem;
        position:center;

    }
    .page-container h1 {
      text-align: center;
      margin-bottom: 2rem;}

    
    .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin: 2rem 0;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--accent-primary);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .empty-state {
        text-align: center;
        color: var(--accent-secondary);
        font-style: italic;
        margin: 2rem 0;
    }
    
    .quotes-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin: 1rem 0;
    }
    
    .error {
        color: #ef4444;
        text-align: center;
        padding: 1rem;
        background: rgba(239, 68, 68, 0.1);
        border-radius: 0.5rem;
        margin: 1rem 0;
    }
</style>