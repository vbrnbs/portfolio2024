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

// const contentResult ='Lana Del Rey, an iconic American singer-songwriter, is celebrated for her melancholic and cinematic music style. Born Elizabeth Woolridge Grant in New York City, she has captivated audiences worldwide wit her haunting voice and introspective lyrics. <br /> <br /> Her songs'


const cards = [
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    
    // content: contentResult,
    },
  
  {
    description: "Babbu Maan",
    title: "Mitran Di Chhatri",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    // content: contentResult,
  },

  {
    description: "Metallica",
    title: "For Whom The Bell Tolls",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    // content: contentResult,
  },
  {
    description: "Led Zeppelin",
    title: "Stairway To Heaven",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    // content: contentResult,
  },
  {
    description: "Mustafa Zahid",
    title: "Toh Phir Aao",
    src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    // content: contentResult,
  },
];


export default async function BlogPostLister() {
    const response = await client.fetch(blogQuery);
    const posts = response;
    console.log(posts)
  
    return (
  <div className="bg-background text-foreground"> 
      <ExpandableCard cards={cards}/>
        {posts.map((post: Post) => (
          <>
            <BlogPostPreview key={post._id} post={post} />
            
          </>
          
        ))}
      </div>
    );
  }
  

