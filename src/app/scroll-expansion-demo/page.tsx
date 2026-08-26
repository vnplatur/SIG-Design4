import type { Metadata } from 'next';
import ScrollExpansionDemo from '@/components/ui/scroll-expansion-hero-demo';

export const metadata: Metadata = {
  title: 'Scroll Expansion Hero — Demo | Smart Investment Gateway',
  description:
    'Interactive demo of the ScrollExpandMedia hero: media expands from a card to full-bleed as you scroll.',
  robots: 'noindex, nofollow',
};

export default function ScrollExpansionDemoPage() {
  return <ScrollExpansionDemo />;
}
