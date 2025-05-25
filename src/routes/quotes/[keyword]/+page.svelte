<script lang="ts">
    import QuoteCard from '$lib/components/QuoteCard.svelte';
    import type { PageData } from './$types';
    import { FALLBACK_QUOTES } from '$lib/utils/fallbackQuotes';

    export let data: PageData;
</script>

<div class="quote-page">
    <h1>Quotes about {data.keyword}</h1>

    {#if data.quotes.length === 0}
        <div class="fallback-notice">
            <p>⚠️ Couldn't fetch fresh quotes. Showing inspirational defaults:</p>
            <div class="quotes-grid">
                {#each FALLBACK_QUOTES as quote}
                    <QuoteCard {quote} />
                {/each}
            </div>
        </div>
    {:else}
        <div class="quotes-grid">
            {#each data.quotes as quote}
                <QuoteCard {quote} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .quote-page {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
    }

    h1 {
        font-size: 2rem;
        color: var(--text-primary);
        margin-bottom: 2rem;
        text-align: center;
    }

    .quotes-grid {
        display: grid;
        gap: 1.5rem;
    }

    .fallback-notice {
        background: var(--card-bg);
        padding: 1.5rem;
        border-radius: 0.5rem;
        margin-bottom: 2rem;
        border-left: 4px solid var(--accent-secondary);
    }

    .fallback-notice p {
        margin: 0 0 1rem 0;
        font-size: 0.9rem;
        color: var(--accent-secondary);
    }
</style>