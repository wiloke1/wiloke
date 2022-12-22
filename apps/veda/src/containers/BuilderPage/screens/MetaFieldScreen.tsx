import AsyncComponent from 'components/AsyncComponent';
import PageCard from 'components/PageCard';
import { ScreenProps, useStackNavigator } from 'components/StackNavigator';
import { range } from 'ramda';
import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetMetafields, useLoadmoreMetafields } from 'store/actions/shopify/actionMetafields';
import { pageDataSelector, shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { Metafield } from 'types/Metafields';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { css, FontAwesome, Theme, View, ViewportTracking } from 'wiloke-react-core';
import DefaultScreen from '../components/DefaultScreen';
import { LeftBarParamList } from '../components/SidebarScreen/SidebarScreen';

type _PageType = 'collection' | 'product' | 'article';

const linkStyle = ({ colors }: Theme) => css`
  padding: 10px;
  display: inline-block;
  display: flex;
  align-items: center;
  height: 46px;
  width: 100%;
  background-color: ${colors.light};
  border-radius: 4px;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const iconStyle = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const MetaFieldScreen: FC<ScreenProps<LeftBarParamList, 'metaFieldScreen'>> = ({ params }) => {
  const { label, onChange } = params;
  const page = useSelector(pageDataSelector);
  const { BLOG, COLLECTION, PRODUCT } = useSelector(shopifySelector.metafields);
  const getMegaField = useGetMetafields();
  const loadMoreMetaFields = useLoadmoreMetafields();
  const navigation = useStackNavigator<LeftBarParamList>();
  const { shopName } = getUserInfo();

  useEffect(() => {
    if (page.type === 'collection') {
      getMegaField.request({ ownerType: 'COLLECTION' });
    }
    if (page.type === 'product') {
      getMegaField.request({ ownerType: 'PRODUCT' });
    }
    if (page.type === 'article') {
      getMegaField.request({ ownerType: 'BLOG' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.type]);

  const renderLoading = () => {
    return range(1, Math.floor(Math.random() * 12) + 1).map(num => <PageCard.Loading key={num} />);
  };

  const renderLoadMore = ({
    hasNextPage,
    statusRequest,
    ownerType,
  }: {
    hasNextPage: boolean;
    statusRequest: Status;
    ownerType: Metafield['ownerType'];
  }) => {
    if (hasNextPage && statusRequest === 'success') {
      return (
        <ViewportTracking
          offsetTop={-200}
          onEnterViewport={() => {
            loadMoreMetaFields.request({ ownerType: ownerType });
          }}
        >
          {renderLoading()}
        </ViewportTracking>
      );
    }
    return null;
  };

  const renderMetaFieldItem = (item: Metafield) => {
    return (
      <PageCard.Style3
        title={item.name}
        css={{ marginBottom: '5px' }}
        key={item.id}
        onClick={() => {
          const metaType = page.type === 'collection' ? 'collection' : page.type === 'product' ? 'product' : 'article';
          const megaField = `<span>{{ ${metaType}.metafields.${item.namespace}.${item.key} | metafield_tag }}</span>`;
          onChange(megaField);
          navigation.goBack();
        }}
      />
    );
  };

  const renderMetaFieldsProduct = () => {
    return (
      <AsyncComponent
        status={PRODUCT.statusRequest}
        Request={renderLoading()}
        Success={
          <View>
            {PRODUCT.data.map(renderMetaFieldItem)}
            {renderLoadMore({ hasNextPage: PRODUCT.hasNextPage, statusRequest: PRODUCT.statusRequest, ownerType: 'PRODUCT' })}
          </View>
        }
      />
    );
  };

  const renderMetaFieldsCollection = () => {
    return (
      <AsyncComponent
        status={COLLECTION.statusRequest}
        Request={renderLoading()}
        Success={
          <View>
            {COLLECTION.data.map(renderMetaFieldItem)}
            {renderLoadMore({ hasNextPage: COLLECTION.hasNextPage, statusRequest: COLLECTION.statusRequest, ownerType: 'COLLECTION' })}
          </View>
        }
      />
    );
  };

  const renderMetaFieldsArticle = () => {
    return (
      <AsyncComponent
        status={BLOG.statusRequest}
        Request={renderLoading()}
        Success={
          <View>
            {BLOG.data.map(renderMetaFieldItem)}
            {renderLoadMore({ hasNextPage: BLOG.hasNextPage, statusRequest: BLOG.statusRequest, ownerType: 'BLOG' })}
          </View>
        }
      />
    );
  };

  const renderByPageType: Record<_PageType, () => ReactNode> = {
    product: renderMetaFieldsProduct,
    collection: renderMetaFieldsCollection,
    article: renderMetaFieldsArticle,
  };

  return (
    <DefaultScreen title={label} contentCss={{ height: '100%', overflow: 'hidden' }}>
      <View
        tagName="a"
        href={`https://${shopName}/admin/metafields`}
        color="primary"
        colorHover="primary"
        target="_blank"
        fontFamily="secondary"
        css={linkStyle}
      >
        <View css={{ flex: '1', display: 'flex', alignItems: 'center' }}>
          <View css={iconStyle}>
            <FontAwesome size={20} type="far" name="plus-square" />
          </View>
          <View>{i18n.t('general.create', { text: 'metafields' })}</View>
        </View>

        <FontAwesome size={16} type="far" name="external-link" />
      </View>

      {renderByPageType[page.type as _PageType]()}
    </DefaultScreen>
  );
};
