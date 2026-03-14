import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  /** Name of the component being wrapped (used in error logs) */
  name: string;
  /** Fallback UI to render when an error is caught */
  fallback?: ReactNode;
  /** Children to wrap */
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary — Catches rendering errors in React component trees.
 *
 * Wraps individual mount-point components so a failure in one
 * (e.g. Carousel) does not tear down unrelated UI (e.g. Footer).
 *
 * Usage:
 *   <ErrorBoundary name="carousel">
 *     <Carousel />
 *   </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log to console with component name for traceability
    console.error(
      `[ErrorBoundary:${this.props.name}] Rendering failed:`,
      error,
      info.componentStack
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, render it; otherwise render nothing
      // (the static HTML underneath remains visible)
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
