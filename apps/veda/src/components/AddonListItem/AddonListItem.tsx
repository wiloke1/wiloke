import { FC, ReactNode } from 'react';
import { Image, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface AddonListItemProps {
  image?: string;
  label: string;
  description?: string;
  active?: boolean;
  Right?: ReactNode;
  Footer?: ReactNode;
}

const AddonListItem: FC<AddonListItemProps> = ({ image, label, description, active = false, Right, Footer }) => {
  return (
    <View css={styles.container(active)}>
      {!!image && (
        <View css={styles.image}>
          <Image src={image} aspectRatioInPercent={100} radius={6} />
        </View>
      )}
      <View css={{ width: '100%' }}>
        <Text tagName="h6">{label}</Text>
        {!!description && <Text size={13}>{description}</Text>}
        <View>{Footer}</View>
      </View>
      <View css={styles.right}>{Right}</View>
    </View>
  );
};

export default AddonListItem;
