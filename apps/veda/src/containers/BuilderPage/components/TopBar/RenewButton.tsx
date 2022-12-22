import Tooltip from 'components/Tooltip';
import { useSelector } from 'react-redux';
import { useRenewData } from 'store/global/renewDataBuilder/actions';
import { renewDataBuilderSelector } from 'store/selectors';
import { i18n } from 'translation';
import { ActivityIndicator, FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export const RenewButton = () => {
  const { statusRequest } = useSelector(renewDataBuilderSelector);

  const renewDataBuilder = useRenewData();

  return (
    <View css={styles.iconWrap} onClick={() => renewDataBuilder.request(undefined)}>
      <Tooltip text={i18n.t('general.renew_data')} placement="bottom" css={styles.itemFull}>
        {statusRequest === 'loading' ? <ActivityIndicator size={16} /> : <FontAwesome type="far" name="sync-alt" size={16} />}
      </Tooltip>
    </View>
  );
};
