import { all, retry, select } from '@redux-saga/core/effects';
import { put } from 'redux-saga/effects';
// import { shopifyConnectionService } from 'services/OutputOfBuilderService';
import { getMegamenusOfPageClient } from 'services/PageService/Logic/getMegamenusOfPageClient';
import { getPageClient } from 'services/PageService/Logic/getPageClient';
import { getSectionsOfPageClient } from 'services/PageService/Logic/getSectionsOfPageClient';
import { getChangelogsOfAtom } from 'services/SectionService/Logic/Changelogs';
import {
  addMegaMenusToPage,
  getPage,
  setMegaMenusOfHeaderFooterToPages,
  setThemeAddonsToPages,
  setThemeHeaderFooterToPages,
} from 'store/actions/actionPages';
import { setVendors } from 'store/actions/actionVendors';
import { getSectionVersion } from 'store/actions/versions/actionSectionVersion';
import { setGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { setGlobalJs } from 'store/global/globalJs/slice';
import { setGlobalScss } from 'store/global/globalScss/slice';
import { megaMenusOfHeaderFooterSelector } from 'store/global/megaMenusOfHeaderFooter';
import { getGeneralSettingsPage } from 'store/global/statusGeneralSettings/actions';
import { addMultiAddons } from 'store/global/themeAddons';
import { defaultPickerRelateShopifySelector, themeAddonsSelector, themeHeaderFooterSelector } from 'store/selectors';
import { ClientPage, PageType } from 'types/Page';
import { VersionSection } from 'types/Version';
import { at } from 'utils/at';
import { getDefaultShopifyPresentPage } from 'utils/getDefaultShopifyPresentPage';

export function* handleGetPageOfThemeClient_({ payload }: ReturnType<typeof getPage.request>) {
  const { id } = payload;
  try {
    /** Xử lý "pageSettings" */
    const page: Awaited<ReturnType<typeof getPageClient>> = yield retry(3, 1000, getPageClient, { commandId: id });
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
    const sections: Awaited<ReturnType<typeof getSectionsOfPageClient>> = yield retry(3, 1000, getSectionsOfPageClient, { sectionCommandIds });

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
    const sectionVersionResponses: Array<Awaited<ReturnType<typeof getChangelogsOfAtom>>> = yield all(
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
    const megamenuResponses: Array<Awaited<ReturnType<typeof getMegamenusOfPageClient>> | undefined> = yield all(
      sections.map(section => {
        const { megaMenuCommandIds } = section;
        if (megaMenuCommandIds?.length) {
          return retry(3, 1000, getMegamenusOfPageClient, { megamenuCommandIds: megaMenuCommandIds });
        }
      }),
    );
    /** Xử lý megamenu version */

    /** Xử lý lấy shopify data */
    // const getShopifySlugs: Awaited<ReturnType<typeof shopifyConnectionService.getAdditionalDataRelateToShopify>> = yield retry(
    //   3,
    //   1000,
    //   shopifyConnectionService.getAdditionalDataRelateToShopify,
    //   { pageCommandId: page.commandId },
    // );
    // const shopifyPages_ =
    //   getShopifySlugs.info === undefined ? undefined : getShopifySlugs.info.isApplyToAll ? 'all' : getShopifySlugs.info.shopifyPages;
    // const shopifyRepresentPage_ = getShopifySlugs.info === undefined ? undefined : getShopifySlugs.info.shopifyRepresentPage;

    /** Lấy ra các entity shopify đại diện */
    // FIXME: Liệu có đúng?
    const { data: defaultPickerRelateShopifyData }: ReturnType<typeof defaultPickerRelateShopifySelector> = yield select(
      defaultPickerRelateShopifySelector,
    );
    const { article, blog, collection, product } = defaultPickerRelateShopifyData;
    const shopifyPages_ = 'all';
    const shopifyRepresentPage_ = getDefaultShopifyPresentPage({
      article,
      blog,
      collection,
      product,
      pageType: page.type as PageType,
    });

    // TODO: Utils transform thay vì ép kiểu
    const final_page: ClientPage = {
      ...page,
      parentCommandId: page.parentCommandId ?? undefined,
      image: page.image ?? { src: '', width: 0, height: 0 },
      sections,
      type: payload.type ?? (page.type as PageType),
      label: payload.name ?? page.label,
      // @tuong -> Vì page của theme là "isApplyAll=true" nên BE sẽ trả về đại diện 1 item và mặc định page của theme có "isPublished=true"
      shopifyRepresentPage: shopifyRepresentPage_,
      shopifyPages: shopifyPages_,
      enable: true,
    };

    yield put(getPage.success({ result: final_page }));
    yield all(
      megamenuResponses.map(megamenuResponse => {
        if (megamenuResponse) {
          return put(addMegaMenusToPage(megamenuResponse));
        }
      }),
    );

    // sau khi getPage/success thì thêm addons, footer,header và mega menus của header,footer vào pages
    const { footers, headers }: ReturnType<typeof themeHeaderFooterSelector> = yield select(themeHeaderFooterSelector);
    const { megaMenusOfHeaderFooter }: ReturnType<typeof megaMenusOfHeaderFooterSelector> = yield select(megaMenusOfHeaderFooterSelector);

    const { data: addons }: ReturnType<typeof themeAddonsSelector> = yield select(themeAddonsSelector);
    const themeAddonsBody = addons.map(item => item.body).filter(Boolean) ?? [];
    yield put(addMultiAddons({ addons: addons }));
    yield put(setThemeHeaderFooterToPages({ footers, headers }));
    yield put(setThemeAddonsToPages(themeAddonsBody));
    yield put(setMegaMenusOfHeaderFooterToPages({ megaMenus: megaMenusOfHeaderFooter }));
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message;
      yield put(getPage.failure({ message }));
      yield put(getGeneralSettingsPage.failure(undefined));
      throw error;
    }
  }
}
