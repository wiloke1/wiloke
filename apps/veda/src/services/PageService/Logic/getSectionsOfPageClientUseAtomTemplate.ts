import { PageSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface GetSectionsOfPageAtom {
  sectionCommandIds: string[];
}

export const getSectionsOfPageClientUseAtomTemplate = async ({ sectionCommandIds }: GetSectionsOfPageAtom): Promise<PageSection[]> => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev' || role === 'user') {
    const responses = await pageApis.atom.userApi.section.getSectionsOfAtom({ commandIds: sectionCommandIds });
    return responses.reduce<PageSection[]>((res, info) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []);
  }
  throw new RoleException();
};
