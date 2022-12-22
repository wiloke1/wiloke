import { megaMenuApiController } from 'services/MegaMenuService';
import { adapterGetMegaMenu } from 'services/MegaMenuService/Adapters/adapterGetMegaMenu';
import { ProductSection } from 'types/Sections';

export const installClientMegaMenu = async (commandId: string) => {
  const response = await megaMenuApiController.atom.publishApi.mega_menu.getAtom({ commandId });
  const transformData = adapterGetMegaMenu(response.info) as ProductSection;
  return {
    info: transformData,
    message: response.message,
  };
};
