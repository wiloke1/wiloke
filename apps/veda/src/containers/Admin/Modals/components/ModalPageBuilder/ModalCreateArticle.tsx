import AsyncComponent from 'components/AsyncComponent';
import { Badge } from 'components/Badge';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import CreatePageCard from 'components/CreatePageCard';
import Field from 'components/Field';
import ImageTextCard from 'components/ImageTextCard';
import ModalCreate from 'components/ModalCreate';
import ScrollBars from 'components/ScrollBars';
import TextInput from 'components/TextInput';
import Title from 'components/Title';
import { modalsSelector, templatePopupSelector } from 'containers/Admin/selector';
import { useSettingsShopifyPicker } from 'containers/Shopify/ModalMultiPicker/slice';
import withDebounce from 'hocs/withDebounce';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Location } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import { createGlobalState } from 'react-use';
import { LocationStates } from 'routes/LocationStates';
import useGuarded from 'routes/useGuarded';
import { ServerTemplateResponse } from 'services/PagesBuilderService';
import { useGetBlogs } from 'store/actions/shopify';
import { defaultArticleDataState } from 'store/reducers/shopify/reducerArticles';
import { defaultBlogDataState } from 'store/reducers/shopify/reducerBlogs';
import { authSelector, shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { ArticlePageLiquidVariable } from 'types/Page';
import { Consts } from 'utils/constants/constants';
import { getEntityVariant } from 'utils/getEntityVariant';
import { GridSmart, View } from 'wiloke-react-core';
import { useChangeModalAdminSettings } from '../..';
import { useDeleteEditTemplate } from '../../util/useDeleteEditTemplate';
import * as styles from './styles';

type Step = 'off' | 'first' | 'second';
const useStepDrawer = createGlobalState<Step>('off');

const DebounceTextInput = withDebounce(TextInput, 'value', 'onValueChange');

interface ModalProps {
  forceActiveDrawer?: boolean;
  pageInput?: ServerTemplateResponse | undefined;
  onCancel?: () => void;
}

export const ModalCreateArticle: FC<ModalProps> = ({ pageInput, forceActiveDrawer = false, onCancel }) => {
  const { createArticle } = useSelector(modalsSelector);
  const { data: templatesData, getAllStatus, deleteStatus } = useSelector(templatePopupSelector);

  const { slugBlog } = useSelector(shopifySelector.multiShopifyPicker);
  const { blogs, searchKey: blogSearchKey } = useSelector(shopifySelector.blogs);
  const { data: blogData } = blogs[blogSearchKey] || defaultBlogDataState;

  const { data: articleState, blogId } = useSelector(shopifySelector.articles);
  const { articles } = articleState[blogId] ?? defaultArticleDataState;

  const { shopName } = useSelector(authSelector);

  const history = useHistory();
  const changeSettings = useChangeModalAdminSettings();
  const changeSettingsModal = useSettingsShopifyPicker();
  const getBlogs = useGetBlogs();

  const [step, setStep] = useStepDrawer();
  const [drawerActive, setDrawerActive] = useState(forceActiveDrawer);
  const [currentTemplate, setCurrentTemplate] = useState<ServerTemplateResponse | undefined>(pageInput);
  const [includeHeader, setIncludeHeader] = useState(true);
  const [applyType, setApplyType] = useState<'all' | 'custom'>('all');
  const [value, setValue] = useState(currentTemplate?.label ?? '');
  const [errorText, setErrorText] = useState('');
  const location = useLocation<'/builder'>();
  const guard = useGuarded();

  const { handleDeleteTemplatePage, statusSocketConnection } = useDeleteEditTemplate();

  const title = `${
    step === 'off'
      ? i18n.t('adminDashboard.select_something_to_design', { text: i18n.t('adminDashboard.article') })
      : step === 'first'
      ? i18n.t('general.select_template')
      : 'One last step'
  }`;

  useEffect(() => {
    if (!!forceActiveDrawer && createArticle) {
      setDrawerActive(forceActiveDrawer);
      setStep('second');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceActiveDrawer, createArticle]);

  useEffect(() => {
    if (pageInput !== undefined && createArticle) {
      setCurrentTemplate(pageInput);
    }
  }, [pageInput, createArticle]);

  useEffect(() => {
    if (createArticle) {
      getBlogs.request({ search: '', shouldGetArticle: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createArticle]);

  useEffect(() => {
    if (location?.state?.label) {
      setValue(location?.state?.label);
    } else if (currentTemplate !== undefined) {
      setValue(currentTemplate.label ?? '');
    }
  }, [currentTemplate, location]);

  useEffect(() => {
    if (applyType === 'all') {
      changeSettingsModal({
        slugBlog: [{ itemId: 0, handle: 'all', blogId: 0, blogHandle: 'all', featuredImg: undefined }],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyType]);

  const _handleCancel = () => {
    changeSettings({ createArticle: false });
    setStep('off');
    setDrawerActive(false);
    setErrorText('');
    setCurrentTemplate(undefined);
    setApplyType('all');
    onCancel?.();
  };

  const _handleSubmit = () => {
    if (value) {
      setErrorText('');
      const id = currentTemplate ? currentTemplate.parentCommandId : Consts.BlankCommandId;
      const entityVariant = getEntityVariant(history.location as Location<keyof LocationStates>);

      history.push(`/builder?shop=${shopName}&id=${id}&entityVariant=${entityVariant}`, {
        headerFooterEnabled: includeHeader,
        label: value,
        type: 'article',
        isCreate: true,
        shopifyRepresentPage: {
          blogHandle: applyType === 'all' ? blogData[0]?.handle ?? '' : slugBlog[0].blogHandle,
          blogId: applyType === 'all' ? blogData[0]?.id ?? 0 : slugBlog[0].blogId,
          featuredImg: applyType === 'all' ? articles[0]?.image?.src ?? undefined : slugBlog[0]?.featuredImg,
          handle: applyType === 'all' ? articles[0]?.handle ?? '' : slugBlog[0].handle ?? '',
          itemId: applyType === 'all' ? articles[0]?.id ?? 0 : slugBlog[0].itemId,
        } as ArticlePageLiquidVariable,
        shopifyPages: applyType === 'all' ? 'all' : slugBlog,
        backToPage: '/page/article',
        isAdminTemplate: currentTemplate ? true : false,
        entityVariant,
      });

      setDrawerActive(false);
      changeSettings({ createArticle: false });
    } else {
      setErrorText(i18n.t('validate.name_blank', { text: i18n.t('general.page', { textTransform: 'lowercase', text: '' }) }));
    }
  };

  const _handleCreate = (type: 'create' | 'install', item?: ServerTemplateResponse) => () => {
    setStep('second');
    setDrawerActive(true);
    if (type === 'create') {
      changeSettings({
        isCreate: true,
      });
      setCurrentTemplate(undefined);
    } else {
      changeSettings({
        isCreate: false,
      });
      setCurrentTemplate(item);
    }
  };

  const _handleChangeType = (val: string) => {
    const _val = val as 'all' | 'custom';
    setApplyType(_val);

    if (_val === 'custom') {
      changeSettingsModal({
        slugBlog: slugBlog.filter(item => item.handle !== 'all'),
        visibleBlog: true,
      });
    }
  };

  const handleRemoveBadge = (handle: string) => () => {
    changeSettingsModal({
      slugBlog: slugBlog.filter(item => item.handle !== handle),
    });
  };

  const renderDrawerTemplate = (
    <ScrollBars css={{ height: 'calc(100% - 15px) !important' }}>
      <View row css={{ height: '100%', margin: '0', padding: '15px 0 0px' }}>
        <View columns={[12, 6, 6]}>
          <CreatePageCard
            image={currentTemplate?.image.src || ''}
            includeHeader={includeHeader}
            variant={currentTemplate?.image.src ? 'image' : 'default'}
          />
        </View>
        <View columns={[12, 6, 6]}>
          <View css={{ marginBottom: '25px' }}>
            <Title
              size="medium"
              title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.article') })}
              text={i18n.t('general.create_description', { text: i18n.t('adminDashboard.article') })}
            />
          </View>

          <Field label={i18n.t('builderPage.page_settings.general_settings.general.name')} error={errorText}>
            <DebounceTextInput
              placeholder={i18n.t('adminDashboard.name_your_page')}
              radius={6}
              sizeInput="medium"
              block
              value={value}
              onValueChange={setValue}
              borderColor={!!errorText ? 'danger' : 'gray4'}
            />
          </Field>

          <Field label={i18n.t('adminDashboard.chose_shopify_to_design', { text: i18n.t('adminDashboard.blog') })}>
            <View css={{ display: 'flex', columnGap: '10px' }}>
              <Button
                Icon={<View css={styles.fakeCheckbox(applyType === 'all')} />}
                size="small"
                css={styles.buttonActive(applyType === 'all')}
                onClick={() => _handleChangeType('all')}
              >
                <View>{i18n.t('adminDashboard.all')}</View>
              </Button>
              <Button
                size="small"
                css={styles.buttonActive(applyType === 'custom')}
                Icon={<View css={styles.fakeCheckbox(applyType === 'custom')} />}
                onClick={() => _handleChangeType('custom')}
              >
                <View>{i18n.t('adminDashboard.chose_article_belong')}</View>
              </Button>
            </View>

            {applyType === 'custom' && (
              <View css={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                {slugBlog.map(item => (
                  <Badge.WithImage
                    key={item.handle}
                    title={item.handle}
                    image={item.featuredImg}
                    css={{ marginRight: '4px', marginBottom: '4px' }}
                    onDelete={handleRemoveBadge(item.handle)}
                  />
                ))}
              </View>
            )}
          </Field>

          <View css={{ margin: '15px 0 20px' }}>
            <Checkbox checked={includeHeader} borderColor="gray4" onValueChange={setIncludeHeader}>
              <View color="dark" fontFamily="secondary">
                {i18n.t('builderPage.page_settings.general_settings.general.enable_header_footer')}
              </View>
            </Checkbox>
          </View>

          <Button
            onClick={_handleSubmit}
            css={{ marginRight: '10px' }}
            borderColor="primary"
            borderStyle="solid"
            borderWidth={1}
            size="small"
            radius={6}
          >
            {i18n.t('general.create_button', {
              text: i18n.t('general.page', { textTransform: 'lowercase', text: '' }),
            })}
          </Button>
        </View>
      </View>
    </ScrollBars>
  );

  const handleGoBack = () => {
    if (step === 'second') {
      setStep('first');
    }
    if (step === 'first') {
      setStep('off');
    }
    setDrawerActive(false);
    setApplyType('all');
  };

  return (
    <ModalCreate
      visible={createArticle}
      goBack={forceActiveDrawer === true ? undefined : handleGoBack}
      onOk={_handleCancel}
      onCancel={_handleCancel}
      activeDrawer={drawerActive}
      headerText={title}
      FormContent={renderDrawerTemplate}
      Content={
        <View css={{ padding: '10px' }}>
          <AsyncComponent
            status={getAllStatus}
            Success={
              <GridSmart columnWidth={250} columnGap={20} columnCount={4}>
                <CreatePageCard
                  variant="blank"
                  onClick={_handleCreate('create', undefined)}
                  title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.article') })}
                  key="default"
                />
                {templatesData.map(item => (
                  <ImageTextCard.Style2
                    key={item.commandId}
                    label={item.label}
                    widthImage={item.image.width}
                    heightImage={item.image.height}
                    src={item.image.src}
                    onAdd={_handleCreate('install', item)}
                    disabledIconSave
                    loadingAdd={deleteStatus[item.commandId] === 'loading' || statusSocketConnection === 'loading'}
                    onDelete={guard('admin', 'dev') ? handleDeleteTemplatePage(item.commandId, item.type) : undefined}
                  />
                ))}
              </GridSmart>
            }
          />
        </View>
      }
    />
  );
};
