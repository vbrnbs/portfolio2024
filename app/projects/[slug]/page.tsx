import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import './styles.css'
// import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { CarouselDemo } from '@/components/Carousel'

// import { useTheme } from "next-themes"


interface ImageValue {
  asset: object;
  alt: string;
}


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


const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => <ImageComponent value={value} />,
    embedHTML: EmbedHTML,
  },
};

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


export default async function BlogPost({ params }: Props) {
  const slug = params.slug
  const post = await client.fetch(blogQuery, { slug })
  
  // const { theme } = useTheme();

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="px-2">
      <header>
        <h1 className='text-4xl font-bold'>{post.title}</h1>
        <p className='w-full flex justify-end mx-2'>Published on: {new Date(post.publishedAt).toLocaleDateString()}</p>
      </header>
      <div className='flex justify-center my-4'>
        <iframe 
          src={post.iframeSrc}
          // style={{ width: "100%", height: "100%", border: "none", /*backgroundColor: theme === "dark" ? "blue" : "yellow"*/ }} 
          // className='rounded'
          width="640"
          height="360"

        ></iframe>
      </div>

      {/* <ImageGallery items={images} /> */}
      <div className="flex w-full justify-center">
        <CarouselDemo images={post.images}/>
      </div>
      
      


      {/* {post.images && post.images.length > 0 && (
        // className="grid grid-cols-2 gap-4" className="aspect-auto relative"
        <div className='flex'>
          {post.images.map((image: ImageValue, index: number) => (

              <Image
                src={urlFor(image.asset as SanityImageSource).url()}
                alt={`${post.title} - Image ${index + 1}`}
                key={index}
                // fill
                width={600}
                height={600}
                // layout="fit"
                // objectFit="cover"
              />

          ))}
        </div>
      )} */}
      <div>
        <PortableText value={post.body} components={components} />
      </div>
    </div>
  )
}

