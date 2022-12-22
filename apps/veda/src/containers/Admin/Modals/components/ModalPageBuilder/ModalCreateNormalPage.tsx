import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import CreatePageCard from 'components/CreatePageCard';
import Field from 'components/Field';
import ImageTextCard from 'components/ImageTextCard';
import ModalCreate from 'components/ModalCreate';
import ScrollBars from 'components/ScrollBars';
import TextInput from 'components/TextInput';
import { modalsSelector, templatePopupSelector } from 'containers/Admin/selector';
import withDebounce from 'hocs/withDebounce';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ServerTemplateResponse } from 'services/PagesBuilderService';
import { authSelector, searchPageSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PageType } from 'types/Page';
import { Consts } from 'utils/constants/constants';
import { getEntityVariant } from 'utils/getEntityVariant';
import { GridSmart, View } from 'wiloke-react-core';
import parse from 'html-react-parser';
import AsyncComponent from 'components/AsyncComponent';
import { Location } from 'react-router';
import { LocationStates } from 'routes/LocationStates';
import { useLocation } from 'react-router-dom';
import useGuarded from 'routes/useGuarded';
import Title from 'components/Title';
import { useChangeModalAdminSettings } from '../../store';
import { useDeleteEditTemplate } from '../../util/useDeleteEditTemplate';

interface ModalCreateNormalPageProps {
  pageType: PageType;
  forceActiveDrawer?: boolean;
  pageInput?: ServerTemplateResponse | undefined;
  onCancel?: () => void;
}

const DebounceTextInput = withDebounce(TextInput, 'value', 'onValueChange');

export const ModalCreateNormalPage: FC<ModalCreateNormalPageProps> = ({ pageType, pageInput = undefined, forceActiveDrawer = false, onCancel }) => {
  const { createNormalPage } = useSelector(modalsSelector);
  const { createPageStatus } = useSelector(searchPageSelector);
  const { data: templatesData, getAllStatus, deleteStatus } = useSelector(templatePopupSelector);
  const { shopName } = useSelector(authSelector);

  const changeModalAdminSettings = useChangeModalAdminSettings();
  const { handleDeleteTemplatePage, statusSocketConnection } = useDeleteEditTemplate();
  const history = useHistory();

  const [includeHeader, setIncludeHeader] = useState(true);
  const [drawerContentActive, setDrawerContentActive] = useState(forceActiveDrawer);
  const [currentTemplate, setCurrentTemplate] = useState<ServerTemplateResponse | undefined>(pageInput);
  const [value, setValue] = useState(currentTemplate?.label ?? '');
  const [errorText, setErrorText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation<'/builder'>();
  const guard = useGuarded();

  useEffect(() => {
    if (!!forceActiveDrawer) {
      setDrawerContentActive(forceActiveDrawer);
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

  const _handleSubmitCreate = () => {
    if (value) {
      // create page xong thì redirect sang builder page
      setErrorText('');

      const id = currentTemplate ? currentTemplate.parentCommandId : Consts.BlankCommandId;
      const entityVariant = getEntityVariant(history.location as Location<keyof LocationStates>);

      history.push(`/builder?shop=${shopName}&id=${id}&entityVariant=${entityVariant}`, {
        headerFooterEnabled: includeHeader,
        label: value,
        type: pageType,
        isCreate: true,
        backToPage: '/page',
        isAdminTemplate: currentTemplate ? true : false,
        entityVariant,
      });
      setDrawerContentActive(false);
      changeModalAdminSettings({ createNormalPage: false });
    } else {
      setErrorText(i18n.t('validate.name_blank', { text: i18n.t('general.page', { textTransform: 'lowercase', text: '' }) }));
    }
  };

  const handleCreate = (type: 'create' | 'install', item?: ServerTemplateResponse) => () => {
    setDrawerContentActive(true);
    inputRef.current?.focus();
    if (type === 'create') {
      changeModalAdminSettings({ isCreate: true });
      setCurrentTemplate(undefined);
    } else {
      changeModalAdminSettings({ isCreate: false });
      setCurrentTemplate(item);
    }
  };

  const _handleCloseModal = () => {
    changeModalAdminSettings({ createNormalPage: false });
    setCurrentTemplate(undefined);
    onCancel?.();
  };

  const _handleGoBack = () => {
    setDrawerContentActive(false);
    setCurrentTemplate(undefined);
    setValue('');
  };

  const renderFormContent = (
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
              // TODO: i18n
              title={i18n.t('general.prefix_page', { prefix: 'Search' })}
              text={i18n.t('general.create_description', { text: 'Search Page' })}
            />
          </View>

          {currentTemplate && currentTemplate.html && <View css={{ marginBottom: '25px' }}>{parse(`${currentTemplate.html}`)}</View>}

          <Field label={i18n.t('builderPage.page_settings.general_settings.general.name')} error={errorText}>
            <DebounceTextInput
              innerRef={inputRef}
              placeholder={i18n.t('adminDashboard.name_your_page')}
              radius={6}
              sizeInput="medium"
              block
              onValueChange={text => setValue(text)}
              borderColor={!!errorText ? 'danger' : 'gray4'}
              value={value}
            />
          </Field>

          <View css={{ margin: '10px 0 25px' }}>
            <Checkbox
              checked={includeHeader}
              onValueChange={val => {
                setIncludeHeader(val);
              }}
              borderColor="gray4"
            >
              <View color="dark" fontFamily="secondary">
                {i18n.t('builderPage.page_settings.general_settings.general.enable_header_footer')}
              </View>
            </Checkbox>
          </View>

          <Button
            css={{ marginRight: '10px' }}
            borderColor="primary"
            borderStyle="solid"
            borderWidth={1}
            size="small"
            radius={6}
            loading={createPageStatus === 'loading'}
            onClick={_handleSubmitCreate}
          >
            {i18n.t('general.create_button', {
              text: i18n.t('general.page', { textTransform: 'lowercase', text: '' }),
            })}
          </Button>

          {currentTemplate && currentTemplate.description && <View css={{ marginTop: '20px' }}>{currentTemplate.description}</View>}
        </View>
      </View>
    </ScrollBars>
  );

  return (
    <ModalCreate
      visible={createNormalPage}
      goBack={forceActiveDrawer === true ? undefined : _handleGoBack}
      onOk={_handleCloseModal}
      onCancel={_handleCloseModal}
      activeDrawer={drawerContentActive}
      headerText={i18n.t('general.select_template', { text: i18n.t('general.page') })}
      FormContent={renderFormContent}
      Content={
        <View css={{ padding: '10px' }}>
          <AsyncComponent
            status={getAllStatus}
            Success={
              <GridSmart columnWidth={250} columnGap={20} columnCount={4}>
                <CreatePageCard key="default" onClick={handleCreate('create', undefined)} />
                {templatesData.map(item => (
                  <ImageTextCard.Style2
                    key={item.commandId}
                    label={item.label}
                    widthImage={item.image.width}
                    heightImage={item.image.height}
                    src={item.image.src}
                    onAdd={handleCreate('install', item)}
                    disabledIconSave
                    onDelete={guard('admin', 'dev') ? handleDeleteTemplatePage(item.commandId, item.type) : undefined}
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
