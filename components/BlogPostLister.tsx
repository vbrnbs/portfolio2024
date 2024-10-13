import { client } from '../sanity/lib/client';
import { groq } from 'next-sanity';
import { Post } from '../lib/interfaces';
// import BlogPostPreview from '@/components/BlogPostPreview';
import { ExpandableCard } from './ui/ExpandableCard';
import { urlFor } from '@/sanity/lib/image';
// import { PortableText } from '@portabletext/react';
import {PortableTextComponents} from '@portabletext/react'
import Image from 'next/image';
import { Button } from './ui/button';


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
    description,
    categories[] -> {
      title,
      slug
    }
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

  const cards = posts.map((post) => ({
    description: post.description,
    title: post.title,
    src: post.images.map(image => urlFor(image.asset).url()),
    ctaText: "View",
    ctaLink: `/projects/${post.slug.current}`,
    categories: post.categories,
    // content: <PortableText value={post.body} components={components}/>//components={components} /> // Render the content here as JSX
  }));


  return (
    <div className="bg-background text-foreground">
      <div className="flex flex-wrap gap-2 p-4">
        {Array.from(new Set(cards.flatMap(card => card.categories.map(category => category.title)))).map((category, index) => (
          <Button 
            key={index} 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            // onClick={() => console.log(`Filter by category: ${category}`)} // Replace with actual filter function
          >
            {category}
          </Button>
        ))}
      </div>
      <ExpandableCard cards={cards} />
    </div> 
  );
}
