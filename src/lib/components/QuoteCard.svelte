<script lang="ts">
    import { authStore } from '$lib/stores/auth';
    import { saveQuote } from '$lib/utils/api';
    import type { Quote } from '$lib/types/auth';
    import { invalidate } from '$app/navigation';
    import { getAuth } from '$lib/stores/auth';
    
    export let quote: Quote;
    export let saved: boolean = false;
    
    let isCopied = false;
    let isSaving = false;
    
    async function copyToClipboard(): Promise<void> {
        try {
            await navigator.clipboard.writeText(`${quote.content} — ${quote.author}`);
            isCopied = true;
            setTimeout(() => isCopied = false, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
    
    async function handleSave() {
        if (!$authStore.isAuthenticated) return;
        
        isSaving = true;
        try {
            const savedQuote = await saveQuote(quote);
            saved = true;
            
            // Dispatch event with full quote details
            const event = new CustomEvent('quote-saved', {
                detail: savedQuote,
                bubbles: true, // Ensure event propagates
                composed: true
            });
            window.dispatchEvent(event);
            
        } catch (err) {
            console.error('Save failed:', err);
        } finally {
            isSaving = false;
        }
    }
</script>

<div class="quote-card">
    <p class="content">"{quote.content}"</p>
    <p class="author">— {quote.author}</p>
    
    <div class="actions">
        <button on:click={copyToClipboard} class="copy-btn">
            {isCopied ? 'Copied!' : 'Copy'}
        </button>
        
        {#if $authStore.isAuthenticated && !saved}
            <button on:click={handleSave} class="save-btn" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
            </button>
        {/if}
        
    </div>
</div>



<style>
    .quote-card {
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(8px);
        padding: 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 4px 20px var(--shadow-light);
        border-left: 4px solid var(--accent-primary);
        transition: transform 0.2s ease;
    }
    :global([data-theme="dark"]) .quote-card {
        background: rgba(30, 30, 40, 0.9);
        color: var(--text-primary);
        border-left-color: var(--accent-primary);
    }
    button {
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        padding: 0.4rem 1rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 0.8rem;
        transition: all 0.2s ease;
        box-shadow: 0 2px 8px var(--shadow-light);
    }
    
    button:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px var(--shadow-light);
    }
        button:active {
        transform: translateY(0);
    }
    
    button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .copy-btn { background: var(--accent-primary); }
    .save-btn { background: #72e1a0; }
    /* .remove-btn { background: #ef4444; } */
    .actions {
        display: flex;
        gap: 0.75rem;
        margin-top: 1.5rem;
    }
</style>