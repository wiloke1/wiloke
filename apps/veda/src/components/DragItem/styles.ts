import { Styles, Theme } from 'wiloke-react-core';

export type Variant = 'variant1' | 'variant2';

export const container = (variant: Variant, active: boolean) => ({ colors }: Theme): Styles => ({
  className: 'DragItem-container',
  overflow: 'hidden',
  ...(variant === 'variant1'
    ? {
        border: `1px solid ${colors.gray3}`,
        borderRadius: '6px',
      }
    : {
        borderBottom: active ? `1px solid ${colors.gray3}` : undefined,
      }),
});

export const inner = (variant: Variant, active: boolean) => ({ colors }: Theme): Styles => ({
  className: 'DragItem-inner',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '48px',
  padding: '10px 0 10px 16px',
  backgroundColor: colors.light,
  cursor: 'pointer',
  ...(variant === 'variant1'
    ? {
        borderRight: `3px solid ${active ? colors.primary : colors.transparent}`,
        '&:hover': {
          borderRight: `3px solid ${colors.primary}`,
        },
      }
    : {}),
});

export const left: Styles = {
  className: 'DragItem-left',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  width: '100%',
};

export const actions: Styles = {
  className: 'DragItem-actions',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  zIndex: 10,
  flexShrink: 0,
};

export const actionItem: Styles = {
  className: 'DragItem-actionItem',
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const edit: Styles = {
  className: 'DragItem-edit',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 9,
};

export const icon: Styles = {
  className: 'DragItem-icon',
  position: 'relative',
  zIndex: 12,
  marginRight: '12px',
  flexShrink: 0,
};

export const headingContent: Styles = {
  className: 'DragItem-headingContent',
  width: '100%',
};
