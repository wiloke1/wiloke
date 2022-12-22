import { FC, memo } from 'react';
import { i18n } from 'translation';
import { Consts } from 'utils/constants/constants';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface ButtonEditCodeProps {
  type: typeof Consts.FakeTags.EditCode | typeof Consts.FakeTags.AddElement;
  onClick?: () => void;
}

const ButtonEditCode: FC<ButtonEditCodeProps> = ({ onClick, type }) => {
  return (
    <View onClick={onClick} css={styles.container} colorHover="primary">
      <View css={styles.inner}>
        <FontAwesome type="far" name={type === Consts.FakeTags.EditCode ? 'code' : 'plus-circle'} size={16} css={{ marginRight: '5px' }} />
        <Text>
          {type === Consts.FakeTags.EditCode
            ? `${i18n.t('general.add')} code`
            : i18n.t('general.add', { text: i18n.t('general.element'), textTransform: 'capitalize' })}
        </Text>
      </View>
    </View>
  );
};

export default memo(ButtonEditCode);
