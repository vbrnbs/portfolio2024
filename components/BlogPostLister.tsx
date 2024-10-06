import { client } from '../sanity/lib/client';
import { groq } from 'next-sanity';
import { Post } from '../lib/interfaces';
// import BlogPostPreview from '@/components/BlogPostPreview';
import { ExpandableCard } from './ui/ExpandableCard';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import {PortableTextComponents} from '@portabletext/react'
import Image from 'next/image';


interface ImageValue {
  asset: object;
  alt: string;
}


const blogQuery = groq`
  *[_type == "post"]{
    _id,
    title,
    slug,
    images,
    publishedAt,
    body,
    highlighted,
    iframeSrc
  } | order(publishedAt desc)
`;



const ImageComponent = ({ value }: { value: ImageValue }) => {
  return <Image 
  src={urlFor(value.asset).url()} alt={value.alt} 
  // layout="fill"
  // objectFit="cover" 
  width={500}
  height={500}
  />;
};
const EmbedHTML = ({ value }: { value: { html: string } }) => (
  <div dangerouslySetInnerHTML={{ __html: value.html }} />
)


export const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => <ImageComponent value={value} />,
    embedHTML: EmbedHTML,
  },
  
};

export default async function BlogPostLister() {
  const posts = await client.fetch<Post[]>(blogQuery);

  // Instead of passing a function, we render the PortableText directly into the card object
  const cards = posts.map((post) => ({
    description: post.title,
    title: post.title,
    src: post.images.map(image => urlFor(image.asset).url()),
    ctaText: "View",
    ctaLink: `/projects/${post.slug.current}`,
    highlighted: post.highlighted,
    iframe: post.iframeSrc,
    content: <PortableText value={post.body} components={components}/>//components={components} /> // Render the content here as JSX
  }));

  console.log(posts[0].title, ': ', posts[0].iframeSrc);

  return (
    <div className="bg-background text-foreground">
      <ExpandableCard cards={cards} />
    </div> 
  );
}
