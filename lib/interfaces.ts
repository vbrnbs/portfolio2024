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

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: {
    asset: { url: string };
  };
  publishedAt: string;
  body: PortableTextBlock[];
}
