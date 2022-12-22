import { FC } from 'react';
import { ColorNames, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface VedaLoadingItemProps extends Pick<ViewProps, 'nightModeBlacklist' | 'className'> {
  /** Kích thước của component */
  size?: number;
  /** Color của component theo ThemeProvider */
  color?: ColorNames;
}

export const VedaLoadingItem: FC<VedaLoadingItemProps> = ({ size = 80, color = 'primary', nightModeBlacklist, ...rest }) => {
  return (
    <View {...rest} css={styles.container} nightModeBlacklist={nightModeBlacklist}>
      <View css={styles.indicator(size)} nightModeBlacklist={nightModeBlacklist}>
        <View css={styles.item(size)} color={color} nightModeBlacklist={nightModeBlacklist}>
          <View css={styles.itemChild} />
        </View>
      </View>
      <View css={styles.svg(size)}>
        <svg width="100%" viewBox="0 0 1750 942" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1443.86 0C1593.94 0 1711.24 89.7036 1749.19 129.378L1247.2 626.189C1185.2 690.887 1107.48 771.095 1014.32 848.719C941.872 910.821 824.338 944.351 740.042 941.872C564.088 936.697 486.461 869.42 382.959 771.093C274.888 663.022 161.549 539.32 89.1918 466.969C146.658 524.333 270.317 640.265 434.71 636.529C672.766 631.119 807.319 455.41 900.471 362.258C947.857 314.872 1112.65 134.553 1185.1 82.8019C1289.71 8.08531 1402.97 0 1443.86 0Z"
            fill="#D755E2"
          />
          <path
            d="M305.332 258.756C155.254 258.756 37.9509 338.108 0 377.784L243.231 626.189C305.234 690.889 382.959 776.268 476.111 853.895C543.388 909.958 655.746 944.351 740.042 941.872C915.996 936.696 993.623 879.77 1102.3 771.093C1220.74 657.8 1334.21 539.111 1406.56 466.829C1349.03 524.208 1215.08 645.454 1050.55 641.715C812.494 636.304 750.392 522.687 595.139 372.608C510.781 291.063 396.036 258.756 305.332 258.756Z"
            fill="#3DB8FD"
            style={{ mixBlendMode: 'multiply' }}
          />
        </svg>
      </View>
    </View>
  );
};
