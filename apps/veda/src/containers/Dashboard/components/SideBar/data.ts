import { MenuItem } from 'components/Navigation/Navigation';
import { i18n } from 'translation';
import { v4 } from 'uuid';

interface TypeRoute extends MenuItem {
  type: string;
}

export const menuItem = (isUser: boolean): MenuItem[] => {
  return [
    {
      id: v4(),
      href: '/page',
      label: i18n.t('adminDashboard.menubar.dashboard'),
      icon: 'columns',
      isReactRouter: true,
      exact: true,
      textHeader: 'General',
    },
    {
      id: v4(),
      href: '/page/templates',
      label: i18n.t('general.templates'),
      icon: 'browser',
      isReactRouter: true,
      exact: true,
      hasDivider: true,
    },
    {
      id: v4(),
      href: '/page/blank',
      label: i18n.t('adminDashboard.menubar.regular_page'),
      icon: 'file',
      isReactRouter: true,
      exact: true,
      textHeader: 'pages',
      pageType: 'page',
    },
    {
      id: v4(),
      href: '/page/home',
      label: i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.home') }),
      icon: 'home',
      isReactRouter: true,
      exact: true,
      pageType: 'home',
    },
    {
      id: v4(),
      href: '/page/products',
      label: i18n.t('adminDashboard.menubar.product_page'),
      icon: 'shopping-cart',
      isReactRouter: true,
      exact: true,
      pageType: 'product',
    },
    {
      id: v4(),
      href: '/page/collection',
      label: i18n.t('adminDashboard.menubar.collection_page'),
      icon: 'columns',
      isReactRouter: true,
      exact: true,
      pageType: 'collection',
    },

    {
      id: v4(),
      href: '/page/article',
      label: i18n.t('adminDashboard.menubar.article_pages'),
      icon: 'newspaper',
      isReactRouter: true,
      exact: true,
      pageType: 'article',
    },
    ...((!isUser
      ? [
          {
            id: v4(),
            href: '/page/cart',
            label: i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.cart') }),
            icon: 'cart-arrow-down',
            isReactRouter: true,
            exact: true,
            pageType: 'cart',
          },
          {
            id: v4(),
            href: '/page/search',
            label: i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.search') }),
            icon: 'search',
            isReactRouter: true,
            exact: true,
            pageType: 'search',
          },
          {
            id: v4(),
            href: '/page/password',
            label: i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.password') }),
            icon: 'lock',
            isReactRouter: true,
            exact: true,
            pageType: 'password',
          },
          {
            id: v4(),
            href: '/page/notfound',
            label: i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.notFound') }),
            icon: 'exclamation-triangle',
            isReactRouter: true,
            exact: true,
            pageType: 'pageNotFound',
          },
          {
            id: v4(),
            href: '/page/collection-listing',
            label: i18n.t('adminDashboard.collection_listing'),
            icon: 'list',
            isReactRouter: true,
            exact: true,
            pageType: 'collections',
          },
          {
            id: v4(),
            href: '/page/gift-card',
            label: i18n.t('adminDashboard.giftCard'),
            icon: 'gift',
            isReactRouter: true,
            exact: true,
            hasDivider: true,
            pageType: 'giftCard',
          },
          {
            id: v4(),
            href: '/page/customer-login',
            label: i18n.t('general.prefix_page', { prefix: i18n.t('general.login') }),
            icon: 'user-lock',
            isReactRouter: true,
            exact: true,
            textHeader: 'Customer pages',
            pageType: 'login',
          },
          {
            id: v4(),
            href: '/page/customer-reset-password',
            label: i18n.t('adminDashboard.reset_password'),
            icon: 'repeat',
            isReactRouter: true,
            exact: true,
            pageType: 'resetPassword',
          },
          {
            id: v4(),
            href: '/page/customer-activate-account',
            label: i18n.t('adminDashboard.active_account'),
            icon: 'user-check',
            isReactRouter: true,
            exact: true,
            pageType: 'activateAccount',
          },
          {
            id: v4(),
            href: '/page/customer-register',
            label: i18n.t('adminDashboard.register'),
            icon: 'address-card',
            isReactRouter: true,
            exact: true,
            pageType: 'register',
          },
          {
            id: v4(),
            href: '/page/customer-account',
            label: i18n.t('adminDashboard.account'),
            icon: 'user',
            isReactRouter: true,
            exact: true,
            pageType: 'account',
          },
          {
            id: v4(),
            href: '/page/customer-order',
            label: i18n.t('adminDashboard.order'),
            icon: 'cart-arrow-down',
            isReactRouter: true,
            exact: true,
            pageType: 'order',
          },
          {
            id: v4(),
            href: '/page/customer-addresses',
            label: i18n.t('adminDashboard.addresses'),
            icon: 'location-arrow',
            isReactRouter: true,
            exact: true,
            pageType: 'addresses',
          },
        ]
      : []) as MenuItem[]),
  ];
};

