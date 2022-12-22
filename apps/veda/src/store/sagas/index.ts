import { watchGlobalMount } from 'store/global/globalMount/saga';
import { watchSyncToShopify } from 'store/global/socket/watchSyncToShopify';
import { watchPreviewWithShopify } from 'store/global/socket/watchPreviewWithShopify';
import { watchRenewData } from 'store/global/renewDataBuilder/watchRenewData';
import { watchResult } from './watchResult/watchResult';

const sagasGlobal = [watchResult, watchGlobalMount, watchSyncToShopify, watchPreviewWithShopify, watchRenewData];

export default sagasGlobal;
