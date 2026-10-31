import { Anchor } from "lucide-react";
import { WalletButton } from "@/components/wallet/wallet-button";

const NAV_LINKS = [
  { label: "Product", href: "#features" },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Anchor className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">Slipway Deploy</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <WalletButton />
      </div>
    </header>
  );
}
