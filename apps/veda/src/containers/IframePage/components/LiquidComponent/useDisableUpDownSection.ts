import { useIframeSelector } from 'containers/IframePage/hooks/useIframeSelector';
import { useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { mainSectionsSelector, headerSectionsSelector, footerSectionsSelector } from 'store/selectors';

import getPageInfo from 'utils/functions/getInfo';

export const useDisableUpDownSection = (sectionId: string) => {
  const main = useIframeSelector(mainSectionsSelector);
  const header = useIframeSelector(headerSectionsSelector);
  const footer = useIframeSelector(footerSectionsSelector);

  const themeId = getPageInfo('themeId');

  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);

  useDeepCompareEffect(() => {
    // build page
    if (!themeId) {
      if (main.length === 1) {
        setDisabledPrev(true);
        setDisabledNext(true);
      } else {
        const lastMain = main.at(-1);
        const firstMain = main.at(0);

        if (lastMain && lastMain.id === sectionId) {
          setDisabledNext(true);
          setDisabledPrev(false);
        } else if (firstMain && firstMain.id === sectionId) {
          setDisabledPrev(true);
          setDisabledNext(false);
        } else {
          setDisabledNext(false);
          setDisabledPrev(false);
        }
      }
    }
    // build theme
    else {
      const lastFooter = footer.at(-1);
      const firstHeader = header.at(0);

      if (lastFooter && lastFooter.id === sectionId) {
        setDisabledNext(true);
        setDisabledPrev(false);
      } else if (firstHeader && firstHeader.id === sectionId) {
        setDisabledPrev(true);
        setDisabledNext(false);
      } else {
        setDisabledNext(false);
        setDisabledPrev(false);
      }
    }
  }, [[themeId], [sectionId], main, header, footer]);

  return {
    disabledPrev,
    disabledNext,
  };
};
