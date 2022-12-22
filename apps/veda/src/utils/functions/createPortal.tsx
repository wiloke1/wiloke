import { ReactNode } from 'react';
import { createPortal as reactCreatePortal } from 'react-dom';
import { View } from 'wiloke-react-core';
import { createRootElement } from './createRootElement';

export const createPortal = (children: ReactNode, container?: Element | null) => {
  const root = createRootElement('veda-portal');
  root.style.position = 'absolute';
  root.style.top = '0';
  root.style.left = '0';
  root.style.zIndex = '999999';
  root.style.width = '100%';
  root.style.height = '100%';
  root.style.overflow = 'hidden';
  root.style.pointerEvents = 'none';
  return reactCreatePortal(<View css={{ pointerEvents: 'auto' }}>{children}</View>, container ?? root);
};
