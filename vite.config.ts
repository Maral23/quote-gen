import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import path from 'path';

const projectRoot = path.resolve(__dirname);

export default defineConfig(({ mode }) => {
  // Load env variables based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [sveltekit()],
    server: {
      fs: {
        allow: [
          projectRoot,
          path.join(projectRoot, '.svelte-kit'),
          path.join(projectRoot, 'node_modules'),
          path.join(projectRoot, 'src')
        ]
      }
    },
    // Properly expose environment variables to your application
    define: {
      'process.env.JWT_SECRET': JSON.stringify(env.JWT_SECRET),
      'process.env.NODE_ENV': JSON.stringify(mode)
    }
  };
});