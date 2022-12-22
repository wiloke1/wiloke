import { FC } from 'react';
import getPageInfo from 'utils/functions/getInfo';
import { Styles, Text, Theme, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface LayoutSettingsSimulatorProps {
  containerWidth: number;
  containerGap: number;
  columnGapVertical: number;
  columnGapHorizontal: number;
}

const LayoutSettingsSimulator: FC<LayoutSettingsSimulatorProps> = ({ containerWidth, containerGap, columnGapHorizontal, columnGapVertical }) => {
  const windowWidth = Math.min(window.innerWidth, 1500);
  const containerWidthPercent = Math.min((containerWidth / windowWidth) * 100, 100);
  const containerGapPercent = (containerGap / windowWidth) * 100;
  const columnGapHorizontalPercent = (columnGapHorizontal / windowWidth) * 100;
  const columnGapVerticalPercent = (columnGapVertical / windowWidth) * 100;
  const itemStyles: Styles = {
    width: '25%',
    paddingLeft: `${columnGapHorizontalPercent / 2}%`,
    paddingRight: `${columnGapHorizontalPercent / 2}%`,
    paddingTop: `${columnGapVerticalPercent}%`,
  };
  const rowStyles: Styles = {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: `-${columnGapHorizontalPercent / 2}%`,
    marginRight: `-${columnGapHorizontalPercent / 2}%`,
  };
  const containerStyles = ({ colors }: Theme): Styles => ({
    width: `${containerWidthPercent}%`,
    margin: '5px auto',
    backgroundColor: `rgba(${colors.rgbDanger}, 0.2)`,
    paddingLeft: `${containerGapPercent / 2}%`,
    paddingRight: `${containerGapPercent / 2}%`,
  });
  const shop = getPageInfo('shop');

  return (
    <View css={styles.browser}>
      <View css={styles.header}>
        <View backgroundColor="gray3" radius={4} css={{ padding: '2px', textAlign: 'center' }}>
          <Text size={10}>{shop}</Text>
        </View>
      </View>
      <View css={containerStyles}>
        <View backgroundColor="gray2" css={{ width: `100%` }}>
          <Text css={[styles.text, { paddingTop: '20px' }]}>Container</Text>
          <View css={rowStyles}>
            <View css={[itemStyles, { width: '100%' }]}>
              <View
                css={{
                  position: 'relative',
                }}
                aspectRatioInPercent={20}
                backgroundColor="gray3"
              >
                <Text css={[styles.text, styles.item]}>Col</Text>
              </View>
            </View>
          </View>
          <View css={rowStyles}>
            {[1, 2, 3].map(item => (
              <View key={item} css={[itemStyles, { width: '33.3333%' }]}>
                <View
                  css={{
                    position: 'relative',
                  }}
                  aspectRatioInPercent={100}
                  backgroundColor="gray3"
                >
                  <Text css={[styles.text, styles.item]}>Col</Text>
                </View>
              </View>
            ))}
          </View>
          <View css={rowStyles}>
            {[1, 2, 3, 4].map(item => (
              <View key={item} css={itemStyles}>
                <View
                  css={{
                    position: 'relative',
                  }}
                  aspectRatioInPercent={100}
                  backgroundColor="gray3"
                >
                  <Text css={[styles.text, styles.item]}>Col</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default LayoutSettingsSimulator;
