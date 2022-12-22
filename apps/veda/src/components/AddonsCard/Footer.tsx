import { FC, ReactNode } from 'react';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface FooterProps {
  author: ReactNode;
  Right?: ReactNode;
}

const Footer: FC<FooterProps> = ({ author, Right }) => {
  return (
    <View css={styles.footer}>
      <View>
        <Text tagName="span" color="gray6" size={13} css={styles.by}>
          by
        </Text>
        <Text tagName="span" size={13} color="gray7">
          {author ? author : 'Someone'}
        </Text>
      </View>
      <View onClick={event => event.stopPropagation()}>{Right}</View>
    </View>
  );
};

export default Footer;
