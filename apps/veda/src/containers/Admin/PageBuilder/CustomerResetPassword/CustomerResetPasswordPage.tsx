import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateNormalPage, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';
import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { customerResetPasswordSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_CUSTOMER_RESET_PASSWORD_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetCustomerResetPasswordItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const CustomerResetPassword: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(customerResetPasswordSelector);
  const getItems = useGetCustomerResetPasswordItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'resetPassword', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateNormalPage pageType="resetPassword" />
          <ModalDeletePageDashboard pageType="resetPassword" />
          <DashboardPageSettings pageType="resetPassword" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.customersResetPassword') })}
            description=""
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'resetPassword' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderCustomerResetPasswordMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_CUSTOMER_RESET_PASSWORD_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
