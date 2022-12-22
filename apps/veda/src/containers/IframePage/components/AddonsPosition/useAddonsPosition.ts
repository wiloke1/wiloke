import { MutableRefObject, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { iframeSelectors } from 'store/selectors';
import { Consts } from 'utils/constants/constants';
import offset from 'utils/functions/offset';

interface UseAddonsPosition {
  beforeRef: MutableRefObject<HTMLElement | null>;
  afterRef: MutableRefObject<HTMLElement | null>;
  addToPlaceholder: (target: HTMLElement) => void;
}

const { isPlaceholder_attributeName, isPlaceholder_attributeValue } = Consts.FakeTags.AddonsPlaceholder;

const useAddonsPosition = ({ addToPlaceholder, afterRef, beforeRef }: UseAddonsPosition) => {
  const [top, setTop] = useState(-1000);
  const [left, setLeft] = useState(-1000);
  const [width, setWidth] = useState(-1000);
  const [height, setHeight] = useState(-1000);
  const [element, setElement] = useState<HTMLElement | null>(null);
  const addonsPositionStart = useSelector(iframeSelectors.addonsPositionStart);
  const [elStop, setElStop] = useState<HTMLElement | null>(null);

  const handleMouseMove = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const el = target.getAttribute('veda-open-tag') ? target : (target.closest('[veda-open-tag]') as HTMLElement);
    if (
      // Nếu thẻ đó là nút before
      beforeRef.current?.contains(el as Node) ||
      // Nếu thẻ đó là nút after
      afterRef.current?.contains(el as Node) ||
      // Nếu thẻ đó không có chứa veda-open-tag
      !el?.getAttribute('veda-open-tag') ||
      el?.getAttribute(isPlaceholder_attributeName) ||
      // Nếu thẻ đó có cha là veda-addons
      el?.closest('[veda-addons]')
      // TODO: @tuong -> Tại thời điểm comment này được viết performance đã được optimize phần nào -> Addon thêm vào vòng loop được cải thiện -> Theo dõi và test
      // Nếu thẻ đó có là veda-component-index (tức nằm trong vòng loop)
      // el?.getAttribute('veda-component-index')
    ) {
      return;
    }
    if (!elStop) {
      const { offsetHeight, offsetWidth } = el;
      const { top, left } = offset(el);
      setTop(top);
      setLeft(left);
      setWidth(offsetWidth);
      setHeight(offsetHeight);
      setElement(el);
    }
    if (!elStop?.contains(el)) {
      setElStop(null);
    }
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const addonsPlaceholderEl = target.closest<HTMLElement>(`[${isPlaceholder_attributeName}="${isPlaceholder_attributeValue}"]`);
    // NOTE: @tuong -> Chức năng "Addon Placholder" cần sự kết hợp của nhiều file -> Cần xem xét việc update tất cả các file khi có sự thay đổi nào đó ở 1 file bất kì
    // ["LiquidComponent.tsx", "AddonPosition.tsx", "useAddonsPosition.ts", "reducerPages.ts", "generateHelpers.ts/deleteAddonPlaceholder"]
    /** Khi click phải Element addon placeholder thì thực hiện addAddon nếu không thực hiện cố định khung add vị trí before và after */
    if (addonsPlaceholderEl && addonsPlaceholderEl.getAttribute(isPlaceholder_attributeName) === isPlaceholder_attributeValue) {
      addToPlaceholder(addonsPlaceholderEl);
    } else {
      const el = target.getAttribute('veda-open-tag') ? target : (target.closest('[veda-open-tag]') as HTMLElement);
      setElStop(el);
    }
  };

  useEffect(() => {
    if (addonsPositionStart) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', handleClick);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addonsPositionStart, elStop]);

  return {
    top,
    left,
    width,
    height,
    visible: addonsPositionStart.value,
    element,
  };
};

export default useAddonsPosition;
