import { client } from '../sanity/lib/client';
import { groq } from 'next-sanity';
import { Post } from '../lib/interfaces';
import BlogPostPreview from '@/components/BlogPostPreview';
import { ExpandableCard } from './ui/ExpandableCard';


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
    const response = await client.fetch(blogQuery);
    const posts = response;
    console.log(posts)
  
    return (
  <div className="bg-background text-foreground"> 
        {posts.map((post: Post) => (
          <>
            <BlogPostPreview key={post._id} post={post} />
            <ExpandableCard key={post._id} />
          </>
          
        ))}
      </div>
    );
  }
  

