import { useSetSectionRenderStatus } from 'containers/IframePage/actions/actionSectionsRenderStatus';
import useDelay from 'hooks/useDelay';
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import { equals } from 'ramda';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { iframeSelectors } from 'store/selectors';
import { i18n } from 'translation';
import { PageSection } from 'types/Sections';
import { Consts } from 'utils/constants/constants';
import { isSectionAddonsOrMegamenu } from 'utils/functions/checkSectionType';
import { pmChildren } from 'utils/functions/postMessage';
import strFirstLetter from 'utils/functions/strFirstLetter';
import { styleInlineCleanupForHtml } from 'utils/functions/styleInlineCleanupForHtml';
import { isPreviewPage } from 'utils/isPreviewPage';
import { handleGetTwigScope } from 'utils/LiquidSyntaxToTwig';
import { useSectionIdCodeVisible } from '../../globalState';
import { ButtonPlus } from '../AddonsPosition/ButtonPlus';
import ButtonEditCode from '../ButtonEditCode/ButtonEditCode';
import AtomComponent from './AtomComponent';
import ScriptTag from './ScriptTag';
import SectionComponent from './SectionComponent';
import useCss from './useCss';
import useJs from './useJs';
import useTwig from './useTwig';

export interface LiquidComponentProps {
  index: number;
  section: PageSection;
  addonScope?: ReturnType<typeof handleGetTwigScope>;
}
export type RenderHtmlStatus = 'initial' | 'ready' | 'rendering' | 'rendered';
type DomNode = any;

