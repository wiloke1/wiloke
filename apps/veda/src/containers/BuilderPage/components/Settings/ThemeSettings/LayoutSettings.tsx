import Field from 'components/Field';
import LayoutSettingsSimulator from 'components/LayoutSettingsSimulator';
import SliderBeauty from 'components/SliderBeauty';
import Title from 'components/Title';
import withDebounce from 'hocs/withDebounce';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useSetLayoutSettings } from 'store/actions/actionLayoutSettings';
import { layoutSettingsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { Space, View } from 'wiloke-react-core';
import SelectPresets from './SelectPresets';

const SliderBeautyDebounce = withDebounce(SliderBeauty, 'value', 'onValueChange', 300);

const LayoutSettings: FC = () => {
  const setLayoutSettings = useSetLayoutSettings();
  const layoutSettings = useSelector(layoutSettingsSelector);

  return (
    <View>
      <SelectPresets />
      <Space size={15} />
      <Title
        title={i18n.t('builderPage.theme_settings.layout.title')}
        text={i18n.t('builderPage.theme_settings.layout.text')}
        titleCss={{ fontSize: '18px !important' }}
      />
      <Space size={15} />
      <View row>
        <View columns={[6]}>
          <Field
            label={`${i18n.t('builderPage.layout_settings.container_width.title')} (px)`}
            note={i18n.t('builderPage.layout_settings.container_width.text', { size: '1300' })}
          >
            <SliderBeautyDebounce
              value={layoutSettings.containerWidth}
              min={300}
              max={2000}
              step={1}
              borderColor="gray3"
              borderInputColor="gray3"
              onValueChange={value => {
                setLayoutSettings({ containerWidth: value });
              }}
            />
          </Field>
          <Field
            label={`${i18n.t('builderPage.layout_settings.container_gap.title')} (px)`}
            note={i18n.t('builderPage.layout_settings.container_gap.text', { size: '15' })}
          >
            <SliderBeautyDebounce
              value={layoutSettings.containerGap}
              min={0}
              max={60}
              step={1}
              borderColor="gray3"
              borderInputColor="gray3"
              onValueChange={value => {
                setLayoutSettings({ containerGap: value });
              }}
            />
          </Field>
          <Field
            label={`${i18n.t('builderPage.layout_settings.column_gap_vertical.title')} (px)`}
            note={i18n.t('builderPage.layout_settings.column_gap_vertical.text', { size: '30' })}
          >
            <SliderBeautyDebounce
              value={layoutSettings.columnGapY}
              min={0}
              max={60}
              step={1}
              borderColor="gray3"
              borderInputColor="gray3"
              onValueChange={value => {
                setLayoutSettings({ columnGapY: value });
              }}
            />
          </Field>
          <Field
            label={`${i18n.t('builderPage.layout_settings.column_gap_horizontal.title')} (px)`}
            note={i18n.t('builderPage.layout_settings.column_gap_horizontal.text', { size: '0' })}
          >
            <SliderBeautyDebounce
              value={layoutSettings.columnGapX}
              min={0}
              max={60}
              step={1}
              borderColor="gray3"
              borderInputColor="gray3"
              onValueChange={value => {
                setLayoutSettings({ columnGapX: value });
              }}
            />
          </Field>
        </View>
        <View columns={[6]}>
          <LayoutSettingsSimulator
            containerWidth={layoutSettings.containerWidth}
            containerGap={layoutSettings.containerGap}
            columnGapVertical={layoutSettings.columnGapY}
            columnGapHorizontal={layoutSettings.columnGapX}
          />
        </View>
      </View>
    </View>
  );
};

export default LayoutSettings;
