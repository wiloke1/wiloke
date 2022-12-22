import Box from 'components/FieldBox';
import { useLinkPicker } from 'components/LinkPicker/store/context/LinkPickerContext';
import { useEmailModal } from 'components/LinkPicker/utils/globaState';
import { i18n } from 'translation';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export const Email = () => {
  const { value } = useLinkPicker();
  const [, setVisibleEmail] = useEmailModal();

  return (
    <View
      css={{ marginTop: '8px', display: 'flex' }}
      onClick={() => {
        setVisibleEmail(true);
      }}
    >
      <Box borderColor="gray3" css={styles.box}>
        <Text numberOfLines={1}>{value ? value : i18n.t('builderPage.compose_email')}</Text>
      </Box>
      <View css={styles.icon} borderColor="gray3" borderStyle="solid" borderWidth={1} radius={6}>
        <FontAwesome size={16} type="far" name="envelope" />
      </View>
    </View>
  );
};
