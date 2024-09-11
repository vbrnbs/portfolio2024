export type BlogPost = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset: {
      _ref: string;
      // _type: 'reference';
    };
    alt?: string;
  };
  categories?: {
    _type: 'reference';
    _ref: string;
  }[];
  publishedAt?: string;
  body: any; // assuming 'blockContent' is a custom type, replace with a more specific type if available
  author: {
    _type: 'reference';
    _ref: string;
  };
};

  