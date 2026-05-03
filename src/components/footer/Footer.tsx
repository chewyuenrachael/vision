"use client";

import { useState } from "react";
import { AboutModal } from "./AboutModal";

/**
 * Footer. SPEC §9.
 * Three links: Beacon (the operating system), 30-60-90 plan, About this
 * artifact. The proof layer.
 */

export function Footer() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <footer className="border-t border-ink/15 bg-cream-warm/60 px-4 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="font-display text-lg tracking-tight text-ink">
            Cursor Campus Vision
          </div>
          <div className="font-body text-xs text-ink-mute">
            Rachael Chew · 30-60-90 anchor
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 font-body text-sm text-ink">
          <a
            href="https://beacon-campus.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-1 underline-offset-4 hover:underline"
          >
            <span className="font-display text-base tracking-tight">
              Beacon
            </span>
            <span className="text-terracotta transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#hero"
            className="group inline-flex items-baseline gap-1 underline-offset-4 hover:underline"
          >
            <span>30-60-90 plan</span>
          </a>
          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            className="inline-flex items-baseline gap-1 underline-offset-4 hover:underline"
          >
            About this artifact
          </button>
        </nav>
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </footer>
  );
}
