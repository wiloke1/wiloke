import { VedaLoadingItem } from 'components/VedaLoadingItem';
import { FC } from 'react';
import { i18n } from 'translation';
import { FontAwesome, Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface UploadPlaceholderProps {
  size?: styles.Size;
  text?: string;
  loading?: boolean;
  css?: ViewProps['css'];
}

const UploadPlaceholder: FC<UploadPlaceholderProps> = ({
  text = i18n.t('general.upload_a_file_or_drag_drop'),
  size = 'small',
  loading = false,
  css,
}) => {
  return (
    <View css={[styles.container(size), css]}>
      {loading ? (
        <VedaLoadingItem size={size === 'small' ? 32 : 50} />
      ) : (
        <FontAwesome type="fal" color="primary" name="upload" size={size === 'small' ? 32 : 50} />
      )}

      <Text numberOfLines={2} size={size === 'small' ? 15 : 16} css={styles.uploadDesc(size)} color="gray8">
        {text}
      </Text>
    </View>
  );
};

export default UploadPlaceholder;
