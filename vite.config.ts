import { defineConfig } from 'vite';
import honox from 'honox/vite';
import ssg from '@hono/vite-ssg';
import client from 'honox/vite/client';
import tailwindcss from '@tailwindcss/vite';

const entry = './app/server.ts';

export default defineConfig(({ mode }) => {
  const base = process.env.NODE_ENV === 'production' ? '/cardfolio/' : '/'; // リポジトリ名を指定
  console.log('DEBUG VITE CONFIG (NODE_ENV):', { mode, base, NODE_ENV: process.env.NODE_ENV });

  return {
    base,
    build: {
      emptyOutDir: false,
    },
    plugins: [
      honox({
        client: { input: ['./app/style.css'] },
        devServer: {
          base: process.env.NODE_ENV === 'production' ? '/cardfolio/' : '/'
        }
      }),
      tailwindcss(),
      ssg({ entry }),
    ],
  };
});