import { css, Styles, Theme } from 'wiloke-react-core';

export const inner = ({ colors }: Theme): Styles => ({
  position: 'relative',
  display: 'flex',
  backgroundColor: colors.light,
  overflow: 'hidden',
  height: '100%',
});

export const left = ({ colors }: Theme): Styles => ({
  width: '250px !important',
  backgroundColor: colors.light,
  padding: '10px 0',
});

export const left2 = ({ colors }: Theme): Styles => ({
  width: '400px !important',
  backgroundColor: colors.light,
  padding: '10px 0',
});

export const right = ({ colors }: Theme): Styles => ({
  width: '100%',
  backgroundColor: colors.gray2,
  padding: '20px',
});

export const draftItem = (rejected: boolean, loading: boolean) => ({ colors }: Theme) => css`
  display: flex;
  align-items: center;
  padding: 10px 8px;
  justify-content: space-between;
  margin-bottom: 8px;
  background-color: rgba(${rejected ? colors.rgbDanger : colors.rgbLight}, ${rejected ? '0.1' : '1'});
  border: 1px solid ${rejected ? colors.danger : colors.gray3};
  position: relative;

  &:after {
    content: '';
    display: ${loading ? 'block' : 'none'};
    position: absolute;
    inset: 0;
    background-color: rgba(${colors.rgbGray5}, 0.3);
    border-radius: 4px;
    z-index: 2;
  }
`;

export const draftItemButton: Styles = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export const skeletonNav = css`
  display: flex;
  align-items: center;
  padding-left: 8px;
`;

export const adminButton: Styles = {
  padding: '2px 4px',
  fontSize: '12px',
  cursor: 'pointer',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '3px',
  margin: '0 2px',
};
