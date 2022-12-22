import { DeepNullable } from './@utils';

/**
 * @link https://shopify.dev/api/liquid/objects#comment
 */
interface _Comment {
  author: string;
  content: string;
  created_at: string;
  email: string;
  id: number;
  status: string | 'pending' | 'published' | 'removed' | 'spam' | 'unapproved';
  updated_at: string;
  url: string;
}

export type Comment = DeepNullable<_Comment> | null;
