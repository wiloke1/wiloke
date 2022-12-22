import { css, Theme } from 'wiloke-react-core';

export const container = css`
  padding: 20px;
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

export const title = ({ colors }: Theme) => css`
  background: ${colors.primary};
  background: linear-gradient(to right, ${colors.primary} 0%, ${colors.tertiary} 60%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 550;
`;

export const form = () => css`
  max-width: 500px;
  margin: 25px auto;
  padding: 20px;
  text-align: left;
`;
