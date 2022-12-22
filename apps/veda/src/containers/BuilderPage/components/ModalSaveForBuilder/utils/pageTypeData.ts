import { PageSectionType } from 'types/Sections';

export const pageTypeData = [
  {
    label: 'Regular',
    value: 'page',
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
  {
    label: 'Home',
    value: 'home',
  },
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
];

interface SectionTypes {
  label: string;
  value: PageSectionType;
}

export const sectionTypeData: SectionTypes[] = [
  {
    value: 'default',
    label: 'default',
  },
  {
    value: 'footer',
    label: 'footer',
  },
  {
    value: 'header',
    label: 'header',
  },
  {
    value: 'megamenu',
    label: 'megamenu',
  },
];
