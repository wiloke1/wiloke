import { CodeEditor } from 'components/CodeEditor/CodeEditor';
import { PublishStepLoadingComponent } from 'components/PublishStepLoading';
import ModalAppSettings from 'containers/ModalAppSettings/ModalAppSettings';
import { preloaderCssForBuilder } from 'generate/plugins/preloader/preloader.css';
import useTemplateDark from 'hooks/useTemplateDark';
import { FC, useState } from 'react';
import { Helmet } from 'react-helmet';
import styleBase from 'styles/base';
import { ThemeProvider, useStyleSheet, View } from 'wiloke-react-core';
import * as css from './styles';
import { themeOverrides } from './themeOverrides';

const isIframe = window.location.pathname === '/iframe';
const isIframeAndPreview = /\/(iframe|preview)/g.test(window.location.pathname);

export const CSSGlobal: FC = ({ children }) => {
  const { renderer } = useStyleSheet();

  if (isIframe) {
    return (
      <View>
        {children}
        <Helmet>
          <style>{preloaderCssForBuilder}</style>
        </Helmet>
      </View>
    );
  }

  if (!isIframeAndPreview) {
    renderer.renderStatic(styleBase);
  }

  return (
    <View css={isIframeAndPreview ? {} : css.cssGlobalWithTheme}>
      {children}
      <Helmet>
        <style>{preloaderCssForBuilder}</style>
      </Helmet>
    </View>
  );
};

const AppContent: FC = ({ children }) => {
  const [codeEditorLoaded, setCodeEditorLoaded] = useState(false);
  useTemplateDark();

  // Cho load trước core của monaco editor
  // Để đảm bảo khi bấm vào code sẽ nhanh hơn
  const renderEditor = () => {
    if (isIframeAndPreview || codeEditorLoaded) {
      return null;
    }
    return (
      <View css={{ width: '0px', height: '0px', overflow: 'hidden', opacity: 0 }}>
        <CodeEditor id="prefetch" value="" language="liquid" onLoaded={() => setCodeEditorLoaded(true)} />
      </View>
    );
  };

  return (
    <ThemeProvider themeOverrides={{ ...themeOverrides, direction: 'ltr' }}>
      {renderEditor()}
      <CSSGlobal>{children}</CSSGlobal>
      <ModalAppSettings />
      <PublishStepLoadingComponent />
    </ThemeProvider>
  );
};

export default AppContent;
