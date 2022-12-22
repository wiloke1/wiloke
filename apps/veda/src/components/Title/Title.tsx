import { FC, ReactNode } from 'react';
import { Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface TitleProps {
  title: ReactNode;
  titleNumberOfLines?: number;
  text?: string;
  Left?: ReactNode;
  Right?: ReactNode;
  css?: ViewProps['css'];
  titleCss?: ViewProps['css'];
  size?: 'small' | 'medium' | 'large';
}

const Title: FC<TitleProps> = ({ title, text, css, titleCss, titleNumberOfLines = 1, Right, Left, size = 'small' }) => {
  const titleSize = size === 'small' ? 15 : size === 'medium' ? 22 : 28;
  const textSize = size === 'small' ? 14 : size === 'medium' ? 15 : 16;
  return (
    <View css={[styles.container(!!Right), css]}>
      <View css={!!Left ? styles.item(!!text) : {}}>
        {!!Left && <View css={text ? { marginTop: '5px' } : {}}>{Left}</View>}
        <View>
          <Text tagName="h3" numberOfLines={titleNumberOfLines} css={[{ fontSize: `${titleSize}px` }, titleCss]}>
            {title}
          </Text>
          {!!text && (
            <Text tagName="p" fontFamily="secondary" size={textSize} css={{ marginTop: '3px' }}>
              {text}
            </Text>
          )}
        </View>
      </View>
      {!!Right && <View css={styles.item(!!Left)}>{Right}</View>}
    </View>
  );
};

export default Title;
