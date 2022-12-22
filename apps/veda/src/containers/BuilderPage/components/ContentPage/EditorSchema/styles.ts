import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: EditorSchema__container;
  padding-top: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const body = css`
  debug: EditorSchema__body;
  flex: 1 1 auto;
  height: calc(100% - 600px);
`;

export const header = css`
  debug: EditorSchema__header;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const headerLeft = css`
  debug: EditorSchema__headerLeft;
  max-width: 500px;
  min-width: 300px;
`;

export const headerRight = css`
  debug: EditorSchema__headerRight;
  display: flex;
  align-items: center;
`;

export const button = (disabled: boolean) => ({ colors }: Theme) => css`
  debug: EditorSchema__button;
  width: 80px;
  text-align: center;
  position: relative;
  border-radius: inherit;
  background: ${colors.light};
  border-radius: 6px;
  opacity: ${disabled ? '0.4' : undefined};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  pointer-events: ${disabled ? 'none' : undefined};
  &:first-child {
    margin-right: 6px;
  }
`;
