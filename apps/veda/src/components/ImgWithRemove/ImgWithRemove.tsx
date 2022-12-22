import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { i18n } from 'translation';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface ImgWithRemoveProps {
  src: string;
  width: number;
  height: number;
  onClose?: () => void;
}

const ImgWithRemove: FC<ImgWithRemoveProps> = ({ src, width, height, onClose }) => {
  return (
    <View css={styles.container(width, height, src)}>
      <Tooltip text={i18n.t('general.remove')} css={styles.close}>
        <FontAwesome type="fal" name="times" color="gray2" css={{ width: '100%', height: '100%' }} onClick={onClose} />
      </Tooltip>
    </View>
  );
};

export default ImgWithRemove;
