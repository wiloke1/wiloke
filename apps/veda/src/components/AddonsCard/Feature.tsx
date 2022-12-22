import Button from 'components/Button';
import LazyImage from 'components/LazyImage';
import { FC } from 'react';
import { View } from 'wiloke-react-core';
import * as styles from './styles';
export interface FeatureProps {
  image: string;
  loading?: boolean;
  buttonText?: string;
  buttonDetailText?: string;
  disabled?: boolean;
  onClick?: () => void;
  onClickDetail?: () => void;
}

const Feature: FC<FeatureProps> = ({
  image,
  loading = false,
  buttonText = 'Add',
  buttonDetailText = 'Detail',
  disabled = false,
  onClick,
  onClickDetail,
}) => {
  return (
    <View css={styles.featureContainer} wilokeStyles="parent-hover">
      <View css={styles.featureContent} wilokeStyles={!loading ? 'child-fadein-0' : undefined}>
        <Button
          loading={loading}
          backgroundColor="gray8"
          color="light"
          size="extra-small"
          radius={6}
          fontFamily="secondary"
          css={styles.featureButton(disabled)}
          onClick={onClick}
        >
          {buttonText}
        </Button>

        {!!buttonDetailText && (
          <Button
            backgroundColor="gray8"
            color="light"
            size="extra-small"
            radius={6}
            fontFamily="secondary"
            css={{ ...styles.featureButton(disabled), marginTop: '8px' }}
            onClick={onClickDetail}
          >
            {buttonDetailText}
          </Button>
        )}
      </View>
      <LazyImage src={image} />
    </View>
  );
};

export default Feature;
