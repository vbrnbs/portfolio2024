export interface Post {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    mainImage?: {
      asset: {
        _ref: string;
        _type: 'reference';
      };
      alt?: string;
    };
    categories?: {
      _type: 'reference';
      _ref: string;
    }[];
    publishedAt?: string;
    body: any; // Assuming 'blockContent' is a custom type, replace 'any' with the actual type if available
    author: {
      _type: 'reference';
      _ref: string;
    };
  }
  