export const themeItems: MenuItem[] = [
  {
    id: v4(),
    href: '/theme',
    label: i18n.t('adminDashboard.menubar.dashboard'),
    icon: 'columns',
    isReactRouter: true,
    exact: true,
    textHeader: i18n.t('adminDashboard.general'),
  },
  {
    id: v4(),
    href: '/theme/templates',
    label: i18n.t('general.themes'),
    icon: 'browser',
    isReactRouter: true,
    exact: true,
    hasDivider: true,
    hotspot: true,
  },
  {
    id: v4(),
    href: '/theme/settings',
    label: i18n.t('general.theme', { text: i18n.t('general.settings') }),
    icon: 'cog',
    isReactRouter: true,
    exact: true,
  },
];

export const builderTypeRoute = (hideManager: boolean): TypeRoute[] => {
  return [
    {
      id: v4(),
      href: '/theme',
      label: i18n.t('general.theme'),
      icon: 'theater-masks',
      isReactRouter: true,
      exact: true,
      type: '/theme',
    },
    {
      id: v4(),
      href: '/page',
      label: i18n.t('general.page'),
      icon: 'layer-plus',
      isReactRouter: true,
      exact: true,
      type: '/page',
    },
    {
      id: v4(),
      href: '/preset-styles',
      label: i18n.t('adminDashboard.styles'),
      icon: 'palette',
      isReactRouter: true,
      exact: true,
      type: 'style',
    },
    {
      id: v4(),
      href: '/pricing',
      label: i18n.t('general.plan'),
      icon: 'star',
      isReactRouter: true,
      exact: true,
      type: 'pricing',
    },
    ...((!hideManager
      ? [
          {
            id: v4(),
            href: '/manager-page',
            label: i18n.t('general.manager'),
            icon: 'tasks',
            isReactRouter: true,
            exact: true,
            type: '/manager',
          },
        ]
      : []) as TypeRoute[]),
  ];
};

export const managerItems = (isDev: boolean): MenuItem[] => [
  {
    id: v4(),
    href: '/manager-page',
    label: i18n.t('adminDashboard.pages'),
    icon: 'layer-plus',
    isReactRouter: true,
    exact: true,
  },
  {
    id: v4(),
    href: '/manager-theme',
    label: i18n.t('adminDashboard.themes'),
    icon: 'theater-masks',
    isReactRouter: true,
    exact: true,
  },
  ...((!isDev
    ? [
        {
          id: v4(),
          href: '/manager-users',
          label: 'Users',
          icon: 'users',
          isReactRouter: true,
          exact: true,
        },
        {
          id: v4(),
          href: '/manager-plan',
          label: 'Plans',
          icon: 'usd-circle',
          isReactRouter: true,
          exact: true,
        },
      ]
    : []) as MenuItem[]),
];

export const adminTypeRoute: TypeRoute[] = [
  {
    id: v4(),
    href: '/notifications',
    label: '',
    icon: 'bell',
    isReactRouter: true,
    exact: true,
    type: 'notifications',
  },
  {
    id: v4(),
    href: '/account',
    label: '',
    icon: 'user',
    isReactRouter: true,
    exact: true,
    type: 'account',
  },
];
