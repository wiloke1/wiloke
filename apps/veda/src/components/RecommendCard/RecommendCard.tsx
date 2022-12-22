import Button from 'components/Button';
import React, { FC } from 'react';
import { i18n } from 'translation';
import { FontAwesome, FontAwesomeType, Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface RecommendCardProps {
  rating?: number;
  title: string;
  description: string;
  image?: string;
  reviews?: number;
  cssContainer?: ViewProps['css'];
  onClick?: () => void;
}

const RecommendCard: FC<RecommendCardProps> = ({ description = '', title = '', rating = 1, image = '', reviews = 0, cssContainer, onClick }) => {
  const _renderStar = () => {
    const stars: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      let star: FontAwesomeType = 'far';
      if (rating > i && rating !== null) {
        star = 'fas';
      }
      stars.push(<FontAwesome color="quaternary" key={i} type={star} name="star" />);
    }

    return stars;
  };

  return (
    <View css={[styles.container, cssContainer]}>
      <View css={styles.appImage}>
        <View css={styles.img}>
          <View tagName="img" src={image} />
        </View>
      </View>
      <View css={styles.content}>
        <Text fontFamily="secondary" css={styles.title}>
          {title}
        </Text>
        <View css={styles.descriptionContainer}>
          <Text css={styles.description} color="gray6">
            {description}
          </Text>
        </View>

        <View css={styles.starsContainer}>
          <View css={styles.stars}>{_renderStar()}</View>
          <Text color="gray6">
            ({reviews} review{reviews > 0 ? 's' : null})
          </Text>
        </View>
      </View>
      <View css={styles.action}>
        <Button backgroundColor="secondary" color="light" radius={6} size="extra-small" onClick={onClick}>
          <Text tagName="span" fontFamily="secondary">
            {i18n.t('general.install')}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default RecommendCard;
