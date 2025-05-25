<script lang="ts">
    import { setAuth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import type { User } from '$lib/types/auth';
    
    let username = '';
    let password = '';
    let isLoading = false;
    let error = '';
    
    async function handleLogin(event: Event): Promise<void> {
        event.preventDefault();
        
        if (!username || !password) {
            error = 'Please enter both username and password';
            return;
        }
        
        isLoading = true;
        error = '';
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // Important for cookies
            });
            
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Login failed');
            }

            // getting user data from server response
            const { user }: { user: User } = await response.json();
            
            // updating auth store with server-provided user
            setAuth(user);
            goto('/');
        } catch (err) {
            error = err instanceof Error ? err.message : 'Login failed';
            console.error('Login error:', err);
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="login-container">
    <h1>Welcome Back</h1>
    
    {#if error}
        <p class="error">{error}</p>
    {/if}
    
    <form on:submit|preventDefault={handleLogin}>
        <div class="form-group">
            <label for="username">Username</label>
            <input 
                id="username" 
                type="text" 
                bind:value={username}
                required
                autocomplete="username"
                placeholder="user"
            />
        </div>
        
        <div class="form-group">
            <label for="password">Password</label>
            <input 
                id="password" 
                type="password" 
                bind:value={password}
                required
                autocomplete="current-password"
                placeholder="password"
            />
        </div>
        
        <button type="submit" disabled={isLoading} class:loading={isLoading}>
            {#if isLoading}
                <span class="spinner"></span>
            {:else}
                Login
            {/if}
        </button>
    </form>
</div>

<style>
    .login-container {
        max-width: 510px; 
        width: 80%; 
        margin: 2rem auto;
        padding: 3rem; 
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(12px);
        border-radius: 1rem;
        box-shadow: 0 8px 32px var(--shadow-light);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    h1 {
        font-family: 'Satoshi', sans-serif;
        font-size: 1.9rem;
        text-align: center;
        margin-bottom: 2.5rem;
        color: var(--text-primary);
    }
    
    .error {
        color: #ef4444;
        text-align: center;
        margin-bottom: 1.5rem;
        padding: 0.75rem;
        background: rgba(239, 68, 68, 0.1);
        border-radius: 0.5rem;
        font-family: 'Satoshi', sans-serif;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: var(--text-primary);
        font-family: 'Satoshi', sans-serif;
    }
    
    input {
        width: 90%;
        padding: 1rem 1rem;
        border: 2px solid var(--accent-secondary);
        border-radius: 0.5rem;
        font-size: 1rem;
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
        transition: border-color 0.2s ease;
    }
    
    input:focus {
        outline: none;
        border-color: var(--accent-primary);
    }
    
    button {
        width: 100%;
        padding: 1rem;
        margin-top: 0.5rem;
        background: var(--accent-primary);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: 'Satoshi', sans-serif;
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

    
</style>