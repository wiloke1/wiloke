import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateNormalPage, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';
import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { passwordPageSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_PASSWORD_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetPasswordPageItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const PasswordPage: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();

  const { filterType, search } = useSelector(passwordPageSelector);
  const getItems = useGetPasswordPageItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'password', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalDeletePageDashboard pageType="password" />
          <ModalCreateNormalPage pageType="password" />
          <DashboardPageSettings pageType="password" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.password', { textTransform: 'capitalize' }) })}
            description=""
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'password' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderPasswordPageMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_PASSWORD_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
