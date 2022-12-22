import { AxiosError } from 'axios';
import { all, put, retry, select, takeLatest } from 'redux-saga/effects';
import { appSettingsService } from 'services/AppSettingsService';
import { setLayoutSettings } from 'store/actions/actionLayoutSettings';
import { getThemeActive } from 'store/actions/shopify/actionShopifyTheme';
import { AppSettings } from 'types/AppSettings';
import customLog from 'utils/functions/log';
import { ErrorData } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { setThemeVendors } from 'store/global/themeVendors/slice';
import { getDefaultPickerFieldRelateShopify } from 'store/actions/liquid/actionDefaultPickerFieldRelateShopify';
import { productService } from 'services/ShopifyServices/ProductService';
import { collectionService } from 'services/ShopifyServices/Collection';
import { shopifyBlogService } from 'services/ShopifyServices/Blog';
import { at } from 'utils/at';
import { appSetupService } from 'services/AppSetupService';
import { authSelector, liquidVariablesSelector } from 'store/selectors';
import { Role } from 'routes/types';
import { getThemeVedaActive } from 'containers/Admin/ThemeBuilder/ThemeDashboard/slice/actions';
import { getThemeVedaActivate } from 'services/ThemeService/Logic/getThemeVedaActivate';
import { getAddonsOfThemeClient } from 'services/ThemeService/Logic/getAddonsOfThemeClient';
import { adapterGetAddons } from 'services/AddonService/Adapters/adapterGetAddons';
import { getAddonVersion } from 'store/actions/versions/actionSectionVersion';
import { getChangelogsOfAtom as getChangelogsOfAddonAtom } from 'services/AddonService/Logic/Changelogs';
import { VersionSection } from 'types/Version';
import { handleGetLocalizationObject } from 'store/sagas/liquid/watchGetLocalizationObject';
import { handleGetThemeObjectNCss } from 'store/sagas/liquid/watchGetThemeObjectNCss';
import { handleGetTranslationObject } from 'store/sagas/liquid/watchGetTranslationsObject';
import { handleGetShopObject } from 'store/sagas/liquid/watchGetShopObject';
import { setOriginThemeSettings } from 'store/reducers/sliceOriginThemeSettings';
import { setVisibleModalMigration } from 'containers/Admin/ThemeBuilder/ThemeDashboard/slice/sliceThemeDashboard';
import { getAppSettings } from '../appSettings/actions';
import { updateCssVariables } from '../cssVariables/slice';
import { setGlobalThemeJs } from '../globalThemeJs/slice';
import { setGlobalThemeScss } from '../globalThemeScss/slice';
import { getGeneralThemeSettings } from '../statusGeneralSettings/actions';
import { setThemeGeneralSettings } from '../themeSettings/slice';
import { setFileLanguageActive, setGlobalThemeTranslation } from '../globalTranslation/slice';
import { getThemeAddons } from '../themeAddons/actions';
import { handleGetLiquidSnippets } from '../globalSnippets/sagas/watchGetLiquidSnippets';
import { handleGetPageCounter } from '../pageCounter/sagas/watchGetPageCounter';
import { globalMount } from './action';

interface ResponseSuccess {
  appSettings: AppSettings;
  productResponse: Awaited<ReturnType<typeof productService.getProducts>>;
  collectionResponse: Awaited<ReturnType<typeof collectionService.getCollections>>;
  blogResponse: Awaited<ReturnType<typeof shopifyBlogService.getBlogStatic>>;
  setupResponse: Awaited<ReturnType<typeof appSetupService>>;
  themeVedaActivate: Awaited<ReturnType<typeof getThemeVedaActivate>>;
  getTranslationObject: undefined;
  getThemeObjectNCss: undefined;
  getLocalizationObject: undefined;
  getShopObject: undefined;
}

