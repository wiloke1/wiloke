import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateArticle, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';
import { Dashboard } from 'containers/Dashboard';
import { MultiBlogPicker } from 'containers/Shopify/ModalMultiPicker/MultiBlogPicker';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { articlePageSelector } from 'store/selectors';
import { i18n } from 'translation';
import { ARTICLE_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetArticlePageItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { MultiBlog } from '../DashboardPageSettings/components/BlogSettings';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const ArticlesPage: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(articlePageSelector);
  const getItems = useGetArticlePageItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'article', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateArticle />
          <ModalDeletePageDashboard pageType="article" />

          <DashboardPageSettings pageType="article" />
          <MultiBlog />
          <MultiBlogPicker />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.article', { textTransform: 'capitalize' }) })}
            description={i18n.t('adminDashboard.page_description.article')}
            onClick={() => {
              changeSettings({ createArticle: true });
              getTemplates.request({ type: 'article' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "ArticlePageMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={ARTICLE_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
