import { defineConfig } from 'vite';
import honox from 'honox/vite';
import ssg from '@hono/vite-ssg';
import client from 'honox/vite/client';
import tailwindcss from '@tailwindcss/vite';

const entry = './app/server.ts';

export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? '/cardfolio/' : '/'; // リポジトリ名を指定
  if (mode === 'client') {
    return {
      base,
      build: {
        rollupOptions: {
          input: ['/app/style.css'],
          output: {
            assetFileNames: 'app/[name].[ext]',
          },
        },
      },
      plugins: [client()],
    };
  }
  return {
    base,
    build: {
      emptyOutDir: false,
    },
    plugins: [
      honox(),
      tailwindcss(),
      ssg({ entry }),
    ],
  };
});