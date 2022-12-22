import useDelay from 'hooks/useDelay';
import { atomic } from 'mota-css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSetAppState } from 'store/actions/actionAppState';
import { themeAddonsSelector } from 'store/selectors';
import { domToImage } from 'utils/functions/domToImage';
import { pmChildren } from 'utils/functions/postMessage';
import { useSetIdClickActive } from '../actions/actionSectionToolbar';
import setScrollTo from '../setScrollTo';
import { useSetAddonsPositionStart } from '../store/sliceAddonsPositionStart';
import { removeCssAndJs } from '../utils';

const usePostMessage = () => {
  const setAddonsPositionStart = useSetAddonsPositionStart();
  const [delay, cancel] = useDelay();
  const setIdClickActive = useSetIdClickActive();
  const themeAddons = useSelector(themeAddonsSelector);
  const setAppState = useSetAppState();

  useEffect(() => {
    const off1 = pmChildren.on('@AppState', appState => {
      setAppState(appState);
    });
    const off4 = pmChildren.on('@section/dropdownOpen', async ({ sectionId }) => {
      await delay(300);
      if (!!sectionId) {
        setScrollTo(`[data-id="${sectionId}"]`);
      }
    });
    const off5 = pmChildren.on('@section/sectionIdActive', id => {
      setIdClickActive({ idClickActive: id });
    });
    const off14 = pmChildren.on('@section/delete', ({ sectionId }) => {
      removeCssAndJs(sectionId);
    });
    const off16 = pmChildren.on('@addonsPositionStart', ({ value, addonsSectionId }) => {
      setAddonsPositionStart({ value, addonsSectionId });
    });
    const off23 = pmChildren.on('@screenshot/request', async ({ uniqId }) => {
      const targetRatio = 350 / 400; // Height / Width
      const targetWidth = 350;
      const $pageRoot = document.querySelector('#iframe-root') as HTMLDivElement;
      if ($pageRoot) {
        const pageWidth = $pageRoot.offsetWidth;
        const pageHeight = Math.min(pageWidth * targetRatio, $pageRoot.offsetHeight);
        const scale = targetWidth / pageWidth;
        const size = { height: pageHeight, width: pageWidth };
        const imageBase64 = await domToImage('#iframe-root', { ...size, scale });
        pmChildren.emit('@screenshot/fulfill', {
          image: {
            src: imageBase64,
            width: size.width * scale,
            height: size.height * scale,
          },
          uniqId,
        });
      }
      pmChildren.emit('@screenshot/fulfill', {
        image: { src: '', width: 0, height: 0 },
        uniqId,
      });
    });
    const off24 = pmChildren.on('@atomicCss/request', async ({ uniqId }) => {
      pmChildren.emit('@atomicCss/fulfill', {
        uniqId,
        atomicCss: atomic.getCss(),
      });
    });

    return () => {
      off1();
      off4();
      off5();
      off14();
      off16();
      off23();
      off24();
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeAddons.data]);
};

export default usePostMessage;
