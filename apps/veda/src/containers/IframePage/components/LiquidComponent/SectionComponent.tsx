import { useSectionIdCodeVisible, useSectionIdForAddons } from 'containers/IframePage/globalState';
import { useIframeSelector } from 'containers/IframePage/hooks/useIframeSelector';
import { attributesToProps, domToReact, HTMLReactParserOptions } from 'html-react-parser';
import { createElement, FC, MouseEventHandler, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { sectionIdHoverSelector } from 'store/global/sectionIdHover/slice';
import { fullscreenSelector, generalSettingsSelector, iframeSelectors } from 'store/selectors';
import { i18n } from 'translation';
import { PageSection } from 'types/Sections';
import { isSectionAddons } from 'utils/functions/checkSectionType';
import AddonToolbar from '../AddonToolbar';
import ComponentToolbar from '../ComponentToolbar';
import useContainerEvent from './useContainerEvent';
import { useDisableUpDownSection } from './useDisableUpDownSection';
import { useGetTextTooltip } from './useGetTextTooltip';
import useToolbarAction from './useToolbarAction';

export interface SectionComponentProps {
  section: PageSection;
  index: number;
  name: string;
  domNode: any;
  htmlReactParseOptions: HTMLReactParserOptions;
  rerender: boolean;
}

const SectionComponent: FC<SectionComponentProps> = ({ section, index, name, domNode, htmlReactParseOptions, rerender }) => {
  const [containerEl, setContainerEl] = useState<HTMLElement>();
  const { measure, isMegamenu, idClickActive, handleMouseEnter, handleClick } = useContainerEvent(
    section.id,
    containerEl,
    isSectionAddons(section.type),
  );
  const handleToolbarAction = useToolbarAction();
  const props = attributesToProps(domNode.attribs);
  const [sectionIdCodeVisible] = useSectionIdCodeVisible();
  const fullscreen = useIframeSelector(fullscreenSelector);
  const location = useLocation();
  const toolEnable = !sectionIdCodeVisible && !fullscreen && location.pathname !== '/preview';
  const [, setSectionIdForAddons] = useSectionIdForAddons();
  const addonsPositionStart = useSelector(iframeSelectors.addonsPositionStart);
  const sectionIdHover = useIframeSelector(sectionIdHoverSelector);
  const { headerFooterEnabled } = useIframeSelector(generalSettingsSelector);
  const toolbarInset = !headerFooterEnabled && index === 0;
  const { disabledNext, disabledPrev } = useDisableUpDownSection(section.id);
  const { nextTitle, prevTitle } = useGetTextTooltip(section);

  const handleRef = (c: HTMLElement | undefined) => {
    setContainerEl(c);
  };

  const handleDisableClickAnchorElement: MouseEventHandler<HTMLElement> = event => {
    const targetEl = event.target as HTMLElement;
    // Nếu thẻ được bấm vào là thẻ a hoặc cha ông là thẻ a
    if (targetEl.tagName.toLowerCase() === 'a' || !!targetEl.closest('a')) {
      event.preventDefault();
    }
  };

  const renderContent = () => {
    return createElement(domNode.name, {
      ...props,
      ref: handleRef,
      children: domToReact(domNode.children, htmlReactParseOptions),
      ...(toolEnable
        ? {
            onMouseMove: handleMouseEnter,
            onClickCapture: event => {
              handleDisableClickAnchorElement(event);
              handleClick(event);
            },
            onContextMenu: event => {
              handleClick(event);
            },
            // Dừng hành động form submit
            onSubmit: event => {
              event.preventDefault();
            },
          }
        : {
            // Nếu change position cho addons
            ...(addonsPositionStart.value
              ? {
                  onMouseMove: () => {
                    setSectionIdForAddons(section.id);
                  },
                }
              : {}),
            onClick: handleDisableClickAnchorElement,
            // Dừng hành động form submit
            onSubmit: event => {
              event.preventDefault();
            },
          }),
    });
  };

  const renderToolbar = () => {
    if (addonsPositionStart.value) {
      return null;
    }
    if (isSectionAddons(section.type)) {
      return (
        <AddonToolbar
          {...measure}
          title={`${i18n.t('general.addons')}: ${name}`}
          hoverActive={idClickActive === section.id || sectionIdHover === section.id}
          clickActive={idClickActive === section.id || sectionIdHover === section.id}
        />
      );
    }
    return (
      <ComponentToolbar
        {...measure}
        isMegamenu={isMegamenu}
        inset={toolbarInset}
        title={name}
        active={idClickActive === section.id || sectionIdHover === section.id}
        onAction={handleToolbarAction(section.id, index, section.type)}
        disabledPrevious={disabledPrev}
        disabledNext={disabledNext}
        nextText={nextTitle}
        prevText={prevTitle}
      />
    );
  };

  return (
    <>
      {rerender ? <>{renderContent()}</> : renderContent()}
      {toolEnable && renderToolbar()}
    </>
  );
};

export default SectionComponent;
