import { all, retry, select } from '@redux-saga/core/effects';
import { changeSelectPageType } from 'containers/Admin/PageBuilder/TemplatesPage';
import { put } from 'redux-saga/effects';
import { getMegaMenusOfPageClientUseAtomTemplate } from 'services/PageService/Logic/getMegaMenusOfPageClientUseAtomTemplate';
import { getPageClientUseAtomTemplate } from 'services/PageService/Logic/getPageClientUseAtomTemplate';
import { getSectionsOfPageClientUseAtomTemplate } from 'services/PageService/Logic/getSectionsOfPageClientUseAtomTemplate';
import { getChangelogsOfAtom } from 'services/SectionService/Logic/Changelogs';
import { addMegaMenusToPage, getPage } from 'store/actions/actionPages';
import { setVendors } from 'store/actions/actionVendors';
import { getSectionVersion } from 'store/actions/versions/actionSectionVersion';
import { setGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { setGlobalJs } from 'store/global/globalJs/slice';
import { setGlobalScss } from 'store/global/globalScss/slice';
import { getGeneralSettingsPage } from 'store/global/statusGeneralSettings/actions';
import { defaultPickerRelateShopifySelector } from 'store/selectors';
import { ClientPage, PageType } from 'types/Page';
import { VersionSection } from 'types/Version';
import { adapterSectionsHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { at } from 'utils/at';

export function* handleGetPageClientUseAtomTemplate_({ payload }: ReturnType<typeof getPage.request>) {
  const { id } = payload;
  try {
    /** Xử lý "pageSettings" */
    const page: Awaited<ReturnType<typeof getPageClientUseAtomTemplate>> = yield retry(3, 1000, getPageClientUseAtomTemplate, { commandId: id });
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
    const sections: Awaited<ReturnType<typeof getSectionsOfPageClientUseAtomTemplate>> = yield retry(
      3,
      1000,
      getSectionsOfPageClientUseAtomTemplate,
      { sectionCommandIds },
    );

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
    const megamenuResponses: Array<Awaited<ReturnType<typeof getMegaMenusOfPageClientUseAtomTemplate>> | undefined> = yield all(
      sections.map(section => {
        const { megaMenuCommandIds } = section;
        if (megaMenuCommandIds?.length) {
          return retry(3, 1000, getMegaMenusOfPageClientUseAtomTemplate, { megamenuCommandIds: megaMenuCommandIds });
        }
      }),
    );
    /** Xử lý megamenu version */

    // NOTE: @tuong -> Dùng page được publish bởi 1 người khác + Dữ liệu shopify của mỗi shop là không giống nhau => Có thể check như thế này để gán lại dữ liệu shopify vào các picker cũng như những thứ khác liên quan đến shopify
    const { data: defaultPickerRelateShopifyData }: ReturnType<typeof defaultPickerRelateShopifySelector> = yield select(
      defaultPickerRelateShopifySelector,
    );
    const { article, blog, collection, product } = defaultPickerRelateShopifyData;

    // TODO: Utils transform thay vì ép kiểu
    const final_page: ClientPage = {
      ...page,
      parentCommandId: page.parentCommandId ?? undefined,
      image: page.image ?? { src: '', width: 0, height: 0 },
      // @tuong -> Convert dữ liệu liên quan đến shopify từ page mẫu
      sections: adapterSectionsHadShopifyData({
        sections,
        article,
        blog,
        collection,
        product,
        isImportAction: true,
      }),
      type: payload.type ?? (page.type as PageType),
      label: payload.name ?? page.label,
      // NOTE: @tuong -> Client dùng mẫu -> Chắc chắn phải chọn entity shopify từ bên ngoài và chưa publish
      shopifyRepresentPage: payload.shopifyRepresentPage,
      shopifyPages: payload.shopifyPages,
      enable: false,
    };

    yield put(getPage.success({ result: final_page }));
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
