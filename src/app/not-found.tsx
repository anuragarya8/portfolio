import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        That route doesn’t exist. Head back home or browse projects.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/projects">Projects</Link>
        </Button>
      </div>
    </div>
  );
}
