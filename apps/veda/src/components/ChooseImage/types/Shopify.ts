interface ShopifyImage {
  src: string;
  width: number;
  height: number;
}

export interface ShopifyProductItem {
  id: number | string;
  title: string;
  link: string;
  image: ShopifyImage;
  price: string[];
  cursor: string;
}
