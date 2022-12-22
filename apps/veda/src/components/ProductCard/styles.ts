import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: ProductCard-container;
  position: relative;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 5px 14px rgba(${colors.gray2}, 0.05);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 5px 14px rgba(${colors.gray2}, 0.12);
  }
`;

export const imageWrap = css`
  debug: ProductCard-imageWrap;
  position: relative;
`;

export const image = ({ colors }: Theme) => css`
  debug: ProductCard-image;
  background-color: ${colors.gray2};
  background-position: 50% 50%;
  background-repeat: no-repeat;
`;

export const body = css`
  debug: ProductCard-body;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const title = ({ colors }: Theme) => css`
  debug: ProductCard-title;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4em;
  text-transform: none;
  letter-spacing: none;
  color: ${colors.gray8};
  margin: 0;
  &:hover {
    color: ${colors.gray8};
  }
`;

export const price = ({ colors }: Theme) => css`
  debug: ProductCard-price;
  font-size: 14px;
  margin-top: 3px;
  color: ${colors.gray8};
  line-height: 1.3;
`;

export const sale = ({ colors }: Theme) => css`
  debug: ProductCard-sale;
  position: absolute;
  top: 5px;
  left: 5px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.danger};
  color: ${colors.light};
  font-size: 13px;
`;
