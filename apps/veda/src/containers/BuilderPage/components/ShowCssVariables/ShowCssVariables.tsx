import ScrollBars from 'components/ScrollBars';
import SimpleTabs from 'components/SimpleTabs';
import Tooltip from 'components/Tooltip';
import useTemplateDark from 'hooks/useTemplateDark';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { cssVariablesSelector } from 'store/selectors';
import { i18n } from 'translation';
import { CssColorVariable, CssFontVariable } from 'types/PresetStyles';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';

const ShowCssVariables: FC = () => {
  const cssVariables = useSelector(cssVariablesSelector);
  const [copied, setCopied] = useState(false);
  const [tabActive, setTabActive] = useState<'color' | 'rgb' | 'font'>('color');
  const isDark = useTemplateDark();

  const renderItem = (item: CssColorVariable | CssFontVariable, index: number) => {
    const name = tabActive === 'rgb' ? `rgba(var(${item.name.replace(/^--/g, '--rgb-')}), 1)` : `var(${item.name})`;
    return (
      <Tooltip
        key={item.id}
        text={copied ? i18n.t('general.copied') : i18n.t('general.click_to', { text: i18n.t('general.copy'), textTransform: 'capitalize' })}
        placement={index === 0 ? 'bottom' : 'top'}
        css={{ display: 'block', padding: '0 10px' }}
      >
        <View
          css={styles.row}
          onClick={() => {
            navigator.clipboard.writeText(name);
            setCopied(true);
          }}
          onMouseLeave={() => {
            setCopied(false);
          }}
        >
          <Text color="gray8" size={13}>
            {name}
          </Text>
          {tabActive === 'font' ? (
            <Text css={{ fontFamily: (item as CssFontVariable).value }} color="gray8">
              {i18n.t('general.typography')}
            </Text>
          ) : (
            <View css={styles.color((item as CssColorVariable)[isDark ? 'dark' : 'light'])} />
          )}
        </View>
      </Tooltip>
    );
  };

  return (
    <View css={styles.container}>
      <Text tagName="h5" style={{ padding: '10px', height: '30px' }}>
        {i18n.t('general.variables', { text: 'Css', textTransform: 'capitalize' })}
      </Text>
      <SimpleTabs
        data={[
          { label: i18n.t(isDark ? 'general.dark_colors' : 'general.light_colors'), value: 'color' },
          { label: i18n.t('general.rgb_colors'), value: 'rgb' },
          { label: i18n.t('general.fonts'), value: 'font' },
        ]}
        defaultValue="color"
        tabItemCss={() => styles.tabItem}
        tabCss={styles.tab}
        onChange={setTabActive}
      >
        {value => (
          <View css={{ height: 'calc(100vh - 152px)' }}>
            <ScrollBars>
              {value === 'color' && cssVariables.colors.map(renderItem)}
              {value === 'rgb' && cssVariables.colors.map(renderItem)}
              {value === 'font' && cssVariables.fonts.map(renderItem)}
            </ScrollBars>
          </View>
        )}
      </SimpleTabs>
    </View>
  );
};

export default ShowCssVariables;
