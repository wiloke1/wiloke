import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: CouponCard-container;
  padding: 20px;
  border-radius: 10px;
  background-color: ${colors.light};
  border: 1px solid ${colors.gray3};
`;

export const body = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const discount = ({ colors }: Theme) => css`
  debug: CouponCard-discount;
  font-weight: bold;
  font-size: 30px;
  color: ${colors.primary};
`;

export const code = ({ fonts }: Theme) => css`
  debug: CouponCard-code;
  font-size: 18px;
  font-family: ${fonts.secondary};
`;

export const expiredOn = ({ fonts, colors }: Theme) => css`
  debug: CouponCard-expire;
  font-size: 16px;
  font-family: ${fonts.secondary};
  color: ${colors.gray6};
`;

export const logo = () => css`
  debug: CouponCard-logo;
  width: 80px;
`;

export const deleteBtn = ({ colors }: Theme) => css`
  debug: CouponCard-delete;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  width: 30px;
  height: 30px;
  background-color: ${colors.danger};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
