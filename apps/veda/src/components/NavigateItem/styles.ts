import { css, Styles, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme): Styles => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '46px',
  padding: '10px',
  borderRadius: '6px',
  border: `1px solid ${colors.gray3}`,
  backgroundColor: colors.light,
  cursor: 'pointer',
});

export const toggle = ({ colors }: Theme): Styles => ({
  width: '30px',
  height: '30px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.gray2,
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: colors.gray3,
  },
});

export const note = ({ colors }: Theme) => css`
  debug: Field-note;
  position: relative;
  z-index: 9;
  font-size: 13px;
  line-height: 1.4;
  margin: 0px;
  margin-left: 8px !important;
  color: ${colors.gray6};
`;

export const popover = (top: number, left: number) => ({ colors }: Theme) => css`
  debug: Field-popover;
  position: absolute;
  top: ${top - 10}px;
  left: ${left - 20}px;
  font-size: 13px;
  z-index: 999;
  transform: translateY(-100%);
  background-color: ${colors.gray8};
  color: ${colors.gray2};
  border-radius: 6px;
  padding: 8px 15px;
  max-width: 300px;
  &:after {
    content: '';
    position: absolute;
    left: 18px;
    bottom: 1px;
    transform: translateY(100%);
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 7px 8px;
    border-top-color: ${colors.gray8};
  }
`;
