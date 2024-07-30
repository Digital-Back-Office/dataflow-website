import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.BUILD_TYPE === 'production';

const docsUrl = isProduction
? 'https://docs.dataflow.zone'
: 'https://docs-dataflow.netlify.app';

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [tailwind(), react()],
  vite: {
    define: {
      'import.meta.env.VITE_DOCS_URL': JSON.stringify(docsUrl),
    },
  },
});
