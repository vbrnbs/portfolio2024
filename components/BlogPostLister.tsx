import { client } from '../sanity/lib/client';
import { groq } from 'next-sanity';
import { Post } from '../lib/interfaces';
// import BlogPostPreview from '@/components/BlogPostPreview';
import { ExpandableCard } from './ui/ExpandableCard';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

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
      <PortableText value={posts[0].body} />
      {/* <img src={urlFor(posts[0].mainImage).width(200).flipHorizontal().url()} alt={posts[0].title}  /> */}
      {/* {posts.map((post) => (
        <BlogPostPreview key={post._id} post={post} />
      ))} */}
    </div>
  );
}
