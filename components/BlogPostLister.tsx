import { client } from '../sanity/lib/client';
import { groq } from 'next-sanity';
import { Post } from '../lib/interfaces';
import BlogPostPreview from '@/components/BlogPostPreview';
import { ExpandableCard } from './ui/ExpandableCard';
import { urlFor } from '@/sanity/lib/image';
import { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';

// const components = {
//   types: {
//     image: ({ value }) => <img src={value.url} alt={value.alt} />,
//   },
//   marks: {
//     link: ({ children, value }) => (
//       <a href={value.href} target="_blank" rel="noopener noreferrer">
//         {children}
//       </a>
//     ),
//   },
// };

// const components = {
//   types: {
//     code: (props: { node: { language: any; code: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | Iterable<ReactNode> | null | undefined; }; }) => (
//       <pre data-language={props.node.language}>
//         <code>{props.node.code}</code>
//       </pre>
//     )
//   }
// }
const blogQuery = groq`
  *[_type == "post"]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body
  } | order(publishedAt desc)
`;

export default async function BlogPostLister() {
  const posts = await client.fetch<Post[]>(blogQuery);

  // Instead of passing a function, we render the PortableText directly into the card object
  const cards = posts.map((post) => ({
    description: post.title,
    title: post.title,
    src: urlFor(post.mainImage).url() as string,
    ctaText: "View",
    ctaLink: `/posts/${post.slug.current}`,
    content: <PortableText value={post.body} />//components={components} /> // Render the content here as JSX
  }));

  return (
    <div className="bg-background text-foreground">
      <ExpandableCard cards={cards} />
      {/* <img src={urlFor(posts[0].mainImage).width(200).flipHorizontal().url()} alt={posts[0].title}  /> */}
      {/* {posts.map((post) => (
        <BlogPostPreview key={post._id} post={post} />
      ))} */}
    </div>
  );
}
