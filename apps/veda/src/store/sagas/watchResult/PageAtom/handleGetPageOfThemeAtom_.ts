import { all, retry, select } from '@redux-saga/core/effects';
import { changeSelectPageType } from 'containers/Admin/PageBuilder/TemplatesPage';
import { put } from 'redux-saga/effects';
import { getChangelogsOfAtom } from 'services/SectionService/Logic/Changelogs';
import { getMegamenusOfSectionInThemeAtom } from 'services/ThemeService/Logic/getMegamenusOfSectionInThemeAtom';
import { getPageOfThemeAtom } from 'services/ThemeService/Logic/getPageOfThemeAtom';
import { getSectionsOfPageInThemeAtom } from 'services/ThemeService/Logic/getSectionsOfPageInThemeAtom';
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
import { DevPage, PageType } from 'types/Page';
import { VersionSection } from 'types/Version';
import { adapterSectionsHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { at } from 'utils/at';
import { getDefaultShopifyPresentPage } from 'utils/getDefaultShopifyPresentPage';

export function* handleGetPageOfThemeAtom_({ payload }: ReturnType<typeof getPage.request>) {
  const { id } = payload;
  try {
    /** Lấy ra các entity shopify đại diện */
    const { data: defaultPickerRelateShopifyData }: ReturnType<typeof defaultPickerRelateShopifySelector> = yield select(
      defaultPickerRelateShopifySelector,
    );
    const { article, blog, collection, product } = defaultPickerRelateShopifyData;

    /** Xử lý "pageSettings" */
    const page: Awaited<ReturnType<typeof getPageOfThemeAtom>> = yield retry(3, 1000, getPageOfThemeAtom, { commandId: id });
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
    const sections: Awaited<ReturnType<typeof getSectionsOfPageInThemeAtom>> = yield retry(3, 1000, getSectionsOfPageInThemeAtom, {
      sectionCommandIds,
    });

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
    const megamenuResponses: Array<Awaited<ReturnType<typeof getMegamenusOfSectionInThemeAtom>> | undefined> = yield all(
      sections.map(section => {
        if (section?.megaMenuCommandIds && section.megaMenuCommandIds.length) {
          return retry(3, 1000, getMegamenusOfSectionInThemeAtom, { megamenuCommandIds: section.megaMenuCommandIds });
        }
      }),
    );
    /** Xử lý megamenu version */

    /** Xử lý apply cho entity shopify */
    const shopifyPages_ = 'all';
    const shopifyRepresentPage_ = getDefaultShopifyPresentPage({
      article,
      blog,
      collection,
      product,
      pageType: page.type as PageType,
    });

    const needExecuteAdapter = true;
    const checkPayloadEmpty = payload.shopifyRepresentPage?.handle === '' || payload.shopifyRepresentPage?.handle === undefined;

    // TODO: Utils transform thay vì ép kiểu
    const final_page: DevPage = {
      ...page,
      sections: needExecuteAdapter
        ? adapterSectionsHadShopifyData({
            sections,
            article,
            blog,
            collection,
            product,
            isImportAction: false,
          })
        : sections,
      type: payload.type ?? (page.type as PageType),
      label: payload.name ?? page.label,
      status: page.status as DevPage['status'],
      // NOTE: @tuong -> "page.shopifyRepresentPage" không có chứng tỏ là tạo mới
      // NOTE: @tuong -> "page.shopifyRepresentPage" chỉ có khi
      // 1. Update lại page
      // 2. Dùng template của chính nó (User)
      shopifyRepresentPage: checkPayloadEmpty ? shopifyRepresentPage_ : payload.shopifyRepresentPage,
      shopifyPages: payload.shopifyPages ?? shopifyPages_,
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
    yield put(setThemeAddonsToPages(themeAddonsBody));
    yield put(setThemeHeaderFooterToPages({ footers, headers }));
    yield put(setMegaMenusOfHeaderFooterToPages({ megaMenus: megaMenusOfHeaderFooter }));
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
