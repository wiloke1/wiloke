import { SettingBlogPicker, SettingCollectionPicker, SettingSingleProductPicker } from 'types/Schema';
import { Article, Blog, Cart, Collection, Customer, Localization, Page, Product, Request, Shop, Template, Theme } from 'utils/LiquidSyntaxToTwig';
import { createAction, createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

interface SlugVariant {
  blogs?: string[];
  translation?: string;
  pages?: string[];
  collections?: number[];
  products?: number[];
}

export const setSlugsRequest = {
  request: createAction('@LiquidVariables/slugsRequest', (payload: SlugVariant) => payload),
  success: createAction('@LiquidVariables/slugsSuccess', (payload: SlugVariant) => payload),
  failure: createAction('@LiquidVariables/slugsFailure', (payload: SlugVariant) => payload),
  otherException: createAction('@LiquidVariables/otherException', (payload: SlugVariant) => payload),
};

interface GetCollectionsObjectSuccessResponse {
  collections: Record<string, Collection>;
  collection: Collection;
}
export const getCollectionsObject = createAsyncAction([
  '@LiquidVariables/getCollectionsObjectRequest',
  '@LiquidVariables/getCollectionsObjectSuccess',
  '@LiquidVariables/getCollectionsObjectFailure',
])<
  {
    collections?: Array<Exclude<SettingCollectionPicker['children'], undefined>>;
    onSuccess?: (result: GetCollectionsObjectSuccessResponse) => void;
    onFailure?: () => void;
  },
  GetCollectionsObjectSuccessResponse,
  undefined
>();

interface GetProductsObjectSuccessResponse {
  products: Record<string, Product>;
  product: Product | undefined;
}
export const getProductsObject = createAsyncAction([
  '@LiquidVariables/getProductsObjectRequest',
  '@LiquidVariables/getProductsObjectSuccess',
  '@LiquidVariables/getProductsObjectFailure',
])<
  {
    products?: Array<Exclude<SettingSingleProductPicker['children'], undefined>>;
    onSuccess?: (result: GetProductsObjectSuccessResponse) => void;
    onFailure?: () => void;
  },
  GetProductsObjectSuccessResponse,
  undefined
>();

interface GetBlogsObjectSuccessResponse {
  blogs: Record<string, Blog>;
  blog: Blog;
  articles: Record<string, Article>;
  article: Article;
}
export const getBlogsObject = createAsyncAction([
  '@LiquidVariables/getBlogsObjectRequest',
  '@LiquidVariables/getBlogsObjectSuccess',
  '@LiquidVariables/getBlogsObjectFailure',
])<
  {
    blogs?: Array<Exclude<SettingBlogPicker['children'], undefined>>;
    onSuccess?: (result: GetBlogsObjectSuccessResponse) => void;
    onFailure?: () => void;
  },
  GetBlogsObjectSuccessResponse,
  undefined
>();

interface GetArticleObjectSuccessResponse {
  article: Article | null;
  blogId: number;
}
export const getArticleObject = createAsyncAction([
  '@LiquidVariables/getArticleObjectRequest',
  '@LiquidVariables/getArticleObjectSuccess',
  '@LiquidVariables/getArticleObjectFailure',
])<
  {
    onSuccess?: (result: GetArticleObjectSuccessResponse) => void;
    onFailure?: () => void;
  },
  GetArticleObjectSuccessResponse,
  undefined
>();

interface GetPagesObjectSuccessResponse {
  pages: Record<string, Page>;
  page: Page;
}
export const getPagesObject = createAsyncAction([
  '@LiquidVariables/getPagesObjectRequest',
  '@LiquidVariables/getPagesObjectSuccess',
  '@LiquidVariables/getPagesObjectFailure',
])<
  { slugs?: string[]; onSuccess?: (result: GetPagesObjectSuccessResponse) => void; onFailure?: () => void },
  GetPagesObjectSuccessResponse,
  undefined
>();

export const getLiquidTranslationsObject = createAsyncAction([
  '@LiquidVariables/getLiquidTranslationsObjectRequest',
  '@LiquidVariables/getLiquidTranslationsObjectSuccess',
  '@LiquidVariables/getLiquidTranslationsObjectFailure',
])<{ locale?: string }, { data: Record<string, any> }, undefined>();

export const getShopObject = createAsyncAction([
  '@LiquidVariables/getShopObjectRequest',
  '@LiquidVariables/getShopObjectSuccess',
  '@LiquidVariables/getShopObjectFailure',
])<undefined, { shop: Shop; weight_with_unit: string }, undefined>();

export const getCartObject = createAsyncAction([
  '@LiquidVariables/getCartObjectRequest',
  '@LiquidVariables/getCartObjectSuccess',
  '@LiquidVariables/getCartObjectFailure',
])<undefined, { cart: Cart }, undefined>();

export const getLocalizationObject = createAsyncAction([
  '@LiquidVariables/getLocalizationObjectRequest',
  '@LiquidVariables/getLocalizationObjectSuccess',
  '@LiquidVariables/getLocalizationObjectFailure',
])<undefined, { localization: Localization }, undefined>();

export const getCustomerObject = createAsyncAction([
  '@LiquidVariables/getCustomerObjectRequest',
  '@LiquidVariables/getCustomerObjectSuccess',
  '@LiquidVariables/getCustomerObjectFailure',
])<undefined, { customer: Customer }, undefined>();

export const getThemeObjectNCss = createAsyncAction([
  '@LiquidVariables/getThemeObjectNCssRequest',
  '@LiquidVariables/getThemeObjectNCssSuccess',
  '@LiquidVariables/getThemeObjectNCssFailure',
])<
  { variant: 'Action chạy sau khi active theme khác ở client theme manager' | 'Action chạy khi vào build hoặc vào client theme manager' },
  { theme: Theme; themeCss: string },
  undefined
>();

export const getGlobalObjectFake = createAsyncAction([
  '@LiquidVariables/getGlobalObjectFakeRequest',
  '@LiquidVariables/getGlobalObjectFakeSuccess',
  '@LiquidVariables/getGlobalObjectFakeFailure',
])<
  undefined,
  {
    canonical_url: string;
    page_title: string;
    page_description: string;
    request: Request;
    template: Template;
  },
  undefined
>();
export const getInitialOfLiquidVariables = createAsyncAction([
  '@LiquidVarialbes/getInitialOfLiquidVariablesRequest',
  '@LiquidVarialbes/getInitialOfLiquidVariablesSuccess',
  '@LiquidVarialbes/getInitialOfLiquidVariablesFalure',
])<undefined, undefined, undefined>();

export const renewLiquidVariables = createAction('@LiquidVariables/renewLiquidVariables');

export const useGetCollectionsObject = createDispatchAsyncAction(getCollectionsObject);
export const useGetProductsObject = createDispatchAsyncAction(getProductsObject);
export const useGetBlogsObject = createDispatchAsyncAction(getBlogsObject);
export const useGetArticleObject = createDispatchAsyncAction(getArticleObject);
export const useGetPagesObject = createDispatchAsyncAction(getPagesObject);
export const useGetLiquidTranslationsObject = createDispatchAsyncAction(getLiquidTranslationsObject);
export const useGetShopObject = createDispatchAsyncAction(getShopObject);
export const useGetCartObject = createDispatchAsyncAction(getCartObject);
export const useGetLocalizationObject = createDispatchAsyncAction(getLocalizationObject);
export const useGetCustomerObject = createDispatchAsyncAction(getCustomerObject);
export const useGetThemeObjectNCss = createDispatchAsyncAction(getThemeObjectNCss);
export const useGetGlobalObjectFake = createDispatchAsyncAction(getGlobalObjectFake);
export const useGetInitialOfLiquidVariables = createDispatchAsyncAction(getInitialOfLiquidVariables);
