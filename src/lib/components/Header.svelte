<script lang="ts">
    import { authStore, clearAuth } from '$lib/stores/auth';
    import ThemeToggle from './ThemeToggle.svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let isLoading = false;

    async function handleLogout() {
        isLoading = true;
        try {
            await fetch('/api/auth/logout', { 
                method: 'POST',
                credentials: 'same-origin'
            });
            window.location.href = '/'; // Full reload to clear state
        } finally {
            isLoading = false;
        }
    }
</script>


<header>
    <nav>
        <a href="/" class="logo" aria-label="QuoteGen Home">QuoteGen</a>
        
        <div class="nav-links">
            <a href="/about">How It Works</a>
            {#if $authStore.isAuthenticated}
                <a href="/saved">Saved Quotes</a>
                <button on:click={handleLogout} class="nav-button">Logout</button>
            {:else}
                <a href="/login" class="nav-button">Login</a>
            {/if}
            <ThemeToggle />
        </div>
    </nav>
</header>

<style>

    /* header {
    width: 100vw;
    padding: 1.5rem 2rem;
    background:#F3F3FF;
    position: fixed;
    z-index: 10;
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.13);
    margin: 0;
    left: 0;
    right: 0;
    top: 0;
    color: white;
    }


    :global([data-theme="dark"]) header {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    } */

    header {
    width: 100vw;
    padding: 1.5rem 2rem;
    position: fixed;
    z-index: 10;
    margin: 0;
    left: 0;
    right: 0;
    top: 0;
    background: var(--header-bg, #F3F3FF); /* Falls back to light theme */
    border-bottom: 1px solid var(--header-border, rgba(0, 0, 0, 0.1));
    backdrop-filter: blur(10px);
    }


    :global([data-theme="dark"]) header {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .logo {
        /* font-family: 'Playfair Display', serif; */
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        text-decoration: none;
    }
    
    .nav-links {
        display: flex;
        gap: 1.5rem;
        align-items: center;
    }
    
    .nav-button, a {
        /* font-family: 'Inter', sans-serif; */
        font-weight: 600;
        color: var(--text-primary);
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        transition: all 0.2s ease;
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1rem;
    }


    button.nav-button {
        box-shadow: none;
        padding: 0.5rem 1rem;
    }

    /* :global(:root) {
        --header-height: 72px;
        --header-bg: rgba(255, 255, 255, 0.9);
        --border-color: rgba(0, 0, 0, 0.1);
    } */
</style>