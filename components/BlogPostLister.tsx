import { client } from '../sanity/lib/client';
import { groq } from 'next-sanity';
import { Post } from '../lib/interfaces';
// import BlogPostPreview from '@/components/BlogPostPreview';
import { ExpandableCard } from './ui/ExpandableCard';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import {PortableTextComponents} from '@portabletext/react'

interface ImageValue {
  asset: object;
  alt: string;
}

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

const ImageComponent = ({ value }: { value: ImageValue }) => {
  return <img src={urlFor(value.asset).url()} alt={value.alt} />;
};
const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => <ImageComponent value={value} />,
  },
};

export default async function BlogPostLister() {
  const posts = await client.fetch<Post[]>(blogQuery);

  // Instead of passing a function, we render the PortableText directly into the card object
  const cards = posts.map((post) => ({
    description: post.title,
    title: post.title,
    src: urlFor(post.mainImage).url(),
    ctaText: "View",
    ctaLink: `/posts/${post.slug.current}`,
    content: <PortableText value={post.body} components={components}/>//components={components} /> // Render the content here as JSX
  }));

  // console.log(posts[0].body);

  return (
    <div className="bg-background text-foreground">
      <ExpandableCard cards={cards} />
      <PortableText value={posts[0].body} components={components} />
    </div>
  );
}
