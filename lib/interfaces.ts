import { PortableTextBlock } from '@portabletext/types';

export interface Card {
  description: string;
  title: string;
  src: string[];
  ctaText: string;
  ctaLink: string;
  // content: JSX.Element;
  categories: {
    slug: string;
    title: string;
    _key: string;
  }[];
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  images: Array<{
    asset: { url: string };
    alt?: string;
  }>;
  publishedAt: string;
  // body: PortableTextBlock[];
  description: string;
  categories: {
    slug: string;
    title: string;
    _key: string;
  }[];
}

export interface FullProject extends Post {
  body: PortableTextBlock[];
  githubLink: string;
  link: string;
  highlighted: boolean;
}