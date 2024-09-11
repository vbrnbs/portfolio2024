import Link from 'next/link';
import { BlogPost } from '../lib/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

type BlogPostPreviewProps = {
  post: BlogPost;
};

/**
 * A preview of a blog post.
 *
 * @param post - The blog post to be previewed.
 * @returns A `div` element with class `blog-post-preview` containing the
 * title of the post as a link, the publication date, and the excerpt.
 */

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({ post }) => {
  return (
    <div className="blog-post-preview">
      <h2>
        <Link href={`/posts/${post.slug.current}`}>
          {post.title}
        </Link>
      </h2>
      <Image
        className="h-auto w-full"
        width={2000}
        height={1000}
        alt=""
        src={urlFor(post.mainImage?.asset ?? {}).height(1000).width(2000).url()}
        sizes="100vw"
        priority
      />
      {/* <p>Published on {new Date(post.publishedAt).toLocaleDateString()}</p> */}
      {/* <p>{post.body}</p> */}
    </div>
  );
};

export default BlogPostPreview;
