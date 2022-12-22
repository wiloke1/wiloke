import { ArticlePageLiquidVariable, CollectionPageLiquidVariable, ProductPageLiquidVariable } from 'types/Page';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface MultipleProductSettings {
  type: 'changeSettingsShopifyPicker';
  payload: Partial<MultipleProductState>;
}

type MultipleProductActions = MultipleProductSettings;

export type ShopifyDataProductAndCollection = Exclude<CollectionPageLiquidVariable | ProductPageLiquidVariable, undefined>;
type ShopifyDataArticle = Exclude<ArticlePageLiquidVariable, undefined>;
interface MultipleProductState {
  visibleProduct: boolean;
  slugsProduct: ShopifyDataProductAndCollection[];

  visibleCollection: boolean;
  slugsCollection: ShopifyDataProductAndCollection[];

  visibleBlog: boolean;
  slugBlog: ShopifyDataArticle[];
  slugArticleSelected: Record<number, boolean>;
}

const sliceMultipleProduct = createSlice<MultipleProductState, MultipleProductActions>({
  initialState: {
    visibleProduct: false,
    slugsProduct: [],

    visibleCollection: false,
    slugsCollection: [],

    visibleBlog: false,
    slugBlog: [],
    slugArticleSelected: {},
  },
  name: '@MultipleShopifyPicker',
  reducers: [
    handleAction('changeSettingsShopifyPicker', ({ state, action }) => {
      return {
        ...state,
        ...action.payload,
      };
    }),
  ],
});

export const { changeSettingsShopifyPicker } = sliceMultipleProduct.actions;

export const useSettingsShopifyPicker = createDispatchAction(changeSettingsShopifyPicker);
export { sliceMultipleProduct };
