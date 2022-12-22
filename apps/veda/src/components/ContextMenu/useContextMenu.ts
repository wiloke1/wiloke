import React, { useEffect, useRef, useState } from 'react';
import useGlobalState from './useGlobalState';

const useContextMenu = () => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const portalRef = useRef<HTMLElement | null>(null);
  const { setState, clearState, getState } = useGlobalState();

  const handleOpen = (event: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { clientX, clientY } = event;
    const scale = (event.currentTarget as HTMLElement).getAttribute('data-scale');
    event.preventDefault();
    event.stopPropagation();
    setState(triggerRef);
    if (scale) {
      setTop(clientY * Number(scale));
      setLeft(clientX * Number(scale));
    } else {
      setTop(clientY);
      setLeft(clientX);
    }
  };

  const handleClose = (event: MouseEvent) => {
    if (
      !!portalRef.current &&
      !portalRef.current?.contains(event.target as Node) &&
      !!triggerRef.current &&
      !triggerRef.current?.contains(event.target as Node)
    ) {
      clearState();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClose);
    window.addEventListener('contextmenu', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
      window.removeEventListener('contextmenu', handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    triggerRef,
    portalRef,
    visible: !!getState(triggerRef),
    top,
    left,
    onOpen: handleOpen,
    onClose: clearState,
  };
};

export default useContextMenu;
