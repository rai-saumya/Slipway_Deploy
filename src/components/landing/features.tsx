import { Wallet, Zap, GitBranch, Radar } from "lucide-react";

const FEATURES = [
  {
    icon: Wallet,
    title: "Wallet-native sign-in",
    description: "Connect with MetaMask or Backpack. No passwords, no email links.",
  },
  {
    icon: Zap,
    title: "Instant global edge",
    description: "Every deploy ships to the edge in seconds, close to your users.",
  },
  {
    icon: GitBranch,
    title: "Git-connected",
    description: "Push to a branch, get a preview URL. Merge to ship production.",
  },
  {
    icon: Radar,
    title: "Live build logs",
    description: "Watch every build stream in real time, start to finish.",
  },
];

export function Features() {
  return (
    <section id="features" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to ship
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            A deploy platform built for teams that would rather sign a message
            than remember a password.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-ring/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-sm font-medium">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
