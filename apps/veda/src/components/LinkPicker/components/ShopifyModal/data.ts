import { ShopifyType } from 'components/LinkPicker/types';
import { TabItem } from 'components/SimpleTabs';

export const tabLinkPicker: TabItem<ShopifyType>[] = [
  {
    label: 'Pages',
    value: 'pages',
  },
  {
    label: 'Collections',
    value: 'collections',
  },
  {
    label: 'Products',
    value: 'products',
  },
  // {
  //   label: 'Articles',
  //   value: 'articles',
  // },
  {
    label: 'Blogs',
    value: 'blogs',
  },
];
