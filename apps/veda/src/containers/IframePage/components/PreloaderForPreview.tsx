import useDelay from 'hooks/useDelay';
import parse from 'html-react-parser';
import { FC, useEffect, useState } from 'react';
import { themeGeneralSettingsSelector } from 'store/selectors';
import { getPreloader } from 'utils/functions/getPreloader';
import { useIframeSelector } from '../hooks/useIframeSelector';

export interface PreloaderForPreviewProps {}

const PreloaderForPreview: FC<PreloaderForPreviewProps> = () => {
  const themeGeneralSettings = useIframeSelector(themeGeneralSettingsSelector);
  const [loading, setLoading] = useState(true);
  const { html: preloaderHtml } = getPreloader(themeGeneralSettings);
  const [delay, cancel] = useDelay();

  const handleWindowLoaded = async () => {
    await delay(2000);
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener('load', handleWindowLoaded);
    return () => {
      cancel();
      window.removeEventListener('load', handleWindowLoaded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{parse(loading ? preloaderHtml : preloaderHtml.replace(/veda-preloader"/g, 'veda-preloader veda-preloader--done"'))}</>;
};

export default PreloaderForPreview;
