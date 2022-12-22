import { BlogApiData } from 'types/Blogs';
import { ArticleShopifyResponse } from '../Article/types';
import { MergeArticleToBlogShopify } from './types';

export const mergeArticleToBlog = ({ blogs }: { blogs: BlogApiData[]; articleResponse: ArticleShopifyResponse[] }): MergeArticleToBlogShopify[] => {
  return blogs.reduce<MergeArticleToBlogShopify[]>((res, blog) => {
    // const articleOfBlog = at(articleResponse, index) as ArticleShopifyResponse;
    return res.concat({
      ...blog,
      articles: {
        info: [],
        hasNextPage: false,
      },
    });
  }, []);
};
