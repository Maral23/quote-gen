<script lang="ts">
    import { authStore } from '$lib/stores/auth';
    import { theme } from '$lib/stores/theme';
    import Header from '$lib/components/Header.svelte';
    import type { User } from '$lib/types/auth';
  
  export let data: { user: App.PageData['user'] };

  $: authStore.set({
    user: data.user || null,
    isAuthenticated: !!data.user
  });
</script>

<svelte:head>
    <title>Quote Generator</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
</svelte:head>


<div class="app" data-theme={$theme}>
    <Header />
    <main>
        <slot />
    </main>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }
    :global(:root) {
        --bg-gradient: linear-gradient(135deg, #e7e1f5 0%, #f2f6fb 100%);
        --text-primary: #2c2c38;
        --accent-primary: #6a63f7;
        --accent-secondary: #a49fcf;
        --shadow-light: rgba(44, 44, 56, 0.1);
        --card-bg: rgba(255, 255, 255, 0.85);
    }
    :global([data-theme="dark"]) {
        --bg-gradient: linear-gradient(135deg, #1a1a2e 0%, #2e2c4a 100%); /* Dark purple gradient */
        --text-primary: #f5f5fa; /* White text */
        --accent-primary: #a78bfa; /* Light purple */
        --accent-secondary: #3e3b5d; /* Dark purple */
        --shadow-light: rgba(0, 0, 0, 0.4);
        --card-bg: rgba(30, 30, 40, 0.9); /* Dark card background */
        --header-bg: rgba(30, 30, 50, 0.95); /* Dark semi-transparent */
        --header-border: rgba(255, 255, 255, 0.1);
    }


    .app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: 
            radial-gradient(circle at center, rgba(108, 99, 255, 0.25) 0%, transparent 40%),
            var(--bg-gradient); 
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
        background-blend-mode: normal;
        color: var(--text-primary);
        transition: background 0.3s ease, color 0.3s ease;
        font-family: 'Satoshi', sans-serif;
    }

    main {
        flex: 1;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 1.5rem;
        padding-top: 100px !important;
    }

    :global(::-webkit-scrollbar) {
        width: 8px;
    }

    :global(::-webkit-scrollbar-track) {
        background: var(--accent-secondary);
    }

    :global(::-webkit-scrollbar-thumb) {
        background: var(--accent-primary);
        border-radius: 4px;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background: #574fca;
    }
        :global(input), 
    :global(textarea),
    :global(select) {
        color: var(--text-primary);
        background-color: var(--card-bg);
        border: 1px solid var(--accent-secondary);
        border-radius: 0.5rem;
        padding: 0.75rem;
        transition: all 0.2s ease;
    }

    :global(input::placeholder),
    :global(textarea::placeholder) {
        color: var(--accent-secondary);
        opacity: 0.7;
    }

    :global([data-theme="dark"]) {
        /* Enhance contrast for dark mode inputs */
        --input-bg: rgba(50, 50, 70, 0.9);
        --input-border: rgba(255, 255, 255, 0.15);
    }
</style>
