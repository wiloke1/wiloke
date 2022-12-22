import { BlogItem, normalizationBlog } from 'services/LiquidVariables/utils/Blog';
import { PREFIX_BLOG_HANDLE, PREFIX_BLOG_TITLE } from './@const';
import { randomNumber } from './@utils';

const randomTitle = () => `${PREFIX_BLOG_TITLE} ${randomNumber()}`;
const randomHandle = () => `${PREFIX_BLOG_HANDLE}-${randomNumber()}`;

const GET_BLOG_ITEM_PLACEHOLDER = (handle = randomHandle()): BlogItem => ({
  all_tags: [''],
  articles: [],
  articles_count: 0,
  comments_enabled: true,
  handle,
  id: 86169387229,
  moderated: true,
  tags: [''],
  title: randomTitle(),
  url: 'https://vedabuilder.myshopify.com/blogs/vedabuilder',
});

// TODO: Có hay không việc migrate cái này sang BE
export const GET_BLOG_PLACEHOLDER = () => normalizationBlog(GET_BLOG_ITEM_PLACEHOLDER());
