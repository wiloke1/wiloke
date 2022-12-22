import { sectionApiController } from 'services/SectionService';
import { adapterGetSection } from 'services/SectionService/Adapters/adapterGetSection';
import { AdminSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const installAtomSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.atom.adminApi.sections.getAtom({ commandId });
    const transformData = adapterGetSection(response) as AdminSection;
    return {
      ...transformData,
      commandId: '',
      parentCommandId: transformData.commandId,
    };
  }
  if (role === 'dev') {
    const response = await sectionApiController.atom.publishApi.sections.getAtom({ commandId });
    const transformData = adapterGetSection(response.data.info) as AdminSection;
    return {
      ...transformData,
      commandId: '',
      parentCommandId: transformData.commandId,
    };
  }
  throw new RoleException();
};
