import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { PreviewPanel } from "@/components/landing/preview-panel";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PreviewPanel />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
