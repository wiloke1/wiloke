import { Colors, css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: SideBar-container;
  height: 100%;
`;

export const nav = css`
  debug: SideBar-nav;
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  justify-content: center;
`;

export const link = ({ fonts }: Theme) => css`
  debug: SideBar-link;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 13px;
  padding: 8px 0;
  border-radius: 0px;
  font-family: ${fonts.secondary};
  font-weight: 500;
  cursor: pointer;
`;

export const active = (colors: Colors) => css`
  debug: SideBar-linkActive;
  background-color: ${colors.light};
  color: ${colors.primary};
`;

export const linkActive = (active: boolean) => ({ colors, fonts }: Theme) => css`
  debug: SideBar-linkActive;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 14px;
  line-height: 21px;
  padding: 8px 0px;
  border-radius: 0px;
  font-family: ${fonts.secondary};
  font-weight: 500;
  cursor: pointer;
  background-color: ${active ? colors.light : colors.light};
  color: ${active ? colors.primary : colors.gray6};
`;

export const parent = css`
  debug: SideBar-parent;
  position: relative;
  display: block;
`;

export const icon = (active: boolean) => ({ colors }: Theme) => css`
  debug: SideBar-icon;
  display: flex;
  align-items: center;
  justify-content: center;

  line-height: 18px;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 8px;

  background-color: ${active ? colors.primary : colors.gray2};
  color: ${active ? colors.gray1 : colors.gray8};

  box-shadow: ${active ? `0px 10px 20px rgba(${colors.rgbPrimary}, 0.2)` : 'none'};
`;

export const themeBar = ({ colors }: Theme) => css`
  debug: SideBar-themeBar;
  display: flex;
  height: 100%;
  padding: 0px;
  flex-direction: column;
  box-shadow: 1px 0 0 ${colors.gray2};
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  width: 90px;
`;

export const navBar = ({ colors }: Theme) => css`
  debug: SideBar-navBar;
  border-right: 1px solid ${colors.gray2};
`;

export const sideUp = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
