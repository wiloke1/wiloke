import { PageType } from 'types/Page';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { ServerTemplateResponse } from 'services/PagesBuilderService';

export const actionGetTemplatesPopup = createAsyncAction([
  '@BlankPage/getTemplatesRequest',
  '@BlankPage/getTemplatesSuccess',
  '@BlankPage/getTemplatesFailure',
])<{ type: PageType }, { data: ServerTemplateResponse[] }, undefined>();

export const useGetTemplatesPopup = createDispatchAsyncAction(actionGetTemplatesPopup);

export const setCurrentTemplateBlank = createAction('@BlankPage/setCurrentTemplateBlank', (item: ServerTemplateResponse | undefined) => ({ item }));
export const useSetCurrentTemplateBlank = createDispatchAction(setCurrentTemplateBlank);

export const checkCreateBlank = createAction('@BlankPage/checkCreateBlank', (isCreate: boolean) => ({ isCreate }));
export const useCheckCreateBlank = createDispatchAction(checkCreateBlank);
