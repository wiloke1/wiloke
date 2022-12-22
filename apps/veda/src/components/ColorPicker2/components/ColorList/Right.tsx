import { useColorPicker } from 'components/ColorPicker2/context';
import { getColorTitle } from 'components/ColorPicker2/utils';
import Field from 'components/Field';
import SliderBeauty from 'components/SliderBeauty';
import SwitchBeauty from 'components/SwitchBeauty';
import Title from 'components/Title';
import withDebounce from 'hocs/withDebounce';
import { FC } from 'react';
import { i18n } from 'translation';
import { Space, View } from 'wiloke-react-core';
import * as styles from './styles';

const SliderBeautyDebounce = withDebounce(SliderBeauty, 'value', 'onValueChange', 300);

export const Right: FC = () => {
  const { color, onChange } = useColorPicker();
  const switchChecked = !/-freeze\)/g.test(color);
  const alpha = color.match(/,\s*(\d.)?\d*(?=\))/g)?.[0]?.replace(/,\s*/g, '') ?? '';
  const sliderValue = alpha !== '' ? Number(alpha) : 1;

  return (
    <View css={styles.right} backgroundColor="gray1">
      <Title
        titleNumberOfLines={3}
        title={getColorTitle(color)}
        text={i18n.t('general.color_settings_description')}
        titleCss={{ fontSize: '18px' }}
      />
      <Space size={20} />
      <Field label={i18n.t('general.auto_change_color_for_dark_theme')}>
        <SwitchBeauty
          checked={switchChecked}
          radius={6}
          borderColor="gray3"
          borderWidth={1}
          enableText={i18n.t('general.enable')}
          disableText={i18n.t('general.disable')}
          onValueChange={value => {
            if (color.includes('rgba')) {
              onChange(value ? color.replace(/-freeze\),/g, '),') : color.replace(/\),/g, '-freeze),'));
            } else {
              onChange(value ? color.replace(/-freeze\)/g, ')') : color.replace(/\)$/g, '-freeze)'));
            }
          }}
        />
      </Field>
      <Field label={i18n.t('general.opacity')}>
        <SliderBeautyDebounce
          value={sliderValue}
          min={0}
          max={1}
          step={0.1}
          borderColor="gray3"
          borderInputColor="gray3"
          onValueChange={value => {
            if (value === 1) {
              onChange(color.replace(/rgba\(|,.*$/g, '').replace(/--rgb-/g, '--'));
            } else {
              if (color.includes('rgba')) {
                onChange(color.replace(/,\s*(\d.)?\d*(?=\))/g, `, ${value}`));
              } else {
                onChange(`rgba(${color.replace(/var\(--/g, 'var(--rgb-')}, ${value})`);
              }
            }
          }}
        />
      </Field>
    </View>
  );
};
