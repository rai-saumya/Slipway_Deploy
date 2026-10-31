import { Anchor, CheckCircle2, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const USAGE = [
  { label: "CDN Requests", value: "1.6K", limit: "1M" },
  { label: "Edge Reads", value: "1.4K", limit: "1M" },
  { label: "Build Minutes", value: "42", limit: "500" },
];

const PROJECTS = [
  {
    name: "harbor-landing",
    domain: "harbor-landing.slipway.app",
    commit: "Initial commit from main",
    repo: "rai-saumya/harbor-landing",
    date: "Oct 29",
  },
  {
    name: "tide-api",
    domain: "tide-api.slipway.app",
    commit: "feat: add wallet session cache",
    repo: "rai-saumya/tide-api",
    date: "Oct 31",
  },
];

export function PreviewPanel() {
  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-chart-5/60" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-chart-3/60" aria-hidden="true" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              app.slipway.deploy
            </span>
          </div>

          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_1.3fr]">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-medium text-muted-foreground">Last 30 days</p>
              <ul className="mt-3 flex flex-col gap-3">
                {USAGE.map((row) => (
                  <li key={row.label} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{row.label}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {row.value} / {row.limit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              {PROJECTS.map((project) => (
                <div
                  key={project.name}
                  className="rounded-xl border border-border bg-background p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <Anchor className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">{project.name}</p>
                        <p className="text-xs text-muted-foreground">{project.domain}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <CheckCircle2 className="h-3 w-3" />
                      Ready
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <GitBranch className="h-3.5 w-3.5" />
                    <span>{project.commit}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {project.repo} · {project.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
