import { watchAddUserMegaMenuFlow } from './watchAddUserMegaMenuFlow';
import { watchGetMegaMenuSections } from './watchGetMegaMenu';
import { watchInstallUserMegaMenu } from './watchInstallMegaMenu';

export const sagasMegaMenu = [watchGetMegaMenuSections, watchInstallUserMegaMenu, watchAddUserMegaMenuFlow];
