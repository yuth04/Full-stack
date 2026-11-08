"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass, Home, Search, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-12 text-center">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[350px] w-[350px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-md">
        {/* Floating 404 Badge */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-muted/50 p-4 shadow-inner outline outline-1 outline-border/50 backdrop-blur-sm">
          <span className="text-4xl font-extrabold tracking-tighter text-primary">
            404
          </span>
        </div>

        {/* Header Content */}
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
          Lost in Space
        </p>
        
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or perhaps the URL was mistyped.
        </p>

        {/* Primary Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 size-4" />
            Go back
          </Button>

          <Button asChild size="lg" className="w-full sm:w-auto shadow-sm">
            <Link className="flex" href="/dashboard">
              <Home className="mr-2 size-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>


      </div>
    </main>
  );
}