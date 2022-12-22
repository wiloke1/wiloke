import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { LiquidSnippet } from './sliceGlobalSnippets';

interface Params {
  keyword?: string;
  fileNames?: string[];
  size?: number;
  showNotify?: boolean;
}

export const getLiquidSnippets = createAsyncAction([
  '@Global/getLiquidSnippets/request',
  '@Global/getLiquidSnippets/success',
  '@Global/getLiquidSnippets/failure',
])<Params, LiquidSnippet, undefined>();

export const loadMoreLiquidSnippets = createAsyncAction([
  '@Global/loadMoreLiquidSnippets/request',
  '@Global/loadMoreLiquidSnippets/success',
  '@Global/loadMoreLiquidSnippets/failure',
])<Params & { page: number }, LiquidSnippet, undefined>();

export const createLiquidSnippet = createAsyncAction([
  '@Global/createLiquidSnippet/request',
  '@Global/createLiquidSnippet/success',
  '@Global/createLiquidSnippet/failure',
])<{ fileName: string; liquidContent: string }, LiquidSnippet, undefined>();

export const updateLiquidSnippet = createAsyncAction([
  '@Global/updateLiquidSnippet/request',
  '@Global/updateLiquidSnippet/success',
  '@Global/updateLiquidSnippet/failure',
])<{ fileName: string; liquidContent: string }, { fileName: string; liquidContent: string }, undefined>();

export const updateLiquidSnippetFileName = createAsyncAction([
  '@Global/updateLiquidSnippetFileName/request',
  '@Global/updateLiquidSnippetFileName/success',
  '@Global/updateLiquidSnippetFileName/failure',
])<{ newFileName: string; oldFileName: string }, { newFileName: string; oldFileName: string }, undefined>();

export const deleteLiquidSnippet = createAsyncAction([
  '@Global/deleteLiquidSnippet/request',
  '@Global/deleteLiquidSnippet/success',
  '@Global/deleteLiquidSnippet/failure',
])<{ fileName: string }, { fileName: string }, undefined>();

export const useGetLiquidSnippets = createDispatchAsyncAction(getLiquidSnippets);
export const useLoadMoreLiquidSnippets = createDispatchAsyncAction(loadMoreLiquidSnippets);
export const useCreateLiquidSnippet = createDispatchAsyncAction(createLiquidSnippet);
export const useDeleteLiquidSnippet = createDispatchAsyncAction(deleteLiquidSnippet);
export const useUpdateLiquidSnippetFileName = createDispatchAsyncAction(updateLiquidSnippetFileName);
export const useUpdateLiquidSnippet = createDispatchAsyncAction(updateLiquidSnippet);
