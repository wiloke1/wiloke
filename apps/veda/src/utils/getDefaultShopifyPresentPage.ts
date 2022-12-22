import { ArticlePageLiquidVariable, PageLiquidVariable, PageType } from 'types/Page';

interface GetDefaultShopifyPresentPage {
  pageType: PageType;
  article: AppState['defaultPickerFieldRelateShopify']['data']['article'];
  blog: AppState['defaultPickerFieldRelateShopify']['data']['blog'];
  collection: AppState['defaultPickerFieldRelateShopify']['data']['collection'];
  product: AppState['defaultPickerFieldRelateShopify']['data']['product'];
}

export const getDefaultShopifyPresentPage = ({
  article,
  blog,
  collection,
  pageType,
  product,
}: GetDefaultShopifyPresentPage): PageLiquidVariable | undefined => {
  if (pageType === 'product') {
    if (product === 'Không tồn tại') {
      return undefined;
    }
    return product;
  }
  if (pageType === 'collection') {
    if (collection === 'Không tồn tại') {
      return undefined;
    }
    return collection;
  }
  if (pageType === 'article') {
    if (blog && blog !== 'Không tồn tại') {
      return {
        blogHandle: blog.handle,
        blogId: blog.id,
        featuredImg: undefined,
        handle: '',
        itemId: -Infinity,
      } as ArticlePageLiquidVariable;
    }
    if (article !== 'Không tồn tại') {
      return article;
    }
    return undefined;
  }
};
