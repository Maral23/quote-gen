<!-- Switches between light and dark mode -->
<script>
    import { theme } from '../stores/theme';
    
    function toggleTheme() {
        theme.update(current => current === 'light' ? 'dark' : 'light');
    }
</script>

<button on:click={toggleTheme} aria-label="Toggle theme">
    {#if $theme === 'light'}
        <!-- ☽ -->
         🌙
    {:else}
        ☀️
        <!-- ☼ -->
    {/if}
</button>
<style>
    button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        padding: 0.5rem;
    }
</style>