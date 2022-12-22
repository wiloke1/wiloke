import { setTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions';
import { useIframeDispatch } from 'containers/IframePage/hooks/useIframeDispatch';
import { FC } from 'react';
import { i18n } from 'translation';
import { FontAwesome, Space, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface AddSectionProps {}

export const AddSection: FC<AddSectionProps> = () => {
  const dispatch = useIframeDispatch();
  return (
    <View
      onClick={() => {
        dispatch(
          setTemplateBoardVisible({
            visible: true,
            navKeys: ['sections'],
          }),
        );
      }}
      css={styles.container}
    >
      <View>
        <FontAwesome size={40} color="gray9" name="plus-circle" type="fal" />
        <Space size={10} />
        <View tagName="h6" fontFamily="secondary" color="gray9" css={{ margin: 0, fontWeight: '500' }}>
          {i18n.t('schema.add', { text: i18n.t('general.section') })}
        </View>
      </View>
    </View>
  );
};
