export interface ProductApiData {
  id: string;
  title: string;
  createdAt: string;
  featuredImage: FeaturedImage | null;
  handle: string;
  cursor: string;
  tags: string[];
  variants: Variant;
}

export interface FeaturedImage {
  height: number;
  src: string;
  width: number;
  altText: string;
}

interface Variant {
  edges: VariantEdge[];
}

interface VariantEdge {
  node: {
    id: string | number;
    price: string;
    compareAtPrice: string | null;
    featuredImage: FeaturedImage | null;
    name: string;
    title: string;
  };
}
