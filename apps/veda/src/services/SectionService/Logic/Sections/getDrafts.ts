import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { sectionApiController } from 'services/SectionService';
import { adapterGetManySections } from 'services/SectionService/Adapters/adapterGetManySections';

export const getDraftSections = async ({
  categoryCommandId,
  categoryName,
  label,
  sectionStatus,
}: {
  categoryCommandId?: string;
  categoryName?: string;
  label?: string;
  sectionStatus?: DevSection['status'];
}) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    if (categoryCommandId || categoryName || label) {
      const response = await sectionApiController.atom.adminApi.sections.filterDraftsOfDev({ categoryCommandId, categoryName, label, sectionStatus });
      return adapterGetManySections(response.info) as DevSection[];
    } else {
      const response = await sectionApiController.atom.adminApi.sections.getDraftsOfDev({ type: 'GET FIRST PAGE' });
      return adapterGetManySections(response.info) as DevSection[];
    }
  }
  if (role === 'dev') {
    if (categoryCommandId || categoryName || label) {
      const response = await sectionApiController.atom.devApi.sections.filterDraftsOfDev({ categoryCommandId, categoryName, label });
      return adapterGetManySections(response.info) as DevSection[];
    } else {
      const response = await sectionApiController.atom.devApi.sections.getDraftsOfDev({ type: 'GET FIRST PAGE' });
      return adapterGetManySections(response.info) as DevSection[];
    }
  }
  throw new RoleException();
};

export const loadMoreDraftSections = async ({
  cursor,
  categoryCommandId,
  categoryName,
  label,
  sectionStatus,
}: {
  cursor: string;
  categoryCommandId?: string;
  categoryName?: string;
  label?: string;
  sectionStatus?: DevSection['status'];
}) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.atom.adminApi.sections.getDraftsOfDev({
      type: 'LOADMORE',
      lastCursor: cursor,
      categoryCommandId,
      categoryName,
      label,
      sectionStatus,
    });
    return adapterGetManySections(response.info) as DevSection[];
  }
  if (role === 'dev') {
    const response = await sectionApiController.atom.devApi.sections.getDraftsOfDev({
      type: 'LOADMORE',
      lastCursor: cursor,
      categoryCommandId,
      categoryName,
      label,
      sectionStatus,
    });
    return adapterGetManySections(response.info) as DevSection[];
  }
  throw new RoleException();
};
