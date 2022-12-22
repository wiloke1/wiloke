import BoxCenter from 'components/BoxCenter';
import { getColorTitle } from 'components/ColorPicker2/utils';
import ColorPickerBeauty from 'components/ColorPickerBeauty';
import Title from 'components/Title';
import withDebounce from 'hocs/withDebounce';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useDeleteCssVariable, useUpdateCssVariableValue } from 'store/global/cssVariables/slice';
import { cssVariablesSelector, documentColorsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { CssColorVariable } from 'types/PresetStyles';
import { FontAwesome, Space, Text, View } from 'wiloke-react-core';
import * as styles from '../styles';
import SelectPresets from './SelectPresets';

export interface ThemeColorsProps {}

const ColorPickerBeautyDebounce = withDebounce(ColorPickerBeauty, 'color', 'onChange', 300);
const NUM = 15;

const ThemeColors: FC<ThemeColorsProps> = () => {
  const { colors } = useSelector(cssVariablesSelector);
  const updateCssVariableValue = useUpdateCssVariableValue();
  const deleteCssVariable = useDeleteCssVariable();
  const documentColors = useSelector(documentColorsSelector);

  const findColorByName = (name: string) => {
    return colors.find(item => item.name === name) as CssColorVariable;
  };

  const getItemDark = (item: CssColorVariable) => {
    switch (item.name) {
      case '--color-dark':
        return findColorByName('--color-light');
      case '--color-gray9':
        return findColorByName('--color-gray1');
      case '--color-gray8':
        return findColorByName('--color-gray2');
      case '--color-gray7':
        return findColorByName('--color-gray3');
      case '--color-gray6':
        return findColorByName('--color-gray4');
      case '--color-gray5':
        return findColorByName('--color-gray5');
      case '--color-gray4':
        return findColorByName('--color-gray6');
      case '--color-gray3':
        return findColorByName('--color-gray7');
      case '--color-gray2':
        return findColorByName('--color-gray8');
      case '--color-gray1':
        return findColorByName('--color-gray9');
      case '--color-light':
        return findColorByName('--color-dark');
      default:
        return item;
    }
  };

  const handleChangeColor = (item: CssColorVariable) => (value: string) => {
    const itemDark = getItemDark(item);
    const firstColors = ['--color-primary', '--color-secondary', '--color-tertiary', '--color-quaternary'];
    updateCssVariableValue({
      key: 'colors',
      colors: {
        ...item,
        light: value,
        ...(firstColors.includes(item.name) ? { dark: value } : {}),
      },
    });
    if (!firstColors.includes(item.name)) {
      updateCssVariableValue({
        key: 'colors',
        colors: {
          ...itemDark,
          dark: value,
        },
      });
    }
  };

  const renderItem = (item: CssColorVariable, index: number) => {
    return (
      <View key={item.id} css={[styles.tr, index < NUM ? { marginRight: '-6px' } : {}]}>
        <View css={[styles.tdItem, { width: '180px', flexShrink: 0 }]}>
          <Text tagName="h6" size={13} numberOfLines={1}>
            {getColorTitle(item.name)}
          </Text>
          {index > 0 && <Space size={12} />}
        </View>
        <View css={styles.tdItem}>
          <ColorPickerBeautyDebounce
            radiusBox={6}
            borderColor="gray3"
            color={item.light}
            documentColors={documentColors}
            onChange={handleChangeColor(item)}
          />
        </View>

        <View css={[styles.tdAction, { marginTop: '0px' }]}>
          {index >= NUM && (
            <BoxCenter
              size={46}
              backgroundColor="gray2"
              backgroundColorHover="gray3"
              radius={6}
              onClick={() => {
                deleteCssVariable({
                  key: 'colors',
                  id: item.id,
                });
              }}
            >
              <FontAwesome type="fal" name="times" size={24} color="gray8" />
            </BoxCenter>
          )}
        </View>
      </View>
    );
  };

  const renderTitle = (title: string, text: string) => {
    return (
      <>
        <Title title={title} text={text} titleCss={{ fontSize: '18px !important' }} />
        <Space size={15} />
      </>
    );
  };

  const renderPresetsAction = (
    <>
      <SelectPresets />
      <Space size={15} />
    </>
  );

  const renderColors = () => {
    const title = i18n.t('builderPage.theme_settings.colors.content.title');
    const text = i18n.t('builderPage.theme_settings.colors.content.text');
    return (
      <View>
        {renderPresetsAction}
        {renderTitle(title, text)}
        <View css={{ marginLeft: '-6px', marginRight: '-6px' }}>{colors.map(renderItem)}</View>
      </View>
    );
  };

  return <View>{renderColors()}</View>;
};

export default ThemeColors;
