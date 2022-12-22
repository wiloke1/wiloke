import { BlogApiData } from 'types/Blogs';
import { ArticleShopifyResponse } from '../Article/types';

export interface BlogShopifyResponse {
  info: BlogApiData[];
  hasNextPage: boolean;
}

export interface MergeArticleToBlogShopify {
  id: number;
  handle: string;
  title: string;
  articles: ArticleShopifyResponse;
}

export interface BlogIncludeArticleResponse {
  info: MergeArticleToBlogShopify[];
  hasNextPage: boolean;
}
