import { AdminSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { sectionApiController } from 'services/SectionService';
import { adapterGetManySections } from 'services/SectionService/Adapters/adapterGetManySections';

export const getAtomSections = async ({
  categoryCommandId,
  categoryName,
  label,
}: {
  categoryCommandId?: string;
  categoryName?: string;
  label?: string;
}) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    if (!!categoryCommandId || !!categoryName || !!label) {
      const response = await sectionApiController.atom.adminApi.sections.filterAtom({ categoryCommandId, categoryName, label });
      return adapterGetManySections(response.info) as AdminSection[];
    } else {
      const response = await sectionApiController.atom.adminApi.sections.getAtoms({ type: 'GET FIRST PAGE' });
      return adapterGetManySections(response.info) as AdminSection[];
    }
  }
  if (role === 'dev') {
    if (!!categoryCommandId || !!categoryName || !!label) {
      const response = await sectionApiController.atom.publishApi.sections.filterAtom({ categoryCommandId, categoryName, label });
      return adapterGetManySections(response.info) as AdminSection[];
    } else {
      const response = await sectionApiController.atom.publishApi.sections.getAtoms({ type: 'GET FIRST PAGE' });
      return adapterGetManySections(response.info) as AdminSection[];
    }
  }
  throw new RoleException();
};

export const loadMoreAtomSections = async ({
  cursor,
  categoryCommandId,
  categoryName,
  label,
}: {
  cursor: string;
  categoryCommandId?: string;
  categoryName?: string;
  label?: string;
}) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.atom.adminApi.sections.getAtoms({
      type: 'LOADMORE',
      lastCursor: cursor,
      categoryCommandId,
      categoryName,
      label,
    });
    return adapterGetManySections(response.info) as AdminSection[];
  }
  if (role === 'dev') {
    const response = await sectionApiController.atom.publishApi.sections.getAtoms({
      type: 'LOADMORE',
      lastCursor: cursor,
      categoryCommandId,
      categoryName,
      label,
    });
    return adapterGetManySections(response.info) as AdminSection[];
  }
  throw new RoleException();
};
