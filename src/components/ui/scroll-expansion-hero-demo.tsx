'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

type MediaType = 'video' | 'image';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContentItem {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

type MediaContentCollection = Record<MediaType, MediaContentItem>;

const sampleMediaContent: MediaContentCollection = {
  video: {
    // Public 720p/10s test clip (~1 MB, loops cleanly).
    // Swap for your own CDN asset in real usage.
    src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
    poster:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1280&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
    title: 'Immersive Video Experience',
    date: 'Cosmic Journey',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with a video. As you scroll, the video expands to fill more of the screen, creating an immersive experience. This component is perfect for showcasing video content in a modern, interactive way.',
      conclusion:
        'The ScrollExpandMedia component provides a unique way to engage users with your content through interactive scrolling. Try switching between video and image modes to see different implementations.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop',
    title: 'Dynamic Image Showcase',
    date: 'Underwater Adventure',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with an image. The same smooth expansion effect works beautifully with static images, allowing you to create engaging visual experiences without video content.',
      conclusion:
        'The ScrollExpandMedia component works equally well with images and videos. This flexibility allows you to choose the media type that best suits your content while maintaining the same engaging user experience.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: MediaType }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
        About This Component
      </h2>
      <p className="text-lg mb-8 text-black dark:text-white">
        {currentMedia.about.overview}
      </p>

      <p className="text-lg mb-8 text-black dark:text-white">
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

/** Scroll to top and let any listening section reset itself. */
function useResetOnMount(dep?: unknown) {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event('resetSection'));
  }, [dep]);
}

export const VideoExpansionTextBlend = () => {
  const mediaType: MediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];
  useResetOnMount();

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansionTextBlend = () => {
  const mediaType: MediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];
  useResetOnMount();

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const VideoExpansion = () => {
  const mediaType: MediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];
  useResetOnMount();

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansion = () => {
  const mediaType: MediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];
  useResetOnMount();

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

const Demo = () => {
  const [mediaType, setMediaType] = useState<MediaType>('video');
  const currentMedia = sampleMediaContent[mediaType];
  useResetOnMount(mediaType);

  const toggleBase =
    'inline-flex min-h-11 cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400';

  return (
    <div className="min-h-screen">
      <div
        className="fixed top-4 right-4 z-50 flex gap-2"
        role="group"
        aria-label="Media type"
      >
        <button
          type="button"
          onClick={() => setMediaType('video')}
          aria-pressed={mediaType === 'video'}
          className={`${toggleBase} ${
            mediaType === 'video'
              ? 'bg-white text-black'
              : 'border border-white/30 bg-black/50 text-white hover:bg-black/70'
          }`}
        >
          Video
        </button>

        <button
          type="button"
          onClick={() => setMediaType('image')}
          aria-pressed={mediaType === 'image'}
          className={`${toggleBase} ${
            mediaType === 'image'
              ? 'bg-white text-black'
              : 'border border-white/30 bg-black/50 text-white hover:bg-black/70'
          }`}
        >
          Image
        </button>
      </div>

      <ScrollExpandMedia
        key={mediaType}
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export default Demo;
