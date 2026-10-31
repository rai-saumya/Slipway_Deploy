"use client";

import { useState } from "react";
import { ArrowRight, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInModal } from "@/components/wallet/sign-in-modal";

export function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-10 sm:px-6 sm:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-10rem] -z-10 flex justify-center"
      >
        <div className="h-[28rem] w-[56rem] rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <Waves className="h-3.5 w-3.5 text-primary" />
          Now signing in with MetaMask &amp; Backpack
        </span>

        <h1 className="mt-6 w-full text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
          Deploy at the speed of the tide.
        </h1>

        <p className="mt-5 w-full max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          Slipway Deploy ships your frontend from commit to edge in seconds —
          sign in with the wallet you already trust, no passwords required.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="h-11 px-6 text-sm" onClick={() => setOpen(true)}>
            Sign in
            <ArrowRight className="h-4 w-4" data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 px-6 text-sm"
            nativeButton={false}
            render={<a href="#features" />}
          >
            See how it works
          </Button>
        </div>
      </div>

      <SignInModal open={open} onOpenChange={setOpen} />
    </section>
  );
}
