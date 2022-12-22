import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateNormalPage, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';
import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notFoundPageSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_NOTFOUND_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetNotFoundPageItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const NotFoundPage: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();

  const { filterType, search } = useSelector(notFoundPageSelector);
  const getItems = useGetNotFoundPageItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'pageNotFound', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateNormalPage pageType="pageNotFound" />
          <ModalDeletePageDashboard pageType="pageNotFound" />
          <DashboardPageSettings pageType="pageNotFound" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.notFound') })}
            description=""
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'pageNotFound' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderNotFoundPageMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_NOTFOUND_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