const LiquidComponent: FC<LiquidComponentProps> = ({ section, index, addonScope = {} }) => {
  const { id, label, type, data } = section;
  const { scss = '' } = data;
  const [elementAdded, setElementAdded] = useState(false);
  const [delay, cancel] = useDelay();
  // Để đảm bảo DOM đã được render -> dùng cho việc chèn js tại useJs
  const [renderHtmlStatus, setRenderHtmlStatus] = useState<RenderHtmlStatus>('initial');

  const [codeVisible] = useSectionIdCodeVisible();
  const addonsPositionStart = useSelector(iframeSelectors.addonsPositionStart);

  const setSectionRenderStatus = useSetSectionRenderStatus();

  // TODO: Có thể sẽ loading cho section
  const { html } = useTwig({
    section,
    addonScope,
  });

  const rerender = useJs({
    section,
    elementAdded,
    renderHtmlStatusIsRendered: renderHtmlStatus === 'rendered',
    onLoad: () => setRenderHtmlStatus('ready'),
    codeVisible: codeVisible === id,
  });

  useCss(scss, id);

  const htmlReactParseOptions: HTMLReactParserOptions = useMemo(
    () => {
      return {
        replace: (domNode: DomNode) => {
          if (domNode.type === 'tag') {
            const dataId = domNode.attribs['data-id'];
            const componentIndexInLoop = Number(domNode.attribs['veda-component-index']);
            const component = domNode.attribs['component'];
            // NOTE: @tuong -> đọc comment tại src/containers/IframePage/components/LiquidComponent/useTwig.ts (thêm các veda attr vào DOM để check) -> cái này để làm đẹp dom bấm preview
            if (codeVisible || isPreviewPage()) {
              delete domNode.attribs['veda-component-index'];
              delete domNode.attribs['veda-length-of-loop'];
              delete domNode.attribs['veda-open-tag'];
              delete domNode.attribs['veda-index-boc'];
            }
            // Chỉ cần cleanup tại builder nếu không sẽ có lỗi 1 số trường hợp khi react parse html
            // Ví dụ: style="padding-top: 10px" sau đó set lại style="padding-top: px" tức là giá trị undefined
            // Khi này react parse html sẽ vẫn hiển thị là 10px
            if (domNode.attribs.style) {
              domNode.attribs.style = styleInlineCleanupForHtml(domNode.attribs.style);
            }
            if (dataId === id) {
              return (
                <SectionComponent
                  section={section}
                  index={index}
                  name={label}
                  domNode={domNode}
                  htmlReactParseOptions={htmlReactParseOptions}
                  rerender={rerender}
                />
              );
            }
            if (domNode.name === Consts.FakeTags.Shopify || domNode.name === Consts.FakeTags.Compiler) {
              return <>{domToReact(domNode.children, htmlReactParseOptions)}</>;
            }
            if ([Consts.FakeTags.EditCode, Consts.FakeTags.AddElement].includes(domNode.name)) {
              return (
                <ButtonEditCode
                  type={domNode.name}
                  onClick={async () => {
                    if (domNode.name === Consts.FakeTags.EditCode) {
                      pmChildren.emit('@section/editCode', { id });
                    } else if (domNode.name === Consts.FakeTags.AddElement) {
                      pmChildren.emit('@component/openModalAddElement', {
                        sectionId: id,
                        elementIndex: Number(domNode.attribs.index),
                      });
                      setElementAdded(true);
                    }
                  }}
                />
              );
            }
            if (!!component) {
              return (
                <AtomComponent
                  section={section}
                  index={isNaN(componentIndexInLoop) ? -1 : componentIndexInLoop}
                  domNode={domNode}
                  htmlReactParseOptions={htmlReactParseOptions}
                />
              );
            }
            if (domNode.name === Consts.FakeTags.AddonsContext.tagName) {
              return <></>;
            }
            if (domNode.name === Consts.FakeTags.Addons && !!dataId) {
              const isAddonContextDomParsed = domNode.prev.name === Consts.FakeTags.AddonsContext.tagName;
              if (isAddonContextDomParsed) {
                try {
                  domNode.children = domNode.prev.children;
                  return domNode;
                } catch {
                  return domNode;
                }
              }
              return domNode;
            }
            if (domNode.name === Consts.FakeTags.AddonsPlaceholder.tagName) {
              // TODO: @tuong -> Có lẽ sẽ có thể dùng css để ẩn đi thay vì dùng js để giảm thiểu số lần rerender (1 lần bắt đầu chọn vị trí addon và 1 lần huỷ hoặc apply vị trí addon) -> Tại thời điểm comment này được viết performance không quá tệ -> Tạm thời để nguyên
              if (!!addonsPositionStart.addonsSectionId && addonsPositionStart.value) {
                // NOTE: @tuong -> Chức năng "Addon Placholder" cần sự kết hợp của nhiều file -> Cần xem xét việc update tất cả các file khi có sự thay đổi nào đó ở 1 file bất kì
                // ["LiquidComponent.tsx", "AddonPosition.tsx", "useAddonsPosition.ts", "reducerPages.ts", "generateHelpers.ts/deleteAddonPlaceholder"]
                const attributes = {
                  ...domNode.attribs,
                  [Consts.FakeTags.AddonsPlaceholder.isPlaceholder_attributeName]: Consts.FakeTags.AddonsPlaceholder.isPlaceholder_attributeValue,
                  [Consts.FakeTags.AddonsPlaceholder.id_attributeName]: section.id,
                };
                return <ButtonPlus tooltip={i18n.t('general.add_addons')} {...attributes} />;
              }
              return <></>; // @tuong -> Return null vẫn in ra thẻ html -> Dùng Fragment như một giải pháp thay thế
            }
          }
          if (domNode.type === 'script' && domNode.children?.[0] && !domNode.attribs?.type?.includes('json')) {
            return <ScriptTag id={`script_of_section_${id}`} rerender={rerender} content={domNode.children?.[0].data} />;
          }
          // Xử lý metafield hiển thị kiểu placeholder
          if (domNode.type === 'text' && /{{|\|\s*megafield_tag\s*}}/g.test(domNode.data)) {
            const text = (domNode.data as string)
              .replace(/}}/g, '}}\n==========')
              .replace(/{{.*\|\s*metafield_tag\s*}}/g, value => {
                const [_namespace, key] = value.replace(/{{\s*[\w.]*metafields\.|\s*\|.*/g, '').split('.') as [string, string];
                return `<div class="veda-metafield-placeholder"><i class="fas fa-database"></i><span>${strFirstLetter(key)}</span></div>`;
              })
              .replace(/\n==========/g, '');
            return <span dangerouslySetInnerHTML={{ __html: text }} />;
          }
          return domNode;
        },
      };
    },
    // TODO: @wiloke1
    // Tạm thời để rerender check xem có vấn đề gì không
    // Và ở file useJs check thêm addonsPositionStart.value
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [section, index, codeVisible, rerender, addonsPositionStart],
  );

  useEffect(() => {
    // NOTE: @tuong -> Bằng một cách nào đó nếu không delay và cancel ở đây thì "useEffect" này không được chạy lại sau "setRenderHtmlStatus('rendered')" -> useJs không được chạy lại do "renderHtmlStatus" !== "rerendered"
    const handleAsync = async () => {
      await delay(100);
      if (renderHtmlStatus === 'rendering') {
        setRenderHtmlStatus('rendered');
      }
    };
    handleAsync();
    return () => {
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderHtmlStatus]);

  useEffect(() => {
    if (!isSectionAddonsOrMegamenu(type)) {
      setSectionRenderStatus({ section, status: renderHtmlStatus });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderHtmlStatus, section]);

  // NOTE: @tuong -> "parse(html, htmlReactParseOptions)" luôn được chạy lại cho mỗi lần reducer, state hoặc hook bất kì update -> "htmlReactParseOptions.replace" được chạy lại -> "LiquidComponent" đệ quy (chịu trách nhiệm render "addon" và "mega menu") luôn luôn được chạy lại.
  // NOTE: @tuong -> "setRenderHtmlStatus('rendering')" là hợp lí hơn so với ban đầu vì "htmlReactParseOptions" chạy xong không có nghĩa là DOM đã thay đổi -> JS chèn sai thời điểm nên sẽ sai
  const Component = useMemo(() => {
    if (!!html) {
      setRenderHtmlStatus('rendering');
    }
    // return <RenderStatistics id={section.label}>{parse(html, htmlReactParseOptions)}</RenderStatistics>;
    return <>{parse(html, htmlReactParseOptions)}</>;
  }, [html, htmlReactParseOptions]);

  return Component;
};

// LiquidComponent.whyDidYouRender = {};

// @tuong -> Nếu không memo thì "htmlReactParseOptions" sẽ được tạo lại liên tục -> useJs chạy lại liên tục do "renderHtmlStatus" liên tục ở trạng thái "rerendering" và "rerendered"
export default memo(LiquidComponent, equals);
