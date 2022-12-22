import { atomic } from 'mota-css';
import { FC } from 'react';
import { useDeepCompareEffect, useFavicon, useMount } from 'react-use';
import { liquidSnippetsSelector } from 'store/global/globalSnippets/sliceGlobalSnippets';
import { themeGeneralSettingsSelector } from 'store/selectors';
import { pmChildren } from 'utils/functions/postMessage';
import { Addons } from './components/AddonsNMegamenu/Addons';
import { Megamenus } from './components/AddonsNMegamenu/Megamenus';
import { Sections } from './components/Sections';
import { useIframeSelector } from './hooks/useIframeSelector';

/** Tại sao phải dùng useMount(liên quan đến code spliting):
 * - window thực chất đã onload khi vào trang Builder mà code splitting chưa được chạy do chưa mở trang Preview nên khi bấm nút preview tab mới được mở ra sẽ không chạy pmChildren.emit('@previewLoaded') nữa => trắng trang
 * */

const PreviewPage: FC = () => {
  const themeGeneralSettings = useIframeSelector(themeGeneralSettingsSelector);
  const liquidSnippets = useIframeSelector(liquidSnippetsSelector);

  useFavicon(themeGeneralSettings.favicon);

  useMount(() => {
    pmChildren.emit('@previewLoaded');
  });

  useDeepCompareEffect(() => {
    atomic.find(Object.values(liquidSnippets.data).join(''));
  }, [liquidSnippets]);

  // const handleWindowLoad = () => {
  //   pmChildren.emit('@previewLoaded');
  // };

  // useEffect(() => {
  //   window.addEventListener('load', handleWindowLoad);
  //   return () => {
  //     window.removeEventListener('load', handleWindowLoad);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <Sections forPreview />
      <Addons />
      <Megamenus />
    </>
  );
};

export default PreviewPage;
