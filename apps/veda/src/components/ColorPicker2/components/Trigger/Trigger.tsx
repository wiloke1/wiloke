import { useColorPicker } from 'components/ColorPicker2/context';
import { getColorTitle, removeVar } from 'components/ColorPicker2/utils';
import FieldBox from 'components/FieldBox';
import useTemplateDark from 'hooks/useTemplateDark';
import { FC, MouseEventHandler, RefObject } from 'react';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface TriggerProps {
  colorRef?: RefObject<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLElement>;
}

export const Trigger: FC<TriggerProps> = ({ colorRef, onClick }) => {
  const { data, color, triggerSmall, triggerCss } = useColorPicker();
  const isDark = useTemplateDark();
  const colorVar = data.find(item => item.name === removeVar(color));
  const colorActive = color.includes('var') ? (color.includes('-freeze') ? colorVar?.light : colorVar?.[isDark ? 'dark' : 'light']) : color;

  if (triggerSmall) {
    return (
      <View ref={colorRef} css={[styles.targetPicker, triggerCss]} onClick={onClick}>
        <View
          radius={5}
          borderWidth={1}
          borderColor="gray3"
          borderStyle="solid"
          css={styles.targetBackground}
          style={{ backgroundColor: colorActive }}
        />
      </View>
    );
  }

  return (
    <FieldBox backgroundColor="light" borderColor="gray3" borderStyle="solid" borderWidth={1} radius={6} css={styles.box}>
      <View ref={colorRef} css={[styles.targetPicker, triggerCss]} onClick={onClick}>
        <View
          radius={5}
          borderWidth={1}
          borderColor="gray3"
          borderStyle="solid"
          css={styles.targetBackground}
          style={{ backgroundColor: colorActive }}
        />
      </View>
      <View css={styles.colorDetailsContainer}>
        <Text css={styles.colorDetails}>{getColorTitle(color)}</Text>
      </View>
    </FieldBox>
  );
};
