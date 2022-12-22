import { Article, NonEmptyValue } from 'utils/LiquidSyntaxToTwig';

export type ArticleItem = NonEmptyValue<Article>;

const handleArticleUrl = (handle: NonEmptyValue<Article>['handle']) => `/blogs/BLOG_HANDLE/${handle}`;

/**
 * function chuyển những dữ liệu mà BE trả về sai
 * ví dụ: "id" BE đang trả về string nhưng cái cần là number -> cần transform -> lúc đó function này sẽ đảm nhiệm
 */
export const normalizationArticle = (article: Partial<ArticleItem>): Article => {
  return {
    ...article,
    url: article.url ? article.url : handleArticleUrl(article.handle),
  };
};
