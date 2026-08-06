"use client";

import { Component, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-[40vh] max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="text-sm text-muted-foreground">
            Refresh the page, or jump back home.
          </p>
          <Button asChild>
            <Link href="/">Back home</Link>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
