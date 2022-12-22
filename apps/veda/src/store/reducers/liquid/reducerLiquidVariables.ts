import { uniq } from 'ramda';
import {
  Article,
  Blog,
  Cart,
  Collection,
  Localization,
  Product,
  Request,
  Recommendations,
  Routes,
  Shop,
  Customer,
  Page,
  Order,
  GiftCard,
  CanonicalUrl,
  PageTitle,
  PageDescription,
  ContentForHeader,
  ContentForLayout,
  AdditionalCheckoutButtons,
  ContentForAdditionalCheckoutButtons,
  Theme,
  Template,
  Search,
} from 'utils/LiquidSyntaxToTwig';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import {
  setSlugsRequest,
  getArticleObject,
  getBlogsObject,
  getCollectionsObject,
  getProductsObject,
  getPagesObject,
  getLiquidTranslationsObject,
  getShopObject,
  getCartObject,
  getLocalizationObject,
  getCustomerObject,
  getThemeObjectNCss,
  getGlobalObjectFake,
  getInitialOfLiquidVariables,
  renewLiquidVariables,
} from '../../actions/liquid/actionLiquidVariables';
import { GET_BLOG_PLACEHOLDER, GET_COLLECTION_PLACEHOLDER, GET_PRODUCT_PLACEHOLDER } from './randomPlaceholderLiquidObject';
import { GET_CART_PLACEHOLDER } from './randomPlaceholderLiquidObject/GET_CART_PLACEHOLDER';
import { GET_CUSTOMER_PLACEHOLDER } from './randomPlaceholderLiquidObject/GET_CUSTOMER_PLACEHOLDER';
import { GET_GIFT_CARD_PLACEHOLDER } from './randomPlaceholderLiquidObject/GET_GIFT_CARD_PLACEHOLDER';
import { GET_ORDER_PLACEHOLDER } from './randomPlaceholderLiquidObject/GET_ORDER_PLACEHOLDER';
import { GET_SEARCH_RESULT_PLACEHOLDER } from './randomPlaceholderLiquidObject/GET_SEARCH_RESULT_PLACEHOLDER';

type CollectionHandle = string;
type ProductHandle = string;
type BlogHandle = string;
type ArticleHandle = string;
type PageHandle = string;
type Locale = string;
type Translations = Record<string, string | any>;

export interface LiquidVariablesState {
  data: {
    // Collection
    collections: Record<CollectionHandle, Collection>;
    collection: Collection;
    // Product
    all_products: Record<ProductHandle, Product>;
    product: Product;
    // Blog
    blogs: Record<BlogHandle, Blog>;
    blog: Blog;
    // Article
    // NOTE: @tuong -> articles chỉ có tác dụng cache lại kết quả chứ liquid không có biến articles
    articles: Record<ArticleHandle, Article>;
    article: Article;
    // Page
    pages: Record<PageHandle, Page>;
    page: Page;
    //
    translations: Record<Locale, Translations>;
    //
    shop: Shop;
    weight_with_unit: string;
    //
    cart: Cart;
    //
    localization: Localization;
    //
    customer: Customer;
    //
    order: Order;
    //
    gift_card: GiftCard;
    //
    themeCss: string | null;
    theme: Theme;
    //
    template: Template;
    //
    search: Search;

    routes: Routes;
    request: Request;
    recommendations: Recommendations;
    canonical_url: CanonicalUrl;
    page_title: PageTitle;
    page_description: PageDescription;
    content_for_header: ContentForHeader;
    content_for_layout: ContentForLayout;
    additional_checkout_buttons: AdditionalCheckoutButtons;
    content_for_additional_checkout_buttons: ContentForAdditionalCheckoutButtons;
  };
  // Collection
  collectionIdsFailed: number[];
  collectionIdsLoaded: number[];
  collectionIdsLoading: number[];
  // Product
  productIdsFailed: number[];
  productIdsLoaded: number[];
  productIdsLoading: number[];
  // Blog
  blogSlugsFailed: string[];
  blogSlugsLoaded: string[];
  blogSlugsLoading: string[];
  // Page
  pageSlugsFailed: string[];
  pageSlugsLoaded: string[];
  pageSlugsLoading: string[];
  // Translation
  translationLocalesFailed: string[];
  translationLocalesLoaded: string[];
  translationLocalesLoading: string[];
  // Shop
  statusRequestShopObject: Status;
  // Cart
  statusRequestCartObject: Status;
  // Localization
  statusRequestLocalizationObject: Status;
  // Customer
  statusRequestCustomerObject: Status;
  // ThemeCss
  statusRequestThemeCssObject: Status;
  // Init
  statusGetInitialOfLiquidVariables: Status;
}

