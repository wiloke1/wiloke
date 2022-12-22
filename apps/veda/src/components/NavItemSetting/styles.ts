import { css, Styles, Theme } from 'wiloke-react-core';

export const container: Styles = {
  className: 'NavItemSetting-container',
  padding: '18px',
  cursor: 'pointer',
};

export const container2: Styles = {
  className: 'NavItemSetting2-container',
  padding: '14px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  userSelect: 'none',
};

export const left = css`
  display: flex;
  align-items: center;
`;

export const right = css`
  display: flex;
  align-items: center;
`;

export const icon = (active: boolean) => ({ colors }: Theme) => css`
  debug: MenuItem_icon;
  color: ${active ? colors.primary : colors.gray8};
`;

export const label = (active: boolean) => ({ colors }: Theme) => css`
  debug: MenuItem_label;
  display: block;
  color: ${active ? colors.primary : colors.gray8};
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  line-height: 1.25;

  &:hover {
    color: ${colors.primary};
  }
`;

export const num = ({ colors }: Theme) => css`
  min-width: 22px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 11px;
  color: ${colors.gray8};
  background-color: ${colors.gray2};
  font-size: 12px;
`;

export const numPlus = ({ colors }: Theme) => css`
  color: ${colors.light};
  background-color: ${colors.danger};
  margin-right: 5px;
`;

export const container3 = css`
  debug: container3;

  padding: 8px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const icon3 = (): Styles => ({
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '4px',
  borderRadius: '10px',
});
