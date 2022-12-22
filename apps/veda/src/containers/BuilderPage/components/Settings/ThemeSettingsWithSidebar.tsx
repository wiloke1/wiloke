import InlineMenu from 'components/InlineMenu';
import NavItemSetting from 'components/NavItemSetting';
import { FC, useState } from 'react';
import { View } from 'wiloke-react-core';
import { useSetGlobalThemeScss } from 'store/global/globalThemeScss/slice';
import { useSetGlobalThemeJs } from 'store/global/globalThemeJs/slice';
import { themeSettings } from './data';
import ThemeSettings from './ThemeSettings/ThemeSettings';
import * as styles from './styles';

export const ThemeSettingsWithSidebar: FC = () => {
  const [activeKey, setActiveKey] = useState(['general']);
  const setGlobalThemeScss = useSetGlobalThemeScss();
  const setGlobalThemeJs = useSetGlobalThemeJs();

  return (
    <View css={{ display: 'flex', height: '100%' }}>
      <InlineMenu
        onChange={setActiveKey}
        defaultItemIds={activeKey}
        width={300}
        containerCss={({ colors }) => ({ borderRight: `1px solid ${colors.gray3}` })}
      >
        {themeSettings.map(item => {
          return (
            <InlineMenu.Item key={item.value} width={300} itemId={item.value}>
              <NavItemSetting
                title={item.label}
                text={item.description}
                iconName={item.icon}
                iconType={item.iconType}
                active={activeKey.includes(item.value)}
                containerCss={styles.navItem}
              />
            </InlineMenu.Item>
          );
        })}
      </InlineMenu>

      <View css={{ width: 'calc(100% - 300px)', padding: '20px 0 20px 20px' }}>
        <ThemeSettings
          keyActive={activeKey[0]}
          onChangeScss={setGlobalThemeScss}
          onChangeJs={setGlobalThemeJs}
          contentInnerCss={{ padding: '0 20px 0 0' }}
        />
      </View>
    </View>
  );
};

export default ThemeSettingsWithSidebar;
