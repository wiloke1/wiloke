import { useSectionIdCodeVisible } from 'containers/IframePage/globalState';
import { useIframeSelector } from 'containers/IframePage/hooks/useIframeSelector';
import { attributesToProps, domToReact, HTMLReactParserOptions } from 'html-react-parser';
import { createElement, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fullscreenSelector, iframeSelectors } from 'store/selectors';
import { i18n } from 'translation';
import { SettingArrayValue } from 'types/Schema';
import { PageSection } from 'types/Sections';
import { getLabel } from 'utils/functions/getLabel';
import { getLabelComponent, isComponent } from 'utils/functions/getLabelComponentInArray';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import AtomToolbar from '../AtomToolbar';
import useAtomEvent from './useAtomEvent';

export interface AtomComponentProps {
  section: PageSection;
  index: number;
  domNode: any;
  htmlReactParseOptions: HTMLReactParserOptions;
}

// TODO: @tuong -> Tại thời điểm comment này được viết ngữ cảnh như sau:
// "AtomComponent" liên tục rerender khi "mouseEnter" và "mouseLeave" tại sidebar, section chứa component và component đó
// Thời gian rerender mỗi component đó không quá cao (chưa đến 3ms) nên tạm thời chưa xem xét việc optimize
const AtomComponent: FC<AtomComponentProps> = ({ section, index, domNode, htmlReactParseOptions }) => {
  const [atomEl, setAtomEl] = useState<HTMLElement>();
  const props = attributesToProps(domNode.attribs);
  const componentName = domNode.attribs['component'] as string;
  const [sectionIdCodeVisible] = useSectionIdCodeVisible();
  const atom = useAtomEvent(section, index, componentName, atomEl);
  const settingsWithHover = atom.nameHoverActive ? section?.data?.settings?.find(item => item.name === atom.nameHoverActive) : undefined;
  const settingWithActive = atom.nameClickActive ? section?.data?.settings?.find(item => item.name === atom.nameClickActive) : undefined;
  const label = settingWithActive?.label || settingsWithHover?.label || '';
  const isArrayField = settingWithActive?.type === 'array' || settingsWithHover?.type === 'array' || false;
  const fullscreen = useIframeSelector(fullscreenSelector);
  const location = useLocation();
  const toolEnable = !sectionIdCodeVisible && !fullscreen && location.pathname !== '/preview';
  const _label = getLabel(label);
  const addonsPositionStart = useSelector(iframeSelectors.addonsPositionStart);
  const settingArrayValue = (isArrayField ? (settingWithActive || settingsWithHover)?.children?.[index] : undefined) as SettingArrayValue | undefined;
  const _isComponent = isArrayField && settingArrayValue && isComponent(settingArrayValue);
  const _labelComponent = _isComponent ? getLabelComponent(settingArrayValue) : `${i18n.t('general.item')} ${index + 1}`;

  const handleAtomRef = (c: HTMLElement) => {
    setAtomEl(c);
  };

  const renderToolbar = () => {
    if (addonsPositionStart.value) {
      return null;
    }

    return (
      <AtomToolbar
        {...atom.measure}
        title={
          index >= 0 && isArrayField ? (
            <View css={{ display: 'flex', alignItems: 'center' }}>
              <Text>{_label}</Text>
              <FontAwesome type="far" name="chevron-right" size={12} css={{ padding: '0 5px' }} />
              <Text>{_labelComponent}</Text>
            </View>
          ) : (
            _label
          )
        }
        hoverActive={
          (!!atom.nameHoverActive && index >= 0 && index === atom.arrHoverIndex && atom.nameHoverActive === componentName) ||
          atom.nameHoverActive === componentName
        }
        clickActive={
          (!!atom.nameClickActive && index >= 0 && index === atom.arrClickIndex && atom.nameClickActive === componentName) ||
          atom.nameClickActive === componentName
        }
      />
    );
  };

  return (
    <>
      {createElement(domNode.name, {
        ...props,
        ref: handleAtomRef,
        children: domToReact(domNode.children, htmlReactParseOptions),
        ...(toolEnable
          ? {
              onClick: atom.handleClick,
              onMouseEnter: atom.handleMouseEnter,
              onMouseLeave: atom.handleMouseLeave,
            }
          : {}),
      })}
      {toolEnable && renderToolbar()}
    </>
  );
};

export default AtomComponent;
