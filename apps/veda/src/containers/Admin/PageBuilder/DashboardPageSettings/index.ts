import { watchCheckSlugExist } from './watchCheckSlugExist';
import { watchUpdatePageSettings } from './watchUpdatePageSettings';

export * from './slice';

export const sagasDashboardPageSettings = [watchUpdatePageSettings, watchCheckSlugExist];
