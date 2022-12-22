import Button from 'components/Button';
import Box from 'components/FieldBox';
import QuickGuideBox from 'components/QuickGuideBox';
import RecommendCard from 'components/RecommendCard';
import { i18n } from 'translation';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import Migration from '../ThemeBuilder/ThemeDashboard/components/Migration';
import * as styles from './styles';

export const RightBarAdmin = () => {
  return (
    <View css={styles.container} columns={[4, 4, 4]}>
      <Migration />

      <Box.WithTitle title="Quick Guides" borderWidth={0} css={styles.box}>
        <QuickGuideBox title="pick" description="Pick a template for your Theme" color="behance" />
        <QuickGuideBox title="custom" description="Custom your Theme with the Editor" color="danger" />
        <QuickGuideBox title="level up" description="Level up your store design with Addons" color="digg" />
        <QuickGuideBox title="set up" description="Set up a Global Style preset" color="linkedin" />

        <Button block color="primary" backgroundColor="gray5" radius={6} css={styles.button}>
          <View css={styles.buttonFlex}>
            <FontAwesome type="fas" name="angle-down" />
            <Text css={{ marginLeft: '10px' }}>{i18n.t('general.load_more')}</Text>
          </View>
        </Button>
      </Box.WithTitle>

      <Box.WithTitle borderWidth={0} css={styles.box} title="Recommended Apps">
        <RecommendCard
          description="Multi Currency With Checkout, Auto Detect Visitor Currency"
          title="Currency converter"
          image="https://cdn.shopify.com/app-store/listing_images/0534563571f4c9422064855cb4998289/icon/CObi+/Oxy/MCEAE=.png?height=72&width=72"
          rating={3}
          reviews={30}
        />

        <RecommendCard
          description="Email Popup, Shipping Bar, Win Wheel, Slide In"
          title="Popup, Smartbar"
          image="https://cdn.shopify.com/app-store/listing_images/5bd4346617010831df812b8cee144efb/icon/CL6g4Zu2u/QCEAE=.png?height=72&width=72"
        />

        <Button block color="primary" backgroundColor="gray5" radius={6} css={styles.button}>
          <View css={styles.buttonFlex}>
            <FontAwesome type="fas" name="angle-down" />
            <Text css={{ marginLeft: '10px' }}>{i18n.t('general.load_more')}</Text>
          </View>
        </Button>
      </Box.WithTitle>
    </View>
  );
};
