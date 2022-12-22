import { all, retry } from '@redux-saga/core/effects';
import { changeSelectPageType } from 'containers/Admin/PageBuilder/TemplatesPage';
import { call, put, SagaReturnType, select } from 'redux-saga/effects';
import { getMegamenusOfPageClient } from 'services/PageService/Logic/getMegamenusOfPageClient';
import { getPageClient } from 'services/PageService/Logic/getPageClient';
import { getSectionsOfPageClient } from 'services/PageService/Logic/getSectionsOfPageClient';
import { getChangelogsOfAtom } from 'services/SectionService/Logic/Changelogs';
import { addMegaMenusToPage, getPage, setThemeAddonsToPages } from 'store/actions/actionPages';
import { setVendors } from 'store/actions/actionVendors';
import { getSectionVersion } from 'store/actions/versions/actionSectionVersion';
import { setGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { setGlobalJs } from 'store/global/globalJs/slice';
import { setGlobalScss } from 'store/global/globalScss/slice';
import { getGeneralSettingsPage } from 'store/global/statusGeneralSettings/actions';
import { addMultiAddons } from 'store/global/themeAddons';
import { themeAddonsSelector } from 'store/selectors';
import { ClientPage, PageGeneral, PageType } from 'types/Page';
import { VersionSection } from 'types/Version';
import { at } from 'utils/at';
import { handleGetDataRelateToShopify } from '../handleGetDataRelateToShopify';

export function* handleGetPageClient_({ payload }: ReturnType<typeof getPage.request>) {
  const { id, type } = payload;
  try {
    /** Xử lý "pageSettings" */
    const page: SagaReturnType<typeof getPageClient> = yield retry(3, 1000, getPageClient, { commandId: id });
    if (page.pageSettings) {
      const { generalSettings, globalJs, globalScss, vendors } = page.pageSettings;
      yield put(
        setGeneralSettingsPage({
          settings: {
            ...generalSettings,
            headerFooterEnabled: generalSettings.headerFooterEnabled ? generalSettings.headerFooterEnabled : payload.headerFooterEnabled,
            label: payload.name ? payload.name : generalSettings.label,
          },
          pageId: payload.id,
        }),
      );
      yield put(setGlobalJs({ js: globalJs ?? '' }));
      yield put(setGlobalScss({ scss: globalScss ?? '' }));
      yield put(setVendors({ vendors: vendors ?? [] }));
    }

    yield put(getGeneralSettingsPage.success(undefined));
    /** Xử lý sections */
    const sectionCommandIds = page.sectionCommandIds;
    const sections: SagaReturnType<typeof getSectionsOfPageClient> = yield retry(3, 1000, getSectionsOfPageClient, { sectionCommandIds });

    /** Xử lý section version */
    const sectionSourceIds = sections.reduce<string[]>((res, section) => {
      if ('parentCommandId' in section && section.parentCommandId) {
        return res.concat(section.parentCommandId);
      }
      return res;
    }, []);
    yield all(
      sectionSourceIds.map(sectionCommandId => {
        return put(getSectionVersion.request({ sectionCommandId: sectionCommandId }));
      }),
    );
    const sectionVersionResponses: Array<SagaReturnType<typeof getChangelogsOfAtom>> = yield all(
      sectionSourceIds.map(sectionCommandId => {
        return retry(3, 1000, getChangelogsOfAtom, sectionCommandId);
      }),
    );
    const sectionsVersion = sectionVersionResponses.reduce<Array<{ version: VersionSection | undefined; sectionCommandId: string }>>(
      (lastResult, sectionVersionResponse) => {
        const { sectionCommandId, data } = sectionVersionResponse;
        const version = data.reduce<Record<string, VersionSection>>(
          (res, { version, content, versionId, createdDateTimestamp, modifiedDateTimestamp }) => {
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
                  createdDateTimestamp,
                  modifiedDateTimestamp,
                }),
              },
            };
          },
          {},
        );
        const version_ = at(Object.values(version), 0);
        return lastResult.concat({ sectionCommandId, version: version_ });
      },
      [],
    );
    yield all(sectionsVersion.map(({ sectionCommandId, version }) => put(getSectionVersion.success({ sectionCommandId, data: version }))));

    /** Xử lý megamenu */
    const megamenuResponses: Array<SagaReturnType<typeof getMegamenusOfPageClient> | undefined> = yield all(
      sections.map(section => {
        const { megaMenuCommandIds } = section;
        if (megaMenuCommandIds?.length) {
          return retry(3, 1000, getMegamenusOfPageClient, { megamenuCommandIds: megaMenuCommandIds });
        }
      }),
    );
    /** Xử lý megamenu version */

    /** Xử lý lấy shopify data */
    let shopifyPages_ = payload.shopifyPages;
    let shopifyRepresentPage_ = payload.shopifyRepresentPage;

    if (
      (page.type === 'collection' ||
        page.type === 'product' ||
        page.type === 'article' ||
        type === 'collection' ||
        type === 'product' ||
        type === 'article') &&
      (!shopifyPages_ || !shopifyRepresentPage_)
    ) {
      const { shopifyPages, shopifyRepresentPage }: SagaReturnType<typeof handleGetDataRelateToShopify> = yield call(handleGetDataRelateToShopify, {
        pageCommandId: page.commandId,
        pageType: type ?? page.type,
      });

      shopifyPages_ = shopifyPages ? shopifyPages : shopifyPages_;
      shopifyRepresentPage_ = shopifyRepresentPage ? shopifyRepresentPage : shopifyRepresentPage_;
    }

    // TODO: Utils transform thay vì ép kiểu
    const final_page: ClientPage = {
      ...page,
      parentCommandId: page.parentCommandId ?? undefined,
      image: page.image ?? { src: '', width: 0, height: 0 },
      sections,
      type: payload.type ?? (page.type as PageType),
      label: payload.name ?? page.label,
      // NOTE: @tuong -> "page.shopifyRepresentPage" không có chứng tỏ là tạo mới
      // NOTE: @tuong -> "page.shopifyRepresentPage" chỉ có khi
      // 1. Update lại page
      // 2. Dùng template của chính nó (User)
      shopifyRepresentPage: shopifyRepresentPage_ as PageGeneral['shopifyRepresentPage'],
      shopifyPages: shopifyPages_ as PageGeneral['shopifyPages'],
      // FIXME: Liệu có đúng?
      // enable: !!getShopifySlugs.info.isPublished,
    };

    yield put(getPage.success({ result: final_page }));
    const { data: addons }: ReturnType<typeof themeAddonsSelector> = yield select(themeAddonsSelector);
    const themeAddonsBody = addons.map(item => item.body).filter(Boolean) ?? [];
    yield put(addMultiAddons({ addons: addons }));
    yield put(setThemeAddonsToPages(themeAddonsBody));

    yield all(
      megamenuResponses.map(megamenuResponse => {
        if (megamenuResponse) {
          return put(addMegaMenusToPage(megamenuResponse));
        }
      }),
    );
    yield put(changeSelectPageType(final_page.type));
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message;
      yield put(getPage.failure({ message }));
      yield put(getGeneralSettingsPage.failure(undefined));
      throw error;
    }
  }
}
