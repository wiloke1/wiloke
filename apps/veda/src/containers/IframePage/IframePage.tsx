import { FC, useEffect } from 'react';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmChildren } from 'utils/functions/postMessage';
import useDelay from 'hooks/useDelay';
import { useSetIsIframeScrolling } from 'store/global/isIframeScrolling/sliceIsIframeScrolling';
import { atomic } from 'mota-css';
import { liquidSnippetsSelector } from 'store/global/globalSnippets/sliceGlobalSnippets';
import { useDeepCompareEffect } from 'react-use';
import { Addons } from './components/AddonsNMegamenu/Addons';
import { Megamenus } from './components/AddonsNMegamenu/Megamenus';
import PreloaderTesting from './components/PreloaderTesting';
import { RedirectToHooks } from './components/RedirectToHooks';
import { Sections } from './components/Sections';
import { SettingsHooks } from './components/SettingsHooks';
import { useIframeSelector } from './hooks/useIframeSelector';
import setScrollTo from './setScrollTo';

// Tại sao lại chuyển window onload ra ngoài
// - Do bên trình duyệt firefox bằng 1 cách nào đó không nhận window onload ở bên trong useEffect
if (window.location.pathname.includes('/iframe')) {
  window.addEventListener('load', () => {
    pmChildren.emit('@PostmessageOfIframeReady');
  });
}

const STOP_SCROLLING_TIME = 300;

const IframePage: FC = () => {
  const sectionIdActive = useIframeSelector(sectionIdActiveSelector);
  const [delay, cancel] = useDelay();
  const setIsIframeScrolling = useSetIsIframeScrolling();
  const liquidSnippets = useIframeSelector(liquidSnippetsSelector);

  useDeepCompareEffect(() => {
    atomic.find(Object.values(liquidSnippets.data).join(''));
  }, [liquidSnippets]);

  useEffect(() => {
    const handleScroll = async () => {
      setIsIframeScrolling(true);
      cancel();
      await delay(STOP_SCROLLING_TIME);
      setIsIframeScrolling(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!sectionIdActive) {
      setScrollTo(`[data-id="${sectionIdActive}"]`);
    }
  }, [sectionIdActive]);

  return (
    <>
      <Sections />
      <Addons />
      <Megamenus />
      {/* NOTE: @tuong -> khi đẩy lên shopify preloader sẽ ở cuối các sections gần "</body>" */}
      <PreloaderTesting />
      <SettingsHooks />
      <RedirectToHooks />
    </>
  );
};

export default IframePage;
