import { useSetIdClickActive } from 'containers/IframePage/actions/actionSectionToolbar';
import { useIframeDispatch } from 'containers/IframePage/hooks/useIframeDispatch';
import { useIframeSelector } from 'containers/IframePage/hooks/useIframeSelector';
import { MouseEventHandler, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { iframeScrollingSelector } from 'store/global/isIframeScrolling/sliceIsIframeScrolling';
import { sectionIdHoverSelector, sliceSectionIdHover } from 'store/global/sectionIdHover/slice';
import { iframeSelectors, pageSectionsSelector } from 'store/selectors';
import offset from 'utils/functions/offset';
import { pmChildren } from 'utils/functions/postMessage';
import { useSectionIdCodeVisible } from '../../globalState';

const useContainerEvent = (id: string, el: HTMLElement | undefined, isAddons: boolean) => {
  const [isMegamenu, setIsMegamenu] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(-200);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [sectionIdCodeVisible] = useSectionIdCodeVisible();
  const sections = useIframeSelector(pageSectionsSelector);
  const iframeDispatch = useIframeDispatch();
  const codeVisible = !!sectionIdCodeVisible;
  const isScrolling = useSelector(iframeScrollingSelector);

  const setIdClickActive = useSetIdClickActive();
  const sectionIdHover = useIframeSelector(sectionIdHoverSelector);
  const { idClickActive } = useSelector(iframeSelectors.sectionToolbar);

  // Get measure khi sửa html css js vì lý do chiều cao chiều rộng hoặc vị trí thay đổi
  useDeepCompareEffect(() => {
    if (!el || (idClickActive !== id && sectionIdHover !== id)) {
      return;
    }
    const handleMeasure = () => {
      const { width, height } = el.getBoundingClientRect();
      const { top, left } = offset(el);
      setTop(top);
      setLeft(left);
      setWidth(width);
      setHeight(height);
      setIsMegamenu(!!el.getAttribute('veda-megamenus'));
    };
    handleMeasure();
    const observer = new MutationObserver(handleMeasure);
    observer.observe(el, { attributes: true, childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el, [idClickActive, sectionIdHover], sections]);

  const handleClick: MouseEventHandler<HTMLElement> = () => {
    if (codeVisible) {
      return;
    }
    setIdClickActive({ idClickActive: id });
    pmChildren.emit('@section/sectionIdActive', {
      id,
      isAddons,
    });
  };

  const handleMouseEnter: MouseEventHandler<HTMLElement> = () => {
    if (!codeVisible && !isScrolling && sectionIdHover !== id) {
      iframeDispatch(sliceSectionIdHover.actions.setSectionIdHover(id));
    }
  };

  return {
    measure: { top, left, width, height },
    idClickActive,
    isMegamenu,
    handleMouseEnter,
    handleClick,
  };
};

export default useContainerEvent;
