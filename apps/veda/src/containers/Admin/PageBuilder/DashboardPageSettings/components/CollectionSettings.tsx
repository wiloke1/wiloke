import { notification } from 'antd';
import Active from 'components/Active';
import AsyncComponent from 'components/AsyncComponent';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import ProductCard from 'components/ProductCard';
import Radio from 'components/Radio';
import TextInput from 'components/TextInput';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useChangeCollectionKey, useGetCollections, useLoadMoreCollections } from 'store/actions/shopify';
import { defaultCollectionDataState } from 'store/reducers/shopify/reducerCollection';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { CollectionPageLiquidVariable } from 'types/Page';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import { dashboardPageSettingsSelector, useChangeSettingsDashboardPage } from '../slice';
import { RenewButton } from './RenewButton';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');
/*
 * Component này nằm ở các page item trang collection
 */
export const MultiCollection = () => {
  const { page, originPage, visibleListCollection } = useSelector(dashboardPageSettingsSelector);
  const { collections, searchKey } = useSelector(shopifySelector.collections);
  const { data, requestStatus, hasNextPage } = collections[searchKey] || defaultCollectionDataState;
  const [applyType, setApplyType] = useState<'all' | 'custom'>(Array.isArray(page?.shopifyPages) ? 'custom' : 'all');

  const changeKey = useChangeCollectionKey();
  const changeSettings = useChangeSettingsDashboardPage();
  const getCollections = useGetCollections();
  const loadMoreCollections = useLoadMoreCollections();

  const history = useHistory();
  const { shopName } = getUserInfo();

  useEffect(() => {
    if (visibleListCollection) {
      getCollections.request({ search: searchKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleListCollection, searchKey]);

  useEffect(() => {
    if (visibleListCollection) {
      setApplyType(Array.isArray(page?.shopifyPages) ? 'custom' : 'all');
    }
  }, [page?.shopifyPages, visibleListCollection]);

  const handleSelectPage = (handle: string, id: string, featuredImg: string | undefined) => (isSelect: boolean) => {
    if (page) {
      // selected = true thì thêm vào mảng
      if (isSelect) {
        changeSettings({
          page: {
            ...page,
            shopifyPages: [...(Array.isArray(page?.shopifyPages) ? page.shopifyPages : []), { itemId: Number(id), handle: handle, featuredImg }],
          },
        });
      } else {
        changeSettings({
          page: {
            ...page,
            shopifyPages: (Array.isArray(page?.shopifyPages) ? page.shopifyPages : []).filter(liquid => liquid?.handle !== handle),
          },
        });
      }
    }
  };

  const _handleChangeType = (val: string) => {
    const _val = val as 'all' | 'custom';
    if (page && _val === 'all') {
      changeSettings({
        page: {
          ...page,
          shopifyPages: 'all',
        },
      });
    }
    if (page && _val === 'custom') {
      changeSettings({
        page: {
          ...page,
          shopifyPages: !originPage?.shopifyPages || typeof originPage.shopifyPages === 'string' ? [] : originPage?.shopifyPages,
        },
      });
    }
  };

  const _handleSearch = (val: string) => {
    changeKey(val);
  };

  const renderLoadMore = () => {
    if (hasNextPage) {
      return (
        <ViewportTracking
          offsetBottom={-50}
          onEnterViewport={() => {
            if (requestStatus === 'success') {
              loadMoreCollections.request({ search: searchKey });
            }
          }}
        >
          <View css={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <VedaLoadingItem />
          </View>
        </ViewportTracking>
      );
    }
  };

  const renderSuccess = () => {
    return (
      <View>
        <GridSmart columnWidth={200} columnGap={10}>
          {data.map(item => {
            const isActive =
              page !== undefined && page.shopifyPages !== undefined && page.shopifyPages !== 'all'
                ? page.shopifyPages.map(item => (item as CollectionPageLiquidVariable)?.handle ?? '').includes(item.handle)
                : false;
            return (
              <Active
                disabledMulti
                onActive={handleSelectPage(item.handle, item.id, item.image?.src)}
                variant="style2"
                active={isActive}
                key={item.id}
              >
                <ProductCard imageAspectRatio={16 / 9} imageSrc={item.image?.src || ''} title={item.title} />
              </Active>
            );
          })}
        </GridSmart>
        {renderLoadMore()}
      </View>
    );
  };

  const handleCancel = () => {
    changeSettings({
      visibleListCollection: false,
      originPage: undefined,
      page: undefined,
    });
  };

  const handleOverride = () => {
    if (page) {
      if (applyType === 'custom' && !Array.isArray(page.shopifyPages)) {
        notification.warning({
          message: i18n.t('validate.choose_at_least', { text: i18n.t('adminDashboard.collection') }),
        });
      } else {
        const entityVariant = 'Client';
        history.push(`/builder?shop=${shopName}&id=${page.commandId}&entityVariant=${entityVariant}`, {
          label: page.label,
          type: 'collection',
          isCreate: false,
          shopifyRepresentPage: page.shopifyRepresentPage,
          shopifyPages: applyType === 'all' ? 'all' : page.shopifyPages,
          backToPage: '/page/collection',
          entityVariant,
        });
        changeSettings({
          visibleListCollection: false,
          originPage: undefined,
        });
      }
    }
  };

  return (
    <MyModal
      isVisible={visibleListCollection}
      bodyCss={{
        height: applyType === 'all' ? '280px' : '80%',
      }}
      headerText={i18n.t('adminDashboard.collection')}
      size="large"
      onOk={handleOverride}
      onCancel={handleCancel}
    >
      <Field label={`${i18n.t('general.apply_to')}`}>
        <View css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Radio.Group size="large" defaultValue={applyType} value={applyType} onChangeValue={_handleChangeType}>
            <Radio.Button value="all">{i18n.t('adminDashboard.all')}</Radio.Button>
            <Radio.Button value="custom"> {i18n.t('adminDashboard.specific_text', { text: i18n.t('adminDashboard.collection') })}</Radio.Button>
          </Radio.Group>
          <RenewButton variant="collection" />
        </View>
      </Field>

      {applyType === 'custom' && (
        <>
          <DebounceInput
            block
            sizeInput="medium"
            placeholder={`${i18n.t('builderPage.search')} ${i18n.t('adminDashboard.collection')}...`}
            css={{ marginBottom: '8px' }}
            value={searchKey}
            onValueChange={_handleSearch}
          />

          <AsyncComponent status={requestStatus} Success={renderSuccess()} />
        </>
      )}

      {/* <ModalAskBeforeSave isLoading={statusSocketConnection === 'loading' || updateStatus === 'loading'} onOverride={handleOverride} /> */}
    </MyModal>
  );
};
