import { SchemaFieldProps } from 'containers/BuilderPage/components/SchemaField';
import { Page, PageId, PageLiquidVariable } from 'types/Page';
import { Result } from 'types/Result';
import { Schema, SchemaSettingField, SectionSetting, SectionSettings, SettingArrayValue } from 'types/Schema';
import { PageSection, PageSectionType } from 'types/Sections';
import getPageInfo from 'utils/functions/getInfo';
import { v4 } from 'uuid';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export interface UpdateSchemaBlocksParams {
  sectionId: string;
  data: Parameters<Exclude<SchemaFieldProps['onUpdateBlocks'], undefined>>[0];
}
export interface UpdateSchemaSettingsParams {
  sectionId: string;
  data: Parameters<Exclude<SchemaFieldProps['onUpdateSettings'], undefined>>[0];
}

export interface UpdateSettingsValueParams {
  sectionId: string;
  settingId: string;
  value: SectionSetting['children'];
  childId?: string;
  grandChildId?: string;
  dataBindingFieldNames: string[];
}

export interface UpdateFieldHiddenValueParams {
  sectionId: string;
  name: string;
  value: any;
}

export interface UpdateComponentParams {
  sectionId: string;
  value: string;
  fileType: 'liquid' | 'scss' | 'js' | 'jsHook';
}

export interface AddElementInput {
  sectionId: string;
  elementIndex: number;
  liquid: string;
  scss: string;
  js: string;
  settings: SectionSettings;
  schema: Schema;
}

export const getPage = createAsyncAction(['@Global/getPage/request', '@Global/getPage/success', '@Global/getPage/failure'])<
  {
    id: string;
    headerFooterEnabled?: boolean;
    name?: string;
    handle?: string;
    type?: Page['type'];
    shopifyRepresentPage?: Page['shopifyRepresentPage'];
    shopifyPages?: Page['shopifyPages'];
    variant: EntityType;
    isAdminTemplate?: boolean;
  },
  { result: Page },
  { message: string }
>();

export const setPage = createAction('@Global/setPage', (page: Page) => ({ page }));
export const setPageLabel = createAction('@Global/setPageLabel', (payload: { pageLabel: Page['label'] }) => payload);
export const setPageAfterCreate = createAction('@Global/setPageAfterCreate', (page: Page) => ({ page }));
export const setPageIdCommandId = createAction('@Global/setPageIdCommandId', (id: string, commandId: string) => ({ id, commandId }));

export const setPages = createAction('@Global/setPages', (pages: Record<PageId, Page>) => ({ pages }));
export const setThemeAddonsToPages = createAction('@Global/setThemeAddonsToPages', (addons: PageSection[]) => ({ addons }));
export const setThemeHeaderFooterToPages = createAction(
  '@Global/setThemeHeaderFooterToPages',
  ({ footers, headers }: { headers: PageSection[]; footers: PageSection[] }) => ({ headers, footers }),
);
export const setMegaMenusOfHeaderFooterToPages = createAction(
  '@Global/setMegaMenusOfHeaderFooterToPages',
  ({ megaMenus }: { megaMenus: PageSection[] }) => ({ megaMenus }),
);

export const syncThemeHeadersToPages = createAction('@Global/syncThemeHeadersToPages');
export const syncThemeFootersToPages = createAction('@Global/syncThemeFootersToPages');
export const syncMegaMenuOfHeaderFooterToPages = createAction('@Global/syncMegaMenuOfHeaderFooterToPages');

export const setAddonToPages = createAction('@Global/setAddonToPages', (addon: PageSection) => ({ addon }));
export const updateAddonToPages = createAction('@Global/updateAddonToPages', (sectionAddon: PageSection) => ({
  sectionAddon,
}));

export const addMegaMenuToPage = createAction('@Global/addMegaMenuToPage', (megaMenu: PageSection) => ({ megaMenu }));
export const addMegaMenusToPage = createAction('@Global/addMegaMenusToPage', (megaMenus: PageSection[]) => ({ megaMenus }));
export const changeMegaMenuSection = createAction('@Global/changeMegaMenuSection', (index: number, megaMenu: PageSection) => ({
  index,
  megaMenu,
}));

export const resetDefaultPages = createAction('@Global/resetDefaultPages');

export const setSections = createAction('@Global/setSections', (sections: PageSection[]) => ({ sections }));

export const setSectionsDraft = createAction('@Global/setSectionsDraft', (sections: PageSection[]) => ({ sections }));

export const setSectionLabel = createAction('@Global/setSectionLabel', (id: string, label: string) => ({ id, label }));

export const updateSettingsValue = createAction('@Global/updateSettingsValue', (args: UpdateSettingsValueParams) => args);

