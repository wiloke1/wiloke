import Tooltip from 'components/Tooltip';
import { useToggleFullScreen } from 'containers/BuilderPage/store/fullScreen/slice';
import { useSetResponsive } from 'containers/BuilderPage/store/responsive/slice';
import useDelay from 'hooks/useDelay';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { fullscreenSelector, responsiveSelector } from 'store/selectors';
import { i18n } from 'translation';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export const Responsive: FC = () => {
  const setResponsive = useSetResponsive();
  const toggleFullScreen = useToggleFullScreen();
  const fullscreen = useSelector(fullscreenSelector);
  const responsive = useSelector(responsiveSelector);
  const [delay] = useDelay();

  return (
    <View css={styles.iconWrap}>
      <Tooltip
        text={i18n.t('general.desktop')}
        css={styles.itemFull}
        placement="bottom"
        onClick={async () => {
          setResponsive('desktop');
          // Thời gian animation BuilderContentPage-iframe
          await delay(250);
          toggleFullScreen(undefined);
        }}
      >
        <FontAwesome type="far" name="desktop" size={16} color={responsive === 'desktop' ? 'primary' : 'gray7'} css={styles.icon} />
      </Tooltip>
      <View css={styles.divider} />
      <Tooltip
        text={i18n.t('general.tablet')}
        css={styles.itemFull}
        placement="bottom"
        onClick={() => {
          setResponsive('tablet');
          if (!fullscreen) {
            toggleFullScreen(undefined);
          }
        }}
      >
        <FontAwesome type="far" name="tablet" size={16} color={responsive === 'tablet' ? 'primary' : 'gray7'} css={styles.icon} />
      </Tooltip>
      <View css={styles.divider} />
      <Tooltip
        text={i18n.t('general.mobile')}
        css={styles.itemFull}
        placement="bottom"
        onClick={() => {
          setResponsive('mobile');
          if (!fullscreen) {
            toggleFullScreen(undefined);
          }
        }}
      >
        <FontAwesome type="far" name="mobile" size={16} color={responsive === 'mobile' ? 'primary' : 'gray7'} css={styles.icon} />
      </Tooltip>
    </View>
  );
};
