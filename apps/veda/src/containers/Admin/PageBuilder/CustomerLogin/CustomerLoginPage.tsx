import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateNormalPage, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';
import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { customerLoginSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_CUSTOMER_LOGIN_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetCustomerLoginItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const CustomerLogin: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(customerLoginSelector);
  const getItems = useGetCustomerLoginItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'login', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateNormalPage pageType="login" />
          <ModalDeletePageDashboard pageType="login" />
          <DashboardPageSettings pageType="login" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.customersLogin') })}
            description=""
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'login' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderCustomerLoginMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_CUSTOMER_LOGIN_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
