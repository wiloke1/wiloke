import { css, Size } from 'wiloke-react-core';

interface SwitchBeautySizeInfo {
  height: number;
  padding: string;
}

const switchBeautySizeMapping: Record<Size, SwitchBeautySizeInfo> = {
  'extra-small': { height: 22, padding: '0 7px' },
  small: { height: 30, padding: '0 7px' },
  medium: { height: 44, padding: '0 10px' },
  large: { height: 46, padding: '0 15px' },
};

export const container = (size: Size) => {
  return css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: ${switchBeautySizeMapping[size].padding};
    height: ${switchBeautySizeMapping[size].height}px;
  `;
};

export const disabled = (disabled: boolean) => {
  if (!disabled) {
    return {};
  }
  return css`
    opacity: 0.8;
    cursor: not-allowed;
  `;
};
