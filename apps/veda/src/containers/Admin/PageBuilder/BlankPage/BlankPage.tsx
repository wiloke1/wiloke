import { CodeSpliting } from 'components/CodeSpliting';
import { ModalCreateNormalPage, ModalDeletePageDashboard } from 'containers/Admin/Modals';
import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BLANK_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { blankPageSelector } from '../../selector';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';
import { useGetBlankPageItems } from './actions';
import * as styles from './styles';

export const BlankPage: FC = () => {
  const { filterType, search } = useSelector(blankPageSelector);
  const getBlankPagesRequest = useGetBlankPageItems();

  useEffect(() => {
    getBlankPagesRequest.request({ s: search, pageType: 'page', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, search]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateNormalPage pageType="page" />
          <ModalDeletePageDashboard pageType="page" />
          <DashboardPageSettings pageType="page" />
        </>
      )}
      Content={() => (
        <View css={[styles.container]} radius={6}>
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BlankPageMainContent", webpackPrefetch: true */ './components/MainContent/MainContent')}
            CHUNK_ID={BLANK_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
