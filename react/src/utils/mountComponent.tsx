import React, { StrictMode, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from '../components/ErrorBoundary';

/**
 * mountComponent — Standard mount helper for all React entry points.
 *
 * Finds the container element by `data-react` attribute, wraps the
 * component in StrictMode + ErrorBoundary, and renders it.
 *
 * If the container is not found, fails silently (the page functions
 * without the React enhancement).
 *
 * @param name   - The data-react attribute value (e.g. "header")
 * @param element - The React element to render
 */
export function mountComponent(name: string, element: ReactNode): void {
  const container = document.querySelector<HTMLElement>(
    `[data-react="${name}"]`
  );

  if (!container) {
    // Container not present on this page — that's expected (not all pages
    // mount every component). Log at debug level for development diagnostics.
    if (typeof console !== 'undefined' && console.debug) {
      console.debug(`[mount:${name}] No container found — skipping`);
    }
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <ErrorBoundary name={name}>{element}</ErrorBoundary>
      </StrictMode>
    );
  } catch (error) {
    console.error(`[mount:${name}] Failed to mount:`, error);
  }
}
