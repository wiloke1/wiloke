import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateNormalPage, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';

import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { giftCardSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_GIFT_CARD_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetGiftCardItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const GiftCard: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(giftCardSelector);
  const getItems = useGetGiftCardItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'giftCard', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateNormalPage pageType="giftCard" />
          <ModalDeletePageDashboard pageType="giftCard" />
          <DashboardPageSettings pageType="giftCard" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.giftCard') })}
            description=""
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'giftCard' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderGiftCardMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_GIFT_CARD_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
