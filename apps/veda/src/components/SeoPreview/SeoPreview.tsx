import { FC } from 'react';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface SeoPreviewProps {
  link: string;
  title: string;
  description: string;
}

const SeoPreview: FC<SeoPreviewProps> = ({ link, title, description }) => {
  return (
    <View css={styles.container}>
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

export default SeoPreview;