type Actions = ActionTypes<
  | typeof setSlugsRequest.request
  | typeof setSlugsRequest.success
  | typeof setSlugsRequest.failure
  | typeof setSlugsRequest.otherException
  | typeof getArticleObject
  | typeof getBlogsObject
  | typeof getCollectionsObject
  | typeof getProductsObject
  | typeof getPagesObject
  | typeof getLiquidTranslationsObject
  | typeof getShopObject
  | typeof getCartObject
  | typeof getLocalizationObject
  | typeof getCustomerObject
  | typeof getThemeObjectNCss
  | typeof getGlobalObjectFake
  | typeof getInitialOfLiquidVariables
  | typeof renewLiquidVariables
>;

export const defaultStateLiquidVariablesState: LiquidVariablesState = {
  data: {
    collections: Array(30)
      .fill(undefined)
      .reduce<LiquidVariablesState['data']['collections']>(placeholderCollections => {
        const placeholderCollection = GET_COLLECTION_PLACEHOLDER();
        if (placeholderCollection?.handle) {
          return {
            ...placeholderCollections,
            [placeholderCollection.handle]: placeholderCollection,
          };
        }
        return placeholderCollections;
      }, {}),
    collection: null,
    all_products: Array(10)
      .fill(undefined)
      .reduce<LiquidVariablesState['data']['all_products']>(placeholderProducts => {
        const placeholderProduct = GET_PRODUCT_PLACEHOLDER();
        if (placeholderProduct?.handle) {
          return {
            ...placeholderProducts,
            [placeholderProduct.handle]: placeholderProduct,
          };
        }
        return placeholderProducts;
      }, {}),
    product: null,
    blogs: Array(20)
      .fill(undefined)
      .reduce<LiquidVariablesState['data']['blogs']>(placeholderBlogs => {
        const placeholderBlog = GET_BLOG_PLACEHOLDER();
        if (placeholderBlog?.handle) {
          return {
            ...placeholderBlogs,
            [placeholderBlog.handle]: placeholderBlog,
          };
        }
        return placeholderBlogs;
      }, {}),
    blog: null,
    articles: {},
    article: null,
    pages: {},
    page: null,
    shop: null,
    customer: GET_CUSTOMER_PLACEHOLDER(),
    cart: GET_CART_PLACEHOLDER(),
    order: GET_ORDER_PLACEHOLDER(),
    gift_card: GET_GIFT_CARD_PLACEHOLDER(),
    themeCss: null,
    theme: null,
    search: GET_SEARCH_RESULT_PLACEHOLDER(),
    localization: null,
    request: null,
    recommendations: {
      performed: true,
      intent: 'related',
      products_count: 10,
      products: Array(10)
        .fill(undefined)
        .reduce<Exclude<Recommendations, null>['products']>(placeholderProducts => {
          const placeholderProduct = GET_PRODUCT_PLACEHOLDER();
          if (placeholderProduct?.handle) {
            return placeholderProducts.concat(placeholderProduct as any);
          }
          return placeholderProducts;
        }, []),
    },
    routes: {
      root_url: '/',
      account_url: '/account',
      account_login_url: '/account/login',
      account_logout_url: '/account/logout',
      account_register_url: '/account/register',
      account_addresses_url: '/account/addresses',
      collections_url: '/collections',
      all_products_collection_url: '/collections/all',
      search_url: '/search',
      predictive_search_url: '/search/suggest',
      cart_url: '/cart',
      cart_add_url: '/cart/add',
      cart_change_url: '/cart/change',
      cart_clear_url: '/cart/clear',
      cart_update_url: '/cart/update',
      product_recommendations_url: '/recommendations/products',
      account_recover_url: '/account/recover',
    },
    canonical_url: null,
    page_title: null,
    page_description: null,
    additional_checkout_buttons: false,
    content_for_additional_checkout_buttons: 'content_for_additional_checkout_buttons placeholder',
    content_for_header: 'content_for_header placeholder',
    content_for_layout: 'content_for_layout placeholder',
    translations: {},
    weight_with_unit: 'kg',
    template: null,
  },
  blogSlugsFailed: [],
  blogSlugsLoaded: [],
  blogSlugsLoading: [],
  collectionIdsFailed: [],
  collectionIdsLoaded: [],
  collectionIdsLoading: [],
  productIdsFailed: [],
  productIdsLoaded: [],
  productIdsLoading: [],
  pageSlugsFailed: [],
  pageSlugsLoaded: [],
  pageSlugsLoading: [],
  translationLocalesFailed: [],
  translationLocalesLoaded: [],
  translationLocalesLoading: [],
  statusRequestCartObject: 'idle',
  statusRequestCustomerObject: 'idle',
  statusRequestLocalizationObject: 'idle',
  statusRequestShopObject: 'idle',
  statusRequestThemeCssObject: 'idle',
  statusGetInitialOfLiquidVariables: 'idle',
};

