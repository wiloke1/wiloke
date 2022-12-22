import { useStackNavigator } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { addonsPositionStartSelector, setAddonsPositionStart } from 'containers/BuilderPage/store/addonPosition/slice';
import { iframeLoadedSelector, useSetIframeLoaded } from 'containers/BuilderPage/store/iframeLoaded/slice';
import { useSortSectionFlow } from 'containers/BuilderPage/store/toolbarActions/action';
import { useSetTwigLoading } from 'containers/BuilderPage/store/twigLoading/slice';
import { useSetTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions/actionTemplateBoardVisible';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { useAddAddonsInSection, useToggleObjectField, useUpdateFieldHiddenValue } from 'store/actions/actionPages';
import { useSetSectionArrFieldIndexActive } from 'store/actions/actionSectionArrFieldIndexActive';
import { useSetSectionIdActive } from 'store/actions/actionSectionIdActive';
import { useSetSidebarTabActive } from 'store/actions/actionSidebarTabActive';
import { useSetComponentName } from 'store/global/componentName/slice';
import { useSetRedirected } from 'store/global/redirected/slice';
import { useSetSectionEdittingId } from 'store/global/sectionEdittingId/actions';
import { useSetSectionIdCodeVisible } from 'store/global/sectionIdCodeVisible/slice';
import { chooseTemplateVisibleSelector, pageSectionsSelector, pagesSelector, sectionIdCodeVisibleSelector } from 'store/selectors';
import { Consts, TIME_RERENDER } from 'utils/constants/constants';
import getPageInfo from 'utils/functions/getInfo';
import { pmParent } from 'utils/functions/postMessage';
import useDelay from './useDelay';

const { id_attributeName, signal_attributeName, signal_needUpdate, tagName } = Consts.FakeTags.SignalRefreshJs;

export const useParentPostMessage = () => {
  const sectionIdCodeVisible = useSelector(sectionIdCodeVisibleSelector);
  const iframeLoaded = useSelector(iframeLoadedSelector);
  const pages = useSelector(pagesSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const pageId = getPageInfo('id');

  const setSectionIdActive = useSetSectionIdActive();
  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const setSectionArrFieldIndexActive = useSetSectionArrFieldIndexActive();
  const setSectionIdCodeVisible = useSetSectionIdCodeVisible();
  const setSectionEdittingId = useSetSectionEdittingId();
  const addAddonsInSection = useAddAddonsInSection();
  const setTwigLoading = useSetTwigLoading();
  const addonsPositionStart = useSelector(addonsPositionStartSelector);
  const [delay, cancel] = useDelay();
  const setIframeLoaded = useSetIframeLoaded();
  const updateFieldHiddenValue = useUpdateFieldHiddenValue();
  const setRedirected = useSetRedirected();
  const { navKeys } = useSelector(chooseTemplateVisibleSelector);
  const sortSectionFlow = useSortSectionFlow();

  const observer = useRef(
    new MutationObserver(records => {
      records.forEach(record => {
        const { target, addedNodes, removedNodes } = record;
        if (target.nodeType === Node.ELEMENT_NODE && target.nodeName.toLowerCase() === tagName) {
          const _target = target as HTMLButtonElement;
          const sectionId = _target.getAttribute(id_attributeName);
          if (sectionId && _target.getAttribute(signal_attributeName) && _target.getAttribute(signal_needUpdate)) {
            pmParent.emit('@rerender', { sectionId, action: 'Mutation' });
          }
        }
        addedNodes.forEach(target => {
          if (target.nodeType === Node.ELEMENT_NODE && target.nodeName.toLowerCase() === tagName) {
            const _target = target as HTMLButtonElement;
            const sectionId = _target.getAttribute(id_attributeName);
            if (sectionId && _target.getAttribute(signal_attributeName) && _target.getAttribute(signal_needUpdate)) {
              pmParent.emit('@rerender', { sectionId, action: 'Mutation' });
            }
          }
        });
        removedNodes.forEach(target => {
          if (target.nodeType === Node.ELEMENT_NODE && target.nodeName.toLowerCase() === tagName) {
            const _target = target as HTMLButtonElement;
            const sectionId = _target.getAttribute(id_attributeName);
            if (sectionId && _target.getAttribute(signal_attributeName) && _target.getAttribute(signal_needUpdate)) {
              pmParent.emit('@rerender', { sectionId, action: 'Mutation' });
            }
          }
        });
      });
    }),
  );

  useEffect(() => {
    const off = pmParent.on('@PostmessageOfIframeReady', () => {
      setIframeLoaded(true);
    });

    return () => {
      off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDeepCompareEffect(() => {
    if (iframeLoaded && pages.status[pageId] === 'success') {
      pmParent.emit('@animate');

      const target = (document.querySelector('#iframe-content') as HTMLIFrameElement)?.contentWindow?.document.body;
      if (target) {
        observer.current.observe(target, {
          attributes: true,
          subtree: true,
          childList: true,
          characterData: true,
          attributeOldValue: true,
          characterDataOldValue: true,
        });
      }
    }
    return () => {
      observer.current.disconnect();
    };
  }, [pageSections, [iframeLoaded, pageId], pages.status]);

  useEffect(() => {
    pmParent.emit('@addonsPositionStart', addonsPositionStart);
  }, [addonsPositionStart]);

  useEffect(() => {
    const handleAsync = async () => {
      await delay(TIME_RERENDER + 100);
      pmParent.emit('@leftBarSection/editCode', { sectionId: sectionIdCodeVisible });
    };
    handleAsync();
    return () => {
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIdCodeVisible]);

  useEffect(() => {
    const off1 = pmParent.on('@section/sortable', ({ srcIndex, desIndex, sectionId, sectionType, direction }) => {
      sortSectionFlow(srcIndex, desIndex, sectionId, sectionType, direction);
    });
    const off2 = pmParent.on('@section/addToTop', ({ index, sectionType }) => {
      setTemplateBoardVisible({ visible: true, index, sectionType, navKeys: navKeys.length > 0 ? navKeys : ['sections'], isChange: false });
    });
    const off3 = pmParent.on('@section/addToBottom', ({ index, sectionType }) => {
      setTemplateBoardVisible({ visible: true, index, sectionType, navKeys: navKeys.length > 0 ? navKeys : ['sections'], isChange: false });
    });
    const off4 = pmParent.on('@section/editCode', async ({ id }) => {
      await setSectionEdittingId(id);
      setSectionIdCodeVisible({ sectionId: id });
      setSectionIdActive('');
    });
    const off5 = pmParent.on('@addAddonsPosition', ({ insert, openTag, sectionId, addonsSectionId, tagName, indexBOC, hasStyleOrder }) => {
      addAddonsInSection(sectionId, hasStyleOrder, addonsSectionId, insert, openTag, tagName, indexBOC);
      setAddonsPositionStart({ targetSectionId: addonsSectionId });
      // pmParent.emit('@rerender', { sectionId, action: '@addAddonsPosition' });
    });
    const off6 = pmParent.on('@iframeTwigLoading', loading => {
      setTwigLoading(loading);
    });
    const off7 = pmParent.on('@settingsHooks', ({ sectionId, name, value, forceRender }) => {
      updateFieldHiddenValue({
        sectionId,
        name,
        value,
      });
      if (forceRender) {
        pmParent.emit('@rerender', { sectionId, action: 'useParentPostMessage.ts' });
      }
    });
    const off8 = pmParent.on('@redirectToHooks', url => {
      setRedirected(true);
      window.location.href = url;
    });

    return () => {
      off1();
      off2();
      off3();
      off4();
      off5();
      off6();
      off7();
      off8();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const off = pmParent.on('@component/componentArrIndexActive', async ({ index }) => {
      setSectionArrFieldIndexActive(index);
    });
    return () => {
      off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useParentPostMessageForLeftBarScreen = () => {
  const setSectionIdActive = useSetSectionIdActive();
  const toggleObjectField = useToggleObjectField();
  const setComponentName = useSetComponentName();
  const setSidebarTabActive = useSetSidebarTabActive();
  const [delay, cancel] = useDelay();
  const [beforeComponentActive, setBeforeComponentActive] = useState(false);
  const navigation = useStackNavigator<LeftBarParamList>();

  useEffect(() => {
    const off = pmParent.on('@section/sectionIdActive', ({ id, isAddons }) => {
      setSectionIdActive(id ?? '');
      setSidebarTabActive(isAddons ? 'add-ons' : 'sections');
      // FIXME: bị lỗi UI lật lại không được hay khi click array item tại iframe
      // liên quan tới click giả onMouseUp: handleClick SectionComponent.tsx dòng 69
      if (!beforeComponentActive) {
        navigation.navigate('fieldSettingsScreen');
      }
    });
    return () => {
      off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beforeComponentActive]);

  useEffect(() => {
    const off = pmParent.on('@component/componentNameActive', async ({ sectionId, componentName, settingType, value }) => {
      // Để giúp toggle component khác chạy sau khi thằng component trước đóng
      if (value) {
        await delay(100);
      }
      // Nếu là array hoặc object thì mới cho navigate sang fieldsScreen
      if (settingType === 'array' || settingType === 'object') {
        navigation.navigate('fieldsScreen', {
          componentName,
        });
        toggleObjectField(sectionId, componentName, value);
        setComponentName(value ? componentName : '');
        setSectionIdActive(sectionId ?? '');
        // còn không thì navigate trở lại fieldSettingsScreen
      } else {
        navigation.navigate('fieldSettingsScreen');
      }
    });
    const off2 = pmParent.on('@component/beforeComponentNameActive', value => {
      setBeforeComponentActive(value);
    });
    return () => {
      off();
      off2();
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
