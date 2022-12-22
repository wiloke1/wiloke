import { css, Theme } from 'wiloke-react-core';
import bgImage from './bg-message.png';

export const container = css`
  min-height: 60px;
  width: 100%;
  padding: 8px 32px;

  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

export const body = css`
  width: 90%;
  display: flex;
  align-items: center;
`;

export const content = css`
  debug: MessageMaintain-content;
  margin-right: 60px;
`;

export const bell = css`
  debug: MessageMaintain-bell;
  margin-right: 20px;
`;

export const timeContainer = ({ colors, fonts }: Theme) => css`
  debug: MessageMaintain-timeContainer;
  padding: 4px;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${colors.gray2};
  width: 43px;
  height: 40px;
  text-align: center;
  font-family: ${fonts.secondary};
`;

export const timeNumber = ({ colors }: Theme) => css`
  border-radius: 5px;
  background-color: #7a440e;
  color: ${colors.light};
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const timeType = css`
  font-color: #7a440e;
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.6;
`;

export const dot = ({ colors }: Theme) => css`
  padding: 0 9px;
  color: ${colors.light};
  font-size: 16px;
  font-weight: 600;
`;
