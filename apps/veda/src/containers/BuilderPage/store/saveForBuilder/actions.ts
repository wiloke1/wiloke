import { GetAdditionalDataRelateToShopify_BEExpectResponse } from 'services/ShopifyConnection';
import { CreateUpdateAtomPageSettings } from 'services/ResultService/atomTypes';
import { UpdateThemeParams } from 'services/ThemeService/types';
import { AdminAddon, DevAddon, ThemeAddon, AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { AdminPage, DevPage, Page, PageOfThemeService, PreviewImage } from 'types/Page';
import { PageData, Result } from 'types/Result';
import { AdminSection, DevSection, SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { BuilderType } from 'types/Theme';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export type SaveForBuilderType = 'create' | 'update';

export interface SavePageForBuilderParams {
  type: SaveForBuilderType;
  builderType: BuilderType;
  data: Page;
  result: PageData;
  previewImage: PreviewImage;
  addons: ThemeAddon[];
}

export interface SavePageForUserParams {
  type: SaveForBuilderType;
  builderType: BuilderType;
  data: Page;
  result: PageData;
  previewImage: PreviewImage;
  addons: ThemeAddon[];
  outputBuilder: Result;
  isDraft: boolean;
}

export interface SaveAtomSectionParams {
  type: SaveForBuilderType;
  data: AdminSection;
}

export interface SaveDraftSectionParams {
  type: SaveForBuilderType;
  data: DevSection;
}

export interface SaveAtomAddonParams {
  type: SaveForBuilderType;
  data: AdminAddon;
}

export interface SaveDraftAddonParams {
  type: SaveForBuilderType;
  data: DevAddon;
}

export const resyncPage = createAsyncAction([
  '@BuilderPage/resyncPage/request',
  '@BuilderPage/resyncPage/success',
  '@BuilderPage/resyncPage/failure',
])<{ pageId: string }, undefined, undefined>();

export const savePageForBuilder = createAsyncAction([
  '@BuilderPage/savePageForBuilder/request',
  '@BuilderPage/savePageForBuilder/success',
  '@BuilderPage/savePageForBuilder/failure',
  '@BuilderPage/savePageForBuilder/cancel',
])<
  SavePageForBuilderParams & {
    callback?: () => void;
    isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
  },
  undefined,
  undefined
>();

export const savePageForUser = createAsyncAction([
  '@BuilderPage/savePageForUser/request',
  '@BuilderPage/savePageForUser/success',
  '@BuilderPage/savePageForUser/failure',
  '@BuilderPage/savePageForUser/cancel',
])<
  SavePageForUserParams & {
    page: PageOfThemeService;
    settings: CreateUpdateAtomPageSettings;
    outputBuilder: Result;
    onFulfill: (pageResponse: PageOfThemeService) => void;
    isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
  },
  undefined,
  undefined
>();

export const saveAtomSection = createAsyncAction([
  '@BuilderPage/saveAtomSection/request',
  '@BuilderPage/saveAtomSection/success',
  '@BuilderPage/saveAtomSection/failure',
  '@BuilderPage/saveAtomSection/cancel',
])<SaveAtomSectionParams, undefined, undefined>();

export const saveDraftSection = createAsyncAction([
  '@BuilderPage/saveDraftSection/request',
  '@BuilderPage/saveDraftSection/success',
  '@BuilderPage/saveDraftSection/failure',
  '@BuilderPage/saveDraftSection/cancel',
])<SaveDraftSectionParams, undefined, undefined>();

export const saveAtomMegaMenu = createAsyncAction([
  '@BuilderPage/saveAtomMegaMenu/request',
  '@BuilderPage/saveAtomMegaMenu/success',
  '@BuilderPage/saveAtomMegaMenu/failure',
  '@BuilderPage/saveAtomMegaMenu/cancel',
])<SaveAtomSectionParams, undefined, undefined>();

export const saveDraftMegaMenu = createAsyncAction([
  '@BuilderPage/saveDraftMegaMenu/request',
  '@BuilderPage/saveDraftMegaMenu/success',
  '@BuilderPage/saveDraftMegaMenu/failure',
  '@BuilderPage/saveDraftMegaMenu/cancel',
])<SaveDraftSectionParams, undefined, undefined>();

export const saveAtomAddon = createAsyncAction([
  '@BuilderPage/saveAtomAddon/request',
  '@BuilderPage/saveAtomAddon/success',
  '@BuilderPage/saveAtomAddon/failure',
  '@BuilderPage/saveAtomAddon/cancel',
])<SaveAtomAddonParams, undefined, undefined>();

export const saveDraftAddon = createAsyncAction([
  '@BuilderPage/saveDraftAddon/request',
  '@BuilderPage/saveDraftAddon/success',
  '@BuilderPage/saveDraftAddon/failure',
  '@BuilderPage/saveDraftAddon/cancel',
])<SaveDraftAddonParams, undefined, undefined>();

export const saveTheme = createAsyncAction([
  '@BuilderPage/saveTheme/request',
  '@BuilderPage/saveTheme/success',
  '@BuilderPage/saveTheme/failure',
  '@BuilderPage/saveTheme/cancel',
])<
  UpdateThemeParams & {
    outputBuilder: Result;
    isOverrideIndividualPages: boolean;
    addons: AddonOfTheme_Atom_N_Client[];
    headers: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client[];
    footers: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client[];
    variant: EntityType;
    isDraft: boolean;
    onFulfill?: () => void;
  },
  undefined,
  undefined
>();

export const saveHeaderFooter = createAsyncAction([
  '@BuilderPage/saveHeaderFooter/request',
  '@BuilderPage/saveHeaderFooter/success',
  '@BuilderPage/saveHeaderFooter/failure',
])<undefined, undefined, undefined>();

export const updateStatusAddons = createAsyncAction([
  '@BuilderPage/updateStatusAddons/request',
  '@BuilderPage/updateStatusAddons/success',
  '@BuilderPage/updateStatusAddons/failure',
])<{ commandId: string; status: 'rejected' | 'approved' }, { commandId: string }, { commandId: string }>();

export const savePageForDev = createAsyncAction([
  '@BuilderPage/savePageForDev/request',
  '@BuilderPage/savePageForDev/success',
  '@BuilderPage/savePageForDev/failure',
  '@BuilderPage/savePageForDev/cancel',
])<
  {
    page: DevPage;
    settings: CreateUpdateAtomPageSettings;
    method: 'create' | 'update';
    outputBuilder: Result;
    onFulfill: (pageResponse: DevPage) => void;
    isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
  },
  undefined,
  undefined
>();

export const savePageForAdmin = createAsyncAction([
  '@BuilderPage/savePageForAdmin/request',
  '@BuilderPage/savePageForAdmin/success',
  '@BuilderPage/savePageForAdmin/failure',
  '@BuilderPage/savePageForAdmin/cancel',
])<
  {
    page: AdminPage;
    settings: CreateUpdateAtomPageSettings;
    method: 'create' | 'update';
    outputBuilder: Result;
    onFulfill: (pageResponse: DevPage) => void;
    isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
  },
  undefined,
  undefined
>();

export const backToPage = createAction('BackToPage', undefined);

export const useSavePageForBuilder = createDispatchAsyncAction(savePageForBuilder);
export const useSavePageForUser = createDispatchAsyncAction(savePageForUser);

export const useSaveAtomSection = createDispatchAsyncAction(saveAtomSection);
export const useSaveDraftSection = createDispatchAsyncAction(saveDraftSection);
export const useSaveAtomMegaMenu = createDispatchAsyncAction(saveAtomMegaMenu);
export const useSaveDraftMegaMenu = createDispatchAsyncAction(saveDraftMegaMenu);

export const useSaveAtomAddon = createDispatchAsyncAction(saveAtomAddon);
export const useSaveDraftAddon = createDispatchAsyncAction(saveDraftAddon);

export const useUpdateStatusAddons = createDispatchAsyncAction(updateStatusAddons);
export const useSaveTheme = createDispatchAsyncAction(saveTheme);
export const useSaveHeaderFooter = createDispatchAsyncAction(saveHeaderFooter);
export const useResyncPage = createDispatchAsyncAction(resyncPage);
export const useSavePageForDev = createDispatchAsyncAction(savePageForDev);
export const useSavePageForAdmin = createDispatchAsyncAction(savePageForAdmin);

export const useBackToPage = createDispatchAction(backToPage);
