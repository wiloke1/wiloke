import { notification } from 'antd';
import AsyncComponent from 'components/AsyncComponent';
import Empty from 'components/Empty';
import Box from 'components/FieldBox';
import { StatisticBox, StatisticBoxLoading } from 'components/StatisticCard';
import TextInput from 'components/TextInput';
import Tooltip from 'components/Tooltip';
import { AdminPageData } from 'containers/Admin/types';
import withDebounce from 'hocs/withDebounce';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useSetGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { articlePageSelector, authSelector } from 'store/selectors';
import { i18n } from 'translation';
import { getDate, timeAgo } from 'utils/timeAgo';
import { FontAwesome, View, ViewportTracking } from 'wiloke-react-core';
import {
  useChangeSearchKey,
  useDeleteArticlePages,
  useGetArticlePageItems,
  useLoadMoreArticlePage,
  useSelectManyItems,
  useSetFilterType,
  useUpdateStatusArticlePage,
} from '.';
import { BuilderPageFilterTab } from '../BuilderPageFilterTab';
import { useChangeSettingsDashboardPage } from '../DashboardPageSettings';
import { ButtonDeletePages } from './ButtonDelete';
import { PageHotspot } from './PageHotspot';
import { SectionFilter } from './SectionFilter';

import * as styles from './styles';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const MainContent = () => {
  const {
    data,
    updatePageStatus,
    ids,
    getAllPageStatus,
    isSelectAll,
    loadMorePageStatus,
    filterType,
    search,
    hasNextPage,
    deletePending,
  } = useSelector(articlePageSelector);

  const setPublished = useUpdateStatusArticlePage();
  const selectIds = useSelectManyItems();
  const history = useHistory();

  const setSettingPage = useSetGeneralSettingsPage();
  const setFilterType = useSetFilterType();
  const changeSettings = useChangeSettingsDashboardPage();
  const { shopName } = useSelector(authSelector);
  const getItems = useGetArticlePageItems();
  const changeSearchKey = useChangeSearchKey();
  const loadMoreRequest = useLoadMoreArticlePage();
  const deletePageRequest = useDeleteArticlePages();
  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const _handlePublishPage = (item: AdminPageData) => (val: boolean) => {
    connect({
      onSuccess: () => {
        setPublished.request({
          id: item.commandId,
          enable: val,
          adminPageData: item,
          isOverrideIndividualPages: !!item.isOverrideIndividualPages,
          onFulfill: () => {
            disconnect({});
          },
          callback: () => {
            if (typeof item.shopifyPages === 'string' && item.shopifyPages === 'all') {
              getItems.request({ s: search, pageType: 'article', filterType });
            }
          },
        });
      },
      onError: () => {
        notification.error({
          message: i18n.t('publish_shopify.init_sync_error'),
        });
      },
    });
  };

  const _handleSelectPage = (item: AdminPageData) => (isSelect: boolean) => {
    if (isSelect) {
      selectIds({ ids: [...ids, item.commandId] });
    } else {
      selectIds({ ids: ids.filter(id => id !== item.commandId) });
    }
  };

  const _handleGoToPage = (item: AdminPageData) => () => {
    if (typeof item.shopifyPages === 'undefined' || item.shopifyPages.length === 0) {
      changeSettings({
        visibleListBlog: true,
        originPage: item,
        page: item,
      });
    } else {
      const entityVariant = 'Client';
      history.push(`/builder?shop=${shopName}&id=${item.commandId}&entityVariant=${entityVariant}`, {
        type: 'article',
        label: item.label,
        isCreate: false,
        backToPage: '/page/article',
        entityVariant,
      });
      setSettingPage({ settings: { label: item.label } });
    }
  };

  const openModal = (item: AdminPageData) => () => {
    changeSettings({
      visibleListBlog: true,
      originPage: item,
      page: item,
    });
  };

  const TrackingLoadMore = useMemo(() => {
    const lastCursor = data.at(-1)?.commandId;
    if (hasNextPage && lastCursor) {
      return (
        <ViewportTracking
          offsetTop={-200}
          onEnterViewport={() => {
            if (loadMorePageStatus !== 'loading') {
              loadMoreRequest.request({
                s: search,
                pageType: 'article',
                filterType,
                lastCursor,
              });
            }
          }}
        >
          <StatisticBoxLoading />
          <StatisticBoxLoading />
          <StatisticBoxLoading />
        </ViewportTracking>
      );
    }
    return null;
  }, [data, filterType, hasNextPage, loadMorePageStatus, loadMoreRequest, search]);

  const _renderData = () => {
    return (
      <>
        {data.map(item => (
          <StatisticBox
            key={item.commandId}
            selected={isSelectAll}
            label={item.label}
            enable={item.enable}
            image={item.image}
            date={timeAgo(
              item.modifiedDateTimestamp ?? item.createdDateTimestamp ?? 0,
              getDate(item.modifiedDateTimestamp ?? item.createdDateTimestamp ?? Date.now()),
            )}
            loading={statusSocketConnection === 'loading' || updatePageStatus[item.commandId] === 'loading' || deletePending.length > 0}
            hotpot={
              typeof item.shopifyPages === 'undefined' || (Array.isArray(item.shopifyPages) && item.shopifyPages.length === 0) ? (
                <PageHotspot
                  onClick={() => {
                    changeSettings({
                      visibleListBlog: true,
                      originPage: item,
                      page: item,
                    });
                  }}
                />
              ) : (
                undefined
              )
            }
            Right={
              <Tooltip text={`${i18n.t('schema.fieldLabel.select')} ${i18n.t('adminDashboard.blog')}`}>
                <View borderColor="gray3" borderStyle="solid" borderWidth={1} css={styles.rightItem} onClick={openModal(item)}>
                  <FontAwesome name="shopify" type="fab" />
                </View>
              </Tooltip>
            }
            onGotoPage={_handleGoToPage(item)}
            onSelected={_handleSelectPage(item)}
            onActive={_handlePublishPage(item)}
            onEditSettings={() => {
              changeSettings({
                originPage: item,
                visible: true,
                page: item,
              });
            }}
            onDelete={() => {
              connect({
                onSuccess: () => {
                  deletePageRequest.request({ ids: [item.commandId], onFulfill: () => disconnect({}) });
                },
                onError: () => {
                  notification.error({
                    message: i18n.t('publish_shopify.init_sync_error'),
                  });
                },
              });
            }}
          />
        ))}
        {TrackingLoadMore}
      </>
    );
  };

  const _handleSearch = (value: string) => {
    changeSearchKey({ search: value });
  };

  return (
    <View>
      <View row css={styles.sectionFilter}>
        <View columns={[12, 6, 6]}>
          <BuilderPageFilterTab
            value={filterType}
            onChange={val => {
              setFilterType({ pageType: val });
            }}
          />
        </View>

        <View columns={[12, 4, 3]}>
          <View css={[styles.flex, { justifyContent: 'flex-end' }]}>
            <ButtonDeletePages />
            <DebounceInput
              sizeInput="medium"
              value={search}
              radius={6}
              block
              css={{ marginLeft: '8px', width: '260px' }}
              borderColor="gray3"
              placeholder={`${i18n.t('adminDashboard.search', { text: i18n.t('general.page') })}...`}
              onValueChange={_handleSearch}
            />
          </View>
        </View>
      </View>

      <Box radius={6} borderColor="gray2" css={{ padding: '10px' }}>
        <SectionFilter />
        <AsyncComponent
          status={getAllPageStatus}
          Request={
            <View>
              <StatisticBoxLoading />
              <StatisticBoxLoading />
              <StatisticBoxLoading />
            </View>
          }
          Success={_renderData()}
          Empty={
            <View css={{ padding: '20px 0' }}>
              <Empty text={i18n.t('adminDashboard.search_empty')} />
            </View>
          }
          isEmpty={getAllPageStatus === 'success' && data.length === 0}
        />
      </Box>
    </View>
  );
};

export default MainContent;
