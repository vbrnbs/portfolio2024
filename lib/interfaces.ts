// import { SchemaTypeDefinition } from 'sanity';
// // import { blockContentType } from '../sanity/schemaTypes/blockContentType';
// export interface Post {
//     _id: string;
//     title: string;
//     slug: {
//       current: string;
//     };
//     mainImage?: {
//       asset: {
//         _ref: string;
//         _type: 'reference';
//       };
//       alt?: string;
//     };
//     categories?: {
//       _type: 'reference';
//       _ref: string;
//     }[];
//     publishedAt?: string;
//     body: SchemaTypeDefinition; // Assuming 'blockContent' is a custom type, replace 'any' with the actual type if available
//     author: {
//       _type: 'reference';
//       _ref: string;
//     };
//   }
  
  // lib/interfaces.ts
import { PortableTextBlock } from '@portabletext/types';

export interface Card {
  description: string;
  title: string;
  src: string[];
  ctaText: string;
  ctaLink: string;
  githubLink: string;
  link: string;
  content: JSX.Element;
  highlighted: boolean;
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
  body: PortableTextBlock[];
  highlighted: boolean;
  iframeSrc: string;
  description: string;
  githubLink: string;
  link: string;
}
