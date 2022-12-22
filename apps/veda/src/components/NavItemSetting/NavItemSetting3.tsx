import { FontAwesome, FontAwesomeBrandsName, FontAwesomeName, FontAwesomeType, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface NavItemSettingProps<T extends FontAwesomeType = 'far'> {
  title: string;
  iconType?: T;
  iconName?: T extends 'fab' ? FontAwesomeBrandsName : FontAwesomeName;
  active?: boolean;
  containerCss?: ViewProps['css'];
}

const NavItemSetting3 = <T extends FontAwesomeType>({
  title,
  iconType = 'far' as T,
  iconName,
  active = false,
  containerCss,
}: NavItemSettingProps<T>) => {
  const renderIcon = iconName && (
    <View backgroundColor={active ? 'primary' : 'gray2'} css={styles.icon3}>
      <FontAwesome type={iconType} name={iconName} size={20} color={active ? 'gray1' : 'gray8'} css={{ textAlign: 'center' }} />
    </View>
  );

  return (
    <View css={[styles.container3, containerCss]}>
      {renderIcon}
      <View fontFamily="secondary" css={styles.label(active)}>
        {title}
      </View>
    </View>
  );
};

export default NavItemSetting3;
