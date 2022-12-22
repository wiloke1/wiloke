import { PageType } from 'types/Page';
import { DeletePageInShopify_BEExpectParameters } from './services/deletePageInShopify';

interface HandleDeletePageInDashboard {
  pageCommandId: string;
  pageType: PageType;
  eventId: string | undefined;
}

/** Function thực hiện lấy ra parameters để bắn lên api OutputOfBuilderService và cái tên đang thể hiện lên vị trí mà function được gọi */
export const handleDeletePageInDashboard = ({
  eventId,
  pageCommandId,
  pageType,
}: HandleDeletePageInDashboard): DeepPartial<DeletePageInShopify_BEExpectParameters> => {
  return {
    eventType: 'Delete ouput builder ngoài dashboard',
    eventId,
    pageCommandId,
    pageType,
  };
};
