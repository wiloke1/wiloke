import { pageApis } from '../apis';

interface GetPageClient {
  commandId: string;
}

export const getPageClientUseAtomTemplate = async ({ commandId }: GetPageClient) => {
  const response = await pageApis.atom.userApi.page.getAtom({ commandId });

  return {
    ...response.info,
    parentCommandId: response.info.commandId,
    type: (response.info as any).type === 'default' ? 'page' : response.info.type, // be đang trả về sai type
  };
};
