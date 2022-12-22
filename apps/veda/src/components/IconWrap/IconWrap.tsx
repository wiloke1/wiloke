import { FC } from 'react';
import { ColorNames, FontAwesome, FontAwesomeName, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface IconWrapProps extends ViewProps {
  iconName: FontAwesomeName;
  iconSize: number;
  iconColor: ColorNames;
}

const IconWrap: FC<IconWrapProps> = ({ iconName, iconSize, iconColor, children, css, ...rest }) => {
  return (
    <View {...rest} css={[styles.container, css]}>
      <FontAwesome type="far" name={iconName} size={iconSize} color={iconColor} css={styles.icon} />
      {children}
    </View>
  );
};

export default IconWrap;
