import oops from 'assets/oops.svg';
import { notification } from 'antd';
import AsyncComponent from 'components/AsyncComponent';
import Button from 'components/Button';
import NotEnoughWidth from 'components/NotEnoughWidth';
import { useGetCurrentTheme } from 'containers/Admin/ThemeBuilder/ThemeTemplates/actions';
import { ChooseTemplate } from 'containers/ChooseTemplate';
import { useGetAddonsNav, useGetTemplateCategories } from 'containers/ChooseTemplate/store/actions';
import ModalAddElement from 'containers/ModalAddElement/ModalAddElement';
import { NotFoundPage } from 'containers/NotFoundPage';
import { MultiBlogPicker, MultiCollectionPicker, MultiProductPicker } from 'containers/Shopify/ModalMultiPicker';
import { useSettingsShopifyPicker } from 'containers/Shopify/ModalMultiPicker/slice';
import { useParentPostMessage } from 'hooks/useParentPostMessage';
import { usePreviewPostMessage } from 'hooks/usePreviewPostMessage';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Location } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import { useDeepCompareEffect, useWindowSize } from 'react-use';
import { LocationStates } from 'routes/LocationStates';
import { useGetPage, useUpdateShopifyRepresentPage } from 'store/actions/actionPages';
import { useSetReloadPage } from 'store/actions/actionReloadPage';
import { useGetInitialOfLiquidVariables } from 'store/actions/liquid/actionLiquidVariables';
import { redirectedSelector, useSetRedirected } from 'store/global/redirected/slice';
import {
  fullscreenSelector,
  globalMountSelector,
  liquidVariablesSelector,
  pageDataSelector,
  pagesSelector,
  reloadPageSelector,
  sectionIdCodeVisibleSelector,
  themeBuilderSelector,
} from 'store/selectors';
import { i18n } from 'translation';
import {
  ArticlePageLiquidVariable,
  CollectionPageLiquidVariable,
  HomePageLiquidVariable,
  Page,
  PageLiquidVariable,
  ProductPageLiquidVariable,
  RegularPageLiquidVariable,
} from 'types/Page';
import getPageInfo from 'utils/functions/getInfo';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { getEntityVariant } from 'utils/getEntityVariant';
import { isShopifyEntityNonExisted } from 'utils/isShopifyEntityNonExisted';
import { Text, View } from 'wiloke-react-core';
import BuilderPageSkeleton from './BuilderPageSkeleton';
import AddonsTopBar from './components/AddonsTopBar/AddonsTopBar';
import ContentPage from './components/ContentPage/ContentPage';
import { ModalLoginShopifyBeforePreview } from './components/ModalLoginShopifyBeforePreview/ModalLoginShopifyBeforePreview';
import { ModalSaveAdminAddon } from './components/ModalSaveForBuilder/ModalAdminAddons';
import { ModalAdminMegaMenu } from './components/ModalSaveForBuilder/ModalAdminMegaMenu';
import { ModalAdminPage } from './components/ModalSaveForBuilder/ModalAdminPage';
import { ModalAdminSection } from './components/ModalSaveForBuilder/ModalAdminSection';
import { ModalSaveDevAddon } from './components/ModalSaveForBuilder/ModalDevAddons';
import { ModalDevMegaMenu } from './components/ModalSaveForBuilder/ModalDevMegaMenu';
import { ModalDevPage } from './components/ModalSaveForBuilder/ModalDevPage';
import { ModalSaveSectionForBuilder } from './components/ModalSaveForBuilder/ModalDevSection';
import { ModalSavePageForBuilder } from './components/ModalSaveForBuilder/Page';
import { ModalSaveThemeForBuilder } from './components/ModalSaveForBuilder/Theme';
import { ModalVersion } from './components/ModalVersion/ModalVersion';
import { SidebarScreen } from './components/SidebarScreen/SidebarScreen';
import TopBar from './components/TopBar';
import { useGetShopifyPageTemplate } from './hooks/useGetShopifyPageTemplate';
import { useListenHeaderFooterAddonUpdate } from './hooks/useListenHeaderFooterAddonUpdate';
import { addonsPositionStartSelector } from './store/addonPosition/slice';
import { modalAdminAddonsVisibleSelector, modalDevAddonsVisibleSelector } from './store/saveForBuilder/slice';
import * as styles from './styles';

