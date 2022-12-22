import scss from 'generate/scss/scss';
import { getCssFromLayoutSettings } from 'generate/utils/generateHelpers';
import { atomic } from 'mota-css';
import { useEffect, useState } from 'react';
import { globalThemeJsSelector } from 'store/global/globalThemeJs/slice';
import { globalThemeScssSelector } from 'store/global/globalThemeScss/slice';
import { themeVendorsSelector } from 'store/global/themeVendors/slice';
import { globalJsSelector, globalScssSelector, layoutSettingsSelector, vendorsSelector } from 'store/selectors';
import loadScript from 'utils/functions/loadScript';
import loadStyle from 'utils/functions/loadStyle';
import { sassCompile } from 'utils/functions/sass';
import { useIframeSelector } from './useIframeSelector';

const useGlobalCssAndJs = () => {
  const [vendorsLoaded, setVendorsLoaded] = useState(false);
  const [jsGlobalLoaded, setJsGlobalLoaded] = useState(false);
  const vendors = useIframeSelector(vendorsSelector);
  const themeVendors = useIframeSelector(themeVendorsSelector);
  const globalPageScss = useIframeSelector(globalScssSelector);
  const globalJs = useIframeSelector(globalJsSelector);
  const globalThemeScss = useIframeSelector(globalThemeScssSelector);
  const globalThemeJs = useIframeSelector(globalThemeJsSelector);
  const [cssGlobal, setCssGlobal] = useState('');
  const [cssPageGlobal, setCssPageGlobal] = useState('');
  const [cssThemeGlobal, setCssThemeGlobal] = useState('');
  const { containerWidth, containerGap, columnGapX, columnGapY } = useIframeSelector(layoutSettingsSelector);
  const [cssLayoutSettings, setCssLayoutSettings] = useState('');

  useEffect(() => {
    setCssLayoutSettings(getCssFromLayoutSettings(containerWidth, containerGap, columnGapX, columnGapY));
  }, [containerWidth, containerGap, columnGapX, columnGapY]);

  useEffect(() => {
    const handleVendors = async () => {
      try {
        await Promise.all([
          // NOTE: @tuong -> page sẽ được in vào body khi đẩy code lên shopify -> vendors sẽ nằm ở gần "<body>"
          ...vendors.map(vendor => {
            loadStyle({ file: vendor.css, insertPosition: 'afterbegin', id: `css_${vendor.id}`, element: document.body });
            return loadScript({ file: vendor.js, insertPosition: 'afterbegin', id: `js_${vendor.id}`, el: document.body });
          }),
          ...themeVendors.map(vendor => {
            loadStyle({ file: vendor.css, insertPosition: 'afterbegin', id: `css_theme_${vendor.id}` });
            return loadScript({ file: vendor.js, insertPosition: 'afterbegin', id: `js_theme_${vendor.id}` });
          }),
        ]);
      } catch (err) {
        console.log(err);
      } finally {
        setVendorsLoaded(true);
      }
    };
    handleVendors();
  }, [vendors, themeVendors]);

  useEffect(() => {
    if (vendorsLoaded) {
      loadScript({ content: `try { ${globalJs} } catch(err) { console.log(err) }`, id: 'builder-global-js' });
      loadScript({ content: `try { ${globalThemeJs} } catch(err) { console.log(err) }`, id: 'builder-global-theme-js' });
      atomic.find(globalJs);
      atomic.find(globalThemeJs);
      setJsGlobalLoaded(true);
    }
  }, [globalJs, globalThemeJs, vendorsLoaded]);

  useEffect(() => {
    const handleGlobalCss = async () => {
      const css = await sassCompile.client(scss);
      setCssGlobal(css);
    };
    handleGlobalCss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleGlobalPageCss = async () => {
      const css = await sassCompile.client(globalPageScss);
      setCssPageGlobal(css);
    };
    handleGlobalPageCss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalPageScss]);

  useEffect(() => {
    const handler = async () => {
      const css = await sassCompile.client(globalThemeScss);
      setCssThemeGlobal(css);
    };
    handler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalThemeScss]);

  return { vendorsLoaded, jsGlobalLoaded, cssGlobal, cssPageGlobal, cssLayoutSettings, cssThemeGlobal };
};

export default useGlobalCssAndJs;
