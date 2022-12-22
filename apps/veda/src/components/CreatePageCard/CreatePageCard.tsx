import Title from 'components/Title';
import React, { FC } from 'react';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface CreatePageCardProps {
  variant?: 'blank' | 'image' | 'default';
  image?: string;
  includeHeader?: boolean;
  title?: string;
  onClick?: () => void;
}

// TODO: i18n
const CreatePageCard: FC<CreatePageCardProps> = ({ variant = 'blank', image, includeHeader = true, title = 'New Blank Page', onClick }) => {
  if (variant === 'image') {
    return (
      <View onClick={onClick} radius={6} css={styles.imageContainer} borderColor="gray3" borderStyle="solid" borderWidth={1}>
        <View tagName="img" src={image || ''} alt="Create Page" css={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </View>
    );
  }
  if (variant === 'default') {
    return (
      <View onClick={onClick} radius={6} css={styles.defaultContainer} borderColor="gray3" borderStyle="solid" borderWidth={1}>
        <View css={styles.includeHeader(includeHeader)} backgroundColor="gray3">
          <View color="gray7">Header</View>
        </View>
        <View css={styles.blankContent}>
          <Title size="medium" title={title} text="Mix & match the sections by yourself" />
        </View>
        <View css={styles.includeFooter(includeHeader)} backgroundColor="gray3">
          <View color="gray7">Footer</View>
        </View>
      </View>
    );
  }
  return (
    <View
      css={styles.blankContainer}
      borderColor="gray3"
      borderStyle="solid"
      borderWidth={1}
      radius={6}
      backgroundColor="gray2"
      backgroundColorHover="light"
      onClick={onClick}
    >
      <View css={styles.blankContent}>
        <FontAwesome type="far" css={{ marginBottom: '10px' }} size={56} name="plus" className="create-page-icon" color="gray5" />
        <Text size={16} color="gray7">
          {title}
        </Text>
        <Text size={10} color="gray7">
          Mix &amp; match the sections by yourself
        </Text>
      </View>
    </View>
  );
};

export default CreatePageCard;
