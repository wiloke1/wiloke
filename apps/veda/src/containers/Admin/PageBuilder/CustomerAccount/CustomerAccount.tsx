import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateNormalPage, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';

import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { customerAccountSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_CUSTOMER_ACCOUNT_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetCustomerAccountItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const CustomerAccount: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(customerAccountSelector);
  const getItems = useGetCustomerAccountItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'account', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateNormalPage pageType="account" />
          <ModalDeletePageDashboard pageType="account" />
          <DashboardPageSettings pageType="account" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.customersAccount') })}
            description=""
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'account' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderCustomerAccountMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_CUSTOMER_ACCOUNT_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