function* handle() {
  // get theme settings
  yield put(getGeneralThemeSettings.request(undefined));
  yield put(getAppSettings.request(undefined));

  // get theme active
  yield put(getThemeActive.request(undefined));
  yield put(getThemeVedaActive.request(undefined));

  yield put(getDefaultPickerFieldRelateShopify.request(undefined));

  const authState: ReturnType<typeof authSelector> = yield select(authSelector);
  try {
    const { appSettings, blogResponse, collectionResponse, productResponse, themeVedaActivate }: ResponseSuccess = yield all({
      appSettings: retry(3, 1000, appSettingsService.getAppSettings),
      productResponse: retry(3, 1000, productService.getProducts, ''),
      collectionResponse: retry(3, 1000, collectionService.getCollections, ''),
      blogResponse: retry(3, 1000, shopifyBlogService.getBlogStatic),
      setupResponse: retry(3, 1000, appSetupService, authState.role as Role),
      themeVedaActivate: retry(3, 1000, getThemeVedaActivate),
      getTranslationObject: handleGetTranslationObject({ type: '@LiquidVariables/getLiquidTranslationsObjectRequest', payload: {} }),
      getThemeObjectNCss: handleGetThemeObjectNCss({
        type: '@LiquidVariables/getThemeObjectNCssRequest',
        payload: { variant: 'Action chạy khi vào build hoặc vào client theme manager' },
      }),
      getLocalizationObject: handleGetLocalizationObject({ type: '@LiquidVariables/getLocalizationObjectRequest', payload: undefined }),
      getShopObject: handleGetShopObject({ type: '@LiquidVariables/getShopObjectRequest', payload: undefined }),
      liquidSnippets: handleGetLiquidSnippets({ type: '@Global/getLiquidSnippets/request', payload: {} }),
      pageCounters: handleGetPageCounter({ type: '@Global/getPageCounter/request', payload: undefined }),
    });

    // theme
    yield put(getGeneralThemeSettings.success(undefined));

    const { themeSettings, vendors, globalJs, globalScss, addonCommandIds } = themeVedaActivate;
    if (themeSettings !== undefined && vendors !== undefined && globalJs !== undefined && globalScss !== undefined) {
      const { cssVariables, generalSettings, layoutSettings, globalTranslations } = themeSettings;
      const { colors, fonts } = cssVariables;

      yield put(setLayoutSettings(layoutSettings));
      yield put(updateCssVariables({ colors, fonts }));
      yield put(setThemeGeneralSettings(generalSettings));
      yield put(setGlobalThemeScss(globalScss));
      yield put(setGlobalThemeJs(globalJs));
      yield put(setThemeVendors({ vendors: vendors }));
      yield put(setGlobalThemeTranslation(globalTranslations));

      yield put(
        setOriginThemeSettings({
          generalSettings,
          globalJs,
          globalScss,
          globalTranslations,
          layoutSettings,
          vendors,
          cssVariables: {
            colors,
            fonts,
          },
        }),
      );

      if (globalTranslations !== undefined && Object.keys(globalTranslations).length > 0) {
        yield put(setFileLanguageActive(Object.keys(globalTranslations)[0]));
      }
    }

    // @tuong -> Theme chỉ được cài ở Client nên lấy addon sẽ lấy luôn ở client service

    /** Xử lý lấy addon */
    const addonResponse: Awaited<ReturnType<typeof getAddonsOfThemeClient>> = yield retry(3, 1000, getAddonsOfThemeClient, { addonCommandIds });
    const addons = adapterGetAddons(addonResponse);
    yield put(getThemeAddons.success({ addons }));

    /** Xử lý addon addons version */
    const addonSectionSourceIds = Array.from(
      new Set(
        addonResponse.reduce<string[]>((res, addonSection) => {
          if (addonSection.parentCommandId) {
            return res.concat(addonSection.parentCommandId);
          }
          return res;
        }, []),
      ),
    );
    yield all(
      addonSectionSourceIds.map(addonSectionCommandId => {
        return put(getAddonVersion.request({ addonCommandId: addonSectionCommandId }));
      }),
    );
    const addonSectionVersionResponses: Array<Awaited<ReturnType<typeof getChangelogsOfAddonAtom>>> = yield all(
      addonSectionSourceIds.map(addonSectionCommandId => {
        return retry(3, 1000, getChangelogsOfAddonAtom, addonSectionCommandId);
      }),
    );
    const addonSectionsVersion = addonSectionVersionResponses.reduce<Array<{ version: VersionSection | undefined; addonCommandId: string }>>(
      (lastResult, sectionVersionResponse) => {
        const { addonCommandId, data } = sectionVersionResponse;
        if (data.length) {
          const version = data.reduce<Record<string, VersionSection>>((res, { version, content, versionId }) => {
            const currentValue = res[versionId] as VersionSection | undefined;
            return {
              ...res,
              [versionId]: {
                id: versionId,
                sectionId: versionId,
                version: currentValue?.version ?? version,
                changelogs: (currentValue?.changelogs ?? []).concat({
                  version: version,
                  description: content,
                }),
              },
            };
          }, {});
          const version_ = at(Object.values(version), 0);
          return lastResult.concat({ addonCommandId, version: version_ });
        }
        return lastResult.concat({ addonCommandId, version: undefined });
      },
      [],
    );
    yield all(addonSectionsVersion.map(({ addonCommandId, version }) => put(getAddonVersion.success({ addonCommandId, data: version }))));

    yield put(getAppSettings.success({ data: appSettings }));
    yield put(getThemeVedaActive.success(themeVedaActivate));

    const firstProduct = at(productResponse.info, 0);
    const firstCollection = at(collectionResponse.info, 0);
    const firstBlog = at(blogResponse.info, 0);
    yield put(
      getDefaultPickerFieldRelateShopify.success({
        product: firstProduct
          ? { featuredImg: firstProduct.featuredImage?.src, handle: firstProduct.handle, itemId: Number(firstProduct.id) }
          : 'Không tồn tại',
        collection: firstCollection
          ? { featuredImg: firstCollection.image?.src, handle: firstCollection.handle, itemId: Number(firstCollection.id) }
          : 'Không tồn tại',
        blog: firstBlog ? { featuredImg: undefined, handle: firstBlog.handle, id: firstBlog.id } : 'Không tồn tại',
        article: undefined,
      }),
    );

    // global
    yield put(globalMount.success(undefined));

    // So sánh nếu theme active trên shopify !== với theme active trên veda thì hiện modal migration
    const {
      data: { theme: themeActiveOnShopify },
    }: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
    if (themeActiveOnShopify?.id && themeActiveOnShopify.id.toString() !== authState.themeVedaId) {
      yield put(setVisibleModalMigration(true));
    }
  } catch (error) {
    customLog('watchGlobalMount', `${(error as AxiosError<ErrorData>).response?.data.message}`, error);
    yield put(globalMount.failure(undefined));
    yield put(getAppSettings.failure({ message: '' }));
    yield put(getThemeActive.failure(undefined));
    yield put(getThemeVedaActive.failure(undefined));
    yield put(getDefaultPickerFieldRelateShopify.failure(undefined));
  }
}

export function* watchGlobalMount() {
  yield takeLatest(getActionType(globalMount.request), handle);
}