const thunkUpdateSettingsValue = (
  args: Omit<UpdateSettingsValueParams, 'sectionId' | 'dataBindingFieldNames'>,
): ThunkAction<typeof updateSettingsValue> => (dispatch, getState) => {
  const state = getState();
  dispatch(
    updateSettingsValue({
      sectionId: state.global.sectionIdActive,
      dataBindingFieldNames: state.global.dataBindingFieldNames[state.global.sectionIdActive] ?? [],
      ...args,
    }),
  );
};

export const reorderSettings = createAction('Global/reorderSettings', (args: { sectionId: string; srcIndex: number; desIndex: number }) => args);

export const updateFieldHiddenValue = createAction('@Global/updateFieldHiddenValue', (args: UpdateFieldHiddenValueParams) => args);
const thunkupdateFieldHiddenValue = (args: UpdateFieldHiddenValueParams): ThunkAction<typeof updateFieldHiddenValue> => dispatch => {
  dispatch(updateFieldHiddenValue(args));
};
export const updateSchemaBlocks = createAction('@Global/updateSchemaBlocks', (args: UpdateSchemaBlocksParams) => args);
export const updateSchemaSettings = createAction('@Global/updateSchemaSettings', (args: UpdateSchemaSettingsParams) => args);
export const copySchema = createAction('@Global/copySchema', (args: { schema: Schema; settings: SectionSettings }) => args);
export const pasteSchema = createAction('@Global/pasteSchema', (args: { sectionId: string; schema: Schema; settings: SectionSettings }) => args);
export const updateTemplateFile = createAction('@Global/updateTemplateFile', (args: UpdateComponentParams) => args);
export const cancelCode = createAction('@Global/cancelCode', (section: PageSection) => ({ section }));
export const duplicateSection = createAction(
  '@Global/duplicateSection',
  (args: { sectionId: string; newId?: string; newAddonIds?: string[]; keepAddons?: boolean }) => args,
);
export const deleteSection = createAction('@Global/deleteSection', (sectionId: string) => ({
  sectionId,
}));
export const renameSection = createAction('@Global/renameSection', (args: { sectionId: string; newName: string }) => args);
export const sortableSection = createAction('@Global/sortableSection', (srcIndex: number, desIndex: number, sectionType?: PageSectionType) => ({
  srcIndex,
  desIndex,
  sectionType,
}));
export const toggleObjectField = createAction('@Global/toggleObjectField', (sectionId: string, atomName: string, value?: boolean) => ({
  sectionId,
  atomName,
  value,
}));
export const toggleVisibleSection = createAction('@Global/toggleVisibleSection', (sectionId: string) => ({ sectionId }));

interface SortArraySettingChildren {
  sectionId: string;
  settingId: string;
  sourceIndex: number;
  destinationIndex: number;
}
export const sortArraySettingChildren = createAction('@Global/sortArraySettingChildren', (args: SortArraySettingChildren) => ({
  ...args,
}));
interface DuplicateArraySettingChildren {
  sectionId: string;
  settingId: string;
  settingChildIndex: number;
}
export const duplicateArraySettingChildren = createAction('@Global/duplicateArraySettingChildren', (args: DuplicateArraySettingChildren) => ({
  ...args,
}));
interface AddArraySettingChildren {
  sectionId: string;
  settingId: string;
  newSettingChildren: SettingArrayValue;
}
export const addArraySettingChildren = createAction('@Global/addArraySettingChildren', (args: AddArraySettingChildren) => ({
  ...args,
}));
const thunkAddArraySettingChildren = (
  args: Omit<AddArraySettingChildren, 'sectionId' | 'newSettingChildren'>,
): ThunkAction<typeof addArraySettingChildren> => (dispatch, getState) => {
  const state = getState();
  const sectionId = state.global.sectionIdActive;
  const pageId = getPageInfo('id');
  const section = state.global.pages.data[pageId].sections.find(section => section.id === sectionId);
  const newSettingChildren = section?.data.schema.blocks.find(block => block.id === args.settingId)?.children as SchemaSettingField[];
  dispatch(
    addArraySettingChildren({
      sectionId,
      settingId: args.settingId,
      newSettingChildren: {
        id: v4(),
        children: newSettingChildren,
      },
    }),
  );
};

export interface AddArraySettingComponent extends AddArraySettingChildren {
  componentChildren: string;
}

