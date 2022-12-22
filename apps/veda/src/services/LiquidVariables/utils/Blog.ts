import { Blog, NonEmptyValue } from 'utils/LiquidSyntaxToTwig';

export type BlogItem = NonEmptyValue<Blog>;

/**
 * function chuyển những dữ liệu mà BE trả về sai
 * ví dụ: "id" BE đang trả về string nhưng cái cần là number -> cần transform -> lúc đó function này sẽ đảm nhiệm
 */
export const normalizationBlog = (blog: Partial<BlogItem>): Blog => {
  let delta = blog.articles_count && blog.articles ? blog.articles_count - blog.articles.length : 0;
  const articles = blog.articles ?? [];
  while (delta > 0 && articles[0]) {
    articles.push(articles[0]);
    delta--;
  }
  return {
    ...blog,
    id: Number(blog.id),
    articles: blog.articles ?? [],
  };
};
