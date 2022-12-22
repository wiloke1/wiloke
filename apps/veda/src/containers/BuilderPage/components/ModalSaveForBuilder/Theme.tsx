import { notification } from 'antd';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SwitchBeauty from 'components/SwitchBeauty';
import TextInput from 'components/TextInput';
import { SaveForBuilderType, useSaveTheme } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { useSetModalThemeVisible } from 'containers/BuilderPage/store/saveForBuilder/slice';
import withDebounce from 'hocs/withDebounce';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSetThemeGeneralSettings } from 'store/global/themeSettings/slice';
import { pagesDataSelector, saveForBuilderSelector, themeSettingsSelector } from 'store/selectors';
import { i18n } from 'translation';
import getPageInfo from 'utils/functions/getInfo';
import { LiquidSyntaxToTwigError } from 'utils/LiquidSyntaxToTwig';
import useResultForSave from '../TopBar/useResultForSave';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const ModalSaveThemeForBuilder: FC = () => {
  const { saveThemeStatus, modalThemeVisible } = useSelector(saveForBuilderSelector);
  const { generalSettings } = useSelector(themeSettingsSelector);
  const pages = useSelector(pagesDataSelector);

  const [type, setType] = useState<SaveForBuilderType>('update');
  const _themeId = getPageInfo('themeId');

  const setThemeVisible = useSetModalThemeVisible();
  const setGeneralSettingTheme = useSetThemeGeneralSettings();
  const _saveTheme = useSaveTheme();
  const { getResult, isExtracting } = useResultForSave();

  const handleSaveTheme = async () => {
    const _result = await getResult('throw');
    const _pageIds = Object.values(pages).map(item => item.commandId);

    try {
      setThemeVisible(false);
    } catch (err) {
      if (err instanceof LiquidSyntaxToTwigError) {
        notification.error({
          message: i18n.t('publish_shopify.error_in_code'),
          description: err.message,
        });
      } else if (err instanceof Error) {
        notification.error({
          message: i18n.t('publish_shopify.error_unknown.message'),
          description: i18n.t('publish_shopify.error_unknown.description'),
        });
      }
    }
  };

  return (
    <MyModal
      headerText={i18n.t('builderPage.save_for_builder.save_theme')}
      depsHeightRecalculation={type}
      isVisible={modalThemeVisible}
      onCancel={() => {
        setThemeVisible(false);
      }}
      onOk={handleSaveTheme}
      isLoading={saveThemeStatus === 'loading' || isExtracting}
    >
      <Field label={i18n.t('builderPage.save_for_builder.create_new_theme')}>
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

      <Field label={i18n.t('general.theme', { text: i18n.t('general.name'), textTransform: 'capitalize' })}>
        <DebounceInput
          value={generalSettings.label}
          block
          sizeInput="medium"
          onValueChange={value => {
            setGeneralSettingTheme({
              label: value,
            });
          }}
        />
      </Field>
    </MyModal>
  );
};
