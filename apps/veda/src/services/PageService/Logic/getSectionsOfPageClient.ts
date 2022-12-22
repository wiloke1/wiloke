import { sectionApiController } from 'services/SectionService';
import { PageSection } from 'types/Sections';

interface GetSectionsOfPageClient {
  sectionCommandIds: string[];
}

export const getSectionsOfPageClient = async ({ sectionCommandIds }: GetSectionsOfPageClient): Promise<PageSection[]> => {
  const responses = await sectionApiController.client.clientApi.section.getClients({
    commandIds: sectionCommandIds,
  });
  return responses.reduce<PageSection[]>((res, info) => {
    if (info) {
      return res.concat(info);
    }
    return res;
  }, []);
};
