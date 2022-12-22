import { css, Theme } from 'wiloke-react-core';

export type Size = 'small' | 'medium' | 'large';

const inputSizeMapping: Record<Size, number> = {
  small: 36,
  medium: 46,
  large: 52,
};

export const container = (size: Size, block: boolean, disabled: boolean) => css`
  margin: 0;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  display: ${!block ? 'inline-block' : 'block'};
  opacity: ${disabled ? 0.6 : 1};
  height: ${inputSizeMapping[size]}px;
  input {
    cursor: ${disabled ? 'not-allowed' : 'auto'};
  }
`;

export const input = (size: Size) => ({ colors }: Theme) => css`
  display: block;
  background-color: transparent;
  border: none;
  box-shadow: none;
  width: 100%;
  height: 100%;
  padding: 0px ${size === 'small' ? 10 : 15}px;
  color: ${colors.gray7};
  &::-webkit-input-placeholder {
    color: ${colors.gray5};
  }

  &:-ms-input-placeholder {
    color: ${colors.gray5};
  }

  &::placeholder {
    color: ${colors.gray5};
  }

  &:focus {
    outline: none;
  }
`;

export const input2 = (size: Size) => ({ colors }: Theme) => css`
  display: block;
  background-color: transparent;
  border: none;
  box-shadow: none;
  width: 100%;
  height: 100%;
  padding: 13px ${size === 'small' ? 10 : 15}px;
  color: ${colors.gray7};
  line-height: 1.45;
  resize: none;
  overflow: hidden;
  &::-webkit-input-placeholder {
    color: ${colors.gray5};
  }

  &:-ms-input-placeholder {
    color: ${colors.gray5};
  }

  &::placeholder {
    color: ${colors.gray5};
  }

  &:focus {
    outline: none;
  }
`;

export const loadingContainer = ({ colors }: Theme) => css`
  width: 200px;
  height: 46px;
  border-radius: 6px;
  background-color: ${colors.gray5};
  position: relative;
`;

export const loadingInner = ({ colors }: Theme) => css`
  position: absolute;
  width: 40%;
  background-color: ${colors.gray4};
  height: 4px;
  border-radius: 4px;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;
