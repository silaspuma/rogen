import React from 'react';
import Head from 'next/head';

/**
 * _document.tsx - Next.js Document
 * Custom HTML document for the application
 */
import { Html, Head as NextHead, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Create Roblox games with AI. Type your idea, get instant game files. Free tier available."
        />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><text y='32' font-size='32'>🎮</text></svg>" />
      </NextHead>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
