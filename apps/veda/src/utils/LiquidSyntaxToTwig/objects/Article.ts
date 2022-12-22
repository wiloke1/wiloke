import { Metafield } from './Metafield';
import { Comment } from './Comment';
import { Image } from './Image';
import { DeepNullable } from './@utils';
import { User } from './User';

/**
 * @link https://shopify.dev/api/liquid/objects#article
 */
interface _Article {
  author: string;
  comment_post_url?: string;
  comments: Comment[];
  comments_count: number;
  comments_enabled?: boolean;
  content: string;
  created_at: string;
  excerpt: string;
  excerpt_or_content: string;
  handle: string;
  id: number;
  image: Image;
  metafields: Metafield;
  moderated?: boolean;
  published_at: string;
  tags: '' | string[];
  template_suffix: string;
  title: string;
  updated_at: string;
  url: string;
  user: User;
}

export type Article = Partial<DeepNullable<_Article>> | null;
