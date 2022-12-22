import { notification } from 'antd';
import { useDeleteTemplatePage } from 'containers/Admin/PageBuilder/TemplatesPage';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ServerTemplateResponse } from 'services/PagesBuilderService';
import { authSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PageType } from 'types/Page';

export const useDeleteEditTemplate = () => {
  const { shopName } = useSelector(authSelector);
  const deleteTemplatePage = useDeleteTemplatePage();
  const history = useHistory();

  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const handleEditPage = (page: ServerTemplateResponse) => () => {
    const entityVariant = 'Atom';
    history.push(`/builder?shop=${shopName}&id=${page.commandId}&entityVariant=${entityVariant}`, {
      type: page.type,
      label: page.label,
      shopifyRepresentPage: page.shopifyRepresentPage,
      shopifyPages: page.shopifyPages,
      isCreate: false,
      entityVariant,
    });
  };

  const handleDeleteTemplatePage = (commandId: string, pageType: PageType) => () => {
    connect({
      onSuccess: () => {
        deleteTemplatePage.request({
          commandId,
          pageType,
          onFulfill: () => disconnect({}),
        });
      },
      onError: () => {
        notification.error({
          message: i18n.t('publish_shopify.init_sync_error'),
        });
      },
    });
  };

  return {
    handleEditPage,
    handleDeleteTemplatePage,
    statusSocketConnection,
  };
};