export const addArraySettingComponent = createAction('@Global/addArraySettingComponent', (args: AddArraySettingComponent) => ({
  ...args,
}));
const thunkAddArraySettingComponent = (
  args: Omit<AddArraySettingComponent, 'sectionId' | 'newSettingChildren'>,
): ThunkAction<typeof addArraySettingComponent> => (dispatch, getState) => {
  const state = getState();
  const sectionId = state.global.sectionIdActive;
  const pageId = getPageInfo('id');
  const section = state.global.pages.data[pageId].sections.find(section => section.id === sectionId);
  const newSettingChildren = section?.data.schema.blocks.find(block => block.id === args.settingId)?.children as SchemaSettingField[];
  const [first, ...rest] = newSettingChildren;

  dispatch(
    addArraySettingComponent({
      sectionId,
      settingId: args.settingId,
      componentChildren: args.componentChildren,
      newSettingChildren: {
        id: v4(),
        children: [
          {
            ...first,
            children: args.componentChildren,
          } as SchemaSettingField,
          ...rest,
        ],
      },
    }),
  );
};

const thunkUpdateTemplateFile = (args: UpdateComponentParams): ThunkAction<typeof updateTemplateFile> => dispatch => {
  return new Promise(resolve => {
    dispatch(updateTemplateFile(args));
    resolve(undefined);
  });
};

interface DeleteArraySettingChildren {
  sectionId: string;
  settingId: string;
  settingChildId: string;
}

export const deleteArraySettingChildren = createAction('@Global/deleteArraySettingChildren', (args: DeleteArraySettingChildren) => ({
  ...args,
}));

export const addSection = createAction('@Global/addSection', (index: number, section: PageSection) => {
  return {
    index,
    section: {
      ...section,
      addonIds: [],
      data: {
        ...section.data,
        liquid: section.data.liquid.replace(/<addons.*>.*<\/addons>/g, ''),
      },
    },
  };
});

export const changeSection = createAction('@Global/changeSection', (index: number, section: PageSection) => ({
  index,
  section,
}));

export const addElement = createAction('@Global/addElement', (args: AddElementInput) => args);

export const removeAddonsInSection = createAction('@Global/removeAddonsInSection', (sectionIds: string[], addonsSectionId: string) => ({
  addonsSectionId,
  sectionIds,
}));
export const addAddonsInSection = createAction(
  '@Global/addAddonsInSection',
  (
    sectionId: string,
    hasStyleOrder: boolean,
    addonsSectionId: string,
    insert: 'before' | 'after',
    openTag: string,
    tagName: string,
    indexBOC: number,
  ) => ({
    sectionId,
    addonsSectionId,
    insert,
    openTag,
    tagName,
    indexBOC,
    hasStyleOrder,
  }),
);
export const addToHeader = createAction('@Global/addToHeader', (sectionId: string) => ({ sectionId }));
export const addToMain = createAction('@Global/addToMain', (sectionId: string) => ({ sectionId }));
export const addToFooter = createAction('@Global/addToFooter', (sectionId: string) => ({ sectionId }));

export const publishPage = createAsyncAction(['@Global/publishPage/request', '@Global/publishPage/success', '@Global/publishPage/failure'])<
  { id: string; result: Result },
  undefined,
  undefined
>();

export const updatePage = createAsyncAction(['@Global/updatePage/request', '@Global/updatePage/success', '@Global/updatePage/failure'])<
  { id: string; result: Result },
  undefined,
  undefined
>();

export const setRequestStatusPage = createAction('@Global/setRequestStatusPage', (requestStatus: Status) => ({ requestStatus }));

export const updateMainSectionsToPages = createAction(
  '@Global/updateMainSectionsToPages',
  ({ sections, pageId }: { sections: PageSection[]; pageId?: string }) => ({ sections, pageId }),
);
export const updateFootersToPage = createAction('@Global/updateFootersToPage', ({ footers }: { footers: PageSection[] }) => ({ footers }));
export const updateHeadersToPage = createAction('@Global/updateHeadersToPage', ({ headers }: { headers: PageSection[] }) => ({ headers }));
export const updateMegaMenusToPage = createAction('@Global/updateMegaMenusToPage', ({ megaMenus }: { megaMenus: PageSection[] }) => ({ megaMenus }));
export const updateAddonsToPage = createAction('@Global/updateAddonsToPage', ({ addons }: { addons: PageSection[] }) => ({ addons }));

export const setDeletedSectionAddonMegaMenuCommandIds = createAction(
  '@BuilderPage/setDeletedSectionAddonMegaMenuCommandIds',
  ({
    deletedAddonCommandId,
    deletedMegaMenuCommandId,
    deletedSectionCommandId,
  }: {
    deletedSectionCommandId?: string;
    deletedAddonCommandId?: string;
    deletedMegaMenuCommandId?: string;
  }) => ({ deletedAddonCommandId, deletedMegaMenuCommandId, deletedSectionCommandId }),
);
export const removeDeletedSectionAddonMegaMenuCommandIds = createAction(
  '@BuilderPage/removeDeletedSectionAddonMegaMenuCommandIds',
  ({
    deletedAddonCommandId,
    deletedMegaMenuCommandId,
    deletedSectionCommandId,
  }: {
    deletedSectionCommandId?: string;
    deletedAddonCommandId?: string;
    deletedMegaMenuCommandId?: string;
  }) => ({ deletedAddonCommandId, deletedMegaMenuCommandId, deletedSectionCommandId }),
);

