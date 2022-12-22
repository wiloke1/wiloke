import { Styles, Theme } from 'wiloke-react-core';

export const container = (height: number, aspectRatio?: number) => ({ colors }: Theme): Styles => ({
  className: 'ImagePlaceholder-container',
  position: 'relative',
  backgroundColor: colors.gray2,
  ...(height !== undefined && aspectRatio === undefined ? { height: `${height}px` } : {}),
  ...(aspectRatio !== undefined ? { paddingTop: `${(1 / aspectRatio) * 100}%` } : {}),
  width: '100%',
});

export const inner: Styles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
