"use client";

import { useEffect, useMemo } from "react";
import { CheckCircle2, Loader2, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  isBackpackInstalled,
  isMetaMaskInstalled,
  truncateAddress,
  WALLET_INSTALL_URLS,
  WALLET_LABELS,
  type WalletId,
} from "@/lib/wallets";
import { useWallet } from "@/components/wallet/wallet-provider";
import { MetaMaskIcon, BackpackIcon } from "@/components/wallet/wallet-icons";

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WALLET_META: Record<
  WalletId,
  { icon: typeof MetaMaskIcon; description: string }
> = {
  metamask: { icon: MetaMaskIcon, description: "Connect with your Ethereum wallet" },
  backpack: { icon: BackpackIcon, description: "Connect with your Solana wallet" },
};

export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const { metamask, backpack, connect } = useWallet();

  const installed = useMemo(() => {
    if (!open) return { metamask: false, backpack: false };
    return { metamask: isMetaMaskInstalled(), backpack: isBackpackInstalled() };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (metamask.status === "signed-in" || backpack.status === "signed-in") {
      const timer = setTimeout(() => onOpenChange(false), 1100);
      return () => clearTimeout(timer);
    }
  }, [open, metamask.status, backpack.status, onOpenChange]);

  const states: Record<WalletId, typeof metamask> = { metamask, backpack };
  const busy = metamask.status === "connecting" || metamask.status === "signing" ||
    backpack.status === "connecting" || backpack.status === "signing";

  const handleClick = (wallet: WalletId) => {
    if (!installed[wallet]) {
      window.open(WALLET_INSTALL_URLS[wallet], "_blank", "noopener,noreferrer");
      return;
    }
    void connect(wallet);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Sign in to Slipway Deploy</DialogTitle>
          <DialogDescription>
            Connect a wallet to deploy, manage projects, and track your builds.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-2">
          {(Object.keys(WALLET_META) as WalletId[]).map((wallet) => {
            const { icon: Icon, description } = WALLET_META[wallet];
            const state = states[wallet];
            const isSignedIn = state.status === "signed-in";
            const isLoading = state.status === "connecting" || state.status === "signing";
            const label = WALLET_LABELS[wallet];

            return (
              <Button
                key={wallet}
                type="button"
                variant="outline"
                size="lg"
                disabled={busy && !isLoading}
                onClick={() => handleClick(wallet)}
                className="h-auto w-full justify-start gap-3 px-4 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex flex-1 flex-col items-start text-left">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-xs text-muted-foreground">
                    {isSignedIn && state.address
                      ? `Signed in · ${truncateAddress(state.address)}`
                      : !installed[wallet]
                        ? "Not installed"
                        : description}
                  </span>
                </span>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
                ) : isSignedIn ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                ) : !installed[wallet] ? (
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : null}
              </Button>
            );
          })}
        </div>

        <p className="pt-1 text-center text-xs text-muted-foreground">
          By continuing, you agree to sign a free message to verify wallet ownership.
          No transaction, no gas.
        </p>
      </DialogContent>
    </Dialog>
  );
}
