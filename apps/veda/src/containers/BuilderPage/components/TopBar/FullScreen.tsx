import Tooltip from 'components/Tooltip';
import { useToggleFullScreen } from 'containers/BuilderPage/store/fullScreen/slice';
import { useSetResponsive } from 'containers/BuilderPage/store/responsive/slice';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { fullscreenSelector } from 'store/selectors';
import { i18n } from 'translation';
import delay from 'utils/functions/delay';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export const FullScreen: FC = () => {
  const setResponsive = useSetResponsive();
  const toggleFullScreen = useToggleFullScreen();
  const fullscreen = useSelector(fullscreenSelector);

  return (
    <View
      css={styles.iconWrap}
      onClick={async () => {
        setResponsive('desktop');
        // Thời gian animation BuilderContentPage-iframe
        await delay(250);
        toggleFullScreen(undefined);
      }}
    >
      <Tooltip text={i18n.t('general.full_screen')} placement="bottom" css={styles.itemFull}>
        <FontAwesome type="far" name="expand" size={16} color={fullscreen ? 'primary' : 'gray7'} />
      </Tooltip>
    </View>
  );
};
