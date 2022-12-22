import { FileImportExportContent } from 'types/FileImportExport';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface ImportFileDraftAction {
  type: 'setFileDraft';
  payload: {
    fileName?: string | undefined;
    fileContent?: FileImportExportContent | undefined;
  };
}
interface ImportFileDraftState {
  fileName?: string;
  fileContent?: FileImportExportContent;
}

const initialState: ImportFileDraftState = {};

export const sliceImportFileDraft = createSlice<ImportFileDraftState, ImportFileDraftAction>({
  name: '@Global',
  initialState,
  reducers: [handleAction('setFileDraft', ({ action }) => action.payload)],
});

export const { setFileDraft } = sliceImportFileDraft.actions;
export const useSetFileDraft = createDispatchAction(setFileDraft);