export const reducerLiquidVariables = createReducer<LiquidVariablesState, Actions>(defaultStateLiquidVariablesState, [
  handleAction('@LiquidVariables/slugsRequest', ({ state, action }) => {
    const { blogs = [], collections = [], products = [], translation = '', pages = [] } = action.payload;
    return {
      ...state,

      blogSlugsLoading: uniq(state.blogSlugsLoading.concat(blogs)),
      blogSlugsFailed: uniq(state.blogSlugsFailed.filter(item => !blogs.includes(item))),

      collectionIdsLoading: uniq(state.collectionIdsLoading.concat(collections)),
      collectionIdsFailed: uniq(state.collectionIdsFailed.filter(item => !collections.includes(item))),

      productIdsLoading: uniq(state.productIdsLoading.concat(products)),
      productIdsFailed: uniq(state.productIdsFailed.filter(item => !products.includes(item))),

      pageSlugsLoading: uniq(state.pageSlugsLoading.concat(pages)),
      pageSlugsFailed: uniq(state.pageSlugsFailed.filter(item => !pages.includes(item))),

      translationLocalesLoading: uniq(state.translationLocalesLoading.concat(translation)),
      translationLocalesFailed: uniq(state.translationLocalesFailed.filter(item => item !== translation)),
    };
  }),
  handleAction('@LiquidVariables/slugsSuccess', ({ state, action }) => {
    const { blogs = [], collections = [], products = [], translation = '', pages = [] } = action.payload;
    return {
      ...state,

      blogSlugsLoading: uniq(state.blogSlugsLoading.filter(item => !blogs.includes(item))),
      blogSlugsFailed: uniq(state.blogSlugsFailed.filter(item => !blogs.includes(item))),
      blogSlugsLoaded: uniq(state.blogSlugsLoaded.concat(blogs)),

      collectionIdsLoading: uniq(state.collectionIdsLoading.filter(item => !collections.includes(item))),
      collectionIdsFailed: uniq(state.collectionIdsFailed.filter(item => !collections.includes(item))),
      collectionIdsLoaded: uniq(state.collectionIdsLoaded.concat(collections)),

      productIdsLoading: uniq(state.productIdsLoading.filter(item => !products.includes(item))),
      productIdsFailed: uniq(state.productIdsFailed.filter(item => !products.includes(item))),
      productIdsLoaded: uniq(state.productIdsLoaded.concat(products)),

      pageSlugsLoading: uniq(state.pageSlugsLoading.filter(item => !pages.includes(item))),
      pageSlugsFailed: uniq(state.pageSlugsFailed.filter(item => !pages.includes(item))),
      pageSlugsLoaded: uniq(state.pageSlugsLoaded.concat(pages)),

      translationLocalesLoading: uniq(state.translationLocalesLoading.filter(item => item !== translation)),
      translationLocalesFailed: uniq(state.translationLocalesFailed.filter(item => item !== translation)),
      translationLocalesLoaded: uniq(state.translationLocalesLoaded.concat(translation)),
    };
  }),
  handleAction('@LiquidVariables/slugsFailure', ({ state, action }) => {
    const { blogs = [], collections = [], products = [], translation = '', pages = [] } = action.payload;
    const {
      blogSlugsLoading,
      blogSlugsLoaded,
      blogSlugsFailed,
      collectionIdsLoading,
      collectionIdsFailed,
      collectionIdsLoaded,
      productIdsLoading,
      productIdsFailed,
      productIdsLoaded,
      pageSlugsLoading,
      pageSlugsFailed,
      pageSlugsLoaded,
      translationLocalesLoading,
      translationLocalesFailed,
      translationLocalesLoaded,
    } = state;
    return {
      ...state,

      blogSlugsLoading: uniq(blogSlugsLoading.filter(item => !blogs.includes(item))),
      blogSlugsFailed: uniq(blogSlugsFailed.concat(blogs).filter(blog => !blogSlugsLoaded.includes(blog))),

      collectionIdsLoading: uniq(collectionIdsLoading.filter(item => !collections.includes(item))),
      collectionIdsFailed: uniq(collectionIdsFailed.concat(collections).filter(collection => !collectionIdsLoaded.includes(collection))),

      productIdsLoading: uniq(productIdsLoading.filter(item => !products.includes(item))),
      productIdsFailed: uniq(productIdsFailed.concat(products).filter(product => !productIdsLoaded.includes(product))),

      pageSlugsLoading: uniq(pageSlugsLoading.filter(item => !pages.includes(item))),
      pageSlugsFailed: uniq(pageSlugsFailed.concat(pages).filter(page => !pageSlugsLoaded.includes(page))),

      translationLocalesLoading: uniq(translationLocalesLoading.filter(item => item !== translation)),
      translationLocalesFailed: uniq(translationLocalesFailed.concat(translation).filter(locale => !translationLocalesLoaded.includes(locale))),
    };
  }),
  handleAction('@LiquidVariables/otherException', ({ state, action }) => {
    const { blogs = [], collections = [], products = [], translation = '', pages = [] } = action.payload;
    return {
      ...state,

      blogSlugsLoading: state.blogSlugsLoading.filter(item => !blogs.includes(item)),

      collectionIdsLoading: state.collectionIdsLoading.filter(item => !collections.includes(item)),

      productIdsLoading: state.productIdsLoading.filter(item => !products.includes(item)),

      pageSlugsLoading: state.pageSlugsLoading.filter(item => !pages.includes(item)),

      translationLocalesLoading: state.translationLocalesLoading.filter(item => item !== translation),
    };
  }),
  handleAction('@LiquidVariables/getArticleObjectRequest', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getArticleObjectSuccess', ({ state, action }) => {
    const { article, blogId } = action.payload;
    return {
      ...state,
      data: {
        ...state.data,
        article,
        articles: !article
          ? state.data.articles
          : {
              ...state.data.articles,
              [blogId]: {
                ...(state.data.articles[blogId] ?? {}),
                [article.handle as string]: article,
              },
            },
      },
    };
  }),
  handleAction('@LiquidVariables/getArticleObjectFailure', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getBlogsObjectRequest', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getBlogsObjectSuccess', ({ state, action }) => {
    const { blogs, blog, articles, article } = action.payload;
    return {
      ...state,
      data: {
        ...state.data,
        blogs: { ...blogs, ...state.data.blogs },
        blog,
        articles: { ...articles, ...state.data.articles },
        article,
      },
    };
  }),
  handleAction('@LiquidVariables/getBlogsObjectFailure', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getCollectionsObjectRequest', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getCollectionsObjectSuccess', ({ state, action }) => {
    const { collections, collection } = action.payload;
    return {
      ...state,
      data: {
        ...state.data,
        collections: { ...state.data.collections, ...collections },
        collection,
      },
    };
  }),
  handleAction('@LiquidVariables/getCollectionsObjectFailure', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getProductsObjectRequest', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getProductsObjectSuccess', ({ state, action }) => {
    const { products, product } = action.payload;
    return {
      ...state,
      data: {
        ...state.data,
        all_products: { ...products, ...state.data.all_products },
        product: product === undefined ? state.data.product : product,
      },
    };
  }),
  handleAction('@LiquidVariables/getProductsObjectFailure', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getPagesObjectRequest', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getPagesObjectSuccess', ({ state, action }) => {
    const { pages, page } = action.payload;
    return {
      ...state,
      data: {
        ...state.data,
        pages: { ...pages, ...state.data.pages },
        page,
      },
    };
  }),
  handleAction('@LiquidVariables/getPagesObjectFailure', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getLiquidTranslationsObjectRequest', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getLiquidTranslationsObjectSuccess', ({ state, action }) => {
    const { data } = action.payload;
    return {
      ...state,
      data: {
        ...state.data,
        translations: { ...state.data.translations, ...data },
      },
    };
  }),
  handleAction('@LiquidVariables/getLiquidTranslationsObjectFailure', ({ state }) => {
    return state;
  }),
  handleAction('@LiquidVariables/getShopObjectRequest', ({ state }) => {
    return { ...state, statusRequestShopObject: 'loading' };
  }),
  handleAction('@LiquidVariables/getShopObjectSuccess', ({ state, action }) => {
    const { shop } = action.payload;
    return {
      ...state,
      statusRequestShopObject: 'success',
      data: {
        ...state.data,
        shop,
      },
    };
  }),
  handleAction('@LiquidVariables/getShopObjectFailure', ({ state }) => {
    return { ...state, statusRequestShopObject: 'failure' };
  }),
  handleAction('@LiquidVariables/getCartObjectRequest', ({ state }) => {
    return { ...state, statusRequestCartObject: 'loading' };
  }),
  handleAction('@LiquidVariables/getCartObjectSuccess', ({ state, action }) => {
    const { cart } = action.payload;
    return {
      ...state,
      statusRequestCartObject: 'success',
      data: {
        ...state.data,
        cart,
      },
    };
  }),
  handleAction('@LiquidVariables/getCartObjectFailure', ({ state }) => {
    return { ...state, statusRequestCartObject: 'failure' };
  }),
  handleAction('@LiquidVariables/getLocalizationObjectRequest', ({ state }) => {
    return { ...state, statusRequestLocalizationObject: 'loading' };
  }),
  handleAction('@LiquidVariables/getLocalizationObjectSuccess', ({ state, action }) => {
    const { localization } = action.payload;
    return {
      ...state,
      statusRequestLocalizationObject: 'success',
      data: {
        ...state.data,
        localization,
      },
    };
  }),
  handleAction('@LiquidVariables/getLocalizationObjectFailure', ({ state }) => {
    return { ...state, statusRequestLocalizationObject: 'failure' };
  }),
  handleAction('@LiquidVariables/getCustomerObjectRequest', ({ state }) => {
    return { ...state, statusRequestCustomerObject: 'loading' };
  }),
  handleAction('@LiquidVariables/getCustomerObjectSuccess', ({ state, action }) => {
    const { customer } = action.payload;
    return {
      ...state,
      statusRequestCustomerObject: 'success',
      data: {
        ...state.data,
        customer,
      },
    };
  }),
  handleAction('@LiquidVariables/getCustomerObjectFailure', ({ state }) => {
    return { ...state, statusRequestCustomerObject: 'failure' };
  }),
  handleAction('@LiquidVariables/getThemeObjectNCssRequest', ({ state }) => {
    return { ...state, statusRequestThemeCssObject: 'loading' };
  }),
  handleAction('@LiquidVariables/getThemeObjectNCssSuccess', ({ state, action }) => {
    const { themeCss, theme } = action.payload;
    return {
      ...state,
      statusRequestThemeCssObject: 'success',
      data: {
        ...state.data,
        themeCss,
        theme,
      },
    };
  }),
  handleAction('@LiquidVariables/getThemeObjectNCssFailure', ({ state }) => {
    return { ...state, statusRequestThemeCssObject: 'failure' };
  }),
  handleAction('@LiquidVariables/getGlobalObjectFakeRequest', ({ state }) => {
    return {
      ...state,
    };
  }),
  handleAction('@LiquidVariables/getGlobalObjectFakeSuccess', ({ state, action }) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.payload,
      },
    };
  }),
  handleAction('@LiquidVariables/getGlobalObjectFakeFailure', ({ state }) => {
    return {
      ...state,
    };
  }),
  handleAction('@LiquidVarialbes/getInitialOfLiquidVariablesRequest', ({ state }) => {
    return {
      ...state,
      statusGetInitialOfLiquidVariables: 'loading',
    };
  }),
  handleAction('@LiquidVarialbes/getInitialOfLiquidVariablesSuccess', ({ state }) => {
    return {
      ...state,
      statusGetInitialOfLiquidVariables: 'success',
    };
  }),
  handleAction('@LiquidVarialbes/getInitialOfLiquidVariablesFalure', ({ state }) => {
    return {
      ...state,
      statusGetInitialOfLiquidVariables: 'failure',
    };
  }),
  handleAction('@LiquidVariables/renewLiquidVariables', ({ state }) => {
    return {
      ...state,
      ...defaultStateLiquidVariablesState,
    };
  }),
]);
