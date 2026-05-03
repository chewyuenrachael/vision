"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  T_MAX_EXTENDED,
  T_MAX_NORMAL,
  T_MIN,
  T_NOW,
  T_Q1,
  T_Q2,
  T_YEAR1,
  dateFromT,
  formatDate,
} from "@/lib/dates";
import { phaseFromT, phaseLabel } from "@/lib/phases";
import type { Phase, PhaseLabel } from "@/lib/types";

/**
 * Global timeline state. The spine of the artifact (SPEC §3).
 * One number, one phase, derived everywhere.
 */

interface TimelineContext {
  t: number; // days since May 1 2026
  setT: (t: number) => void;
  nudge: (deltaDays: number) => void;
  jumpTo: (phase: Phase) => void;
  phase: Phase;
  phaseLabel: PhaseLabel;
  dateLabel: string;
  extended: boolean;
  setExtended: (e: boolean) => void;
  max: number;
  min: number;
}

const Ctx = createContext<TimelineContext | null>(null);

export function TimelineProvider({ children }: { children: React.ReactNode }) {
  const [t, setTState] = useState<number>(T_NOW);
  const [extended, setExtended] = useState<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const pendingT = useRef<number | null>(null);

  const max = extended ? T_MAX_EXTENDED : T_MAX_NORMAL;

  const setT = useCallback(
    (next: number) => {
      const clamped = Math.max(T_MIN, Math.min(max, next));
      pendingT.current = clamped;
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (pendingT.current != null) {
          setTState(pendingT.current);
          pendingT.current = null;
        }
      });
    },
    [max],
  );

  // If the slider is collapsed back to normal range while t > T_MAX_NORMAL,
  // pull t back into range.
  useEffect(() => {
    if (!extended && t > T_MAX_NORMAL) setT(T_MAX_NORMAL);
  }, [extended, t, setT]);

  const nudge = useCallback(
    (delta: number) => setT(t + delta),
    [t, setT],
  );

  const jumpTo = useCallback(
    (phase: Phase) => {
      switch (phase) {
        case "now":
          setT(T_NOW);
          return;
        case "q1":
          setT(T_Q1);
          return;
        case "q2":
          setT(T_Q2);
          return;
        case "year1":
          setT(T_YEAR1);
          return;
        case "future":
          setExtended(true);
          setT(T_MAX_EXTENDED);
          return;
      }
    },
    [setT],
  );

  // Keyboard: ←/→ ±15 days, 1/2/3/4 jump to canonical stops, 5 jumps to 2030.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        nudge(-15);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nudge(15);
      } else if (e.key === "1") {
        jumpTo("now");
      } else if (e.key === "2") {
        jumpTo("q1");
      } else if (e.key === "3") {
        jumpTo("q2");
      } else if (e.key === "4") {
        jumpTo("year1");
      } else if (e.key === "5") {
        jumpTo("future");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nudge, jumpTo]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const phase = phaseFromT(t);

  const value = useMemo<TimelineContext>(
    () => ({
      t,
      setT,
      nudge,
      jumpTo,
      phase,
      phaseLabel: phaseLabel(phase),
      dateLabel: formatDate(dateFromT(t)),
      extended,
      setExtended,
      max,
      min: T_MIN,
    }),
    [t, setT, nudge, jumpTo, phase, extended, max],
  );

  return (
    <Ctx.Provider value={value}>
      <div data-phase={phase}>{children}</div>
    </Ctx.Provider>
  );
}

export function useTimeline(): TimelineContext {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTimeline must be used inside <TimelineProvider>");
  return v;
}
