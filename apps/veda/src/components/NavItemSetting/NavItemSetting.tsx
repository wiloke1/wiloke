import Title from 'components/Title';
import { FC } from 'react';
import { FontAwesome, FontAwesomeBrandsName, FontAwesomeName, FontAwesomeType, View, ViewProps } from 'wiloke-react-core';
import NavItemSetting2 from './NavItemSetting2';
import NavItemSetting3 from './NavItemSetting3';
import * as styles from './styles';

export interface NavItemSettingProps<T extends FontAwesomeType = 'far'> {
  title: string;
  text?: string;
  iconType?: T;
  iconName?: T extends 'fab' ? FontAwesomeBrandsName : FontAwesomeName;
  active?: boolean;
  containerCss?: ViewProps['css'];
  contentCss?: ViewProps['css'];
}

const NavItemSetting: FC<NavItemSettingProps<FontAwesomeType>> & {
  Style2: typeof NavItemSetting2;
  Style3: typeof NavItemSetting3;
} = ({ title, iconType = 'far', iconName, text, active = false, containerCss, contentCss }) => {
  const renderLeft = iconName && (
    <FontAwesome
      type={iconType}
      name={iconName}
      size={20}
      color={active ? 'primary' : 'gray8'}
      css={{ marginRight: '10px', width: '26px', textAlign: 'center' }}
    />
  );

  return (
    <View css={[styles.container, containerCss]} backgroundColor={active ? 'gray2' : 'light'} backgroundColorHover="gray1">
      <Title
        title={title}
        text={text}
        Left={renderLeft}
        titleCss={({ colors }) => ({ color: active ? colors.primary : colors.gray8 })}
        css={contentCss}
      />
    </View>
  );
};

NavItemSetting.Style2 = NavItemSetting2;
NavItemSetting.Style3 = NavItemSetting3;

export default NavItemSetting;
