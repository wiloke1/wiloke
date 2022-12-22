import IconSvg, { IconSvgName } from 'components/IconSvg';
import { FC } from 'react';
import { Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface ElementCardProps extends Omit<ViewProps, 'css' | 'wilokeStyles'> {
  iconName: IconSvgName;
  text: string;
  textHover: string;
}

const ElementCard: FC<ElementCardProps> = ({ iconName, text, textHover, ...rest }) => {
  return (
    <View {...rest} css={styles.container} wilokeStyles="parent-hover">
      <View css={styles.front}>
        <View css={{ marginBottom: '5px' }}>
          <IconSvg name={iconName} />
        </View>
        <Text css={{ textAlign: 'center', marginTop: '4px', fontWeight: 500 }} numberOfLines={2} fontFamily="secondary" size={12} color="gray8">
          {text}
        </Text>
      </View>
      <View css={styles.back} wilokeStyles="child-translateY-100">
        <Text fontFamily="secondary" size={13} color="gray8">
          {textHover}
        </Text>
      </View>
      <View aspectRatioInPercent={75} />
    </View>
  );
};

export default ElementCard;
