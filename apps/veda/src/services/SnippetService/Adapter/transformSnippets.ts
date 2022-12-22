import { LiquidSnippet } from 'store/global/globalSnippets/sliceGlobalSnippets';

interface SnippetResponse {
  fileName: string;
  data: string;
}

export const transformSnippets = (snippetsResponse: SnippetResponse[]): LiquidSnippet => {
  return snippetsResponse.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.fileName]: cur.data,
    };
  }, {});
};
