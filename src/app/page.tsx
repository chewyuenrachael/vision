import { TimelineProvider } from "@/components/timeline/TimelineProvider";
import { TimelineSlider } from "@/components/timeline/TimelineSlider";
import { Hero } from "@/components/hero/Hero";
import { Cafe } from "@/components/cafe/Cafe";
import { ThemedWeekWall } from "@/components/themed-weeks/ThemedWeekWall";
import { SamWeek } from "@/components/sam/SamWeek";
import { FeedbackLoopScene } from "@/components/feedback/FeedbackLoop";
import { Counterfactual } from "@/components/counterfactual/Counterfactual";
import { Footer } from "@/components/footer/Footer";

export default function Page() {
  return (
    <TimelineProvider>
      <TimelineSlider />
      <main className="snap-scroll">
        <section id="hero" className="scene-snap">
          <Hero />
        </section>
        <Cafe />
        <ThemedWeekWall />
        <SamWeek />
        <FeedbackLoopScene />
        <Counterfactual />
      </main>
      <Footer />
    </TimelineProvider>
  );
}
