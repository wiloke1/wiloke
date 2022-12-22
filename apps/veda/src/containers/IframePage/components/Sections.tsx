import FooterPlaceholder from 'components/FooterPlaceholder';
import HeaderPlaceholder from 'components/HeaderPlaceholder';
import LinkFont from 'components/LinkFont';
import { getCssColorVariables, getCssFontVariables } from 'generate/utils/generateHelpers';
import { FC, memo, useEffect } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { sliceSectionIdHover } from 'store/global/sectionIdHover/slice';
import { cssVariablesSelector, generalSettingsSelector, liquidVariablesSelector, pageSectionsSelector, themeAddonsSelector } from 'store/selectors';
import { isSectionAddons, isSectionMegamenu } from 'utils/functions/checkSectionType';
import getPageInfo from 'utils/functions/getInfo';
import loadStyle from 'utils/functions/loadStyle';
import { Space, View } from 'wiloke-react-core';
import useGlobalCssAndJs from '../hooks/useGlobalJsAndCss';
import { useIframeDispatch } from '../hooks/useIframeDispatch';
import { useIframeSelector } from '../hooks/useIframeSelector';
import { useListenCodeVisibleSectionId } from '../hooks/useListenCodeVisibleSectionId';
import useLoading from '../hooks/useLoading';
import usePostMessage from '../hooks/usePostMessage';
import { useSetAtomicCss } from '../hooks/useSetAtomicCss';
import useThemeDark from '../hooks/useThemeDark';
import '../setAtomicCssConfig';
import AddonsPosition from './AddonsPosition/AddonsPosition';
import LiquidComponent from './LiquidComponent';
import PreloaderForPreview from './PreloaderForPreview';
import { SectionLoading } from './SectionLoading/SectionLoading';

export interface SectionsProps {
  forPreview?: boolean;
}

const SectionsComponent: FC<SectionsProps> = ({ forPreview = false }) => {
  const cssVariables = useIframeSelector(cssVariablesSelector);
  const liquidVariables = useIframeSelector(liquidVariablesSelector);
  const themeAddons = useIframeSelector(themeAddonsSelector);
  const { headerFooterEnabled } = useIframeSelector(generalSettingsSelector);
  const themeId = getPageInfo('themeId');
  const { jsGlobalLoaded, vendorsLoaded, cssGlobal, cssPageGlobal, cssThemeGlobal, cssLayoutSettings } = useGlobalCssAndJs();
  const themeAddonsPositionEnabledSectionId = themeAddons.data.filter(addon => addon.positionEnabled).map(item => item.sectionId);
  const sections = useIframeSelector(pageSectionsSelector);
  const iframeDispatch = useIframeDispatch();

  usePostMessage();
  useLoading(!vendorsLoaded, forPreview);
  useSetAtomicCss();
  useThemeDark();
  useListenCodeVisibleSectionId();

  useDeepCompareEffect(() => {
    loadStyle({
      id: 'cssVarialbes',
      content: `:root { ${getCssColorVariables(cssVariables.colors, false)}${getCssColorVariables(
        cssVariables.colors,
        false,
        true,
      )}${getCssFontVariables(cssVariables.fonts)} } :root.dark { ${getCssColorVariables(cssVariables.colors, true)} }`,
    });
  }, [cssVariables]);

  useEffect(() => {
    loadStyle({
      id: 'cssLayoutSettings',
      content: cssLayoutSettings,
    });
  }, [cssLayoutSettings]);

  useEffect(() => {
    loadStyle({
      id: 'cssThemeGlobal',
      content: cssThemeGlobal,
    });
  }, [cssThemeGlobal]);

  useEffect(() => {
    loadStyle({
      id: 'cssGlobal',
      content: cssGlobal,
    });
  }, [cssGlobal]);

  useEffect(() => {
    loadStyle({
      id: 'cssPageGlobal',
      content: cssPageGlobal,
    });
  }, [cssPageGlobal]);

  useEffect(() => {
    if (liquidVariables.data.themeCss) {
      // NOTE: @tuong -> "ĐA SỐ" các theme file css base của theme sẽ nằm gần "</head>"
      loadStyle({ file: liquidVariables.data.themeCss, id: 'THEME_CSS', insertPosition: 'afterbegin' });
    }
  }, [liquidVariables.data.themeCss]);

  const renderSections = () => {
    if (!jsGlobalLoaded) {
      return null;
    }
    return sections.map((section, index) => {
      if (
        !section?.enable ||
        isSectionMegamenu(section.type) ||
        // Nếu là addons và addons đó thuộc dạng cần đặt position
        (isSectionAddons(section.type) && themeAddonsPositionEnabledSectionId.includes(section.id))
      ) {
        return null;
      }

      const isNeedShopifyData = !!(section.data.settings ?? []).find(setting => {
        if (
          setting.type === 'blogPicker' ||
          setting.type === 'articlePicker' ||
          setting.type === 'productPicker' ||
          setting.type === 'collectionPicker'
        ) {
          return true;
        }
        if (setting.type === 'object') {
          return (setting.children ?? []).find(childOfItem => {
            if (
              childOfItem.type === 'blogPicker' ||
              childOfItem.type === 'articlePicker' ||
              childOfItem.type === 'productPicker' ||
              childOfItem.type === 'collectionPicker'
            ) {
              return true;
            }
            return false;
          });
        }
        if (setting.type === 'array') {
          return (setting.children ?? []).find(arrayItem => {
            return (arrayItem.children ?? []).find(fieldOfArrayItem => {
              if (
                fieldOfArrayItem.type === 'blogPicker' ||
                fieldOfArrayItem.type === 'articlePicker' ||
                fieldOfArrayItem.type === 'productPicker' ||
                fieldOfArrayItem.type === 'collectionPicker'
              ) {
                return true;
              }
              return false;
            });
          });
        }
      });

      if (liquidVariables.statusGetInitialOfLiquidVariables !== 'success' && isNeedShopifyData) {
        return <SectionLoading key={section.id} />;
      }

      return <LiquidComponent key={section.id} index={index} section={section} />;
    });
  };

  const renderSectionsForIframe = () => {
    return (
      <>
        {jsGlobalLoaded && <AddonsPosition />}
        <View
          id="iframe-root"
          onMouseLeave={() => {
            // Xoá id hover khi hover ra ngoài iframe
            iframeDispatch(sliceSectionIdHover.actions.setSectionIdHover(''));
          }}
        >
          {themeId === '' ? headerFooterEnabled && <HeaderPlaceholder /> : null}
          {renderSections()}
          {themeId === '' ? headerFooterEnabled && <FooterPlaceholder /> : null}
        </View>
        {!headerFooterEnabled && !!sections.length && <Space size={50} />}
      </>
    );
  };

  const renderSectionsForPreview = () => {
    return (
      <>
        <PreloaderForPreview />
        {renderSections()}
      </>
    );
  };

  return (
    <>
      {forPreview ? renderSectionsForPreview() : renderSectionsForIframe()}
      {cssVariables.fonts.map(font => (
        <LinkFont key={font.id} fontFamily={font.value} />
      ))}
    </>
  );
};

export const Sections = memo(SectionsComponent);
// SectionsComponent.whyDidYouRender = {};
