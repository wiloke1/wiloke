import { LiquidSnippet } from 'store/global/globalSnippets/sliceGlobalSnippets';

export interface GetSnippetsServiceResponse {
  message: string;
  info: LiquidSnippet;
}

export interface CreateUpdateSnippetResponse {
  message: string;
  info: LiquidSnippet;
}

export interface DeleteSnippetResponse {
  message: string;
}
