import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * This file is web-only and used to configure the root HTML for every web page during static rendering.
 * The contents of this function only run in Node.js environments and do not have access to the DOM or browser APIs.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="BoDPUnMmS1KwYZFF_uPhK8q1DoNowT8jACbvUiQk62s" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Learn Pitman Shorthand with AI-powered recognition. Master strokes, shortforms, phrases, and outlines with instant feedback. Free and premium lessons available." />
        <meta name="keywords" content="pitman shorthand, shorthand learning, AI shorthand, shorthand app, stenography, speed writing, learn shorthand online" />
        <meta name="author" content="Shorthand Simplified" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tmaenge-dot.github.io/shorthand-simplified/" />
        <meta property="og:title" content="Shorthand Simplified - AI-Powered Pitman Shorthand Learning" />
        <meta property="og:description" content="Learn Pitman Shorthand with AI-powered recognition. Master strokes, shortforms, phrases, and outlines with instant feedback." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tmaenge-dot.github.io/shorthand-simplified/" />
        <meta property="twitter:title" content="Shorthand Simplified - AI-Powered Pitman Shorthand Learning" />
        <meta property="twitter:description" content="Learn Pitman Shorthand with AI-powered recognition. Master strokes, shortforms, phrases, and outlines." />

        <ScrollViewStyleReset />
        
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
