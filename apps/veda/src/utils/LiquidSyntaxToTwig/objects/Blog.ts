import { Metafield } from './Metafield';
import { Article } from './Article';
import { DeepNullable } from './@utils';

/**
 * @link https://shopify.dev/api/liquid/objects#blog
 */
interface _Blog {
  all_tags: '' | string[];
  articles: Article[];
  articles_count: number;
  comments_enabled?: boolean;
  handle: string;
  id: number;
  metafields: Metafield;
  moderated: boolean;
  next_article: Article;
  previous_article: Article;
  tags: _Blog['all_tags'];
  title: string;
  url: string;
}

export type Blog = Partial<DeepNullable<_Blog>> | null;
