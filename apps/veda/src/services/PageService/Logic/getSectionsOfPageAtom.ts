import { PageSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface GetSectionsOfPageAtom {
  sectionCommandIds: string[];
}

export const getSectionsOfPageAtom = async ({ sectionCommandIds }: GetSectionsOfPageAtom): Promise<PageSection[]> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const responses = await pageApis.atom.adminApi.section.getSectionsOfAtom({ commandIds: sectionCommandIds });
    return responses.filter(Boolean) as PageSection[];
  }
  throw new RoleException();
};
