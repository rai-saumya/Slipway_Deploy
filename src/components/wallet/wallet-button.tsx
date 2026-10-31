"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useWallet } from "@/components/wallet/wallet-provider";
import { truncateAddress } from "@/lib/wallets";
import { SignInModal } from "@/components/wallet/sign-in-modal";
import { MetaMaskIcon, BackpackIcon } from "@/components/wallet/wallet-icons";

export function WalletButton() {
  const [open, setOpen] = useState(false);
  const { metamask, backpack, activeWallet, disconnect } = useWallet();

  const connected =
    activeWallet === "metamask"
      ? metamask
      : activeWallet === "backpack"
        ? backpack
        : null;

  if (connected && activeWallet) {
    const Icon = activeWallet === "metamask" ? MetaMaskIcon : BackpackIcon;
    return (
      <div className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-1.5">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <Icon className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <span className="font-mono text-xs text-foreground">
          {connected.address ? truncateAddress(connected.address) : ""}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full"
          aria-label={`Disconnect ${activeWallet}`}
          onClick={() => disconnect(activeWallet)}
        >
          <LogOut className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Sign in
      </Button>
      <SignInModal open={open} onOpenChange={setOpen} />
    </>
  );
}