const BuilderPage: FC = () => {
  const pages = useSelector(pagesSelector);
  const page = useSelector(pageDataSelector) as Page | undefined;
  const getPage = useGetPage();
  const sectionIdCodeVisible = useSelector(sectionIdCodeVisibleSelector);
  const location = useLocation<'/builder'>();
  const history = useHistory<'/builder'>();

  const fullscreen = useSelector(fullscreenSelector);
  const reloadPage = useSelector(reloadPageSelector);
  const setReloadPage = useSetReloadPage();
  const getInitialOfLiquidVariables = useGetInitialOfLiquidVariables();
  const { status: globalMountStatus } = useSelector(globalMountSelector);
  const addonsPositionStart = useSelector(addonsPositionStartSelector);
  const { statusGetInitialOfLiquidVariables } = useSelector(liquidVariablesSelector);
  const { getThemeStatus: getCurrentThemeStatus } = useSelector(themeBuilderSelector.templates);
  const { width } = useWindowSize();
  const getCurrentTheme = useGetCurrentTheme();
  const getCategories = useGetTemplateCategories();
  const getNavAddons = useGetAddonsNav();
  const themeId = getPageInfo('themeId');
  const pageId = getPageInfo('id');
  const shopInParams = getPageInfo('shop');

  const modalDevAddonsVisible = useSelector(modalDevAddonsVisibleSelector);
  const modalAdminAddonsVisible = useSelector(modalAdminAddonsVisibleSelector);

  const updateShopifyRepresentPage = useUpdateShopifyRepresentPage();
  const changeSettingsShopify = useSettingsShopifyPicker();
  const { getShopifyPages, getShopifyPresentPage } = useGetShopifyPageTemplate();

  const setIsRedirect = useSetRedirected();
  const isRedirect = useSelector(redirectedSelector);
  const { role, shopName } = getUserInfo();

  const handleReselectShopifyRepresentPage = () => {
    if (page) {
      if (page.type === 'article') {
        notification.error({
          message: i18n.t('builderPage.shopify_entity_non_exist.title'),
          description: i18n.t('builderPage.shopify_entity_non_exist.blog'),
        });
        changeSettingsShopify({
          visibleBlog: true,
        });
      } else if (page.type === 'product') {
        notification.error({
          message: i18n.t('builderPage.shopify_entity_non_exist.title'),
          description: i18n.t('builderPage.shopify_entity_non_exist.product'),
        });
        changeSettingsShopify({
          visibleProduct: true,
        });
      } else if (page.type === 'collection') {
        notification.error({
          message: i18n.t('builderPage.shopify_entity_non_exist.title'),
          description: i18n.t('builderPage.shopify_entity_non_exist.collection'),
        });
        changeSettingsShopify({
          visibleCollection: true,
        });
      }
    }
  };

  const handleUpdateShopifyRepresentPage = () => {
    changeSettingsShopify({
      visibleProduct: false,
      slugsProduct: [],
      visibleCollection: false,
      slugsCollection: [],
      visibleBlog: false,
      slugBlog: [],
    });
    const shopifyRepresentPage = page ? getShopifyPresentPage(page.type) : undefined;
    const shopifyPages = page ? getShopifyPages(page.type) : undefined;
    if (page && shopifyRepresentPage && shopifyPages) {
      updateShopifyRepresentPage({
        shopifyRepresentPage,
        shopifyPages,
      });
    } else {
      handleReselectShopifyRepresentPage();
    }
  };

  // lắng nghe thay đổi setting của theme: header, footer, addons
  useListenHeaderFooterAddonUpdate();
  useParentPostMessage();
  usePreviewPostMessage();

  // @tuong -> Khi save page -> tự set lại giá trị cũ -> Tham chiếu thay đổi -> "useEffect" là không đủ
  // TODO: Tìm cách để không phải "deepCompare" vì cái giá phải trả khi so sánh "sections" là khá lớn
  useDeepCompareEffect(() => {
    if (pages.status[pageId] === 'success') {
      getInitialOfLiquidVariables.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages.status, page?.shopifyRepresentPage, pageId]);

  useEffect(() => {
    if (pages.status[pageId] === 'success' && statusGetInitialOfLiquidVariables === 'failure') {
      getInitialOfLiquidVariables.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetInitialOfLiquidVariables]);

  useEffect(() => {
    if (pages.status[pageId] === 'success') {
      getCategories.request(undefined);
      getNavAddons.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages.status]);

  // TODO: @tuong -> Tại sao lại sử dụng "useDeepCompareEffect" trong khi tất cả là primitive
  useDeepCompareEffect(() => {
    if (globalMountStatus === 'success') {
      if (!!themeId && getCurrentThemeStatus !== 'success') {
        getCurrentTheme.request({
          themeId,
          variant: getEntityVariant(location as Location<keyof LocationStates>),
        });
      } else {
        const checkPageHasSections = !pages.data[pageId]?.sections.length;
        if (checkPageHasSections) {
          const _shopifyPresentPageOfArticlePage = location.state?.shopifyRepresentPage as ArticlePageLiquidVariable | undefined;
          const _shopifyPresentPageOfRegularPage = location.state?.shopifyRepresentPage as RegularPageLiquidVariable | undefined;
          const _shopifyPresentPageOfHomePage = location.state?.shopifyRepresentPage as HomePageLiquidVariable | undefined;
          const _shopifyPresentPageOfOtherPage = location.state?.shopifyRepresentPage as
            | ProductPageLiquidVariable
            | CollectionPageLiquidVariable
            | undefined;
          getPage.request({
            id: pageId,
            headerFooterEnabled: location.state?.headerFooterEnabled,
            name: location.state?.label,
            handle: _shopifyPresentPageOfOtherPage?.handle,
            type: location.state?.type,
            shopifyRepresentPage:
              location.state?.type === 'article'
                ? ({
                    blogId: _shopifyPresentPageOfArticlePage?.blogId ?? 0,
                    blogHandle: _shopifyPresentPageOfArticlePage?.blogHandle ?? '',
                    handle: _shopifyPresentPageOfArticlePage?.handle ?? '',
                    itemId: _shopifyPresentPageOfArticlePage?.itemId ? Number(_shopifyPresentPageOfArticlePage?.itemId) : undefined,
                    featuredImg: _shopifyPresentPageOfArticlePage?.featuredImg,
                  } as ArticlePageLiquidVariable)
                : location.state?.type === 'page'
                ? ({ handle: _shopifyPresentPageOfRegularPage?.handle ?? '' } as RegularPageLiquidVariable)
                : location.state?.type === 'home'
                ? _shopifyPresentPageOfHomePage
                : ({
                    handle: _shopifyPresentPageOfOtherPage?.handle ?? '',
                    itemId: _shopifyPresentPageOfOtherPage?.itemId ? Number(_shopifyPresentPageOfOtherPage?.itemId) : undefined,
                    featuredImg: _shopifyPresentPageOfOtherPage?.featuredImg,
                  } as PageLiquidVariable),
            shopifyPages: location.state?.shopifyPages,
            variant: getEntityVariant(location as Location<keyof LocationStates>),
            isAdminTemplate: location.state?.isAdminTemplate ?? false,
          });
        } else {
          // Nếu là theme khi chuyển trang mà không chưa có dữ liệu thì ta phải reload lại iframe
          if (!!themeId) {
            setReloadPage(undefined);
          }
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[globalMountStatus], [themeId], [pageId]]);

  useEffect(() => {
    if (isRedirect && pages.status[pageId] === 'success') {
      setIsRedirect(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId, pages.status]);

  useEffect(() => {
    const page = pages.data[pageId];
    if (pages.status[pageId] === 'success' && page && isShopifyEntityNonExisted(page.shopifyRepresentPage)) {
      handleReselectShopifyRepresentPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages.status]);

  if (shopName !== shopInParams) {
    return <NotFoundPage />;
  }

  return (
    <AsyncComponent
      status={pages.status[pageId]}
      Request={<BuilderPageSkeleton />}
      Success={
        <>
          {width < 1100 ? <NotEnoughWidth /> : null}
          <View css={styles.container}>
            {!sectionIdCodeVisible && !fullscreen && (
              <View css={styles.left}>
                <SidebarScreen />
              </View>
            )}
            <View css={styles.right(!!sectionIdCodeVisible)}>
              {/* Vì lý do liên quan tới undo redo nên ta không thể ẩn bằng condition render */}
              <View css={!sectionIdCodeVisible && !addonsPositionStart.value ? {} : { opacity: 0, height: '0px', overflow: 'hidden' }}>
                <TopBar />
              </View>
              {addonsPositionStart.value && <AddonsTopBar />}
              {!reloadPage && <ContentPage />}
            </View>
          </View>
          <ChooseTemplate />
          <ModalAddElement />
          <ModalVersion />
          <ModalSavePageForBuilder />
          <ModalSaveThemeForBuilder />
          <ModalAdminPage />
          <ModalDevPage />
          <ModalLoginShopifyBeforePreview />
          {modalDevAddonsVisible && <ModalSaveDevAddon />}
          {modalAdminAddonsVisible && <ModalSaveAdminAddon />}
          {!!sectionIdCodeVisible && <ModalSaveSectionForBuilder />}
          {!!sectionIdCodeVisible && <ModalAdminSection />}
          <MultiCollectionPicker onOk={handleUpdateShopifyRepresentPage} onCancel={handleReselectShopifyRepresentPage} />
          <MultiProductPicker onOk={handleUpdateShopifyRepresentPage} onCancel={handleReselectShopifyRepresentPage} />
          <MultiBlogPicker onOk={handleUpdateShopifyRepresentPage} onCancel={handleReselectShopifyRepresentPage} />
          {role === 'dev' && !!sectionIdCodeVisible && <ModalDevMegaMenu />}
          {role === 'admin' && !!sectionIdCodeVisible && <ModalAdminMegaMenu />}
        </>
      }
      Failure={
        <View css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 0px' }}>
          <View css={{ maxWidth: '600px' }}>
            <img src={oops} />
          </View>
          <Text tagName="p" size={16} css={{ marginTop: '16px', marginBottom: '16px' }}>
            {location.state?.isAdminTemplate ? i18n.t('builderPage.page_under_maintaince') : i18n.t('builderPage.page_error')}
            <Text
              size={16}
              tagName="span"
              css={{ marginLeft: '4px', textDecoration: 'underline', cursor: 'pointer' }}
              color="primary"
              onClick={() => console.log('Mở chat')}
            >
              {i18n.t('builderPage.get_support')}
            </Text>
          </Text>
          <Button radius={10} onClick={() => history.push('/')}>
            {i18n.t('builderPage.back_to_dashboard2')}
          </Button>
        </View>
      }
    />
  );
};

export default BuilderPage;
