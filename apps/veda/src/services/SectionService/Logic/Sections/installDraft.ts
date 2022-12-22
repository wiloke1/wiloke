import { sectionApiController } from 'services/SectionService';
import { adapterGetSection } from 'services/SectionService/Adapters/adapterGetSection';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const installDraftSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role == 'admin') {
    const response = await sectionApiController.atom.adminApi.sections.getDraftOfDev({ commandId });
    const transformData = adapterGetSection(response) as DevSection;
    return {
      ...transformData,
      commandId: '',
      parentCommandId: transformData.commandId,
    };
  }
  if (role === 'dev') {
    const response = await sectionApiController.atom.devApi.sections.getDraftOfDev({ commandId });
    const transformData = adapterGetSection(response) as DevSection;
    return {
      ...transformData,
      commandId: '',
      parentCommandId: transformData.commandId,
    };
  }
  throw new RoleException();
};