export const updateShopifyRepresentPage = createAction(
  '@BuilderPage/updateShopifyRepresentPage',
  (payload: { shopifyRepresentPage: PageLiquidVariable; shopifyPages: PageLiquidVariable[] }) => ({ ...payload }),
);

export const useSetDeletedSectionAddonMegaMenuCommandIds = createDispatchAction(setDeletedSectionAddonMegaMenuCommandIds);
export const useRemoveDeletedSectionAddonMegaMenuCommandIds = createDispatchAction(removeDeletedSectionAddonMegaMenuCommandIds);

export const useGetPage = createDispatchAsyncAction(getPage);
export const useSetPage = createDispatchAction(setPage);
export const useSetPageLabel = createDispatchAction(setPageLabel);
export const useSetPageAfterCreate = createDispatchAction(setPageAfterCreate);
export const useSetPages = createDispatchAction(setPages);
export const useSetThemeAddonsToPages = createDispatchAction(setThemeAddonsToPages);
export const useSetAddonToPages = createDispatchAction(setAddonToPages);
export const useUpdateAddonToPages = createDispatchAction(updateAddonToPages);
export const useSetThemeHeaderFooterToPages = createDispatchAction(setThemeHeaderFooterToPages);
export const useSetMegaMenusOfHeaderFooterToPages = createDispatchAction(setMegaMenusOfHeaderFooterToPages);
export const useSyncThemeHeaderToPages = createDispatchAction(syncThemeHeadersToPages);
export const useSyncThemeFootersToPages = createDispatchAction(syncThemeFootersToPages);
export const useSyncMegaMenuOfHeaderFooterToPages = createDispatchAction(syncMegaMenuOfHeaderFooterToPages);

export const useAddMegaMenuToPage = createDispatchAction(addMegaMenuToPage);
export const useAddMegaMenusToPage = createDispatchAction(addMegaMenusToPage);
export const useChangeMegaMenuSection = createDispatchAction(changeMegaMenuSection);

export const useSetSectionLabel = createDispatchAction(setSectionLabel);
export const useUpdateSchemaBlocks = createDispatchAction(updateSchemaBlocks);
export const useUpdateSchemaSettings = createDispatchAction(updateSchemaSettings);
export const useCopySchema = createDispatchAction(copySchema);
export const usePasteSchema = createDispatchAction(pasteSchema);
export const useUpdateSettingsValue = createDispatchAction(thunkUpdateSettingsValue);
export const useUpdateFieldHiddenValue = createDispatchAction(thunkupdateFieldHiddenValue);
export const useUpdateTemplateFile = createDispatchAction(thunkUpdateTemplateFile);
export const useCancelCode = createDispatchAction(cancelCode);
export const useRenameSection = createDispatchAction(renameSection);
export const useSortableSection = createDispatchAction(sortableSection);
export const useToggleObjectField = createDispatchAction(toggleObjectField);
export const useSetSections = createDispatchAction(setSections);
export const useSetSectionsDraft = createDispatchAction(setSectionsDraft);
export const useToggleVisibleSection = createDispatchAction(toggleVisibleSection);
export const useSortArraySettingChildren = createDispatchAction(sortArraySettingChildren);
export const useAddArraySettingChildren = createDispatchAction(thunkAddArraySettingChildren);
export const useAddArraySettingComponent = createDispatchAction(thunkAddArraySettingComponent);
export const useDuplicateArraySettingChildren = createDispatchAction(duplicateArraySettingChildren);
export const useDeleteArraySettingChildren = createDispatchAction(deleteArraySettingChildren);
export const useAddSection = createDispatchAction(addSection);
export const useChangeSection = createDispatchAction(changeSection);
export const useAddElement = createDispatchAction(addElement);
export const useReorderSettings = createDispatchAction(reorderSettings);
export const useRemoveAddonsInSection = createDispatchAction(removeAddonsInSection);
export const useAddAddonsInSection = createDispatchAction(addAddonsInSection);
export const useAddToHeader = createDispatchAction(addToHeader);
export const useAddToMain = createDispatchAction(addToMain);
export const useAddToFooter = createDispatchAction(addToFooter);
export const useDeleteSection = createDispatchAction(deleteSection);

export const usePublishPage = createDispatchAsyncAction(publishPage);
export const useUpdatePage = createDispatchAsyncAction(updatePage);
export const useSetRequestStatusPage = createDispatchAction(setRequestStatusPage);
export const useUpdateMainSectionsToPages = createDispatchAction(updateMainSectionsToPages);

export const useUpdateShopifyRepresentPage = createDispatchAction(updateShopifyRepresentPage);
