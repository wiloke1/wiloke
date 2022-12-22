import { i18n } from 'translation';
import { FontAwesomeName } from 'wiloke-react-core';

interface TabData {
  label: string;
  value: string;
  icon: FontAwesomeName;
}

export const tabData: TabData[] = [
  {
    label: i18n.t('adminDashboard.all'),
    value: 'all',
    icon: 'folder-open',
  },
  {
    label: i18n.t('general.saved'),
    value: 'my-template',
    icon: 'heart',
  },
];

export const filterPageType = (isUser: boolean) => {
  return [
    {
      label: 'Regular',
      value: 'page',
    },
    {
      label: 'Home',
      value: 'home',
    },
    {
      label: 'Product',
      value: 'product',
    },
    {
      label: 'Collection',
      value: 'collection',
    },
    {
      label: 'Article/Blog',
      value: 'article',
    },
    ...(!isUser
      ? [
          {
            label: 'Cart',
            value: 'cart',
          },
          {
            label: 'Search',
            value: 'search',
          },
          {
            label: 'Not Found',
            value: 'pageNotFound',
          },
          {
            label: 'Password',
            value: 'password',
          },
          {
            label: 'Login',
            value: 'login',
          },
          {
            label: 'Reset Password',
            value: 'resetPassword',
          },
          {
            label: 'Activate Account',
            value: 'activateAccount',
          },
          {
            label: 'Register',
            value: 'register',
          },
          {
            label: 'Account',
            value: 'account',
          },
          {
            label: 'Order',
            value: 'order',
          },
          {
            label: 'Addresses',
            value: 'addresses',
          },
          {
            label: 'Gift Card',
            value: 'giftCard',
          },
          {
            label: 'Collection Listing',
            value: 'collections',
          },
        ]
      : []),
  ];
};
