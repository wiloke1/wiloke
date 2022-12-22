export interface PageApiData {
  id: string;
  handle: string;
  title: string;
}

export interface ResponseShopifyPages {
  info: PageApiData[];
  hasNextPage: boolean;
  message: string;
}
