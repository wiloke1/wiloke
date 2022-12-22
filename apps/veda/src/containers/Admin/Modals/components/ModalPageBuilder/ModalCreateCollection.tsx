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
import { useCreateCollectionPage } from 'containers/Admin/PageBuilder/CollectionPage';
import { modalsSelector, templatePopupSelector } from 'containers/Admin/selector';
import { useSettingsShopifyPicker } from 'containers/Shopify/ModalMultiPicker/slice';
import withDebounce from 'hocs/withDebounce';
import useDelay from 'hooks/useDelay';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Location } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import { createGlobalState } from 'react-use';
import { LocationStates } from 'routes/LocationStates';
import { ServerTemplateResponse } from 'services/PagesBuilderService';
import { useGetCollections } from 'store/actions/shopify';
import { defaultCollectionDataState } from 'store/reducers/shopify/reducerCollection';
import { authSelector, shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { CollectionPageLiquidVariable } from 'types/Page';
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

export const ModalCreateCollection: FC<ModalProps> = ({ pageInput = undefined, forceActiveDrawer = false, onCancel }) => {
  const { createCollection } = useSelector(modalsSelector);
  const { searchKey, collections } = useSelector(shopifySelector.collections);
  const { slugsCollection } = useSelector(shopifySelector.multiShopifyPicker);

  const { requestStatus, data: collectionData } = collections[searchKey] || defaultCollectionDataState;
  const { data: templatesData, getAllStatus, deleteStatus } = useSelector(templatePopupSelector);
  const { shopName } = useSelector(authSelector);

  const changeSettings = useChangeModalAdminSettings();
  const history = useHistory();
  const changeSettingsModal = useSettingsShopifyPicker();
  const createBlankPage = useCreateCollectionPage();
  const getCollections = useGetCollections();

  const [drawerActive, setDrawerActive] = useState(forceActiveDrawer);
  const [step, setStep] = useStepDrawer();
  const [currentTemplate, setCurrentTemplate] = useState<ServerTemplateResponse | undefined>(pageInput);
  const [includeHeader, setIncludeHeader] = useState(true);
  const [applyType, setApplyType] = useState<'all' | 'custom'>('all');
  const [delay] = useDelay();
  const [value, setValue] = useState(currentTemplate?.label ?? '');
  const [errorText, setErrorText] = useState('');
  const { handleDeleteTemplatePage, statusSocketConnection } = useDeleteEditTemplate();
  const location = useLocation<'/builder'>();

  const title = `${
    step === 'off'
      ? i18n.t('adminDashboard.select_something_to_design', { text: i18n.t('adminDashboard.collection') })
      : step === 'first'
      ? i18n.t('general.select_template')
      : 'One last step'
  }`;

  useEffect(() => {
    if (createCollection) {
      getCollections.request({ search: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createCollection]);

  useEffect(() => {
    if (forceActiveDrawer) {
      setDrawerActive(forceActiveDrawer);
    }
  }, [forceActiveDrawer]);

  useEffect(() => {
    if (!!pageInput) {
      setCurrentTemplate(pageInput);
    }
  }, [pageInput]);

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
        slugsCollection: [{ itemId: 0, handle: 'all', featuredImg: undefined }],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyType]);

  useEffect(() => {
    console.log(applyType);
  }, [applyType]);

  const _handleCancel = () => {
    changeSettings({ createCollection: false });
    setStep('off');
    setDrawerActive(false);
    setApplyType('all');
    setCurrentTemplate(undefined);
    onCancel?.();
  };

  const _handleSubmit = () => {
    if (value) {
      // create page xong thì redirect sang builder page bắn kèm theo những slug collection đã chọn
      createBlankPage.request({
        name: slugsCollection[0].handle,
        templateId: currentTemplate ? currentTemplate.parentCommandId : Consts.BlankCommandId,
        includeHeaderFooter: includeHeader,
        handle: slugsCollection[0].handle,
        callback: async id => {
          setDrawerActive(false);
          await delay(300);
          const entityVariant = getEntityVariant(history.location as Location<keyof LocationStates>);
          history.push(`/builder?shop=${shopName}&id=${id}&entityVariant=${entityVariant}`, {
            headerFooterEnabled: includeHeader,
            label: value,
            type: 'collection',
            shopifyPages: applyType === 'all' ? 'all' : slugsCollection,
            isCreate: true,
            shopifyRepresentPage: {
              handle: applyType === 'all' ? collectionData[0]?.handle ?? '' : slugsCollection[0].handle,
              itemId: Number(applyType === 'all' ? collectionData[0]?.id ?? 0 : slugsCollection[0].itemId),
              featuredImg: applyType === 'all' ? collectionData[0]?.image?.src ?? undefined : slugsCollection[0].featuredImg,
            } as CollectionPageLiquidVariable,
            backToPage: '/page/collection',
            isAdminTemplate: currentTemplate ? true : false,
            entityVariant,
          });
        },
      });
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
    setApplyType(val as any);

    if (val === 'custom') {
      changeSettingsModal({
        visibleCollection: true,
        slugsCollection: slugsCollection.filter(item => item.handle !== 'all'),
      });
    }
  };

  const handleRemoveBadge = (handle: string) => () => {
    changeSettingsModal({
      slugsCollection: slugsCollection.filter(item => item.handle !== handle),
    });
  };

  const renderDrawerTemplate = () => {
    return (
      <View backgroundColor="light" css={styles.hiddenContent}>
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
                  title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.collection') })}
                  text={i18n.t('general.create_description', { text: i18n.t('adminDashboard.collection') })}
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

              <Field label={i18n.t('adminDashboard.chose_shopify_to_design', { text: i18n.t('adminDashboard.collection') })}>
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
                    <View>{i18n.t('adminDashboard.specific_text', { text: i18n.t('adminDashboard.collection') })}</View>
                  </Button>
                </View>

                {applyType === 'custom' && (
                  <View css={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                    {slugsCollection.map(item => (
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
      </View>
    );
  };

  const handleGoBack = () => {
    if (step === 'second') {
      setStep('first');
    }
    if (step === 'first') {
      setStep('off');
    }
    setDrawerActive(false);
    changeSettingsModal({
      slugsCollection: [{ itemId: 0, handle: 'all', featuredImg: undefined }],
    });
    setApplyType('all');
  };

  return (
    <ModalCreate
      headerText={title}
      visible={createCollection}
      onOk={_handleCancel}
      onCancel={_handleCancel}
      goBack={forceActiveDrawer === true ? undefined : handleGoBack}
      activeDrawer={drawerActive}
      depsHeightRecalculation={requestStatus}
      FormContent={renderDrawerTemplate()}
      Content={
        <View css={{ padding: '10px' }}>
          <AsyncComponent
            status={getAllStatus}
            Success={
              <GridSmart columnWidth={250} columnGap={20} columnCount={4}>
                <CreatePageCard
                  variant="blank"
                  key="default"
                  onClick={_handleCreate('create', undefined)}
                  title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.collection') })}
                />
                {templatesData.map(item => (
                  <ImageTextCard.Style2
                    key={item.commandId}
                    label={item.label}
                    widthImage={item.image.width}
                    heightImage={item.image.height}
                    src={item.image.src}
                    disabledIconSave
                    onAdd={_handleCreate('install', item)}
                    onDelete={handleDeleteTemplatePage(item.commandId, item.type)}
                    loadingAdd={deleteStatus[item.commandId] === 'loading' || statusSocketConnection === 'loading'}
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
