import {
  reducerAddBlock,
  reducerAddBlockChild,
  reducerAddSetting,
  reducerDeleteBlock,
  reducerDeleteBlockChild,
  reducerDeleteSetting,
  reducerEditBlock,
  reducerEditBlockChild,
  reducerEditSetting,
  reducerInsertBlock,
  reducerInsertBlockChild,
  reducerInsertSetting,
  reducerSortBlock,
  reducerSortBlockChild,
  reducerSortSetting,
} from 'containers/BuilderPage/components/SchemaField';
import { reducerPasteBlock } from 'containers/BuilderPage/components/SchemaField/utils/blocks/pasteBlock';
import { reducerPasteSetting } from 'containers/BuilderPage/components/SchemaField/utils/settings/pasteSetting';
import { dissoc, insert, insertAll } from 'ramda';
import { updateSectionVersion } from 'store/actions/versions/actionSectionVersion';
import { Page, PageId } from 'types/Page';
import { Schema, SchemaSettingField, SectionSetting, SectionSettings, SettingArray, SettingArrayValue } from 'types/Schema';
import { PageSection } from 'types/Sections';
import { Consts } from 'utils/constants/constants';
import { isDefault, isFooter, isHeader, isMain, isSectionAddons, isSectionAddonsOrMegamenu } from 'utils/functions/checkSectionType';
import { deepFind } from 'utils/functions/deepFind';
import { getAddonHtml } from 'utils/functions/getAddonHtml';
import getPageInfo from 'utils/functions/getInfo';
import { removeDuplicate, removeDuplicateByKey } from 'utils/functions/removeDuplicate';
import removeRedundantLines from 'utils/functions/removeRedundantLines';
import reorder from 'utils/functions/reorder';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { v4 } from 'uuid';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { reorderSectionWithType } from 'utils/functions/reorderSection';
import {
  addAddonsInSection,
  addArraySettingChildren,
  addArraySettingComponent,
  addElement,
  addMegaMenusToPage,
  addMegaMenuToPage,
  addSection,
  addToFooter,
  addToHeader,
  addToMain,
  cancelCode,
  changeMegaMenuSection,
  changeSection,
  copySchema,
  deleteArraySettingChildren,
  deleteSection,
  duplicateArraySettingChildren,
  duplicateSection,
  getPage,
  pasteSchema,
  publishPage,
  removeAddonsInSection,
  renameSection,
  reorderSettings,
  resetDefaultPages,
  setAddonToPages,
  setMegaMenusOfHeaderFooterToPages,
  setPage,
  setPageAfterCreate,
  setPageIdCommandId,
  setPageLabel,
  setPages,
  setRequestStatusPage,
  setSectionLabel,
  setSections,
  setThemeAddonsToPages,
  setThemeHeaderFooterToPages,
  sortableSection,
  sortArraySettingChildren,
  syncMegaMenuOfHeaderFooterToPages,
  syncThemeFootersToPages,
  syncThemeHeadersToPages,
  toggleObjectField,
  toggleVisibleSection,
  updateAddonToPages,
  updateFieldHiddenValue,
  updatePage,
  updateSchemaBlocks,
  updateSchemaSettings,
  updateMainSectionsToPages,
  updateSettingsValue,
  updateTemplateFile,
  setDeletedSectionAddonMegaMenuCommandIds,
  removeDeletedSectionAddonMegaMenuCommandIds,
  updateFootersToPage,
  updateHeadersToPage,
  updateMegaMenusToPage,
  updateAddonsToPage,
  updateShopifyRepresentPage,
} from '../actions/actionPages';
import { getBOCsBetweenSomething } from './utils/getBOCsBetweenSomething';
import { updateSection } from './utils/updateSection';
import { mergeResponseSectionsToPageSections } from './utils/mergeResponseSectionsToPageSections';
import { sortFooters } from './utils/sortFooters';

type GlobalPagesAction = ActionTypes<
  | typeof getPage
  | typeof setPage
  | typeof setPageLabel
  | typeof resetDefaultPages
  | typeof setSections
  | typeof setSectionLabel
  | typeof updateSchemaBlocks
  | typeof updateSchemaSettings
  | typeof copySchema
  | typeof pasteSchema
  | typeof updateSettingsValue
  | typeof updateFieldHiddenValue
  | typeof updateTemplateFile
  | typeof cancelCode
  | typeof duplicateSection
  | typeof deleteSection
  | typeof renameSection
  | typeof sortableSection
  | typeof toggleObjectField
  | typeof toggleVisibleSection
  | typeof sortArraySettingChildren
  | typeof addArraySettingChildren
  | typeof addArraySettingComponent
  | typeof duplicateArraySettingChildren
  | typeof deleteArraySettingChildren
  | typeof addSection
  | typeof changeSection
  | typeof addElement
  | typeof setPages
  | typeof reorderSettings
  | typeof updateSectionVersion
  | typeof setThemeAddonsToPages
  | typeof setAddonToPages
  | typeof removeAddonsInSection
  | typeof addAddonsInSection
  | typeof updateAddonToPages
  | typeof setThemeHeaderFooterToPages
  | typeof addToHeader
  | typeof addToMain
  | typeof addToFooter
  | typeof syncThemeHeadersToPages
  | typeof syncThemeFootersToPages
  | typeof addMegaMenuToPage
  | typeof addMegaMenusToPage
  | typeof changeMegaMenuSection
  | typeof publishPage
  | typeof updatePage
  | typeof setRequestStatusPage
  | typeof updateMainSectionsToPages
  | typeof setPageIdCommandId
  | typeof setPageAfterCreate
  | typeof syncMegaMenuOfHeaderFooterToPages
  | typeof setMegaMenusOfHeaderFooterToPages
  | typeof setDeletedSectionAddonMegaMenuCommandIds
  | typeof removeDeletedSectionAddonMegaMenuCommandIds
  | typeof updateFootersToPage
  | typeof updateHeadersToPage
  | typeof updateMegaMenusToPage
  | typeof updateAddonsToPage
  | typeof updateShopifyRepresentPage
>;

