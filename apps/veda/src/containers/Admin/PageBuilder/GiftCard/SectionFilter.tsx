import Checkbox, { CheckboxProps } from 'components/Checkbox';
import { useSelector } from 'react-redux';
import { giftCardSelector } from 'store/selectors';
import { i18n } from 'translation';
import { Text, View } from 'wiloke-react-core';
import { useIsSelectAll, useSelectManyItems } from '.';
import * as styles from './styles';

export const SectionFilter = () => {
  const { ids, data } = useSelector(giftCardSelector);

  const setSelectAll = useIsSelectAll();
  const setIds = useSelectManyItems();

  const _handleSelectAll: CheckboxProps['onValueChange'] = isSelect => {
    const idsData = data.map(item => item.commandId);

    if (isSelect) {
      setSelectAll({ isSelectAll: true });
      setIds({ ids: idsData });
    } else {
      setSelectAll({ isSelectAll: false });
      setIds({ ids: [] });
    }
  };

  return (
    <View row css={styles.sectionTableHeader}>
      <View css={styles.checkbox}>
        <Checkbox onValueChange={_handleSelectAll} checked={ids.length > 0 && data.length > 0 && ids.length === data.length} />
      </View>

      <View css={styles.name}>
        <View tagName="h6">{i18n.t('general.name')}</View>
      </View>

      <View css={styles.lastUpdate}>
        <View tagName="h6">{i18n.t('adminDashboard.lastUpdate')}</View>
      </View>

      <View css={styles.status}>
        <Text numberOfLines={1} tagName="h6">
          {i18n.t('adminDashboard.draft')}/{i18n.t('adminDashboard.publish')}
        </Text>
      </View>
      <View css={{ width: '250px' }} />
    </View>
  );
};
