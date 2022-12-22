import { watchCreateGiftCard } from './watchCreateGiftCard';
import { watchUpdateStatusGiftCard } from './watchUpdateStatusGiftCard';
import { watchDeleteGiftCard } from './watchDeleteGiftCard';
import { watchGetGiftCard } from './watchGetGiftCard';
import { watchLoadMoreGiftCard } from './watchLoadMoreGiftCard';

export const sagasGiftCard = [watchCreateGiftCard, watchUpdateStatusGiftCard, watchDeleteGiftCard, watchGetGiftCard, watchLoadMoreGiftCard];
