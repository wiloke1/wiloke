import { css, Styles, Theme } from 'wiloke-react-core';

export const container: Styles = {
  height: '100%',
};

export const collapse = (active: boolean) => ({ colors }: Theme): Styles => ({
  backgroundColor: colors.light,
  border: `1px solid ${colors.gray3}`,
  borderRadius: '6px',
  boxShadow: active ? `0 2px 10px rgba(${colors.rgbGray9}, 0.15)` : 'none',
  overflow: 'hidden',
});

export const allowReordering = (allowReorderingFields: boolean, even: boolean) => {
  if (!allowReorderingFields) {
    return css``;
  }
  return css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 300ms;
    animation-delay: ${even ? 100 : 0}ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    animation-name: {
      0%,
      100% {
        transform: rotate(-0.3deg);
      }
      50% {
        transform: rotate(0.3deg);
      }
    }
  `;
};
