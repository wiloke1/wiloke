import ScrollBars from 'components/ScrollBars';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createGlobalState } from 'react-use';
import { globalThemeJsSelector } from 'store/global/globalThemeJs/slice';
import { globalThemeScssSelector } from 'store/global/globalThemeScss/slice';
import { View, ViewProps } from 'wiloke-react-core';
import withDebounce from 'hocs/withDebounce';
import * as styles from '../styles';
import LayoutSettings from './LayoutSettings';
import ThemeGeneralSettings from './ThemeGeneralSettings';
import ThemeJs from './ThemeJs';
import ThemeFonts from './ThemeFonts';
import ThemeScss from './ThemeScss';
import ThemeVendors from './ThemeVendors';
import ThemeColors from './ThemeColors';
import ThemeJson from './ThemeJson';

export interface ThemeSettingsProps {
  keyActive: string;
  contentInnerCss?: ViewProps['css'];
  onChangeScss?: (value: string) => void;
  onChangeJs?: (value: string) => void;
}

const useGlobalJs = createGlobalState('');
const useGlobalScss = createGlobalState('');
const DebounceScss = withDebounce(ThemeScss, 'value', 'onChange');
const DebounceJs = withDebounce(ThemeJs, 'value', 'onChange');

const ThemeSettings: FC<ThemeSettingsProps> = ({ keyActive, contentInnerCss, onChangeJs, onChangeScss }) => {
  const [globalJsState, setGlobalJsState] = useGlobalJs();
  const [globalScssState, setGlobalScssState] = useGlobalScss();

  const globalThemeJs = useSelector(globalThemeJsSelector);
  const globalThemeScss = useSelector(globalThemeScssSelector);

  useEffect(() => {
    setGlobalJsState(globalThemeJs);
    setGlobalScssState(globalThemeScss);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    switch (keyActive) {
      case 'layout':
        return <LayoutSettings />;
      case 'general':
        return <ThemeGeneralSettings />;
      case 'vendors':
        return <ThemeVendors />;
      case 'scss':
        return (
          <DebounceScss
            value={globalScssState}
            onChange={value => {
              setGlobalScssState(value);
              onChangeScss?.(value);
            }}
          />
        );
      case 'js':
        return (
          <DebounceJs
            value={globalJsState}
            onChange={value => {
              setGlobalJsState(value);
              onChangeJs?.(value);
            }}
          />
        );
      case 'json':
        return <ThemeJson />;
      case 'fonts':
        return <ThemeFonts />;
      case 'colors':
        return <ThemeColors />;
      default:
        return null;
    }
  };

  return (
    <>
      <View css={styles.body}>
        {['scss', 'js', 'json'].includes(keyActive) ? (
          renderContent()
        ) : (
          <ScrollBars css={styles.content}>
            <View css={[{ padding: '20px' }, contentInnerCss]}>{renderContent()}</View>
          </ScrollBars>
        )}
      </View>
    </>
  );
};

export default ThemeSettings;
