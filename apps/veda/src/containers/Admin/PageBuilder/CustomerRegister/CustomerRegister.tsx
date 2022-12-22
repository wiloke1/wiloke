import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateNormalPage, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';

import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { customerRegisterSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_CUSTOMER_REGISTER_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetCustomerRegisterItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const CustomerRegister: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(customerRegisterSelector);
  const getItems = useGetCustomerRegisterItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'register', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateNormalPage pageType="register" />
          <ModalDeletePageDashboard pageType="register" />
          <DashboardPageSettings pageType="register" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.customersRegister') })}
            description=""
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'register' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderCustomerRegisterMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_CUSTOMER_REGISTER_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
