import { sectionApiController } from 'services/SectionService';
import { PageSection } from 'types/Sections';

interface GetHeaderOrFooterSectionsOfThemeClient {
  commandIds: string[];
}

export const getHeaderOrFooterSectionsOfThemeClient = async ({ commandIds }: GetHeaderOrFooterSectionsOfThemeClient): Promise<PageSection[]> => {
  const responses = await sectionApiController.client.clientApi.section.getClients({ commandIds });

  return responses.reduce<PageSection[]>((res, info) => {
    if (info) {
      return res.concat(info);
    }
    return res;
  }, []);

  // const { role } = getUserInfo();
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   const response = await sectionApiController.client.clientApi.section.getClient({ commandId })
  //   return response.info;
  // }
  // throw new RoleException();
};
