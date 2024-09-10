import { client } from '../sanity/lib/client';
import { groq } from 'next-sanity';
import { Button } from "@/components/ui/button"

const blogQuery = groq`
  *[_type == "post"]{
    _id,
    title,
    slug,
    publishedAt,
    body
  } | order(publishedAt desc)
`;

export default async function Home() {
  const response = await client.fetch(blogQuery);
  const posts = response;

  return (
<div className="bg-background text-foreground" >

      blog
      
      {posts.map((post: any) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <div>{post.publishedAt}</div>
          {/* <p>{post.body}</p> */}
        </div>
      ))}
      <Button variant="outline">Click me</Button>
    </div>
  );
}

