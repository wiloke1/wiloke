import { megaMenuApiController } from 'services/MegaMenuService';
import { adapterGetMegaMenu } from 'services/MegaMenuService/Adapters/adapterGetMegaMenu';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const installDraftSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role == 'admin') {
    const response = await megaMenuApiController.atom.adminApi.mega_menu.getDraftOfDev({ commandId });
    const transformData = adapterGetMegaMenu(response.info) as DevSection;
    return {
      info: {
        ...transformData,
        commandId: '',
        parentCommandId: transformData.commandId,
      },
      message: response.message,
    };
  }
  if (role === 'dev') {
    const response = await megaMenuApiController.atom.devApi.mega_menu.getDraftOfDev({ commandId });
    const transformData = adapterGetMegaMenu(response.info) as DevSection;
    return {
      info: {
        ...transformData,
        commandId: '',
        parentCommandId: transformData.commandId,
      },
      message: response.message,
    };
  }
  throw new RoleException();
};
