declare module '*.svg?react' {
  import React = require('react');
  const src: React.FC<React.SVGProps<SVGSVGElement>>;
  export default src;
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_API_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_ID: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
}

declare global {
  namespace NodeJS {
    interface ImportMeta {
      readonly env: ImportMetaEnv;
    }
  }
}
