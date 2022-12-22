import { notification } from 'antd';
import ChooseImage from 'components/ChooseImage';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SwitchBeauty from 'components/SwitchBeauty';
import TextInput from 'components/TextInput';
import { SaveForBuilderType, useSavePageForBuilder } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { modalPageVisibleSelector, useSetModalPageVisible } from 'containers/BuilderPage/store/saveForBuilder/slice';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSetGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { generalSettingsSelector, pageDataSelector, saveForBuilderSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PreviewImage } from 'types/Page';
import getPageInfo from 'utils/functions/getInfo';
import customLog from 'utils/functions/log';
import { LiquidSyntaxToTwigError } from 'utils/LiquidSyntaxToTwig';
import useResultForSave from '../TopBar/useResultForSave';

export const ModalSavePageForBuilder: FC = () => {
  const page = useSelector(pageDataSelector);

  const modalPageVisible = useSelector(modalPageVisibleSelector);
  const { label } = useSelector(generalSettingsSelector);
  const { savePageStatus } = useSelector(saveForBuilderSelector);
  const [type, setType] = useState<SaveForBuilderType>('update');
  const [image, setImage] = useState<PreviewImage>(page?.image ?? { src: '', width: 0, height: 0 });
  const [linkPreview, setLinkPreview] = useState('');

  const setModalPageVisible = useSetModalPageVisible();
  const savePageForBuilder = useSavePageForBuilder();
  // const location = useLocation<'/builder'>();
  const setGeneralSettingPage = useSetGeneralSettingsPage();
  const { getResult, isExtracting } = useResultForSave();
  const history = useHistory<'/builder'>();

  const isTheme = !!getPageInfo('themeId');

  useEffect(() => {
    if (modalPageVisible && page && page?.image !== undefined) {
      setImage(page.image);
    }
  }, [page, modalPageVisible]);

  const _clearLabelParams = () => {
    const state = {
      ...history.location.state,
      label: '',
      handle: '',
      isCreate: false,
    };
    history.replace({ ...history.location, state });
  };

  const handleSavePage = async () => {
    try {
      const result = await getResult('throw');

      const pageData = result.pages[page.commandId];

      savePageForBuilder.request({
        type,
        builderType: isTheme ? 'theme' : 'page',
        data: page,
        result: pageData,
        previewImage: image,
        addons: result.theme.addons,
        isOverrideIndividualPages: true,
      });
    } catch (err) {
      if (err instanceof LiquidSyntaxToTwigError) {
        customLog('savePageForBuilder', err.message, err);
        notification.error({
          message: i18n.t('publish_shopify.error_in_code'),
          description: err.message,
        });
      } else {
        customLog('savePageForBuilder', i18n.t('publish_shopify.error_unknown.description'), err);
        notification.error({
          message: i18n.t('publish_shopify.error_unknown.message'),
          description: i18n.t('publish_shopify.error_unknown.description'),
        });
      }
    }
  };

  return (
    <MyModal
      headerText={i18n.t('builderPage.save_for_builder.save_page')}
      depsHeightRecalculation={type}
      isVisible={modalPageVisible}
      onCancel={() => {
        setModalPageVisible(false);
      }}
      isLoading={savePageStatus === 'loading' || isExtracting}
      onOk={handleSavePage}
    >
      <Field label={i18n.t('builderPage.save_for_builder.create_new_page')}>
        <SwitchBeauty
          checked={type === 'create'}
          radius={6}
          borderColor="gray3"
          borderWidth={1}
          enableText={i18n.t('general.enable')}
          disableText={i18n.t('general.disable')}
          onValueChange={value => {
            setType(value ? 'create' : 'update');
          }}
        />
      </Field>

      {type === 'create' && (
        <Field label={i18n.t('general.page', { text: i18n.t('general.name'), textTransform: 'capitalize' })}>
          <TextInput
            value={label}
            block
            sizeInput="medium"
            onValueChange={value => {
              setGeneralSettingPage({
                settings: {
                  label: value,
                },
              });
            }}
          />
        </Field>
      )}

      <Field label={i18n.t('builderPage.save_for_builder.link_preview')}>
        <TextInput value={linkPreview} block sizeInput="medium" onValueChange={setLinkPreview} />
      </Field>

      <Field label={i18n.t('builderPage.save_for_builder.preview_image')}>
        <ChooseImage
          value={image}
          onChange={({ width, height, src }) => {
            setImage({
              src: src,
              width: width ?? 0,
              height: height ?? 0,
            });
          }}
          mode="popup"
        />
      </Field>
    </MyModal>
  );
};
