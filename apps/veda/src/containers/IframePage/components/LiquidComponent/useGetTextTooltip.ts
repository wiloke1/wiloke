import { useIframeSelector } from 'containers/IframePage/hooks/useIframeSelector';
import { useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { footerSectionsSelector, headerSectionsSelector, mainSectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PageSection } from 'types/Sections';
import getPageInfo from 'utils/functions/getInfo';
import { isDefault, isFooter, isHeader, isMain } from 'utils/functions/checkSectionType';

const defaultNext = i18n.t('builderPage.move_to.next');
const defaultPrev = i18n.t('builderPage.move_to.previous');

export const useGetTextTooltip = (section: PageSection) => {
  const main = useIframeSelector(mainSectionsSelector);
  const header = useIframeSelector(headerSectionsSelector);
  const footer = useIframeSelector(footerSectionsSelector);

  const [prevTitle, setPrevTitle] = useState(defaultPrev);
  const [nextTitle, setNextTitle] = useState(defaultNext);

  const themeId = getPageInfo('themeId');

  const getTextHeader = (headers: PageSection[], sectionId: string) => {
    const lastHeader = headers.at(-1);
    if (lastHeader && lastHeader.id === sectionId) {
      return {
        nextText: i18n.t('builderPage.move_to.main'),
        prevText: defaultPrev,
      };
    } else {
      return {
        nextText: defaultNext,
        prevText: defaultPrev,
      };
    }
  };

  const getTextMain = (mains: PageSection[], sectionId: string) => {
    if (mains.length === 1) {
      return {
        nextText: i18n.t('builderPage.move_to.footer'),
        prevText: i18n.t('builderPage.move_to.header'),
      };
    } else {
      const lastMain = mains.at(-1);
      const firstMain = mains.at(0);

      if (lastMain && lastMain.id === sectionId) {
        return {
          nextText: i18n.t('builderPage.move_to.footer'),
          prevText: defaultPrev,
        };
      } else if (firstMain && firstMain.id === sectionId) {
        return {
          nextText: defaultNext,
          prevText: i18n.t('builderPage.move_to.header'),
        };
      } else {
        return {
          nextText: defaultNext,
          prevText: defaultPrev,
        };
      }
    }
  };

  const getTextFooter = (footers: PageSection[], sectionId: string) => {
    const firstFooter = footers.at(0);
    if (firstFooter && firstFooter.id === sectionId) {
      return {
        prevText: i18n.t('builderPage.move_to.main'),
        nextText: defaultNext,
      };
    } else {
      return {
        prevText: defaultPrev,
        nextText: defaultNext,
      };
    }
  };

  useDeepCompareEffect(() => {
    // build theme
    if (!!themeId) {
      if (isHeader(section.type)) {
        const result = getTextHeader(header, section.id);
        setPrevTitle(result.prevText);
        setNextTitle(result.nextText);
      } else if (isFooter(section.type)) {
        const result = getTextFooter(footer, section.id);
        setPrevTitle(result.prevText);
        setNextTitle(result.nextText);
      } else if (isMain(section.type) || isDefault(section.type)) {
        const result = getTextMain(main, section.id);
        setPrevTitle(result.prevText);
        setNextTitle(result.nextText);
      } else {
        setPrevTitle(defaultPrev);
        setNextTitle(defaultNext);
      }
    }
  }, [[themeId], [section.id], main, header, footer]);

  return {
    prevTitle,
    nextTitle,
  };
};
