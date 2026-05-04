"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SceneTag } from "@/components/ui/SceneTag";

const HINT_KEY = "vision_keyboard_hint_seen";

/**
 * Hero. SPEC §11.1.
 * Three lines. The third is the call to action — no button.
 */
export function Hero() {
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);

  // Client-only read: avoids SSR localStorage; pattern triggers strict lint without
  // useSyncExternalStore because dismissal is same-tab only (no storage event).
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional client hydration guard for localStorage
      setShowKeyboardHint(!window.localStorage.getItem(HINT_KEY));
    } catch {
      setShowKeyboardHint(true);
    }
  }, []);

  useEffect(() => {
    if (!showKeyboardHint) return;
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (!e.isIntersecting && e.boundingClientRect.top < 0) {
          try {
            window.localStorage.setItem(HINT_KEY, "1");
          } catch {
            /* ignore */
          }
          setShowKeyboardHint(false);
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, [showKeyboardHint]);

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-72px)] items-center px-6 pb-16 pt-12 sm:pt-20">
      <SceneTag />

      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="font-body text-sm uppercase tracking-[0.22em] text-ink-mute">
            Cursor Campus · vision artifact
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.25rem)] font-light leading-[1.02] tracking-tight text-ink">
            Reimagine what students will build.
          </h1>

          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-ink-soft sm:text-xl">
            The next generation of engineers is in a lab right now, choosing the
            tool they’ll use for the next decade. This is the world we’re
            building for them — and with them.
          </p>

          <div className="mt-12 flex items-baseline gap-3">
            <motion.span
              className="font-hand text-2xl text-terracotta sm:text-3xl"
              animate={{ y: [-1, 1, -1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              drag the slider
            </motion.span>
            <motion.svg
              width="64"
              height="20"
              viewBox="0 0 64 20"
              className="text-terracotta"
              aria-hidden
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M2 14 C 14 8, 28 6, 44 8 L 56 8 M 50 3 L 58 9 L 50 14"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>

          {showKeyboardHint ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-2 font-body text-xs text-ink-mute"
            >
              Or use ← → on your keyboard. 1·2·3·4 jump to canonical stops.
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
