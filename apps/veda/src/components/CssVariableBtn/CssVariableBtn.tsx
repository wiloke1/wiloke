import { FC } from 'react';
import { i18n } from 'translation';
import { CssColorVariable, CssFontVariable } from 'types/PresetStyles';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface CssVariableBtnProps {
  colors: CssColorVariable[];
  fonts: CssFontVariable[];
}

const SHOW_ITEM = 4;

const CssVariableBtn: FC<CssVariableBtnProps> = ({ colors, fonts }) => {
  return (
    <View css={styles.container}>
      {colors.map((color, index) => {
        if (index >= SHOW_ITEM) {
          return null;
        }
        return <View key={color.id} css={styles.item(color.light, index)} />;
      })}
      {colors.length > SHOW_ITEM && (
        <Text css={{ marginLeft: '4px' }} size={13} color="gray8">
          {colors.length}+ {i18n.t('general.colors', { textTransform: 'lowercase' })} &amp; {fonts.length}{' '}
          {i18n.t('general.fonts', { textTransform: 'lowercase' })}
        </Text>
      )}
    </View>
  );
};

export default CssVariableBtn;
