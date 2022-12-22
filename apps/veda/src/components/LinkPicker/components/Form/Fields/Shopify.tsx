import Box from 'components/FieldBox';
import { View, Text, FontAwesome } from 'wiloke-react-core';
import { useGetPages } from 'store/actions/shopify';
import { useShopifyModal } from 'components/LinkPicker/utils/globaState';
import { useLinkPicker } from 'components/LinkPicker/store/context/LinkPickerContext';
import { i18n } from 'translation';
import * as styles from './styles';

export const Shopify = () => {
  const { value } = useLinkPicker();
  const [, setVisible] = useShopifyModal();
  const getPages = useGetPages();

  const _handleClickIcon = () => {
    getPages.request({ search: '' });
  };

  return (
    <View
      css={{ marginTop: '8px', display: 'flex' }}
      onClick={() => {
        setVisible(true);
      }}
    >
      <Box borderColor="gray3" css={styles.box}>
        <Text numberOfLines={1}>{value ? value : i18n.t('builderPage.select_url')}</Text>
      </Box>
      <View onClick={_handleClickIcon} css={styles.icon} borderColor="gray3" borderStyle="solid" borderWidth={1} radius={6}>
        <FontAwesome size={16} type="fab" name="shopify" />
      </View>
    </View>
  );
};
