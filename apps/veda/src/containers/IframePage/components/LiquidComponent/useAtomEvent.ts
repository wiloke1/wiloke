import useOuterClick from 'hooks/useOuterClick';
import { MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { iframeScrollingSelector } from 'store/global/isIframeScrolling/sliceIsIframeScrolling';
import { PageSection } from 'types/Sections';
import offset from 'utils/functions/offset';
import { pmChildren } from 'utils/functions/postMessage';
import { PostMessageOff } from 'wiloke-react-core/utils';
import { useSectionIdCodeVisible } from '../../globalState';

const useAtomEvent = (section: PageSection, index: number, name: string, el: HTMLElement | undefined) => {
  const [top, setTop] = useState(-1000);
  const [left, setLeft] = useState(-1000);
  const [width, setWidth] = useState(-1000);
  const [height, setHeight] = useState(-1000);
  const [nameClickActive, setNameClickActive] = useState('');
  const [nameHoverActive, setNameHoverActive] = useState('');
  const [arrHoverIndex, setArrHoverIndex] = useState(-1);
  const [arrClickIndex, setArrClickIndex] = useState(-1);
  const [sectionIdCodeVisible] = useSectionIdCodeVisible();
  const pmChildrenOff = useRef<PostMessageOff>();
  const pmChildrenOff2 = useRef<PostMessageOff>();
  const pmChildrenOff3 = useRef<PostMessageOff>();
  const pmChildrenOff4 = useRef<PostMessageOff>();
  const pmChildrenOff5 = useRef<PostMessageOff>();
  const codeVisible = !!sectionIdCodeVisible;
  const { id } = section;
  const isScrolling = useSelector(iframeScrollingSelector);

  useOuterClick(
    el,
    () => {
      if (!sectionIdCodeVisible && !!nameClickActive) {
        setNameClickActive('');
        setArrClickIndex(-1);
      }
    },
    [sectionIdCodeVisible, nameClickActive],
  );

  // Get measure khi sửa html css js vì lý do chiều cao chiều rộng hoặc vị trí thay đổi
  useEffect(() => {
    if (!el || (nameClickActive !== name && nameHoverActive !== name)) {
      return;
    }
    const sectionEl = el.closest(`[data-id="${id}"]`);
    if (!sectionEl) {
      return;
    }
    const handleMeasure = () => {
      const { width, height } = el.getBoundingClientRect();
      const { top, left } = offset(el);
      setTop(top);
      setLeft(left);
      setWidth(width);
      setHeight(height);
    };
    handleMeasure();
    const observer = new MutationObserver(handleMeasure);
    observer.observe(sectionEl, { attributes: true, childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el, nameClickActive, nameHoverActive, section]);

  useEffect(() => {
    pmChildrenOff.current = pmChildren.on('@section/sectionIdActive', id => {
      // Khi tắt section settings thì xoá name
      // nghĩa là cũng tắt active vào component nhỏ
      if (!id) {
        setNameClickActive(id);
      }
    });
    pmChildrenOff2.current = pmChildren.on('@component/componentNameActive', ({ sectionId, componentName, value }) => {
      if (sectionId === id) {
        setNameClickActive(value ? componentName : '');
        setArrClickIndex(-1);
      }
    });
    pmChildrenOff3.current = pmChildren.on('@component/hoverComponent', ({ name, sectionId }) => {
      if (sectionId === id) {
        setNameHoverActive(name);
      }
    });
    pmChildrenOff4.current = pmChildren.on('@component/hoverArrayIndex', ({ sectionId, name: componentName, index: indexHover }) => {
      if (sectionId === id) {
        setArrHoverIndex(indexHover);
        setNameHoverActive(indexHover >= 0 && indexHover === index && componentName === name ? name : '');
      }
    });
    pmChildrenOff5.current = pmChildren.on('@component/clickArrayIndex', ({ sectionId, name, index: indexClick }) => {
      if (sectionId === id) {
        setArrClickIndex(indexClick);
        setNameClickActive(indexClick >= 0 && indexClick === index ? name : '');
      }
    });
    return () => {
      pmChildrenOff.current?.();
      pmChildrenOff2.current?.();
      pmChildrenOff3.current?.();
      pmChildrenOff4.current?.();
      pmChildrenOff5.current?.();
    };
  }, [id, index, name]);

  const isClickAddons = (event: MouseEvent<HTMLElement>) => {
    const addonsWrapperEl = (event.target as HTMLElement).closest('[data-id]');
    if (!addonsWrapperEl) {
      return false;
    }
    const addonsId = addonsWrapperEl.getAttribute('data-id') as string;
    return section.addonIds?.includes(addonsId);
  };

  const handleClick: MouseEventHandler<HTMLElement> = event => {
    if (codeVisible || isClickAddons(event)) {
      return;
    }
    const setting = section.data.settings.find(setting => setting.name === name);
    pmChildren.emit('@component/beforeComponentNameActive', true);
    // index = -1 tương đương với đang bấm vào object
    if (index !== -1) {
      pmChildren.emit('@component/componentArrIndexActive', { index });
      setArrClickIndex(index);
    }
    pmChildren.emit('@component/componentNameActive', { sectionId: id, componentName: name, value: true, settingType: setting?.type });
    if (setting?.type === 'object' || setting?.type === 'array') {
      setNameClickActive(name);
    }
  };

  const handleMouseEnter = () => {
    if (!codeVisible && !isScrolling) {
      setNameHoverActive(name);
    }
  };

  const handleMouseLeave: MouseEventHandler<HTMLElement> = () => {
    if (codeVisible) {
      return;
    }
    setNameHoverActive('');
    pmChildren.emit('@component/beforeComponentNameActive', false);
  };

  return {
    measure: { top, left, width, height },
    arrHoverIndex,
    arrClickIndex,
    nameHoverActive,
    nameClickActive,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
};

export default useAtomEvent;
