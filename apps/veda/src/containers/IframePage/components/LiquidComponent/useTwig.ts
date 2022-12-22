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
        variant: 'Cần shopify scope',
        builderMode: true,
        addonScope,
      });
      // Việc thêm attr để check nhiều thứ khác (như thêm addon vào forloop, ...) -> Cần thêm vào ngay cả khi preview -> Muốn xoá thì tại LiquidComponent.tsx xoá attribs của domNode đi

      const _liquid = addAttrDataTag(addAttrDataMegamenu(addAttrDataAddonsAndAddonContext(liquid, isAddons, addonIds), isMegamenu));
      const css = inlineCss.getCssFromSettings(settings);
      const twig = inlineCss.handleLiquid(
        // Cần xử lý sau khi liquidSyntaxToTwig bởi chạy trước sẽ không add được vào trong liquid snippet
        addAttrVedaComponentIndex(
          liquidSyntaxToTwig({
            liquid: _liquid,
            settings,
            variant: isAddons ? 'addon -> cần compile' : isMegamenu ? 'megamenu -> cần compile' : 'section -> compile navigation',
          }),
        ),
        settings,
      );

      // Xử lí twig tổng thể
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
    // Thay vì tìm html thì ta sẽ chuyển sang tìm liquid
    // Lý do là không chơi nối chuỗi class mota nữa
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
