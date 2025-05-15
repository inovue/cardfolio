import { defineConfig } from 'vite';
import honox from 'honox/vite';
import ssg from '@hono/vite-ssg';
import client from 'honox/vite/client';
import tailwindcss from '@tailwindcss/vite';

const entry = './app/server.ts';

export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? '/<repository-name>' : '/'; // リポジトリ名を指定
  if (mode === 'client') {
    return {
      base,
      plugins: [client()],
    };
  }
  return {
    base,
    build: {
      emptyOutDir: false,
    },
    plugins: [
      honox({
        client: {
          input: ['/app/style.css'],
        },
      }),
      ssg({ entry }),
      tailwindcss()
    ],
  };
});