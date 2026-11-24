"use client";

import { Component } from "react";

/** Keeps the rest of the page usable when the browser cannot draw 3D. */
export class SceneBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="flex h-full items-center justify-center p-6 text-center text-sm text-[var(--ink-soft)]">
          Your browser could not show the 3D view. Everything else on this page still works.
        </p>
      );
    }
    return this.props.children;
  }
}
