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
   * Dùng để lưu lại giá trị của sections khi bắt đầu kéo ở sidebar
   * Mục đích để hiện thị UI khi đang kéo
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

    // khi build theme sẽ loop qua từng page đã được load để thay thế sections do response trả về vào section trong reducer
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
  // không cần phải loop qua các page để update vì đã có action lắng nghe headers,footers,mega menus, addons thay đổi để update vào các page đã load
  handleAction('@Global/updateHeadersToPage', ({ state, action }) => {
    const { headers } = action.payload;
    const pageId = getPageInfo('id');
    state.data[pageId].sections = mergeResponseSectionsToPageSections({ originalSections: state.data[pageId].sections, responseSections: headers });
  }),
  // không cần phải loop qua các page để update vì đã có action lắng nghe headers,footers,mega menus, addons thay đổi để update vào các page đã load
  handleAction('@Global/updateFootersToPage', ({ state, action }) => {
    const { footers } = action.payload;
    const pageId = getPageInfo('id');
    state.data[pageId].sections = mergeResponseSectionsToPageSections({ originalSections: state.data[pageId].sections, responseSections: footers });
  }),
  // không cần phải loop qua các page để update vì đã có action lắng nghe headers,footers,mega menus, addons thay đổi để update vào các page đã load
  handleAction('@Global/updateAddonsToPage', ({ state, action }) => {
    const { addons } = action.payload;
    const pageId = getPageInfo('id');
    state.data[pageId].sections = mergeResponseSectionsToPageSections({ originalSections: state.data[pageId].sections, responseSections: addons });
  }),
  // không cần phải loop qua các page để update vì đã có action lắng nghe headers,footers,mega menus, addons thay đổi để update vào các page đã load
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

    // note: nếu loop toàn bộ pages xong thêm addons vào các pages sẽ bị trường hợp chuyển page
    // sẽ ko request getPages để lấy sections do pages.data[pageId]?.sections.length đã có length
    // đoạn check ở useEffect BuilderPage dòng 172
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
  // trường hợp các page khác trong theme đã được load
  handleAction('@Global/syncMegaMenuOfHeaderFooterToPages', ({ state }) => {
    const pageId = getPageInfo('id');
    const sections = state.data[pageId].sections ?? [];
    const currentSectionHeadersFooters = sections.filter(section => isHeader(section.type) || isFooter(section.type));
    const megaMenuFeIds = deepFind(currentSectionHeadersFooters, 'megaMenuId');
    const megaMenuOfHeadersFooters = sections.filter(section => megaMenuFeIds.includes(section.id));

    // khi thay đổi mega menu của header hoặc footer ở page hiện tại thì lấy mega menu ở page hiện tại thế vào mega menu các page còn lại
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
  // trường hợp các page khác trong theme đã được load
  handleAction('@Global/syncThemeHeadersToPages', ({ state }) => {
    const pageId = getPageInfo('id');
    const sections = state.data[pageId].sections ?? [];
    const currentSectionHeaders = sections.filter(section => isHeader(section.type));

    // khi thay đổi headers ở page hiện tại thì lấy headers ở page hiện tại thế vào headers các page còn lại
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
  // trường hợp các page khác trong theme đã được load
  handleAction('@Global/syncThemeFootersToPages', ({ state }) => {
    const pageId = getPageInfo('id');

    const sections = state.data[pageId].sections ?? [];
    const currentSectionFooters = sections.filter(section => isFooter(section.type));

    // khi thay đổi footers ở page hiện tại thì lấy footers ở page hiện tại thế vào footers các page còn lại
    for (const id in state.data) {
      if (pageId !== id) {
        const restPages = state.data[id];
        const addonsOrMegaMenuPages = restPages.sections.filter(item => isSectionAddonsOrMegamenu(item.type));
        if (restPages.sections.length > 0) {
          restPages.sections = restPages.sections.filter(item => !isFooter(item.type));

          // Nếu các page còn lại có addons || mega menu thì insert footer trước addons || mega menu
          // không thì thêm vào cuối mảng
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
      // khi thay đổi section chung ở page hiện tại thì lấy section chung ở page hiện tại thế vào section chung các page còn lại
      if (pageId !== id) {
        const restPages = state.data[id];
        // trường hợp các page khác có data
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
            // Section muốn giữ lại addons hay không
            liquid: !!action.payload.keepAddons
              ? // Giữ lại addons thì phải thay lại id mới cho nó còn không chọn sẽ xoá
                (section.addonIds as string[]).reduce((liquid, addonId) => {
                  // Nếu addonId có trong newAddonIds thì ta giữ nó lại
                  if (action.payload.newAddonIds?.includes(addonId)) {
                    return liquid;
                  }
                  // Còn không nghĩa là không chọn nên sẽ xoá đi
                  const addonsTag = `<${Consts.FakeTags.Addons}\\s*data-id=("|')${addonId}("|')><\\/${Consts.FakeTags.Addons}>`;
                  return removeRedundantLines(liquid.replace(new RegExp(addonsTag, 'g'), ''));
                }, section.data.liquid)
              : // Còn không thì xoá addons
                removeRedundantLines(section.data.liquid.replace(new RegExp(addonsTagRegxp, 'g'), '')),
          },
          // Thêm mảng addonsId mới khi muốn giữ lại addons
          addonIds: !!action.payload.keepAddons ? action.payload.newAddonIds : [],
          megaMenuCommandIds: [],
        };
        // Xóa commandId ở section mới khi duplicate section
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

    // trường hợp addon không đặt vị trí
    if (_section && isSectionAddons(_section.type)) {
      state.data[pageId].sections = state.data[pageId].sections.filter(section => section.id !== sectionId);
    }

    state.data[pageId].sections = state.data[pageId].sections
      // Nếu section chứa mega menu thì xóa
      .filter(section => {
        return !_section?.megaMenuCommandIds?.includes(section.commandId ?? '');
      })
      .filter(section => {
        const addonsTag = `<${Consts.FakeTags.Addons}\\s*data-id=("|')${sectionId}("|')><\\/${Consts.FakeTags.Addons}>`;
        // Xoá tag <addons... />
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
                // Kiểm tra xem field array có đang trong chế độ ràng buộc các trường dữ liệu hay không
                if (dataBindingFieldNames.length > 0) {
                  settingChild.children.forEach(grandChild => {
                    // Nếu grandChild.name nằm trong các trường bị ràng buộc và đang chỉnh sửa đúng trường đó thì cập nhật tất cả các giá trị cùng name trong array settingChild.children
                    // Còn nếu không thì sửa trường nào mới cập nhật đúng trường đó tại item thuộc array đó
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
        // Thay đổi file
        // @tuong -> Xóa toàn bộ "\r" để regex tại những chỗ khác do "\s" cũng match "\r"
        section.data[action.payload.fileType] = action.payload.value.replace(/\r/g, '');
        // Thực hiện sau khi thay đổi file
        // Xoá addonId trong addonIds sau khi xoá đoạn code <addons...> khỏi liquid
        // Hoặc thêm addonId vào addonIds sau khi thêm đoạn code <addons...> vào liquid
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
    // TODO: @tuong -> Tại thời điểm comment này được viết ra, action này không có bất kì ý nghĩa gì mà còn gây rerender -> Comment tạm lại do không biết thực sự cái này để làm gì
    // const pageId = getPageInfo('id');
    // state.data[pageId].sections.forEach(section => {
    //   if (section.id === action.payload.sectionId) {
    //     section.data.settings.map(setting => {
    //       if (setting.name === action.payload.atomName && (setting.type === 'object' || setting.type === 'array')) {
    //         // Nếu có value thì set còn không thì toggle
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
      // Giữ nguyên id
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
     * @param sectionId: id của section được thêm addon
     * @param addonsSectionId: id của addon được thêm
     * @param insert: Chèn vào trước hay sau "element" được gán addon
     * @param openTag: Đoạn code liquid (mở thẻ html) của "element" được gán addon -> Cùng với "tagName", được dùng để lấy ra đoạn code của "element" để gán addon
     * @param tagName: tag name của "element" được gán addon (là tên "mở thẻ html" tại "openTag") -> Cùng với "openTag", được dùng để lấy ra đoạn code của "element" để gán addon
     * @param indexBOC: index của "element" được gán addon -> Vì có thể có những "element" giống nhau được sinh ra bởi những đoạn code giống nhau nên sẽ cần "indexBOC" để biết được đang gán addon vào "element" nào trong những "element" giống nhau đó
     */

    /**
     * Xét bài toán được mô tả như sau:
     * "1 addon currency" cần được thêm vào "THẺ h1" có class là "title" với text là "Hello world 4"
     * Khi đó code liquid sẽ có 2 trường hợp:
        - Trường hợp 1: Thẻ đó trong code là duy nhất
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
              <<<<ADDON SẼ ĐƯỢC THÊM VÀO ĐÂY NẾU "insert === before">>>> <h1 class="title">Hello world</h1> <<<<ADDON SẼ ĐƯỢC THÊM VÀO ĐÂY NẾU "insert === after">>>>
              <p class="description">Lorem ipsum dolor...</p>
            </div>
          `
        - Trường hợp 2: Thẻ đó trong code không phải duy nhất
          + Trường hợp 2.1: Các thẻ trùng lặp nằm ngang hàng với nhau
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
                <<<<ADDON SẼ ĐƯỢC THÊM VÀO ĐÂY NẾU "insert === before">>>> <h1 class="title">Hello world 4</h1> <<<<ADDON SẼ ĐƯỢC THÊM VÀO ĐÂY NẾU "insert === after">>>>
                <p class="description">Lorem ipsum dolor...</p>
              </div>
            `
          + Trường hợp 2.2: Các thẻ trùng lặp là cha con của nhau
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
                    <<<<ADDON SẼ ĐƯỢC THÊM VÀO ĐÂY NẾU "insert === before">>>> <h1 class="title">Hello world 4</h1> <<<<ADDON SẼ ĐƯỢC THÊM VÀO ĐÂY NẾU "insert === after">>>>
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
        // Nếu openTag là container
        // const isContainer = /id=("|')\{\{\s*uniqueId\s*\}\}/g.test(openTag);
        // Open tag regex
        const _openTagRegexPattern = strToRegexpPattern(openTag);
        // Xóa "\r" để có thể regex do "\s" cũng match "\r" (việc xóa "\r" ảnh hưởng đến "IframePage/utils.ts")
        section.data.liquid = section.data.liquid.replace(/\r/g, '');
        const BOCs = getBOCsBetweenSomething({
          liquid: section.data.liquid,
          // NOTE: @tuong -> Chức năng "Addon Placholder" cần sự kết hợp của nhiều file -> Cần xem xét việc update tất cả các file khi có sự thay đổi nào đó ở 1 file bất kì
          // ["LiquidComponent.tsx", "AddonPosition.tsx", "useAddonsPosition.ts", "reducerPages.ts", "generateHelpers.ts/deleteAddonPlaceholder"]
          tagName: openTag.includes(Consts.FakeTags.AddonsPlaceholder.tagName) ? Consts.FakeTags.AddonsPlaceholder.tagName : tagName,
          openTag,
        });

        // Lấy ra đoạn code được xét
        const BOC = BOCs.find(BOC => BOC.indexBOC === indexBOC);
        // Lấy ra các đoạn code giống nhau và index của đoạn code đó trong BOCs
        const BOCSSameCode = BOCs.reduce<Array<{ BOC: string; indexBOC: number }>>((res, item) => {
          if (item.code === BOC?.code) {
            return res.concat({ BOC: item.code, indexBOC: item.indexBOC });
          }
          return res;
        }, []);
        // Check nếu có nhiều hơn 1 đoạn code giống nhau
        const bocIsExist = BOCSSameCode.length > 1;
        // Trường hợp những thằng ngang hàng, cha con, ... giống nhau về code
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

                // Nếu thẻ đó đang có style order thì ta thêm nó vào bên trong thẻ đó, còn không thì thêm nó vào bên ngoài thẻ đó
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
        // Trường hợp những thằng ngang hàng, cha con, ... khác nhau về code
        else if (BOC && !bocIsExist) {
          section.data.liquid = removeRedundantLines(
            section.data.liquid.replace(BOC.code, BOC => {
              // if (isContainer) {
              //   return insert === 'before'
              //     ? BOC.replace(new RegExp(_openTagRegexPattern), openTag => openTag.concat(addonsTag))
              //     : BOC.replace(new RegExp(`</${tagName}>`), endTag => addonsTag.concat(endTag));
              // } else {

              // Nếu thẻ đó đang có style order thì ta thêm nó vào bên trong thẻ đó, còn không thì thêm nó vào bên ngoài thẻ đó
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
