import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import dotenv from 'dotenv';
import mdx from "@astrojs/mdx";
dotenv.config();
const isProduction = process.env.BUILD_TYPE === 'production';
const docsUrl = isProduction ? 'https://docs.dataflow.zone' : 'https://docs-dataflow.netlify.app';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  integrations: [tailwind(), react(), mdx()],
  vite: {
    define: {
      'import.meta.env.VITE_DOCS_URL': JSON.stringify(docsUrl)
    }
  }
});