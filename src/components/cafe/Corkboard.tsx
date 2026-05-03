"use client";

import { useEffect, useRef, useState } from "react";
import { Polaroid } from "./Polaroid";
import { WALL_POLAROIDS } from "@/data/wall-polaroids";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import { isVisibleAt } from "@/lib/phases";

/**
 * Corkboard layer over the cafe SVG. Polaroids are positioned in % within the
 * corkboard region; an absolutely-positioned div sits at the same coordinates
 * as the <rect> drawn in CafeBackground (x:280, y:40, w:300, h:160) but in
 * fractional terms so it follows responsive sizing.
 */

interface Props {
  highlightedBubbleId: string | null;
  setHighlightedBubbleId: (id: string | null) => void;
}

export function Corkboard({
  highlightedBubbleId,
  setHighlightedBubbleId,
}: Props) {
  const { phase } = useTimeline();
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const visible = WALL_POLAROIDS.filter((p) => isVisibleAt(p.firstVisibleAt, phase));

  return (
    <div
      ref={ref}
      className="absolute pointer-events-none"
      style={{
        left: "28%",
        top: `${(40 / 700) * 100}%`,
        width: "30%",
        height: `${(160 / 700) * 100}%`,
      }}
      aria-label="Cafe corkboard"
    >
      {visible.map((p) => (
        <Polaroid
          key={p.id}
          polaroid={p}
          highlight={highlightedBubbleId === p.bubbleId}
          onEnter={() => setHighlightedBubbleId(p.bubbleId)}
          onLeave={() => setHighlightedBubbleId(null)}
          containerSize={size}
        />
      ))}
    </div>
  );
}
