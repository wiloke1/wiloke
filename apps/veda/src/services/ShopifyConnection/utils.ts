import { AdminPageData } from 'containers/Admin/types';
import { ArticlePageLiquidVariable, CollectionPageLiquidVariable, Page, ProductPageLiquidVariable } from 'types/Page';
import { ArticlePage, Product_Collection_Page } from './services/.types';

export const areUndefined = (...args: any[]) => {
  return args.every(item => typeof item === 'undefined');
};

export const getShopifyPages = (page: Page | AdminPageData) => {
  const { shopifyPages, type } = page;
  if (type === 'article') {
    const _shopifyPagesOfArticlePage = shopifyPages as ArticlePageLiquidVariable[] | 'all' | undefined;
    const _shopifyPageIdsOfArticlePage = Array.isArray(_shopifyPagesOfArticlePage)
      ? _shopifyPagesOfArticlePage.reduce<ArticlePage['shopifyPages']>((ids, page) => {
          if (page && 'blogId' in page) {
            return ids.concat({ itemId: page.itemId, blogId: page.blogId });
          }
          return ids;
        }, [])
      : [];

    return _shopifyPageIdsOfArticlePage;
  }
  if (type === 'product' || type === 'collection') {
    const _shopifyPagesOfProductAndCollectionPage = shopifyPages as
      | Array<ProductPageLiquidVariable | CollectionPageLiquidVariable>
      | 'all'
      | undefined;

    const _shopifyPageIdsOfProductAndCollectionPage = Array.isArray(_shopifyPagesOfProductAndCollectionPage)
      ? _shopifyPagesOfProductAndCollectionPage.reduce<Product_Collection_Page['shopifyPages']>((ids, page) => {
          if (page && 'itemId' in page) {
            return ids.concat(page);
          }
          return ids;
        }, [])
      : undefined;
    return _shopifyPageIdsOfProductAndCollectionPage;
  }
  throw new Error('getShopifyPageIds -> thêm type');
};

export const getIdOfGlobalJsFile = ({ commandId }: Page | AdminPageData) => `globalJs_${commandId}` as const;
export const getIdOfGlobalCssFile = ({ commandId }: Page | AdminPageData) => `globalCss_${commandId}` as const;
export const getIdOfVendorsJsFile = ({ commandId }: Page | AdminPageData) => `vendorsJs_${commandId}` as const;
export const getIdOfVendorsCssFile = ({ commandId }: Page | AdminPageData) => `vendorsCss_${commandId}` as const;
