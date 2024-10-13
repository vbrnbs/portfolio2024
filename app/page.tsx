import BlogPostFilter from "@/components/BlogPostFilter";
import { Post } from "@/lib/interfaces";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from 'next-sanity';
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

export default async function Home() {
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
    <BlogPostFilter cards={cards} />
  );
}

