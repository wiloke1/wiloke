import parse from 'html-react-parser';
import { FC } from 'react';
import { preloaderTestingSelector, themeGeneralSettingsSelector } from 'store/selectors';
import { getPreloader } from 'utils/functions/getPreloader';
import { useIframeSelector } from '../hooks/useIframeSelector';

const PreloaderTesting: FC = () => {
  const themeGeneralSettings = useIframeSelector(themeGeneralSettingsSelector);
  const preloaderTesting = useIframeSelector(preloaderTestingSelector);

  const { html: preloaderHtml } = getPreloader(themeGeneralSettings);

  return <>{parse(preloaderTesting ? preloaderHtml : preloaderHtml.replace(/veda-preloader"/g, 'veda-preloader veda-preloader--done"'))}</>;
};

export default PreloaderTesting;
