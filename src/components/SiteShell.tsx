import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { StickyCallBar } from "@/components/StickyCallBar";

export function SiteShell({
  children,
  bare = false,
}: {
  children: ReactNode;
  bare?: boolean;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-charcoal text-fg">
      <LocalBusinessJsonLd />
      {bare ? null : <Navbar />}
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      {bare ? null : <Footer />}
      <StickyCallBar />
    </div>
  );
}
