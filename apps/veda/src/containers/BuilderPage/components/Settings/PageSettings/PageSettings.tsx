import { CodeEditor } from 'components/CodeEditor/CodeEditor';
import { GoogleFonts } from 'components/FontField/FontField';
import ScrollBars from 'components/ScrollBars';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createGlobalState } from 'react-use';
import { globalJsSelector, globalScssSelector } from 'store/selectors';
import { View } from 'wiloke-react-core';
import * as styles from '../styles';
import GeneralSettings from './GeneralSettings';
import ImportFile from './ImportFile';
import PageVendors from './PageVendors';

export interface CssColorVariable {
  id: string;
  name: string;
  value: string;
}

export interface CssFontVariable {
  id: string;
  name: string;
  value: GoogleFonts;
}

export interface PageSettingsProps {
  keyActive: string;
  onChangeScss?: (value: string) => void;
  onChangeJs?: (value: string) => void;
}

const useGlobalJs = createGlobalState('');
const useGlobalScss = createGlobalState('');

const PageSettings: FC<PageSettingsProps> = ({ keyActive, onChangeJs, onChangeScss }) => {
  const globalScss = useSelector(globalScssSelector);
  const globalJs = useSelector(globalJsSelector);
  const [globalJsState, setGlobalJsState] = useGlobalJs();
  const [globalScssState, setGlobalScssState] = useGlobalScss();

  useEffect(() => {
    setGlobalJsState(globalJs);
    setGlobalScssState(globalScss);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderVendors = (
    <ScrollBars css={styles.content}>
      <PageVendors />
    </ScrollBars>
  );

  const renderCode = (
    <View css={[styles.content, { height: '100%' }]}>
      {keyActive === 'scss' && (
        <CodeEditor
          id="scss"
          language="scss"
          value={globalScssState}
          onChange={value => {
            setGlobalScssState(value ?? '');
            onChangeScss?.(value ?? '');
          }}
        />
      )}
      {keyActive === 'js' && (
        <CodeEditor
          id="js"
          language="javascript"
          value={globalJsState}
          onChange={value => {
            setGlobalJsState(value ?? '');
            onChangeJs?.(value ?? '');
          }}
        />
      )}
      {keyActive === 'general' && (
        <ScrollBars css={styles.content}>
          <GeneralSettings />
        </ScrollBars>
      )}
      {keyActive === 'import' && <ImportFile />}
    </View>
  );

  return <View css={styles.body}>{keyActive === 'vendors' ? renderVendors : renderCode}</View>;
};

export default PageSettings;
