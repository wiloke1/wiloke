import Button from 'components/Button';
import ImagePlaceholder from 'components/ImagePlaceholder';
import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { PreviewImage } from 'types/Page';
import { imageUrl } from 'utils/functions/imageUrl';
import { ActivityIndicator, FontAwesome, View } from 'wiloke-react-core';
import { useRemoveBackground } from './actions/actionMyMedia';
import { imageGallerySelector } from './selector';
import * as styles from './styles';
import { imageUrlToFile } from './utils/imageUrlToFile';

interface ChooseImageButtonProps {
  /** Sự kiện onClick vào thumbnail */
  onClick?: () => void;
  image?: PreviewImage;
  imageWidth?: number;
  onClear?: ({ height, src, width }: PreviewImage) => void;
}

export const ChooseImageButton: FC<ChooseImageButtonProps> = ({ onClick, image, imageWidth = 300, onClear }) => {
  const { my_media } = useSelector(imageGallerySelector);
  const { removeBackgroundStatus } = my_media;

  const removeBackground = useRemoveBackground();

  const _handleClick = () => {
    onClick?.();
  };

  const renderLoadingOverlay = (
    <View css={styles.loadingOverlay}>
      <ActivityIndicator size={20} color="light" />
    </View>
  );

  return (
    <View css={styles.container} backgroundColor="light">
      {removeBackgroundStatus['choose-image-button'] === 'loading' && renderLoadingOverlay}
      {!image?.src ? (
        <View onClick={_handleClick}>
          <ImagePlaceholder aspectRatio={16 / 9} />
        </View>
      ) : (
        <View css={styles.imageContainer}>
          <img src={imageUrl(image.src, imageWidth)} alt="" onClick={_handleClick} />

          <View
            css={styles.clearButton}
            backgroundColor="gray8"
            onClick={() => {
              onClear?.({
                src: '',
                height: 0,
                width: 0,
              });
            }}
          >
            <FontAwesome name="times" type="far" color="light" css={{ lineHeight: 'normal' }} />
          </View>
          <View
            css={styles.removeBackgroundButton}
            backgroundColor="gray8"
            onClick={async () => {
              if (image.src) {
                const filename = image.src
                  .split('/')
                  .pop()
                  ?.replace(/(.jpg|.png|.jpeg).*/gm, '');
                if (filename) {
                  const file = await imageUrlToFile({
                    url: image.src,
                    name: filename,
                  });
                  removeBackground.request({
                    id: 'choose-image-button',
                    name: filename,
                    data: {
                      file,
                    },
                  });
                }
              }
            }}
          >
            <Tooltip portal text={'Remove background'}>
              <FontAwesome name="eraser" type="far" color="light" css={{ lineHeight: 'normal' }} />
            </Tooltip>
          </View>
        </View>
      )}
      <Button backgroundColor="light" color="gray9" colorHover="primary" block onClick={_handleClick} size="extra-small">
        {i18n.t('general.change_image')}
      </Button>
    </View>
  );
};
