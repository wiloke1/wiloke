export const liquidVariablesIsRequesting = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { store } = require('store/configureStore');
  const state = store.getState() as AppState;
  const {
    blogSlugsLoading,
    pageSlugsLoading,
    productIdsLoading,
    collectionIdsLoading,
    translationLocalesLoading,
    blogSlugsFailed,
    pageSlugsFailed,
    productIdsFailed,
    collectionIdsFailed,
    translationLocalesFailed,
    statusRequestCartObject,
    statusRequestCustomerObject,
    statusRequestLocalizationObject,
    statusRequestShopObject,
    statusRequestThemeCssObject,
  } = state.liquidVariables;

  return (
    statusRequestCartObject === 'loading' ||
    statusRequestCustomerObject === 'loading' ||
    statusRequestLocalizationObject === 'loading' ||
    statusRequestShopObject === 'loading' ||
    statusRequestThemeCssObject === 'loading' ||
    blogSlugsLoading.length ||
    pageSlugsLoading.length ||
    productIdsLoading.length ||
    collectionIdsLoading.length ||
    translationLocalesLoading.length ||
    blogSlugsFailed.length ||
    pageSlugsFailed.length ||
    productIdsFailed.length ||
    collectionIdsFailed.length ||
    translationLocalesFailed.length
  );
};
