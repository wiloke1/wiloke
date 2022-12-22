import { FC, useEffect, useState } from 'react';
import { imageUrl } from 'utils/functions/imageUrl';
import strToCapitalize from 'utils/functions/strToCapitalize';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';
import { FontAwesomeType, IconUIFieldButtonProps, FontType, IconValue } from './types';
import { getImageSrc, isImage } from './Upload';

const IconUIFieldButton: FC<IconUIFieldButtonProps> = ({ value = '<i class="fal fa-atom" />' as IconValue, onClick }) => {
  const iconFromValue = value.replace(/<i.*class=("|')(fa.*\s|)|("|').*>/g, '').trim() as FontAwesomeType;
  const iconTypeFromValue = value.replace(/<i.*class=("|')|\s(fa-|).*/g, '') as FontType | 'fab';
  const [iconState, setIcon] = useState(iconFromValue);
  const [iconType, setIconType] = useState<FontType | 'fab'>(iconTypeFromValue || 'far');

  useEffect(() => {
    setIcon(iconFromValue);
    setIconType(iconTypeFromValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <View css={styles.preview} onClick={onClick}>
      {isImage(value) ? (
        <View tagName="img" src={imageUrl(getImageSrc(value), 200)} css={{ objectFit: 'cover', width: 'auto', height: '25px' }} />
      ) : (
        <Text tagName="i" className={!!iconState ? `${iconType} ${iconState}` : 'fal fa-times'} size={18} color={!!iconState ? 'primary' : 'gray5'} />
      )}
      <Text color="gray7" size={14} numberOfLines={1} css={{ paddingLeft: '15px' }}>
        {isImage(value) ? 'Image' : !!iconState ? strToCapitalize(iconState.replace(/fa-/g, '').replace(/-/g, ' ')) : 'No Icon'}
      </Text>
    </View>
  );
};

export default IconUIFieldButton;
