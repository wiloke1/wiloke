import { PageSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface GetSectionsOfPageDraft {
  sectionCommandIds: string[];
}

export const getSectionsOfPageDraft = async ({ sectionCommandIds }: GetSectionsOfPageDraft): Promise<PageSection[]> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const responses = await Promise.all(
      sectionCommandIds.map(sectionCommandId => {
        return pageApis.atom.adminApi.section.getSectionOfDraft({ commandId: sectionCommandId });
      }),
    );
    return responses.reduce<PageSection[]>((res, { info }) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []);
  }
  if (role === 'dev') {
    const responses = await Promise.all(
      sectionCommandIds.map(sectionCommandId => {
        return pageApis.atom.devApi.section.getSectionOfDraft({ commandId: sectionCommandId });
      }),
    );
    return responses.reduce<PageSection[]>((res, { info }) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []);
  }
  throw new RoleException();
};
