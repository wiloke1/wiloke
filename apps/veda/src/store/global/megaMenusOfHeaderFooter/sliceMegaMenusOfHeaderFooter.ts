import { PageSection } from 'types/Sections';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

type Actions =
  | {
      type: 'setMegaMenusOfHeaderFooter';
      payload: PageSection[];
    }
  | {
      type: 'deleteMegaMenuOfHeaderFooter';
      payload: {
        sectionId: string;
      };
    }
  | {
      type: 'addSectionToMegaMenuOfHeaderFooter';
      payload: {
        megaMenu: PageSection;
      };
    }
  | {
      type: 'changeSectionToMegaMenuOfHeaderFooter';
      payload: {
        megaMenu: PageSection;
        index: number;
      };
    }
  | {
      type: 'syncMegaMenusOfHeaderFooter';
      payload: PageSection[];
    };

interface State {
  megaMenusOfHeaderFooter: PageSection[];
}

/* reducer này sinh ra để sync mega menu được chứa trong header footer của theme, còn mega menu trong main section éo quan tâm  */
export const sliceMegaMenusOfHeaderFooter = createSlice<State, Actions>({
  name: '@Global',
  initialState: {
    megaMenusOfHeaderFooter: [],
  },
  reducers: [
    handleAction('setMegaMenusOfHeaderFooter', ({ state, action }) => {
      state.megaMenusOfHeaderFooter = [...state.megaMenusOfHeaderFooter, ...action.payload];
    }),
    handleAction('deleteMegaMenuOfHeaderFooter', ({ state, action }) => {
      state.megaMenusOfHeaderFooter = state.megaMenusOfHeaderFooter.filter(item => item.id !== action.payload.sectionId);
    }),
    handleAction('addSectionToMegaMenuOfHeaderFooter', ({ state, action }) => {
      state.megaMenusOfHeaderFooter = state.megaMenusOfHeaderFooter.concat(action.payload.megaMenu);
    }),
    handleAction('changeSectionToMegaMenuOfHeaderFooter', ({ state, action }) => {
      const { index, megaMenu } = action.payload;
      state.megaMenusOfHeaderFooter.splice(index, 1, {
        ...megaMenu,
      });
    }),
    handleAction('syncMegaMenusOfHeaderFooter', ({ state, action }) => {
      state.megaMenusOfHeaderFooter = action.payload;
    }),
  ],
});

export const {
  setMegaMenusOfHeaderFooter,
  deleteMegaMenuOfHeaderFooter,
  addSectionToMegaMenuOfHeaderFooter,
  changeSectionToMegaMenuOfHeaderFooter,
  syncMegaMenusOfHeaderFooter,
} = sliceMegaMenusOfHeaderFooter.actions;

export const useSetMegaMenusOfHeaderFooter = createDispatchAction(setMegaMenusOfHeaderFooter);
export const useDeleteMegaMenuOfHeaderFooter = createDispatchAction(deleteMegaMenuOfHeaderFooter);
export const useAddSectionToMegaMenuOfHeaderFooter = createDispatchAction(addSectionToMegaMenuOfHeaderFooter);
export const useChangeSectionToMegaMenuOfHeaderFooter = createDispatchAction(changeSectionToMegaMenuOfHeaderFooter);
export const useSyncMegaMenusOfHeaderFooter = createDispatchAction(syncMegaMenusOfHeaderFooter);

export const megaMenusOfHeaderFooterSelector = (state: AppState) => state.global.megaMenusOfHeaderFooter;
