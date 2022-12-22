import { PageSectionType } from 'types/Sections';
import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export interface SetTemplateBoardVisibleInput {
  visible?: boolean;
  index?: number;
  isChange?: boolean;
  sectionType?: PageSectionType;
  navKeys?: string[];
}

export const setTemplateBoardVisible = createAction('@ChooseTemplate/setTemplateBoardVisible', (args: SetTemplateBoardVisibleInput) => args);

export const useSetTemplateBoardVisible = createDispatchAction(setTemplateBoardVisible);
