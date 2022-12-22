import { sectionApiController } from 'services/SectionService';
import { adapterGetSection } from 'services/SectionService/Adapters/adapterGetSection';
import { AdminSection } from 'types/Sections';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getAtomSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.atom.adminApi.sections.getAtom({ commandId });
    return adapterGetSection(response) as AdminSection;
  }
  const response = await sectionApiController.atom.publishApi.sections.getAtom({ commandId });
  return adapterGetSection(response.data.info) as AdminSection;
};
