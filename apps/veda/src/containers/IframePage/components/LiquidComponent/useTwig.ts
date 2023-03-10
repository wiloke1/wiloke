import { useSectionIdCodeVisible } from 'containers/IframePage/globalState';
import { useIframeSelector } from 'containers/IframePage/hooks/useIframeSelector';
import {
  addAttrDataAddonsAndAddonContext,
  addAttrDataMegamenu,
  addAttrDataTag,
  addAttrVedaComponentIndex,
  handleErrorLiquidSyntaxToTwig,
} from 'containers/IframePage/utils';
import useDelay from 'hooks/useDelay';
import { atomic } from 'mota-css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { liquidSnippetsSelector } from 'store/global/globalSnippets/sliceGlobalSnippets';
import { THRESHOLD } from 'store/sagas/liquid/watchGetInitialOfLiquidVariables';
import { liquidVariablesSelector } from 'store/selectors';
import { getLocale } from 'translation';
import { PageSection } from 'types/Sections';
import { Consts } from 'utils/constants/constants';
import { isSectionAddons, isSectionMegamenu } from 'utils/functions/checkSectionType';
import { inlineCss } from 'utils/functions/InlineCss';
import loadStyle from 'utils/functions/loadStyle';
import { handleGetTwigScope, liquidSyntaxToTwig } from 'utils/LiquidSyntaxToTwig';

const getHtml = (value: string) => {
  let index = -1;
  const result = value.replace(new RegExp(`<${Consts.FakeTags.AddElement} \\/>`, 'g'), () => {
    index++;
    return `<${Consts.FakeTags.AddElement} index="${index}" />`;
  });
  return result.trim();
};

interface UseTwig {
  section: PageSection;
  addonScope?: ReturnType<typeof handleGetTwigScope>;
}

const { id_attributeName, signal_attributeName, signal_attributeValue, signal_needUpdate, tagName, hidden_css } = Consts.FakeTags.SignalRefreshJs;

const useTwig = ({ section, addonScope }: UseTwig) => {
  const isAddons = isSectionAddons(section.type);
  const isMegamenu = isSectionMegamenu(section.type);
  const { id, label, addonIds } = section;
  const { settings, liquid } = section.data;
  const [html, setHtml] = useState('');
  const {
    statusGetInitialOfLiquidVariables,
    blogSlugsLoaded,
    pageSlugsLoaded,
    productIdsLoaded,
    collectionIdsLoaded,
    translationLocalesLoaded,
    data,
  } = useIframeSelector(liquidVariablesSelector);
  const liquidSnippets = useIframeSelector(liquidSnippetsSelector);
  const locale = getLocale();
  const htmlCompiled = useRef('');
  const cssCompiled = useRef('');
  const [sectionIdCodeVisible] = useSectionIdCodeVisible();
  const codeVisible = useMemo(() => sectionIdCodeVisible === id, [id, sectionIdCodeVisible]);
  const [delayDebounce, cancelDebounce] = useDelay();
  const prevButton = useRef('');
  const prevTemplate = useRef('');

  const handleAsync = async () => {
    try {
      const twigScope = handleGetTwigScope({
        sectionSettings: settings,
        sectionId: id,
        variant: 'C???n shopify scope',
        builderMode: true,
        addonScope,
      });
      // Vi???c th??m attr ????? check nhi???u th??? kh??c (nh?? th??m addon v??o forloop, ...) -> C???n th??m v??o ngay c??? khi preview -> Mu???n xo?? th?? t???i LiquidComponent.tsx xo?? attribs c???a domNode ??i

      const _liquid = addAttrDataTag(addAttrDataMegamenu(addAttrDataAddonsAndAddonContext(liquid, isAddons, addonIds), isMegamenu));
      const css = inlineCss.getCssFromSettings(settings);
      const twig = inlineCss.handleLiquid(
        // C???n x??? l?? sau khi liquidSyntaxToTwig b???i ch???y tr?????c s??? kh??ng add ???????c v??o trong liquid snippet
        addAttrVedaComponentIndex(
          liquidSyntaxToTwig({
            liquid: _liquid,
            settings,
            variant: isAddons ? 'addon -> c???n compile' : isMegamenu ? 'megamenu -> c???n compile' : 'section -> compile navigation',
          }),
        ),
        settings,
      );

      // X??? l?? twig t???ng th???
      const result = window.Twig.twig({ data: twig, rethrow: true });
      const compiled = result.render(twigScope);
      const html = getHtml(compiled);
      htmlCompiled.current = html;
      cssCompiled.current = css;
      if (!!cssCompiled.current) {
        loadStyle({ content: cssCompiled.current, id: `inline_${id}` });
      }
      if (prevTemplate.current !== liquid) {
        const button = `<${tagName} style="${hidden_css}" ${signal_attributeName}="${signal_attributeValue(
          id,
        )}" ${id_attributeName}="${id}" ${signal_needUpdate}="${new Date().toString()}">SignalRefreshJs</${tagName}>`;
        setHtml(`
        ${htmlCompiled.current}
        ${button}
      `);
        prevButton.current = button;
        prevTemplate.current = liquid;
      } else {
        setHtml(`
        ${htmlCompiled.current}
        ${prevButton.current}
      `);
        prevTemplate.current = liquid;
      }
    } catch (err) {
      await delayDebounce(THRESHOLD);
      setHtml(
        handleErrorLiquidSyntaxToTwig({
          err: err,
          sectionName: label,
          id,
        }),
      );
    }
  };

  useEffect(() => {
    // Thay v?? t??m html th?? ta s??? chuy???n sang t??m liquid
    // L?? do l?? kh??ng ch??i n???i chu???i class mota n???a
    atomic.find(liquid);
  }, [liquid]);

  useDeepCompareEffect(() => {
    handleAsync();
    return () => {
      cancelDebounce();
    };
  }, [
    statusGetInitialOfLiquidVariables,
    blogSlugsLoaded,
    pageSlugsLoaded,
    productIdsLoaded,
    collectionIdsLoaded,
    translationLocalesLoaded,
    addonScope,
    settings,
    addonIds,
    data.translations[locale],
    [codeVisible, id, liquid, isAddons, locale],
    liquidSnippets,
  ]);

  return {
    html,
  };
};

export default useTwig;
