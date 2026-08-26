import Navbar from '@/components/layout/Navbar';
import ScrollHero from '@/components/sections/ScrollHero';
import StrategicIntro from '@/components/sections/StrategicIntro';
import ClientsCoverflow from '@/components/sections/ClientsCoverflow';
import Services from '@/components/sections/Services';
import Statistics from '@/components/sections/Statistics';
import Workshops from '@/components/sections/Workshops';
import Leadership from '@/components/sections/Leadership';
import LatestNews from '@/components/sections/LatestNews';
import Footer from '@/components/layout/Footer';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* The hero drives its own scroll-expand and pins scrollY at 0 until it
          finishes, so it stays outside the pinned stack. */}
      <ScrollHero />

      <FlowArt aria-label="Smart Investment Gateway story">
        <FlowSection aria-label="What we do">
          <StrategicIntro />
        </FlowSection>
        
        {/* Not pinned: Services runs its own sticky stacking-card scroll over
            ~4500px, and nested pinning fights it. */}
        <FlowSection aria-label="Our services" pin={false}>
          <Services />
        </FlowSection>

        <FlowSection aria-label="Our clients">
          <ClientsCoverflow />
        </FlowSection>


        <FlowSection aria-label="Why choose us">
          <Statistics />
        </FlowSection>

        <FlowSection aria-label="Training and workshops">
          <Workshops />
        </FlowSection>


        <FlowSection aria-label="Latest news">
          <LatestNews />
        </FlowSection>
        <FlowSection aria-label="Our leadership">
          <Leadership />
        </FlowSection>
      </FlowArt>

      {/* Outside FlowArt on purpose: sticky panels stay pinned until their
          container's bottom edge, so a footer inside the stack never gets the
          viewport to itself — the last panel stays stuck over it. */}
      <Footer />
    </main>
  );
}
