import Button from 'components/Button';
import Box from 'components/FieldBox';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authSelector } from 'store/selectors';
import { i18n } from 'translation';
import { getDate, timeAgo } from 'utils/timeAgo';
import { Image, Text, View } from 'wiloke-react-core';
import { themeDashboardSelector } from '../slice/sliceThemeDashboard';
import * as styles from './styles';

const DEFAULT_IMAGE = 'https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_960_720.png';

export const LiveTheme = () => {
  const { themeActivate } = useSelector(themeDashboardSelector);
  const { shopName } = useSelector(authSelector);
  const history = useHistory();

  const goToTheme = () => {
    const entityVariant = 'Client';
    history.push(
      `/builder?shop=${shopName}&id=${themeActivate.pageCommandIds?.[0]}&themeId=${themeActivate.commandId}&entityVariant=${entityVariant}`,
      {
        isCreate: false,
        backToPage: '/theme',
        entityVariant,
        label: '',
      },
    );
  };

  return (
    <Box.WithTitle
      title={`${i18n.t('publish_shopify.live_preview')}`}
      description={i18n.t('adminDashboard.page_description.live_theme')}
      backgroundColor="light"
      borderWidth={0}
      radius={6}
      css={{
        padding: '20px',
        marginBottom: '30px',
      }}
    >
      <Image
        src={themeActivate.featuredImage ? themeActivate.featuredImage : DEFAULT_IMAGE}
        aspectRatioInPercent={44}
        imageCss={{ borderRadius: '6px' }}
      />
      <View css={styles.custom}>
        <View>
          <Text fontFamily="secondary" size={18}>
            {themeActivate.label}
          </Text>
          <Text fontFamily="secondary" color="gray5">
            {themeActivate.createdDateTimestamp
              ? timeAgo(themeActivate.createdDateTimestamp, getDate(themeActivate.createdDateTimestamp))
              : undefined}
          </Text>
        </View>
        <Button
          backgroundColor="secondary"
          color="light"
          size="extra-small"
          radius={4}
          css={{ paddingTop: '8px', paddingBottom: '8px' }}
          fontFamily="secondary"
          onClick={goToTheme}
          disabled={themeActivate.pageCommandIds ? themeActivate.pageCommandIds.length < 1 : false}
        >
          {i18n.t('adminDashboard.customize')}
        </Button>
      </View>
    </Box.WithTitle>
  );
};

export default LiveTheme;
