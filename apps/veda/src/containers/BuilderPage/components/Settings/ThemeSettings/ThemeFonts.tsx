import BoxCenter from 'components/BoxCenter';
import Button from 'components/Button';
import { getColorTitle } from 'components/ColorPicker2/utils';
import FontField from 'components/FontField/FontField';
import Title from 'components/Title';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useDeleteCssVariable, useUpdateCssVariable, useUpdateCssVariableValue } from 'store/global/cssVariables/slice';
import { cssVariablesSelector } from 'store/selectors';
import { i18n } from 'translation';
import { CssFontVariable } from 'types/PresetStyles';
import { v4 } from 'uuid';
import { FontAwesome, Space, Text, View } from 'wiloke-react-core';
import * as styles from '../styles';
import SelectPresets from './SelectPresets';

export interface ThemeFontsProps {}

const NUM = 4;

const ThemeFonts: FC<ThemeFontsProps> = () => {
  const cssVars = useSelector(cssVariablesSelector);
  const updateCssVariable = useUpdateCssVariable();
  const updateCssVariableValue = useUpdateCssVariableValue();
  const deleteCssVariable = useDeleteCssVariable();

  const renderItem = (item: CssFontVariable, index: number) => {
    return (
      <View key={item.id} css={[styles.tr, index < NUM ? { marginRight: '-6px' } : {}]}>
        <View css={[styles.tdItem, { width: '180px', flexShrink: 0 }]}>
          <Text tagName="h6" size={13} numberOfLines={1}>
            {getColorTitle(item.name)}
          </Text>
          <Space size={12} />
        </View>
        <View css={[styles.tdItem, index < NUM ? { paddingRight: 0 } : {}]}>
          <FontField
            value={item.value}
            onChange={value => {
              updateCssVariableValue({
                key: 'fonts',
                fonts: {
                  ...item,
                  value,
                } as CssFontVariable,
              });
            }}
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
                  key: 'fonts',
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

  const renderButton = (
    <View css={{ padding: '0 6px' }}>
      <Button
        backgroundColor="gray3"
        color="gray8"
        size="small"
        radius={6}
        fontFamily="secondary"
        css={{ fontWeight: 500 }}
        onClick={() => {
          updateCssVariable({
            key: 'fonts',
            fonts: {
              id: v4(),
              name: `--font-variable-${cssVars.fonts.length + 1}`,
              value: cssVars.fonts[cssVars.fonts.length - 1].value,
            },
          });
        }}
      >
        {i18n.t(`general.add`, {
          text: i18n.t('general.fonts'),
          textTransform: 'capitalize',
        })}
      </Button>
    </View>
  );

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

  const renderFonts = () => {
    const title = i18n.t('builderPage.theme_settings.fonts.content.title');
    const text = i18n.t('builderPage.theme_settings.fonts.content.text');
    return (
      <View>
        {renderPresetsAction}
        {renderTitle(title, text)}
        <View css={{ marginLeft: '-6px', marginRight: '-6px' }}>{cssVars.fonts.map(renderItem)}</View>
      </View>
    );
  };

  return (
    <View>
      {renderFonts()}
      {renderButton}
    </View>
  );
};

export default ThemeFonts;
