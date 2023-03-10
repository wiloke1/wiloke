import { all, put, retry, select } from 'redux-saga/effects';
import { adapterGetAddons } from 'services/AddonService/Adapters/adapterGetAddons';
import { getChangelogsOfAtom as getChangelogsOfAddonAtom } from 'services/AddonService/Logic/Changelogs';
import { getChangelogsOfAtom as getChangelogsOfMegamenuAtom } from 'services/MegaMenuService/Logic/Changelogs';
import { getChangelogsOfAtom as getChangelogsOfSectionAtom } from 'services/SectionService/Logic/Changelogs';
import { getAddonsOfThemeAtom } from 'services/ThemeService/Logic/getAddonsOfThemeAtom';
import { getHeaderOrFooterSectionsOfThemeAtom } from 'services/ThemeService/Logic/getHeaderOrFooterSectionsOfThemeAtom';
import { getMegamenusOfSectionInThemeAtom } from 'services/ThemeService/Logic/getMegamenusOfSectionInThemeAtom';
import { getPageOfThemeAtom } from 'services/ThemeService/Logic/getPageOfThemeAtom';
import { getThemeAtom } from 'services/ThemeService/Logic/getThemeAtom';
import { setLayoutSettings } from 'store/actions/actionLayoutSettings';
import { getPage, setPages } from 'store/actions/actionPages';
import { getAddonVersion, getSectionVersion } from 'store/actions/versions/actionSectionVersion';
import { updateCssVariables } from 'store/global/cssVariables/slice';
import { setGlobalThemeJs } from 'store/global/globalThemeJs/slice';
import { setGlobalThemeScss } from 'store/global/globalThemeScss/slice';
import { setFileLanguageActive, setGlobalThemeTranslation } from 'store/global/globalTranslation/slice';
import { setMegaMenusOfHeaderFooter } from 'store/global/megaMenusOfHeaderFooter';
import { getThemeAddons } from 'store/global/themeAddons/actions';
import { getThemeFooters, getThemeHeaders } from 'store/global/themeHeaderFooter/action';
import { setThemeGeneralSettings } from 'store/global/themeSettings/slice';
import { setThemeVendors } from 'store/global/themeVendors/slice';
import { defaultPickerRelateShopifySelector } from 'store/selectors';
import { Page } from 'types/Page';
import { VersionSection } from 'types/Version';
import { adapterAddonsHadShopifyData } from 'utils/adapterAddonHadShopifyData';
import { adapterSectionsHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { at } from 'utils/at';
import getPageInfo from 'utils/functions/getInfo';
import reorder from 'utils/functions/reorder';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { actionGetCurrentTheme } from '../../../actions';

export function* handleGetThemeAtom({ payload }: ReturnType<typeof actionGetCurrentTheme.request>) {
  const { themeId, variant } = payload;
  const pageId = getPageInfo('id');
  try {
    const { data: defaultPickerRelateShopifyData }: ReturnType<typeof defaultPickerRelateShopifySelector> = yield select(
      defaultPickerRelateShopifySelector,
    );

    const { article, blog, collection, product } = defaultPickerRelateShopifyData;

    /** X??? l?? l???y th??ng tin c???a theme */
    const responseTheme: Awaited<ReturnType<typeof getThemeAtom>> = yield retry(3, 500, getThemeAtom, { commandId: themeId });

    /** X??? l?? l???y th??ng tin page */
    const pageCommandIds = responseTheme.pageCommandIds;
    const pagesResponse: Array<Awaited<ReturnType<typeof getPageOfThemeAtom>>> = yield all(
      pageCommandIds.map(pageCommandId => {
        return retry(3, 1000, getPageOfThemeAtom, { commandId: pageCommandId });
      }),
    );
    // ?????o v??? tr?? c???a page theo pageId ??? tr??n params
    const matchPageIndex = pagesResponse.findIndex(page => page.commandId === pageId);
    const pagesAfterReorder = reorder(pagesResponse, matchPageIndex, 0);

    const pages = pagesAfterReorder.reduce<Record<string, Page>>((acc, page) => {
      return {
        ...acc,
        [page.commandId]: {
          ...page,
          sections: [],
          enable: true,
        } as Page,
      };
    }, {});

    yield put(setPages(pages));

    // TODO: T???m th???i ????? true
    const needExecuteAdapter = true; //responseTheme.userId.toString() !== userId.toString();

    /** X??? l?? l???y header */
    const headerResponse: Awaited<ReturnType<typeof getHeaderOrFooterSectionsOfThemeAtom>> = yield retry(
      3,
      1000,
      getHeaderOrFooterSectionsOfThemeAtom,
      { commandIds: responseTheme.headerSectionCommandIds },
    );
    const headers = needExecuteAdapter
      ? adapterSectionsHadShopifyData({ sections: headerResponse, article, blog, collection, product, isImportAction: false })
      : headerResponse;

    yield put(getThemeHeaders.success({ headers }));

    /** X??? l?? header sections version */
    const headerSectionSourceIds = Array.from(
      new Set(
        headerResponse.reduce<string[]>((res, headerSection) => {
          if ('parentCommandId' in headerSection && headerSection.parentCommandId) {
            return res.concat(headerSection.parentCommandId);
          }
          return res;
        }, []),
      ),
    );
    yield all(
      headerSectionSourceIds.map(headerSectionCommandId => {
        return put(getSectionVersion.request({ sectionCommandId: headerSectionCommandId }));
      }),
    );
    const headerSectionVersionResponses: Array<Awaited<ReturnType<typeof getChangelogsOfSectionAtom>>> = yield all(
      headerSectionSourceIds.map(headerSectionCommandId => {
        return retry(3, 1000, getChangelogsOfSectionAtom, headerSectionCommandId);
      }),
    );
    const headerSectionsVersion = headerSectionVersionResponses.reduce<Array<{ version: VersionSection | undefined; sectionCommandId: string }>>(
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
    yield all(headerSectionsVersion.map(({ sectionCommandId, version }) => put(getSectionVersion.success({ sectionCommandId, data: version }))));

    /** X??? l?? l???y footer */
    const footerResponse: Awaited<ReturnType<typeof getHeaderOrFooterSectionsOfThemeAtom>> = yield retry(
      3,
      1000,
      getHeaderOrFooterSectionsOfThemeAtom,
      { commandIds: responseTheme.footerSectionCommandIds },
    );
    const footers = needExecuteAdapter
      ? adapterSectionsHadShopifyData({ sections: footerResponse, article, blog, collection, product, isImportAction: false })
      : footerResponse;
    yield put(getThemeFooters.success({ footers }));

    /** X??? l?? footer sections version */
    const footerSectionSourceIds = Array.from(
      new Set(
        footerResponse.reduce<string[]>((res, footerSection) => {
          if ('parentCommandId' in footerSection && footerSection.parentCommandId) {
            return res.concat(footerSection.parentCommandId);
          }
          return res;
        }, []),
      ),
    );
    yield all(
      footerSectionSourceIds.map(footerSectionCommandId => {
        return put(getSectionVersion.request({ sectionCommandId: footerSectionCommandId }));
      }),
    );
    const footerSectionVersionResponses: Array<Awaited<ReturnType<typeof getChangelogsOfSectionAtom>>> = yield all(
      footerSectionSourceIds.map(footerSectionCommandId => {
        return retry(3, 1000, getChangelogsOfSectionAtom, footerSectionCommandId);
      }),
    );
    const footerSectionsVersion = footerSectionVersionResponses.reduce<Array<{ version: VersionSection | undefined; sectionCommandId: string }>>(
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
    yield all(footerSectionsVersion.map(({ sectionCommandId, version }) => put(getSectionVersion.success({ sectionCommandId, data: version }))));

    /** X??? l?? l???y addon */
    const addonResponse: Awaited<ReturnType<typeof getAddonsOfThemeAtom>> = yield retry(3, 1000, getAddonsOfThemeAtom, {
      addonCommandIds: responseTheme.addonCommandIds,
    });
    const addons = adapterGetAddons(
      needExecuteAdapter ? adapterAddonsHadShopifyData({ addons: addonResponse, article, blog, collection, product }) : addonResponse,
    );
    yield put(getThemeAddons.success({ addons }));

    /** X??? l?? addon addons version */
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
          return lastResult.concat({ addonCommandId, version: version_ });
        }
        return lastResult.concat({ addonCommandId, version: undefined });
      },
      [],
    );
    yield all(addonSectionsVersion.map(({ addonCommandId, version }) => put(getAddonVersion.success({ addonCommandId, data: version }))));

    /** X??? l?? l???y megamenu c???a header, footer, addon */
    const megamenuResponses: Array<Awaited<ReturnType<typeof getMegamenusOfSectionInThemeAtom>> | undefined> = yield all(
      [...footers, ...headers].map(section => {
        const { megaMenuCommandIds } = section;
        if (megaMenuCommandIds && megaMenuCommandIds.length) {
          return retry(3, 1000, getMegamenusOfSectionInThemeAtom, { megamenuCommandIds: megaMenuCommandIds });
        }
        return [];
      }),
    );

    yield all(
      megamenuResponses.map(megamenuResponse => {
        if (megamenuResponse && megamenuResponse.length > 0) {
          return put(setMegaMenusOfHeaderFooter(megamenuResponse));
        }
      }),
    );

    /** X??? l?? megamenu version */
    const megamenuSectionSourceIds = Array.from(
      new Set(
        megamenuResponses.reduce<string[]>((res, megamenuResponse) => {
          if (megamenuResponse) {
            megamenuResponse.map(megamenuSection => {
              if ('parentCommandId' in megamenuSection && megamenuSection.parentCommandId) {
                res.push(megamenuSection.parentCommandId);
              }
            });
          }
          return res;
        }, []),
      ),
    );

    yield all(
      megamenuSectionSourceIds.map(sectionSectionCommandId => {
        return put(getSectionVersion.request({ sectionCommandId: sectionSectionCommandId }));
      }),
    );
    const megamenuSectionVersionResponses: Array<Awaited<ReturnType<typeof getChangelogsOfMegamenuAtom>>> = yield all(
      megamenuSectionSourceIds.map(megamenuSectionSourceId => {
        return retry(3, 1000, getChangelogsOfMegamenuAtom, megamenuSectionSourceId);
      }),
    );
    const megamenuSectionsVersion = megamenuSectionVersionResponses.reduce<Array<{ version: VersionSection | undefined; megamenuCommandId: string }>>(
      (lastResult, sectionVersionResponse) => {
        const { sectionCommandId, data } = sectionVersionResponse;
        if (data.length) {
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
          return lastResult.concat({ megamenuCommandId: sectionCommandId, version: version_ });
        }
        return lastResult.concat({ megamenuCommandId: sectionCommandId, version: undefined });
      },
      [],
    );
    yield all(
      megamenuSectionsVersion.map(({ megamenuCommandId, version }) =>
        put(getSectionVersion.success({ sectionCommandId: megamenuCommandId, data: version })),
      ),
    );

    const { themeSettings, vendors, globalJs, globalScss } = responseTheme;
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

      if (globalTranslations !== undefined && Object.keys(globalTranslations).length > 0) {
        yield put(setFileLanguageActive(Object.keys(globalTranslations)[0]));
      }
    }

    yield put(actionGetCurrentTheme.success({ themeId: responseTheme.commandId }));

    yield put(getPage.request({ id: pageId, variant }));
  } catch (error) {
    const error_ = error as Error;
    notifyAxiosHandler.handleError(error_);
    yield put(actionGetCurrentTheme.failure({ themeId }));
    yield put(getThemeHeaders.failure(undefined));
    yield put(getThemeFooters.failure(undefined));
    yield put(getThemeAddons.failure(undefined));
  }
}
