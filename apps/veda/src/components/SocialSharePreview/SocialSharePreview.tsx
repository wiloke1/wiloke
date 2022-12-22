import { FC, ReactNode } from 'react';
import { Space, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface SocialSharePreviewProps {
  link: string;
  title: string;
  description: string;
  Top: ReactNode;
}

const SocialSharePreview: FC<SocialSharePreviewProps> = ({ Top, link, title, description }) => {
  return (
    <View css={styles.container}>
      {Top}
      <Space size={10} />
      <Text css={styles.link} numberOfLines={1}>
        {link}
      </Text>
      <Text css={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text css={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </View>
  );
};

export default SocialSharePreview;
