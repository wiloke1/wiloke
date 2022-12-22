import { FC } from 'react';
import { Image, Space, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface BodyProps {
  logo: string;
  title: string;
  text: string;
  type: string;
  typeColor?: string;
}

const Body: FC<BodyProps> = ({ logo, title, text, type, typeColor = 'var(--ui-color-primary)' }) => {
  return (
    <View css={styles.body}>
      <View css={styles.image}>
        {logo !== '' ? (
          <Image src={logo} aspectRatioInPercent={100} radius={4} />
        ) : (
          <View radius={4} backgroundColor="gray3" width={44} height={44} />
        )}
      </View>
      <Space size={8} />
      <View css={styles.head}>
        <Text css={[styles.type, { color: typeColor }]} size={10}>
          {type}
        </Text>
        <Space size={3} />
        <Text tagName="h5">{title}</Text>
        <Space size={3} />
      </View>

      {text && (
        <Text css={styles.text} numberOfLines={2}>
          {text}
        </Text>
      )}
    </View>
  );
};

export default Body;
