import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import Link from 'next/link';

interface RichTextProps {
  value: PortableTextBlock[]; // or other custom blocks/types you may be using
}

const components: PortableTextReactComponents = {
  block: ({ children }) => <p>{children}</p>,
  list: ({ children }) => <ul>{children}</ul>,
  listItem: ({ children }) => <li>{children}</li>,
  hardBreak: () => <br />,
  types: {
    image: ({ value }: { value: any }) => {
      return <img src={value.url} alt={value.alt || 'Image'} />;
    }
  },
  marks: {

    link: ({ children, value }: { children: any; value?: any }) => {
      const href = value?.href || '#'; // Use a default or fallback value if `value` is undefined
      return <Link href={href} target="_blank" rel="noopener noreferrer">{children}</Link>;
    }
  },
  unknownMark: ({ children }) => <span>{children}</span>,
  unknownType: ({ children }) => <span>{children}</span>,
  unknownBlockStyle: ({ children }) => <span>{children}</span>,
  unknownList: ({ children }) => <ul>{children}</ul>,
  unknownListItem: ({ children }) => <li>{children}</li>,
};

const RichText: React.FC<RichTextProps> = ({ value }) => {
  return <PortableText value={value} components={components} />;
};


export default RichText;
