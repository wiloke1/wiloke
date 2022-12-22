import {
  getAddonVersion,
  getSectionVersion,
  setModalUpdateSection,
  setModalUpdateAddon,
  updateVersionSectionFlow,
  updateVersionAddonFlow,
} from 'store/actions/versions/actionSectionVersion';
import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { SectionSettings, SettingBlock } from 'types/Schema';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';

import { VersionSection } from 'types/Version';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type SectionVersionActions = ActionTypes<
  | typeof getSectionVersion
  | typeof getAddonVersion
  | typeof setModalUpdateSection
  | typeof setModalUpdateAddon
  | typeof updateVersionSectionFlow
  | typeof updateVersionAddonFlow
>;

interface State {
  sectionsVersion: Record<string, { getStatus: Status; data: VersionSection | undefined } | undefined>;
  addonsVersion: Record<string, { getStatus: Status; data: VersionSection | undefined } | undefined>;
  modalUpdateSection: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client | undefined;
  modalUpdateAddon: AddonOfTheme_Atom_N_Client | undefined;

  getNewVersionRequest: Status;
  newestUpdateSectionInfo: {
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
  };
}

const defaultState: State = {
  addonsVersion: {},
  sectionsVersion: {},
  modalUpdateSection: undefined,
  modalUpdateAddon: undefined,
  newestUpdateSectionInfo: {
    deletedSettings: [],
    newSettings: [],
    updatedSettings: [],
    deletedBlocks: [],
    newBlocks: [],
    updatedBlocks: [],
    comparedJs: 'equals',
    comparedJsHook: 'equals',
    comparedScss: 'equals',
    comparedLiquid: 'equals',
  },
  getNewVersionRequest: 'idle',
};

export const reducerVersion = createReducer<State, SectionVersionActions>(defaultState, [
  handleAction('@BuilderPage/getAddonVersion/request', ({ state, action }) => {
    const { addonCommandId } = action.payload;
    state.addonsVersion[addonCommandId] = {
      data: undefined,
      getStatus: 'loading',
    };
  }),
  handleAction('@BuilderPage/getAddonVersion/success', ({ state, action }) => {
    const { addonCommandId, data } = action.payload;
    state.addonsVersion[addonCommandId] = {
      data,
      getStatus: 'success',
    };
  }),
  handleAction('@BuilderPage/getAddonVersion/failure', ({ state, action }) => {
    const { addonCommandId } = action.payload;
    state.addonsVersion[addonCommandId] = {
      data: undefined,
      getStatus: 'failure',
    };
  }),
  handleAction('@BuilderPage/getSectionVersion/request', ({ state, action }) => {
    const { sectionCommandId } = action.payload;
    state.sectionsVersion[sectionCommandId] = {
      data: undefined,
      getStatus: 'loading',
    };
  }),
  handleAction('@BuilderPage/getSectionVersion/success', ({ state, action }) => {
    const { sectionCommandId, data } = action.payload;
    state.sectionsVersion[sectionCommandId] = {
      data,
      getStatus: 'success',
    };
  }),
  handleAction('@BuilderPage/getSectionVersion/failure', ({ state, action }) => {
    const { sectionCommandId } = action.payload;
    state.sectionsVersion[sectionCommandId] = {
      data: undefined,
      getStatus: 'failure',
    };
  }),
  handleAction('@BuilderPage/setModalUpdateSection', ({ state, action }) => {
    state.modalUpdateSection = action.payload;
  }),
  handleAction('@BuilderPage/setModalUpdateAddon', ({ state, action }) => {
    state.modalUpdateAddon = action.payload;
  }),
  handleAction('@BuilderPage/updateVersionSectionFlow/request', ({ state }) => {
    state.getNewVersionRequest = 'loading';
  }),
  handleAction('@BuilderPage/updateVersionSectionFlow/success', ({ state, action }) => {
    state.getNewVersionRequest = 'success';
    state.newestUpdateSectionInfo = {
      deletedSettings: action.payload.deletedSettings,
      newSettings: action.payload.newSettings,
      updatedSettings: action.payload.updatedSettings,
      deletedBlocks: action.payload.deletedBlocks,
      newBlocks: action.payload.newBlocks,
      updatedBlocks: action.payload.updatedBlocks,
      comparedJs: action.payload.comparedJs,
      comparedJsHook: action.payload.comparedJsHook,
      comparedLiquid: action.payload.comparedLiquid,
      comparedScss: action.payload.comparedScss,
    };
  }),
  handleAction('@BuilderPage/updateVersionSectionFlow/failure', ({ state }) => {
    state.getNewVersionRequest = 'failure';
  }),
  // addon
  handleAction('@BuilderPage/updateVersionAddonFlow/request', ({ state }) => {
    state.getNewVersionRequest = 'loading';
  }),
  handleAction('@BuilderPage/updateVersionAddonFlow/success', ({ state, action }) => {
    state.getNewVersionRequest = 'success';
    state.newestUpdateSectionInfo = {
      deletedSettings: action.payload.deletedSettings,
      newSettings: action.payload.newSettings,
      updatedSettings: action.payload.updatedSettings,
      deletedBlocks: action.payload.deletedBlocks,
      newBlocks: action.payload.newBlocks,
      updatedBlocks: action.payload.updatedBlocks,
      comparedJs: action.payload.comparedJs,
      comparedJsHook: action.payload.comparedJsHook,
      comparedLiquid: action.payload.comparedLiquid,
      comparedScss: action.payload.comparedScss,
    };
  }),
  handleAction('@BuilderPage/updateVersionAddonFlow/failure', ({ state }) => {
    state.getNewVersionRequest = 'failure';
  }),
]);
