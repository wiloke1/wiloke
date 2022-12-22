import { useSelector } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import {
  useSyncMegaMenuOfHeaderFooterToPages,
  useSyncThemeFootersToPages,
  useSyncThemeHeaderToPages,
  useUpdateAddonToPages,
} from 'store/actions/actionPages';
import { useSyncMegaMenusOfHeaderFooter } from 'store/global/megaMenusOfHeaderFooter';
import { useUpdateAddon } from 'store/global/themeAddons';
import { useSetThemeFooters, useSetThemeHeaders } from 'store/global/themeHeaderFooter/slice';
import { pagesDataSelector, pageSectionsSelector, pagesSelector, sectionIdActiveSelector } from 'store/selectors';
import { isFooter, isHeader, isSectionAddons, isSectionMegamenu } from 'utils/functions/checkSectionType';
import { deepFind } from 'utils/functions/deepFind';
import getPageInfo from 'utils/functions/getInfo';

/*
  Hook lắng nghe sự thay đổi của header, footer và addons khi đang build theme
  Tác dụng: Cập nhật header, footer và addons cho những page đã load rồi
*/

export const useListenHeaderFooterAddonUpdate = () => {
  const themeId = getPageInfo('themeId');
  const pageId = getPageInfo('id');
  const pageSections = useSelector(pageSectionsSelector);
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const pages = useSelector(pagesSelector);
  const pagesData = useSelector(pagesDataSelector);
  // const { megaMenusOfHeaderFooter } = useSelector(megaMenusOfHeaderFooterSelector);

  const lengthPages = Object.keys(pagesData).length;

  const sectionActive = pageSections.find(section => section.id === sectionIdActive);
  const header = pageSections.filter(section => isHeader(section.type));
  const footer = pageSections.filter(section => isFooter(section.type));

  const megaMenusInPage = pageSections.filter(section => isSectionMegamenu(section.type));
  // const megaMenusOfHeaderFooterIds = megaMenusOfHeaderFooter.map(item => item.id);
  // const megaMenus = megaMenusInPage.filter(item => megaMenusOfHeaderFooterIds.includes(item.id));

  const sectionHeadersFooters = pageSections.filter(section => isHeader(section.type) || isFooter(section.type));
  const megaMenusOfHeaderFooterIds = deepFind(sectionHeadersFooters, 'megaMenuId');
  const megaMenus = megaMenusInPage.filter(item => megaMenusOfHeaderFooterIds.includes(item.id));

  const updateAddon = useUpdateAddon();
  const updateAddonToPages = useUpdateAddonToPages();
  const setThemeHeaders = useSetThemeHeaders();
  const setThemeFooters = useSetThemeFooters();
  const syncMegaMenusOfHeaderFooter = useSyncMegaMenusOfHeaderFooter();

  const syncThemeHeaderToPage = useSyncThemeHeaderToPages();
  const syncThemeFooterToPage = useSyncThemeFootersToPages();
  const syncMegaMenuToPage = useSyncMegaMenuOfHeaderFooterToPages();

  // Note: @duong -> lắng nghe addons thay đổi để cập nhận vào reducerPage và reduceThemeAddons
  useDeepCompareEffect(() => {
    if (!!sectionActive && isSectionAddons(sectionActive.type)) {
      updateAddon({ section: sectionActive });
      updateAddonToPages(sectionActive);
    }
  }, [sectionActive ?? []]);

  useDeepCompareEffect(() => {
    if (themeId) {
      if (pages.status[pageId] === 'success' && pageSections.length > 0) {
        setThemeHeaders({ headers: header });
      }
    }
  }, [header, [themeId, pageId]]);

  useDeepCompareEffect(() => {
    if (themeId) {
      if (pages.status[pageId] === 'success' && pageSections.length > 0) {
        syncMegaMenusOfHeaderFooter(megaMenus);
      }
    }
  }, [megaMenus, [themeId, pageId]]);

  useDeepCompareEffect(() => {
    if (themeId) {
      if (pages.status[pageId] === 'success' && pageSections.length > 0) {
        setThemeFooters({ footers: footer });
      }
    }
  }, [footer, [themeId, pageId]]);

  // note: Update header, footer vào section khi các page !== page hiện có data section
  useDeepCompareEffect(() => {
    if (themeId) {
      if (pages.status[pageId] === 'success' && lengthPages > 1) {
        syncThemeHeaderToPage();
      }
    }
  }, [[lengthPages, themeId, pageId], header]);

  useDeepCompareEffect(() => {
    if (themeId) {
      if (pages.status[pageId] === 'success' && lengthPages > 1) {
        syncThemeFooterToPage();
      }
    }
  }, [[lengthPages, themeId, pageId], footer]);

  useDeepCompareEffect(() => {
    if (themeId) {
      if (pages.status[pageId] === 'success' && lengthPages > 1) {
        syncMegaMenuToPage();
      }
    }
  }, [[lengthPages, themeId, pageId], header, footer, megaMenus]);

  return null;
};
