<script lang="ts">
    import { fade, fly } from 'svelte/transition';  
    import { onMount } from 'svelte';
    
    let animate = false;
    
    onMount(() => {
        animate = true;
        return () => animate = false;
    });
</script>

<div class="about-container" in:fade={{ duration: 300 }}>
    <h1 >How It Works</h1>
    
    <section class="how-it-works">
        <p class="lead">Transform your ideas into inspiring quotes</p>
        
<div class="steps">
    {#each [1, 2, 3] as step, i (i)}
        <div 
            class="step" 
            in:fly={{ y: 50, delay: i * 200, duration: 500 }}
            out:fade
        >
            <div class="step-icon">
                {#if i === 0}
                    ⌨️
                {:else if i === 1}
                    ✨
                {:else}
                    💾
                {/if}
            </div>
            <h3>
                {#if i === 0}
                    Enter a Keyword
                {:else if i === 1}
                    Generate Quotes
                {:else}
                    Save & Share
                {/if}
            </h3>
            <p class="step-description">
                {#if i === 0}
                    Type any topic like "motivation", "success", or "love" to get started
                {:else if i === 1}
                    The app will create unique, inspiring quotes tailored to your keyword
                {:else}
                    Save your favorites or share them directly from the app
                {/if}
            </p>
        </div>
    {/each}
</div>
    </section>
</div>

<style>
    .about-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 2rem;
        min-height: 100vh;
    }
    
    h1 {
        font-size: 3rem;
        margin-bottom: 2rem;
        text-align: center;
        background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: 600;
        letter-spacing: -0.05em;
    }
    
    .lead {
        font-size: 1.25rem;
        text-align: center;
        max-width: 600px;
        margin: 0 auto 3rem;
        color: var(--text-primary);
        opacity: 0.9;
    }
    
    .steps {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        padding: 2rem;
    }
    
    .step {
        background: var(--card-bg);
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        border: 1px solid var(--accent-secondary);
        position: relative;
        overflow: hidden;
    }
    
    .step:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
    
    .step-icon {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        opacity: 0.8;
    }
    
    h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--accent-primary);
        position: relative;
        padding-bottom: 0.5rem;
    }
    
    h3::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 40px;
        height: 2px;
        background: var(--accent-secondary);
    }
    
    .step-description {
        color: var(--text-primary);
        opacity: 0.85;
        line-height: 1.6;
        font-size: 1rem;
    }
    
    @media (max-width: 768px) {
        .about-container {
            padding: 2rem 1rem;
        }
        
        h1 {
            font-size: 2.25rem;
        }
        
        .steps {
            grid-template-columns: 1fr;
            padding: 0;
        }
        
        .step {
            padding: 1.5rem;
        }
    }
</style>