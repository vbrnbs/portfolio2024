import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import './styles.css'
import { components } from '@/components/BlogPostLister'
import { ImageValue } from 'sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

type Props = {
  params: { slug: string }
}

const blogQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    images,
    publishedAt,
    body,
    highlighted,
    iframeSrc
  }
`;

// ... existing imports ...

export default async function BlogPost({ params }: Props) {
  const slug = params.slug
  const post = await client.fetch(blogQuery, { slug })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="px-2">
      <header>
        <h1 className='text-4xl font-bold'>{post.title}</h1>
        <p>Published on: {new Date(post.publishedAt).toLocaleDateString()}</p>
      </header>
      {post.iframeSrc && (
        <div>
          <iframe src={post.iframeSrc} width="100%" height="400" frameBorder="0"></iframe>
        </div>
      )}
    
      {post.images && post.images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {post.images.map((image: ImageValue, index: number) => (
            <div key={index} className="aspect-square relative">
              <Image
                src={urlFor(image.asset as SanityImageSource).url()}
                alt={`${post.title} - Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      )}

      <div>
        <PortableText value={post.body} components={components} />
      </div>

      
    </div>
  )
}