export interface GlobalPagesState {
  status: Record<PageId, Status>;
  data: Record<PageId, Page>;
  /**
   * D??ng ????? l??u l???i gi?? tr??? c???a sections khi b???t ?????u k??o ??? sidebar
   * M???c ????ch ????? hi???n th??? UI khi ??ang k??o
   */
  sectionsDraft: PageSection[];
  sectionSortableInfo?: {
    sectionId: string;
    desIndex: number;
  };
  headerFooterDraft?: {
    header: PageSection[];
    footer: PageSection[];
  };
  message: string;
  clipboard?: { schema: Schema; settings: SectionSettings };
  updateVersionStatus: Status;
  createStatus: Status;
  updateStatus: Status;

  deletedSectionCommandIds: string[];
  deletedAddonCommandIds: string[];
  deletedMegaMenuCommandIds: string[];
}

export const defaultStatePages: GlobalPagesState = {
  status: {},
  data: {},
  message: '',
  sectionsDraft: [],
  sectionSortableInfo: undefined,
  updateVersionStatus: 'idle',
  createStatus: 'idle',
  updateStatus: 'idle',
  deletedSectionCommandIds: [],
  deletedAddonCommandIds: [],
  deletedMegaMenuCommandIds: [],
};

export const reducerPages = createReducer<GlobalPagesState, GlobalPagesAction>(defaultStatePages, [
  handleAction('@Global/updateMainSectionsToPages', ({ state, action }) => {
    const { sections, pageId } = action.payload;
    const themeId = !!getPageInfo('themeId');
    const _pageId = getPageInfo('id');

    // khi build theme s??? loop qua t???ng page ???? ???????c load ????? thay th??? sections do response tr??? v??? v??o section trong reducer
    if (themeId) {
      for (const id in state.data) {
        if (pageId && id === pageId) {
          state.data[id].sections = mergeResponseSectionsToPageSections({ originalSections: state.data[id].sections, responseSections: sections });
        }
      }
    } else {
      state.data[_pageId].sections = mergeResponseSectionsToPageSections({
        originalSections: state.data[_pageId].sections,
        responseSections: sections,
      });
    }
  }),
  // kh??ng c???n ph???i loop qua c??c page ????? update v?? ???? c?? action l???ng nghe headers,footers,mega menus, addons thay ?????i ????? update v??o c??c page ???? load
  handleAction('@Global/updateHeadersToPage', ({ state, action }) => {
    const { headers } = action.payload;
    const pageId = getPageInfo('id');
    state.data[pageId].sections = mergeResponseSectionsToPageSections({ originalSections: state.data[pageId].sections, responseSections: headers });
  }),
  // kh??ng c???n ph???i loop qua c??c page ????? update v?? ???? c?? action l???ng nghe headers,footers,mega menus, addons thay ?????i ????? update v??o c??c page ???? load
  handleAction('@Global/updateFootersToPage', ({ state, action }) => {
    const { footers } = action.payload;
    const pageId = getPageInfo('id');
    state.data[pageId].sections = mergeResponseSectionsToPageSections({ originalSections: state.data[pageId].sections, responseSections: footers });
  }),
  // kh??ng c???n ph???i loop qua c??c page ????? update v?? ???? c?? action l???ng nghe headers,footers,mega menus, addons thay ?????i ????? update v??o c??c page ???? load
  handleAction('@Global/updateAddonsToPage', ({ state, action }) => {
    const { addons } = action.payload;
    const pageId = getPageInfo('id');
    state.data[pageId].sections = mergeResponseSectionsToPageSections({ originalSections: state.data[pageId].sections, responseSections: addons });
  }),
  // kh??ng c???n ph???i loop qua c??c page ????? update v?? ???? c?? action l???ng nghe headers,footers,mega menus, addons thay ?????i ????? update v??o c??c page ???? load
  handleAction('@Global/updateMegaMenusToPage', ({ state, action }) => {
    const { megaMenus } = action.payload;
    const pageId = getPageInfo('id');
    state.data[pageId].sections = mergeResponseSectionsToPageSections({ originalSections: state.data[pageId].sections, responseSections: megaMenus });
  }),
  handleAction('@Global/setRequestStatusPage', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.status[pageId] = action.payload.requestStatus;
  }),
  handleAction('@Global/getPage/request', ({ state }) => {
    const pageId = getPageInfo('id');
    state.status[pageId] = 'loading';
  }),
  handleAction('@Global/getPage/success', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { result } = action.payload;

    state.status[pageId] = 'success';
    state.data[pageId] = result;
  }),
  handleAction('@Global/getPage/failure', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.status[pageId] = 'failure';
    state.message = action.payload.message;
  }),
  handleAction('@Global/setPage', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId] = {
      ...action.payload.page,
      label: state.data[pageId].label,
    };
  }),
  handleAction('@Global/setPageLabel', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId] = {
      ...state.data[pageId],
      label: action.payload.pageLabel,
    };
  }),
  handleAction('@Global/setPageAfterCreate', ({ state, action }) => {
    const pageId = getPageInfo('id');
    // mutate
    return {
      ...state,
      data: {
        [pageId]: action.payload.page,
      },
    };
  }),
  handleAction('@Global/setPageIdCommandId', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId] = {
      ...state.data[pageId],
      commandId: action.payload.commandId,
    };
  }),
  handleAction('@Global/setPages', ({ state, action }) => {
    state.data = action.payload.pages;
  }),
  handleAction('@Global/setThemeAddonsToPages', ({ state, action }) => {
    const { addons: pageSections } = action.payload;
    const pageId = getPageInfo('id');

    // state.data[pageId] = {
    //   ...state.data[pageId],
    //   sections: [...state.data[pageId].sections, ...pageSections],
    // };

    return {
      ...state,
      data: {
        ...state.data,
        [pageId]: {
          ...state.data[pageId],
          sections: removeDuplicateByKey([...(state.data[pageId].sections ?? []), ...pageSections], 'id'),
        },
      },
    };

    // note: n???u loop to??n b??? pages xong th??m addons v??o c??c pages s??? b??? tr?????ng h???p chuy???n page
    // s??? ko request getPages ????? l???y sections do pages.data[pageId]?.sections.length ???? c?? length
    // ??o???n check ??? useEffect BuilderPage d??ng 172
    // for (const pageId in state.data) {
    //   const pagesData = state.data[pageId];
    //   pagesData.sections = pagesData.sections.concat(addons);
    // }
  }),
  handleAction('@Global/setAddonToPages', ({ state, action }) => {
    const { addon: pageSection } = action.payload;
    const pageId = getPageInfo('id');

    state.data[pageId] = {
      ...state.data[pageId],
      sections: [...state.data[pageId].sections, pageSection],
    };
  }),
  handleAction('@Global/updateAddonToPages', ({ state, action }) => {
    const { sectionAddon } = action.payload;

    for (const pageId in state.data) {
      const pagesData = state.data[pageId];

      pagesData.sections = pagesData.sections.map(section => {
        if (section.id === sectionAddon.id) {
          return sectionAddon;
        }
        return section;
      });
    }
  }),
  handleAction('@Global/addMegaMenuToPage', ({ state, action }) => {
    const { megaMenu } = action.payload;
    const pageId = getPageInfo('id');

    state.data[pageId] = {
      ...state.data[pageId],
      sections: [...state.data[pageId].sections, megaMenu],
    };
  }),
  handleAction('@Global/addMegaMenusToPage', ({ state, action }) => {
    const { megaMenus } = action.payload;
    const pageId = getPageInfo('id');

    state.data[pageId] = {
      ...state.data[pageId],
      sections: removeDuplicateByKey([...state.data[pageId].sections, ...megaMenus], 'id'),
    };
  }),
  handleAction('@Global/changeMegaMenuSection', ({ state, action }) => {
    const { megaMenu, index } = action.payload;
    const pageId = getPageInfo('id');

    state.data[pageId].sections.splice(index, 1, {
      ...megaMenu,
    });
  }),
  handleAction('@Global/setThemeHeaderFooterToPages', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { footers, headers } = action.payload;

    state.data[pageId] = {
      ...state.data[pageId],
      sections: sortFooters(removeDuplicateByKey([...headers, ...state.data[pageId].sections, ...footers], 'id')),
    };
  }),
  handleAction('@Global/setMegaMenusOfHeaderFooterToPages', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { megaMenus } = action.payload;

    state.data[pageId] = {
      ...state.data[pageId],
      sections: removeDuplicateByKey([...state.data[pageId].sections, ...megaMenus], 'id'),
    };
  }),
  // tr?????ng h???p c??c page kh??c trong theme ???? ???????c load
  handleAction('@Global/syncMegaMenuOfHeaderFooterToPages', ({ state }) => {
    const pageId = getPageInfo('id');
    const sections = state.data[pageId].sections ?? [];
    const currentSectionHeadersFooters = sections.filter(section => isHeader(section.type) || isFooter(section.type));
    const megaMenuFeIds = deepFind(currentSectionHeadersFooters, 'megaMenuId');
    const megaMenuOfHeadersFooters = sections.filter(section => megaMenuFeIds.includes(section.id));

    // khi thay ?????i mega menu c???a header ho???c footer ??? page hi???n t???i th?? l???y mega menu ??? page hi???n t???i th??? v??o mega menu c??c page c??n l???i
    for (const id in state.data) {
      if (pageId !== id) {
        const restPages = state.data[id];
        if (restPages.sections.length > 0) {
          restPages.sections = [...restPages.sections, ...megaMenuOfHeadersFooters];
          restPages.sections = removeDuplicateByKey(restPages.sections, 'id');
        }
      }
    }
  }),
  // tr?????ng h???p c??c page kh??c trong theme ???? ???????c load
  handleAction('@Global/syncThemeHeadersToPages', ({ state }) => {
    const pageId = getPageInfo('id');
    const sections = state.data[pageId].sections ?? [];
    const currentSectionHeaders = sections.filter(section => isHeader(section.type));

    // khi thay ?????i headers ??? page hi???n t???i th?? l???y headers ??? page hi???n t???i th??? v??o headers c??c page c??n l???i
    for (const id in state.data) {
      if (pageId !== id) {
        const restPages = state.data[id];
        if (restPages.sections.length > 0) {
          restPages.sections = restPages.sections.filter(item => !isHeader(item.type));
          restPages.sections = [...currentSectionHeaders, ...restPages.sections];
        }
      }
    }
  }),
  // tr?????ng h???p c??c page kh??c trong theme ???? ???????c load
  handleAction('@Global/syncThemeFootersToPages', ({ state }) => {
    const pageId = getPageInfo('id');

    const sections = state.data[pageId].sections ?? [];
    const currentSectionFooters = sections.filter(section => isFooter(section.type));

    // khi thay ?????i footers ??? page hi???n t???i th?? l???y footers ??? page hi???n t???i th??? v??o footers c??c page c??n l???i
    for (const id in state.data) {
      if (pageId !== id) {
        const restPages = state.data[id];
        const addonsOrMegaMenuPages = restPages.sections.filter(item => isSectionAddonsOrMegamenu(item.type));
        if (restPages.sections.length > 0) {
          restPages.sections = restPages.sections.filter(item => !isFooter(item.type));

          // N???u c??c page c??n l???i c?? addons || mega menu th?? insert footer tr?????c addons || mega menu
          // kh??ng th?? th??m v??o cu???i m???ng
          if (addonsOrMegaMenuPages.length > 0) {
            const index = restPages.sections.findIndex(section => section.id === addonsOrMegaMenuPages[0].id);
            restPages.sections = insertAll(index, currentSectionFooters, restPages.sections);
          } else {
            restPages.sections = [...restPages.sections, ...currentSectionFooters];
          }
        }
      }
    }
    // if (state.status[pageId] === 'success') {
    //   const currentPage = state.data[pageId];
    //   const megaMenuOrAddonOfCurrentPage = currentPage.sections.filter(item => isSectionAddonsOrMegamenu(item.type));
    //   const mainSectionOfCurrentPage = currentPage.sections.filter(item => isMain(item.type) || isDefault(item.type));
    //   currentPage.sections = [...mainSectionOfCurrentPage, ...megaMenuOrAddonOfCurrentPage];
    // }
  }),
  handleAction('@BuilderPage/updateSectionVersion/request', ({ state }) => {
    state.updateVersionStatus = 'loading';
  }),
  handleAction('@BuilderPage/updateSectionVersion/success', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { updatedItem } = action.payload;
    state.updateVersionStatus = 'success';
    for (const id in state.data) {
      // khi thay ?????i section chung ??? page hi???n t???i th?? l???y section chung ??? page hi???n t???i th??? v??o section chung c??c page c??n l???i
      if (pageId !== id) {
        const restPages = state.data[id];
        // tr?????ng h???p c??c page kh??c c?? data
        if (restPages.sections.length > 0) {
          restPages.sections = restPages.sections.map(section => updateSection(section, updatedItem));
        }
      } else {
        state.data[id].sections = state.data[id].sections.map(section => updateSection(section, updatedItem));
      }
    }
  }),
  handleAction('@BuilderPage/updateSectionVersion/failure', ({ state }) => {
    state.updateVersionStatus = 'failure';
  }),
  handleAction('@Global/resetDefaultPages', () => defaultStatePages),
  handleAction('@Global/setSections', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections = action.payload.sections;
  }),
  handleAction('@Global/setSectionLabel', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections.forEach(section => {
      if (section.id === action.payload.id) {
        section.label = action.payload.label;
      }
    });
  }),
  handleAction('@Global/duplicateSection', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections = state.data[pageId].sections.reduce<PageSection[]>((arr, section) => {
      if (section.id === action.payload.sectionId) {
        const addonsTagRegxp = `<${Consts.FakeTags.Addons}\\s*data-id=("|')(\\w|-)*("|')><\\/${Consts.FakeTags.Addons}>`;
        let newSection: PageSection = {
          ...section,
          id: action.payload.newId ?? `id_${v4()}`,
          data: {
            ...section.data,
            // Section mu???n gi??? l???i addons hay kh??ng
            liquid: !!action.payload.keepAddons
              ? // Gi??? l???i addons th?? ph???i thay l???i id m???i cho n?? c??n kh??ng ch???n s??? xo??
                (section.addonIds as string[]).reduce((liquid, addonId) => {
                  // N???u addonId c?? trong newAddonIds th?? ta gi??? n?? l???i
                  if (action.payload.newAddonIds?.includes(addonId)) {
                    return liquid;
                  }
                  // C??n kh??ng ngh??a l?? kh??ng ch???n n??n s??? xo?? ??i
                  const addonsTag = `<${Consts.FakeTags.Addons}\\s*data-id=("|')${addonId}("|')><\\/${Consts.FakeTags.Addons}>`;
                  return removeRedundantLines(liquid.replace(new RegExp(addonsTag, 'g'), ''));
                }, section.data.liquid)
              : // C??n kh??ng th?? xo?? addons
                removeRedundantLines(section.data.liquid.replace(new RegExp(addonsTagRegxp, 'g'), '')),
          },
          // Th??m m???ng addonsId m???i khi mu???n gi??? l???i addons
          addonIds: !!action.payload.keepAddons ? action.payload.newAddonIds : [],
          megaMenuCommandIds: [],
        };
        // X??a commandId ??? section m???i khi duplicate section
        newSection = dissoc('commandId', newSection);
        return [...arr, ...[section, newSection]];
      }
      return [...arr, section];
    }, []);
  }),
  handleAction('@Global/deleteSection', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionId } = action.payload;

    const _section = state.data[pageId].sections.find(item => item.id === sectionId);

    // tr?????ng h???p addon kh??ng ?????t v??? tr??
    if (_section && isSectionAddons(_section.type)) {
      state.data[pageId].sections = state.data[pageId].sections.filter(section => section.id !== sectionId);
    }

    state.data[pageId].sections = state.data[pageId].sections
      // N???u section ch???a mega menu th?? x??a
      .filter(section => {
        return !_section?.megaMenuCommandIds?.includes(section.commandId ?? '');
      })
      .filter(section => {
        const addonsTag = `<${Consts.FakeTags.Addons}\\s*data-id=("|')${sectionId}("|')><\\/${Consts.FakeTags.Addons}>`;
        // Xo?? tag <addons... />
        const removeTagAddonsOfLiquid = section.data.liquid ? section.data.liquid.replace(new RegExp(addonsTag, 'g'), '') : '';
        section.data.liquid = removeRedundantLines(removeTagAddonsOfLiquid);
        section.addonIds = section.addonIds?.filter(addonId => addonId !== sectionId);
        return section.id !== sectionId;
      });
  }),
  handleAction('@Global/renameSection', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections.forEach(section => {
      if (section.id === action.payload.sectionId) {
        section.label = action.payload.newName;
      }
    });
  }),
  handleAction('@Global/sortableSection', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections = reorderSectionWithType(
      state.data[pageId].sections,
      action.payload.srcIndex,
      action.payload.desIndex,
      action.payload.sectionType,
    );
  }),
  handleAction('@Global/updateSchemaBlocks', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionId, data } = action.payload;
    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        if (data.type === '@SchemaBlocks/addBlock') {
          reducerAddBlock({ data, section });
        }
        if (data.type === '@SchemaBlocks/sortBlock') {
          reducerSortBlock({ data, section });
        }
        if (data.type === '@SchemasBlocks/editBlock') {
          reducerEditBlock({ data, section });
        }
        if (data.type === '@SchemasBlocks/deleteBlock') {
          reducerDeleteBlock({ data, section });
        }
        if (data.type === '@SchemasBlocks/insertBlock') {
          reducerInsertBlock({ data, section });
        }
        if (data.type === '@SchemasBlocks/pasteBlock') {
          reducerPasteBlock({ data, section });
        }
        if (data.type === '@SchemaBlocks/addBlockChild') {
          reducerAddBlockChild({ data, section });
        }
        if (data.type === '@SchemaBlocks/sortBlockChild') {
          reducerSortBlockChild({ data, section });
        }
        if (data.type === '@SchemasBlocks/editBlockChild') {
          reducerEditBlockChild({ data, section });
        }
        if (data.type === '@SchemasBlocks/deleteBlockChild') {
          reducerDeleteBlockChild({ data, section });
        }
        if (data.type === '@SchemasBlocks/insertBlockChild') {
          reducerInsertBlockChild({ data, section });
        }
      }
    });
  }),

  handleAction('@Global/updateSchemaSettings', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionId, data } = action.payload;
    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        if (data.type === '@SchemaSettings/addSetting') {
          reducerAddSetting({ section, data });
        }
        if (data.type === '@SchemaSettings/sortSetting') {
          reducerSortSetting({ section, data });
        }
        if (data.type === '@SchemaSettings/editSetting') {
          reducerEditSetting({ section, data });
        }
        if (data.type === '@SchemaSettings/deleteSetting') {
          reducerDeleteSetting({ section, data });
        }
        if (data.type === '@SchemaSettings/insertSetting') {
          reducerInsertSetting({ section, data });
        }
        if (data.type === '@SchemaSettings/pasteSetting') {
          reducerPasteSetting({ section, data });
        }
      }
    });
  }),

  handleAction('@Global/copySchema', ({ state, action }) => {
    state.clipboard = action.payload;
  }),

  handleAction('@Global/pasteSchema', ({ state, action }) => {
    const { schema, sectionId } = action.payload;
    const pageId = getPageInfo('id');
    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        const newSchemaBlocks = action.payload.schema.blocks;
        const newSchemaSettings = action.payload.schema.settings;
        const newSettingsOfSchemaBlocks: SectionSetting[] = newSchemaBlocks.map(block => {
          if (block.type === 'array') {
            return {
              ...block,
              children: [],
            };
          }
          return {
            ...block,
          };
        });
        const newSettingsOfSchemaSettings: SectionSetting[] = newSchemaSettings.map(setting => setting);
        section.data.settings = [...newSettingsOfSchemaBlocks, ...newSettingsOfSchemaSettings];
        section.data.schema = schema;
      }
    });
  }),

  handleAction('@Global/updateSettingsValue', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections.forEach(section => {
      if (section.id === action.payload.sectionId) {
        section.data.settings.forEach(setting => {
          if (setting.id === action.payload.settingId) {
            if (setting.type === 'object') {
              setting.children.forEach(settingChild => {
                if (settingChild.id === action.payload.childId) {
                  settingChild.children = action.payload.value as SchemaSettingField['children'];
                }
              });
            } else if (setting.type === 'array') {
              const { dataBindingFieldNames } = action.payload;
              setting.children.forEach(settingChild => {
                // Ki???m tra xem field array c?? ??ang trong ch??? ????? r??ng bu???c c??c tr?????ng d??? li???u hay kh??ng
                if (dataBindingFieldNames.length > 0) {
                  settingChild.children.forEach(grandChild => {
                    // N???u grandChild.name n???m trong c??c tr?????ng b??? r??ng bu???c v?? ??ang ch???nh s???a ????ng tr?????ng ???? th?? c???p nh???t t???t c??? c??c gi?? tr??? c??ng name trong array settingChild.children
                    // C??n n???u kh??ng th?? s???a tr?????ng n??o m???i c???p nh???t ????ng tr?????ng ???? t???i item thu???c array ????
                    if (dataBindingFieldNames.includes(grandChild.name) && grandChild.id === action.payload.grandChildId) {
                      grandChild.children = action.payload.value as SchemaSettingField['children'];
                    } else {
                      if (settingChild.id === action.payload.childId) {
                        if (grandChild.id === action.payload.grandChildId) {
                          grandChild.children = action.payload.value as SchemaSettingField['children'];
                        }
                      }
                    }
                  });
                } else {
                  if (settingChild.id === action.payload.childId) {
                    settingChild.children.forEach(grandChild => {
                      if (grandChild.id === action.payload.grandChildId) {
                        grandChild.children = action.payload.value as SchemaSettingField['children'];
                      }
                    });
                  }
                }
              });
            } else {
              setting.children = action.payload.value as SchemaSettingField['children'];
            }
          }
        });
      }
    });
  }),

  handleAction('@Global/updateFieldHiddenValue', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections.forEach(section => {
      if (section.id === action.payload.sectionId) {
        section.data.settings.forEach(setting => {
          if (setting.name === action.payload.name && setting.type === 'hidden') {
            setting.children = action.payload.value as SchemaSettingField['children'];
          }
        });
      }
    });
  }),

  handleAction('Global/reorderSettings', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections.forEach(section => {
      if (section.id === action.payload.sectionId) {
        section.data.settings = reorder(section.data.settings, action.payload.srcIndex, action.payload.desIndex);
      }
    });
  }),
  handleAction('@Global/updateTemplateFile', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections.forEach(section => {
      if (section.id === action.payload.sectionId) {
        // Thay ?????i file
        // @tuong -> X??a to??n b??? "\r" ????? regex t???i nh???ng ch??? kh??c do "\s" c??ng match "\r"
        section.data[action.payload.fileType] = action.payload.value.replace(/\r/g, '');
        // Th???c hi???n sau khi thay ?????i file
        // Xo?? addonId trong addonIds sau khi xo?? ??o???n code <addons...> kh???i liquid
        // Ho???c th??m addonId v??o addonIds sau khi th??m ??o???n code <addons...> v??o liquid
        if (action.payload.fileType === 'liquid') {
          const newAddonTags =
            section.data.liquid.match(new RegExp(`<${Consts.FakeTags.Addons}\\s*data-id=("|')(\\w|-)*("|')><\\/${Consts.FakeTags.Addons}>`, 'g')) ??
            [];
          if (newAddonTags.length === 0) {
            section.addonIds = [];
          } else {
            const newAddonIds = newAddonTags.map(addonTag => {
              const domParser = new DOMParser();
              const doc = domParser.parseFromString(addonTag, 'text/html');
              const addonId = (doc.querySelector('[data-id]') as HTMLElement).getAttribute('data-id');
              return addonId as string;
            });
            section.addonIds = newAddonIds;
          }
        }
      }
    });
  }),
  handleAction('@Global/cancelCode', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections = state.data[pageId].sections.map(section => {
      if (section.id === action.payload.section.id) {
        return action.payload.section;
      }
      return section;
    });
  }),
  handleAction('@Global/toggleObjectField', () => {
    // TODO: @tuong -> T???i th???i ??i???m comment n??y ???????c vi???t ra, action n??y kh??ng c?? b???t k?? ?? ngh??a g?? m?? c??n g??y rerender -> Comment t???m l???i do kh??ng bi???t th???c s??? c??i n??y ????? l??m g??
    // const pageId = getPageInfo('id');
    // state.data[pageId].sections.forEach(section => {
    //   if (section.id === action.payload.sectionId) {
    //     section.data.settings.map(setting => {
    //       if (setting.name === action.payload.atomName && (setting.type === 'object' || setting.type === 'array')) {
    //         // N???u c?? value th?? set c??n kh??ng th?? toggle
    //         setting.open = action.payload.value ?? !setting.open;
    //       }
    //     });
    //   }
    // });
  }),
  handleAction('@Global/toggleVisibleSection', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections.forEach(section => {
      if (section.id === action.payload.sectionId) {
        section.enable = !section.enable;
      }
    });
  }),
  handleAction('@Global/sortArraySettingChildren', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { destinationIndex, sectionId, settingId, sourceIndex } = action.payload;
    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        section.data.settings.forEach(setting => {
          const _setting = setting as SettingArray;
          if (setting.id === settingId) {
            _setting.children = reorder(_setting.children, sourceIndex, destinationIndex);
          }
        });
      }
    });
  }),
  handleAction('@Global/addArraySettingChildren', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionId, settingId, newSettingChildren } = action.payload;
    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        section.data.settings.forEach(setting => {
          if (setting.id === settingId) {
            (setting as SettingArray).children.push(newSettingChildren);
          }
        });
      }
    });
  }),
  handleAction('@Global/addArraySettingComponent', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionId, settingId, newSettingChildren } = action.payload;
    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        section.data.settings.forEach(setting => {
          if (setting.id === settingId) {
            (setting as SettingArray).children.push(newSettingChildren);
          }
        });
      }
    });
  }),
  handleAction('@Global/deleteArraySettingChildren', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionId, settingId, settingChildId } = action.payload;
    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        section.data.settings.forEach(setting => {
          if (setting.id === settingId) {
            setting.children = (setting as SettingArray).children.filter(settingChild => settingChild.id !== settingChildId);
          }
        });
      }
    });
  }),
  handleAction('@Global/duplicateArraySettingChildren', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionId, settingId, settingChildIndex } = action.payload;
    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        section.data.settings.forEach(setting => {
          if (setting.id === settingId) {
            const _setting = setting as SettingArray;
            const sourceItem = _setting.children[settingChildIndex];
            const newSettingChildItem: SettingArrayValue = { ...sourceItem, id: v4() };
            setting.children = insert(Math.max(settingChildIndex + 1, 1), newSettingChildItem, _setting.children);
          }
        });
      }
    });
  }),
  handleAction('@Global/addSection', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections.splice(action.payload.index, 0, {
      ...(action.payload.section as PageSection),
    });
  }),
  handleAction('@Global/changeSection', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections.splice(action.payload.index, 1, {
      ...action.payload.section,
      // Gi??? nguy??n id
      id: state.data[pageId].sections[action.payload.index].id,
    });
  }),
  handleAction('@Global/addElement', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state.data[pageId].sections.forEach(section => {
      if (section.id === action.payload.sectionId) {
        let index = -1;
        const newLiquid = section.data.liquid.replace(new RegExp(`<${Consts.FakeTags.AddElement} \\/>`, 'g'), () => {
          index++;
          return `<${Consts.FakeTags.AddElement} index="${index}" />`;
        });
        section.data.liquid = newLiquid
          .replace(`<${Consts.FakeTags.AddElement} index="${action.payload.elementIndex}" />`, action.payload.liquid)
          .replace(new RegExp(`<${Consts.FakeTags.AddElement} index=".*" \\/>`, 'g'), `<${Consts.FakeTags.AddElement} />`);
        if (!section.data.js?.includes(action.payload.js)) {
          section.data.js = `${section.data.js}\n${action.payload.js}`;
        }
        if (!section.data.scss?.includes(action.payload.scss)) {
          section.data.scss = `${section.data.scss}\n${action.payload.scss}`;
        }
        section.data.settings = [...section.data.settings, ...action.payload.settings];
        section.data.schema.settings = [...section.data.schema.settings, ...action.payload.schema.settings];
        section.data.schema.blocks = [...section.data.schema.blocks, ...action.payload.schema.blocks];
      }
    });
  }),
  handleAction('@Global/removeAddonsInSection', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionIds, addonsSectionId } = action.payload;
    state.data[pageId].sections.forEach(section => {
      if (sectionIds.includes(section.id)) {
        const regexp = new RegExp(`<${Consts.FakeTags.Addons}\\s*data-id=("|')${addonsSectionId}("|')><\\/${Consts.FakeTags.Addons}>(\\n|)`, 'g');
        section.data.liquid = removeRedundantLines(section.data.liquid.replace(regexp, ''));
        if (section.addonIds) {
          section.addonIds = section.addonIds.filter(addonId => addonId !== addonsSectionId);
        }
      }
    });
  }),
  handleAction('@Global/addAddonsInSection', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionId, addonsSectionId, insert, openTag, tagName, indexBOC, hasStyleOrder } = action.payload;
    /**
     * NOTE: @tuong ->
     * @param sectionId: id c???a section ???????c th??m addon
     * @param addonsSectionId: id c???a addon ???????c th??m
     * @param insert: Ch??n v??o tr?????c hay sau "element" ???????c g??n addon
     * @param openTag: ??o???n code liquid (m??? th??? html) c???a "element" ???????c g??n addon -> C??ng v???i "tagName", ???????c d??ng ????? l???y ra ??o???n code c???a "element" ????? g??n addon
     * @param tagName: tag name c???a "element" ???????c g??n addon (l?? t??n "m??? th??? html" t???i "openTag") -> C??ng v???i "openTag", ???????c d??ng ????? l???y ra ??o???n code c???a "element" ????? g??n addon
     * @param indexBOC: index c???a "element" ???????c g??n addon -> V?? c?? th??? c?? nh???ng "element" gi???ng nhau ???????c sinh ra b???i nh???ng ??o???n code gi???ng nhau n??n s??? c???n "indexBOC" ????? bi???t ???????c ??ang g??n addon v??o "element" n??o trong nh???ng "element" gi???ng nhau ????
     */

    /**
     * X??t b??i to??n ???????c m?? t??? nh?? sau:
     * "1 addon currency" c???n ???????c th??m v??o "TH??? h1" c?? class l?? "title" v???i text l?? "Hello world 4"
     * Khi ???? code liquid s??? c?? 2 tr?????ng h???p:
        - Tr?????ng h???p 1: Th??? ???? trong code l?? duy nh???t
          Input: `
            <div class="container">
              <h1 class="title_1">Hello world 1</h1>
              <h1 class="title_2">Hello world 2</h1>
              <h1 class="title_3">Hello world 3</h1>
              <h1 class="title">Hello world</h1>
              <p class="description">Lorem ipsum dolor...</p>
            </div>
          `
          Output: `
            <div class="container">
              <h1 class="title_1">Hello world 1</h1>
              <h1 class="title_2">Hello world 2</h1>
              <h1 class="title_3">Hello world 3</h1>
              <<<<ADDON S??? ???????C TH??M V??O ????Y N???U "insert === before">>>> <h1 class="title">Hello world</h1> <<<<ADDON S??? ???????C TH??M V??O ????Y N???U "insert === after">>>>
              <p class="description">Lorem ipsum dolor...</p>
            </div>
          `
        - Tr?????ng h???p 2: Th??? ???? trong code kh??ng ph???i duy nh???t
          + Tr?????ng h???p 2.1: C??c th??? tr??ng l???p n???m ngang h??ng v???i nhau
            Input: `
              <div class="container">
                <h1 class="title">Hello world 1</h1>
                <h1 class="title">Hello world 2</h1>
                <h1 class="title">Hello world 3</h1>
                <h1 class="title">Hello world 4</h1>
                <p class="description">Lorem ipsum dolor...</p>
              </div>
           `
            Output: `
              <div class="container">
                <h1 class="title">Hello world 1</h1>
                <h1 class="title">Hello world 2</h1>
                <h1 class="title">Hello world 3</h1>
                <<<<ADDON S??? ???????C TH??M V??O ????Y N???U "insert === before">>>> <h1 class="title">Hello world 4</h1> <<<<ADDON S??? ???????C TH??M V??O ????Y N???U "insert === after">>>>
                <p class="description">Lorem ipsum dolor...</p>
              </div>
            `
          + Tr?????ng h???p 2.2: C??c th??? tr??ng l???p l?? cha con c???a nhau
            Input: `
              <div class="container">
                <h1 class="title">
                  Hello world 1
                  <h1 class="title">
                    Hello world 2
                    <h1 class="title">Hello world 3</h1>
                    <h1 class="title">Hello world 4</h1>
                  </h1>
                </h1>
                <p class="description">Lorem ipsum dolor...</p>
              </div>
           `
            Output: `
              <div class="container">
                <h1 class="title">
                  Hello world 1
                  <h1 class="title">
                    Hello world 2
                    <h1 class="title">Hello world 3</h1>
                    <<<<ADDON S??? ???????C TH??M V??O ????Y N???U "insert === before">>>> <h1 class="title">Hello world 4</h1> <<<<ADDON S??? ???????C TH??M V??O ????Y N???U "insert === after">>>>
                  </h1>
                </h1>
                <p class="description">Lorem ipsum dolor...</p>
              </div>
            `
     */

    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        section.addonIds = removeDuplicate([...(section.addonIds ?? []), addonsSectionId]);
        const addonsTag = getAddonHtml(addonsSectionId);
        // N???u openTag l?? container
        // const isContainer = /id=("|')\{\{\s*uniqueId\s*\}\}/g.test(openTag);
        // Open tag regex
        const _openTagRegexPattern = strToRegexpPattern(openTag);
        // X??a "\r" ????? c?? th??? regex do "\s" c??ng match "\r" (vi???c x??a "\r" ???nh h?????ng ?????n "IframePage/utils.ts")
        section.data.liquid = section.data.liquid.replace(/\r/g, '');
        const BOCs = getBOCsBetweenSomething({
          liquid: section.data.liquid,
          // NOTE: @tuong -> Ch???c n??ng "Addon Placholder" c???n s??? k???t h???p c???a nhi???u file -> C???n xem x??t vi???c update t???t c??? c??c file khi c?? s??? thay ?????i n??o ???? ??? 1 file b???t k??
          // ["LiquidComponent.tsx", "AddonPosition.tsx", "useAddonsPosition.ts", "reducerPages.ts", "generateHelpers.ts/deleteAddonPlaceholder"]
          tagName: openTag.includes(Consts.FakeTags.AddonsPlaceholder.tagName) ? Consts.FakeTags.AddonsPlaceholder.tagName : tagName,
          openTag,
        });

        // L???y ra ??o???n code ???????c x??t
        const BOC = BOCs.find(BOC => BOC.indexBOC === indexBOC);
        // L???y ra c??c ??o???n code gi???ng nhau v?? index c???a ??o???n code ???? trong BOCs
        const BOCSSameCode = BOCs.reduce<Array<{ BOC: string; indexBOC: number }>>((res, item) => {
          if (item.code === BOC?.code) {
            return res.concat({ BOC: item.code, indexBOC: item.indexBOC });
          }
          return res;
        }, []);
        // Check n???u c?? nhi???u h??n 1 ??o???n code gi???ng nhau
        const bocIsExist = BOCSSameCode.length > 1;
        // Tr?????ng h???p nh???ng th???ng ngang h??ng, cha con, ... gi???ng nhau v??? code
        if (BOC && bocIsExist) {
          let index = 0;
          section.data.liquid = removeRedundantLines(
            section.data.liquid.replaceAll(BOC.code, value => {
              index++;
              if (BOCSSameCode[index - 1].indexBOC === indexBOC) {
                // if (isContainer) {
                //   return insert === 'before'
                //     ? value.replace(new RegExp(_openTagRegexPattern), openTag => openTag.concat(addonsTag))
                //     : value.replace(new RegExp(`</${tagName}>`), endTag => addonsTag.concat(endTag));
                // } else {

                // N???u th??? ???? ??ang c?? style order th?? ta th??m n?? v??o b??n trong th??? ????, c??n kh??ng th?? th??m n?? v??o b??n ngo??i th??? ????
                if (hasStyleOrder) {
                  return insert === 'before'
                    ? value.replace(new RegExp(_openTagRegexPattern), openTag => openTag.concat(addonsTag))
                    : value.replace(new RegExp(`</${tagName}>`), endTag => addonsTag.concat(endTag));
                }
                return insert === 'before' ? addonsTag.concat(value) : value.concat(addonsTag);
                // }
              }
              return value;
            }),
          );
        }
        // Tr?????ng h???p nh???ng th???ng ngang h??ng, cha con, ... kh??c nhau v??? code
        else if (BOC && !bocIsExist) {
          section.data.liquid = removeRedundantLines(
            section.data.liquid.replace(BOC.code, BOC => {
              // if (isContainer) {
              //   return insert === 'before'
              //     ? BOC.replace(new RegExp(_openTagRegexPattern), openTag => openTag.concat(addonsTag))
              //     : BOC.replace(new RegExp(`</${tagName}>`), endTag => addonsTag.concat(endTag));
              // } else {

              // N???u th??? ???? ??ang c?? style order th?? ta th??m n?? v??o b??n trong th??? ????, c??n kh??ng th?? th??m n?? v??o b??n ngo??i th??? ????
              if (hasStyleOrder) {
                return insert === 'before'
                  ? BOC.replace(new RegExp(_openTagRegexPattern), openTag => openTag.concat(addonsTag))
                  : BOC.replace(new RegExp(`</${tagName}>`), endTag => addonsTag.concat(endTag));
              }
              return insert === 'before' ? addonsTag.concat(BOC) : BOC.concat(addonsTag);
              // }
            }),
          );
        }
      }
    });
  }),
  handleAction('@Global/addToHeader', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionId } = action.payload;
    const { sections } = state.data[pageId];
    const index = sections.findIndex(section => section.id === sectionId);
    const headers = sections.filter(section => isHeader(section.type));
    const desIndex = headers.length;
    state.data[pageId].sections = reorder(sections, index, desIndex);

    const section = sections.find(sec => sec.id === sectionId);
    if (section && section.megaMenuCommandIds) {
      const megaMenuIdsOfSection = deepFind(section, 'megaMenuId');
      state.data[pageId].sections.forEach(section => {
        if (megaMenuIdsOfSection.includes(section.id)) {
          section.commandId = '';
        }
      });
    }

    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        section.commandId = '';
        section.type = 'header';
        section.megaMenuCommandIds = [];
      }
    });
  }),
  handleAction('@Global/addToMain', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionId } = action.payload;
    const { sections } = state.data[pageId];
    const index = sections.findIndex(section => section.id === sectionId);
    const desIndex = sections.findIndex(section => isMain(section.type) || isDefault(section.type));
    state.data[pageId].sections = reorder(sections, index, isHeader(sections[index].type) ? desIndex - 1 : desIndex);

    const section = sections.find(sec => sec.id === sectionId);
    if (section && section.megaMenuCommandIds) {
      const megaMenuIdsOfSection = deepFind(section, 'megaMenuId');
      state.data[pageId].sections.forEach(section => {
        if (megaMenuIdsOfSection.includes(section.id)) {
          section.commandId = '';
        }
      });
    }

    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        section.commandId = '';
        section.type = 'default';
        section.megaMenuCommandIds = [];
      }
    });
  }),
  handleAction('@Global/addToFooter', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { sectionId } = action.payload;
    const { sections } = state.data[pageId];
    const startIndex = sections.findIndex(section => section.id === sectionId);
    const headers = sections.filter(section => isHeader(section.type));
    const mains = sections.filter(section => isMain(section.type) || isDefault(section.type));
    const desIndex = headers.length + mains.length;
    const endIndex =
      isHeader(sections[startIndex].type) || isDefault(sections[startIndex].type) || isMain(sections[startIndex].type) ? desIndex - 1 : desIndex;
    state.data[pageId].sections = reorder(sections, startIndex, endIndex);

    const section = sections.find(sec => sec.id === sectionId);
    if (section && section.megaMenuCommandIds) {
      const megaMenuIdsOfSection = deepFind(section, 'megaMenuId');
      state.data[pageId].sections.forEach(section => {
        if (megaMenuIdsOfSection.includes(section.id)) {
          section.commandId = '';
        }
      });
    }

    state.data[pageId].sections.forEach(section => {
      if (section.id === sectionId) {
        section.commandId = '';
        section.type = 'footer';
        section.megaMenuCommandIds = [];
      }
    });
  }),
  handleAction('@Global/publishPage/request', ({ state }) => ({ ...state, createStatus: 'loading' })),
  handleAction('@Global/publishPage/success', ({ state }) => ({ ...state, createStatus: 'success' })),
  handleAction('@Global/publishPage/failure', ({ state }) => ({ ...state, createStatus: 'failure' })),

  handleAction('@Global/updatePage/request', ({ state }) => ({ ...state, updateStatus: 'loading' })),
  handleAction('@Global/updatePage/success', ({ state }) => ({ ...state, updateStatus: 'success' })),
  handleAction('@Global/updatePage/failure', ({ state }) => ({ ...state, updateStatus: 'failure' })),

  handleAction('@BuilderPage/setDeletedSectionAddonMegaMenuCommandIds', ({ state, action }) => {
    const { deletedAddonCommandId, deletedMegaMenuCommandId, deletedSectionCommandId } = action.payload;

    state.deletedAddonCommandIds = deletedAddonCommandId ? state.deletedAddonCommandIds.concat(deletedAddonCommandId) : state.deletedAddonCommandIds;
    state.deletedMegaMenuCommandIds = deletedMegaMenuCommandId
      ? state.deletedMegaMenuCommandIds.concat(deletedMegaMenuCommandId)
      : state.deletedMegaMenuCommandIds;
    state.deletedSectionCommandIds = deletedSectionCommandId
      ? state.deletedSectionCommandIds.concat(deletedSectionCommandId)
      : state.deletedSectionCommandIds;
  }),
  handleAction('@BuilderPage/removeDeletedSectionAddonMegaMenuCommandIds', ({ state, action }) => {
    const { deletedAddonCommandId, deletedMegaMenuCommandId, deletedSectionCommandId } = action.payload;
    state.deletedAddonCommandIds = deletedAddonCommandId
      ? state.deletedAddonCommandIds.filter(id => id !== deletedAddonCommandId)
      : state.deletedAddonCommandIds;

    state.deletedMegaMenuCommandIds = deletedMegaMenuCommandId
      ? state.deletedMegaMenuCommandIds.filter(id => id !== deletedMegaMenuCommandId)
      : state.deletedMegaMenuCommandIds;

    state.deletedSectionCommandIds = deletedSectionCommandId
      ? state.deletedSectionCommandIds.filter(id => id !== deletedSectionCommandId)
      : state.deletedSectionCommandIds;
  }),
  handleAction('@BuilderPage/updateShopifyRepresentPage', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const { shopifyPages, shopifyRepresentPage } = action.payload;
    state.data[pageId] = {
      ...state.data[pageId],
      shopifyPages,
      shopifyRepresentPage,
    };
  }),
]);
