import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateNormalPage, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';
import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { customerActivateAccountSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_CUSTOMER_ACTIVATE_ACCOUNT_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetCustomerActivateAccountItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const CustomerActivateAccount: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(customerActivateAccountSelector);
  const getItems = useGetCustomerActivateAccountItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'activateAccount', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateNormalPage pageType="activateAccount" />
          <ModalDeletePageDashboard pageType="activateAccount" />
          <DashboardPageSettings pageType="activateAccount" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.customersActivateAccount') })}
            description=""
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'activateAccount' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderCustomerActivateAccountMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_CUSTOMER_ACTIVATE_ACCOUNT_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
