import Button from 'components/Button';
import ColorPicker from 'components/ColorPicker';
import { useColorPicker } from 'components/ColorPicker2/context';
import { useIconCheckColor } from 'components/ColorPicker2/hooks';
import { removeVar } from 'components/ColorPicker2/utils';
import Tooltip from 'components/Tooltip';
import withDebounce from 'hocs/withDebounce';
import useTemplateDark from 'hooks/useTemplateDark';
import { FC } from 'react';
import { i18n } from 'translation';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

const ColorPickerDebounce = withDebounce(ColorPicker, 'color', 'onChange', 300);

export const Left: FC = () => {
  const { data, color, onChange, onAddOrEditColor } = useColorPicker();
  const isDark = useTemplateDark();
  const getIconCheckColor = useIconCheckColor();

  return (
    <View css={styles.left} backgroundColor="light">
      <View row css={styles.row}>
        {data.map(item => {
          const active = item.name === removeVar(color);
          const colorStyle = color.includes('-freeze') ? item.light : item[isDark ? 'dark' : 'light'];
          return (
            <View key={item.id} columns={[3]} css={styles.col}>
              <View
                css={styles.item(active, colorStyle)}
                onClick={() => {
                  onChange(active ? '' : `var(${item.name})`);
                }}
              >
                <View css={[styles.itemInner, { backgroundColor: colorStyle }]}>
                  {active && <FontAwesome type="fal" name="check" size={18} css={{ color: getIconCheckColor(colorStyle) }} />}
                </View>
              </View>
            </View>
          );
        })}
      </View>
      <View
        backgroundColor="gray2"
        color="gray8"
        radius={4}
        fontFamily="secondary"
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 15px',
          marginBottom: '10px',
          fontSize: '12px',
          fontWeight: '500',
        }}
      >
        <Text>{i18n.t('general.custom_color')}</Text>
        <View css={{ display: 'flex', alignItems: 'center' }}>
          {!!color && !color.includes('var') && (
            <Tooltip
              portal
              text={i18n.t('general.clear')}
              onClick={() => {
                onChange('');
              }}
              css={styles.clear}
            >
              <FontAwesome type="far" name="undo-alt" size={11} color="gray6" />
            </Tooltip>
          )}
          <ColorPickerDebounce
            isPortal
            color={color.includes('var') ? '' : color}
            onChange={color => {
              if (!!color) {
                onChange(color);
              }
            }}
            className="veda-custom-color"
          />
        </View>
      </View>
      <Button block backgroundColor="gray2" color="gray8" size="extra-small" radius={4} fontFamily="secondary" onClick={onAddOrEditColor}>
        {i18n.t('general.add_or_edit_global_color')}
      </Button>
    </View>
  );
};
