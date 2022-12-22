import { AddonOfTheme_Atom_N_Client, ThemeAddon } from 'types/Addons';
import { SectionSettings, SettingBlock } from 'types/Schema';
import { PageSection, SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { VersionSection } from 'types/Version';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getSectionVersion = createAsyncAction([
  '@BuilderPage/getSectionVersion/request',
  '@BuilderPage/getSectionVersion/success',
  '@BuilderPage/getSectionVersion/failure',
])<{ sectionCommandId: string }, { sectionCommandId: string; data: VersionSection | undefined }, { sectionCommandId: string }>();

export const getAddonVersion = createAsyncAction([
  '@BuilderPage/getAddonVersion/request',
  '@BuilderPage/getAddonVersion/success',
  '@BuilderPage/getAddonVersion/failure',
])<{ addonCommandId: string }, { addonCommandId: string; data: VersionSection | undefined }, { addonCommandId: string }>();

export const updateSectionVersion = createAsyncAction([
  '@BuilderPage/updateSectionVersion/request',
  '@BuilderPage/updateSectionVersion/success',
  '@BuilderPage/updateSectionVersion/failure',
])<{ id: string }, { updatedItem: PageSection }, undefined>();

export const updateAddonVersion = createAsyncAction([
  '@BuilderPage/updateAddonVersion/request',
  '@BuilderPage/updateAddonVersion/success',
  '@BuilderPage/updateAddonVersion/failure',
])<{ id: string; prevAddonSection: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client }, { updatedAddon: ThemeAddon }, undefined>();

export const setModalUpdateSection = createAction(
  '@BuilderPage/setModalUpdateSection',
  (payload: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client | undefined) => payload,
);

export const setModalUpdateAddon = createAction('@BuilderPage/setModalUpdateAddon', (payload: AddonOfTheme_Atom_N_Client | undefined) => payload);

export const updateVersionSectionFlow = createAsyncAction([
  '@BuilderPage/updateVersionSectionFlow/request',
  '@BuilderPage/updateVersionSectionFlow/success',
  '@BuilderPage/updateVersionSectionFlow/failure',
])<
  { section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client },
  {
    deletedSettings: SectionSettings;
    newSettings: SectionSettings;
    updatedSettings: SectionSettings;
    deletedBlocks: SettingBlock[];
    newBlocks: SettingBlock[];
    updatedBlocks: SettingBlock[];
    comparedJs: 'equals' | 'changes';
    comparedJsHook: 'equals' | 'changes';
    comparedScss: 'equals' | 'changes';
    comparedLiquid: 'equals' | 'changes';
  },
  undefined
>();

export const updateVersionAddonFlow = createAsyncAction([
  '@BuilderPage/updateVersionAddonFlow/request',
  '@BuilderPage/updateVersionAddonFlow/success',
  '@BuilderPage/updateVersionAddonFlow/failure',
])<
  { addon: AddonOfTheme_Atom_N_Client },
  {
    deletedSettings: SectionSettings;
    newSettings: SectionSettings;
    updatedSettings: SectionSettings;
    deletedBlocks: SettingBlock[];
    newBlocks: SettingBlock[];
    updatedBlocks: SettingBlock[];
    comparedJs: 'equals' | 'changes';
    comparedJsHook: 'equals' | 'changes';
    comparedScss: 'equals' | 'changes';
    comparedLiquid: 'equals' | 'changes';
  },
  undefined
>();

export const useUpdateVersionSectionFlow = createDispatchAsyncAction(updateVersionSectionFlow);
export const useUpdateVersionAddonFlow = createDispatchAsyncAction(updateVersionAddonFlow);
export const useUpdateSectionVersion = createDispatchAsyncAction(updateSectionVersion);
export const useUpdateAddonVersion = createDispatchAsyncAction(updateAddonVersion);

export const useGetSectionVersion = createDispatchAsyncAction(getSectionVersion);
export const useGetAddonVersion = createDispatchAsyncAction(getAddonVersion);
export const useSetModalUpdateSection = createDispatchAction(setModalUpdateSection);
export const useSetModalUpdateAddon = createDispatchAction(setModalUpdateAddon);
