import Active from 'components/Active';
import ChooseImage from 'components/ChooseImage';
import ColorPicker2 from 'components/ColorPicker2';
import Field from 'components/Field';
import Preloader from 'components/Preloader';
import SwitchBeauty from 'components/SwitchBeauty';
import Title from 'components/Title';
import { useSetSettingsVisible } from 'containers/BuilderPage/store/settingsVisible/slice';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useSetPreloaderTesting } from 'store/global/preloaderTesting/slice';
import { useSetThemeGeneralSettings } from 'store/global/themeSettings/slice';
import { cssVariablesSelector, preloaderTestingSelector, themeGeneralSettingsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { GridSmart, Space, Text, View } from 'wiloke-react-core';
import { preloaders } from '../data';

const ThemeGeneralSettings: FC = () => {
  const themeGeneralSettings = useSelector(themeGeneralSettingsSelector);
  const preloaderTesting = useSelector(preloaderTestingSelector);
  const { colors } = useSelector(cssVariablesSelector);
  const setPreloaderTesting = useSetPreloaderTesting();
  const setThemeGeneralSettings = useSetThemeGeneralSettings();
  const setSettingsVisible = useSetSettingsVisible();

  return (
    <View>
      <View css={{ padding: '20px' }} radius={6} backgroundColor="gray1">
        <View row>
          <View columns={[5]}>
            <Space size={10} />
            <Title
              title={i18n.t('builderPage.theme_general_settings.preloader.title')}
              text={i18n.t('builderPage.theme_general_settings.preloader.text')}
              titleCss={{ fontSize: '20px' }}
            />
          </View>
          <View columns={[7]}>
            <Field label={i18n.t('general.enable')}>
              <SwitchBeauty
                checked={themeGeneralSettings.preloaderEnable}
                radius={6}
                borderColor="gray3"
                borderWidth={1}
                enableText={i18n.t('general.enable')}
                disableText={i18n.t('general.disable')}
                onValueChange={value => {
                  setThemeGeneralSettings({
                    preloaderEnable: value,
                    // Nếu value === true
                    ...(value
                      ? {
                          // Nếu preloaderBackgroundColor không tồn tại thì set
                          ...(!themeGeneralSettings.preloaderBackgroundColor ? { preloaderBackgroundColor: colors[0].light } : {}),
                          // Nếu preloaderColor không tồn tại thì set
                          ...(!themeGeneralSettings.preloaderColor ? { preloaderColor: '#fff' } : {}),
                        }
                      : {}),
                  });
                }}
              />
            </Field>
            <Field label={i18n.t('general.select_preloader')}>
              <GridSmart columnWidth={100} columnCount={2} columnGap={10}>
                {preloaders.map((item, index) => {
                  const variant = index + 1;
                  const active = variant === themeGeneralSettings.preloaderVariant;

                  return (
                    <Active
                      key={item.id}
                      variant="style2"
                      active={active}
                      css={{ backgroundColor: 'transparent' }}
                      onClick={() => {
                        setThemeGeneralSettings({ preloaderVariant: variant });
                      }}
                    >
                      <Preloader variant={variant} backgroundColor={item.backgroundColor} color={item.color} />
                    </Active>
                  );
                })}
              </GridSmart>
            </Field>
            <Field label={i18n.t('general.background_color')}>
              <ColorPicker2
                color={themeGeneralSettings.preloaderBackgroundColor}
                data={colors}
                onChange={value => {
                  setThemeGeneralSettings({ preloaderBackgroundColor: value });
                }}
                onAddOrEditColor={() => {
                  setSettingsVisible({ visible: true, keys: ['theme', 'colors'] });
                }}
              />
            </Field>
            <Field label={i18n.t('builderPage.mega_menu.icon', { text: i18n.t('general.color') })}>
              <ColorPicker2
                color={themeGeneralSettings.preloaderColor}
                data={colors}
                onChange={value => {
                  setThemeGeneralSettings({ preloaderColor: value });
                }}
                onAddOrEditColor={() => {
                  setSettingsVisible({ visible: true, keys: ['theme', 'colors'] });
                }}
              />
            </Field>
            <Field label={i18n.t('builderPage.save_for_builder.logo')}>
              <ChooseImage
                value={{ src: themeGeneralSettings.preloaderLogo, width: 0, height: 0 }}
                mode="popup"
                imageWidth={500}
                onChange={value => {
                  setThemeGeneralSettings({ preloaderLogo: value.src });
                }}
              />
            </Field>
            {themeGeneralSettings.preloaderEnable && (
              <Field label={i18n.t('general.test')}>
                <SwitchBeauty
                  checked={preloaderTesting}
                  radius={6}
                  borderColor="gray3"
                  borderWidth={1}
                  enableText={i18n.t('general.enable')}
                  disableText={i18n.t('general.disable')}
                  onValueChange={setPreloaderTesting}
                />
                <Text size={12} color="gray8" css={{ marginTop: '4px' }}>
                  {i18n.t('builderPage.theme_general_settings.preloader.testing')}
                </Text>
              </Field>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ThemeGeneralSettings;
