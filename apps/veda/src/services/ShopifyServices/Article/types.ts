import { ArticlesApiData } from 'types/Articles';

export interface ArticleShopifyResponse {
  info: ArticlesApiData[];
  hasNextPage: boolean;
}
