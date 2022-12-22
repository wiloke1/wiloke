import { css, Theme } from 'wiloke-react-core';

export const container = (active: boolean) => ({ colors }: Theme) => css`
  debug: PlanCard-container;
  background-color: ${active ? colors.gray8 : colors.light};
  color: ${active ? colors.gray1 : colors.gray8};
  border: 1px solid ${colors.gray3};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  justify-content: space-between;
  min-height: 100%;
  padding: 30px;
`;

export const header = css`
  debug: PlanCard__header;
  margin-bottom: 10px;
`;

export const button = css`
  debug: PlanCard__button;
  margin-bottom: 30px;
  text-align: center;
`;

export const body = css`
  debug: PlanCard__body;

  li {
    margin-bottom: 12px;
  }
`;

export const divider = (active: boolean) => ({ colors }: Theme) => css`
  debug: PlanCard__divider;
  background-color: ${active ? colors.gray7 : colors.gray3};
  height: 1px;
  margin: 20px 0;
`;

export const learnMore = (active: boolean) => ({ colors }: Theme) => css`
  debug: PlanCard__learn-more;
  display: block;
  margin-top: clamp(30px, 1.25vw + 25px, 40px);
  text-align: center;
  padding: 10px 0;
  font-weight: 500;
  font-size: 16px;
  color: ${active ? colors.light : colors.primary};
  cursor: pointer;
`;

export const title = (active: boolean) => ({ colors }: Theme) => css`
  debug: PlanCard__title;
  font-size: 20px;
  line-height: 1.1;
  color: ${active ? colors.light : colors.gray8};
`;

export const price = (active: boolean) => ({ colors }: Theme) => css`
  font-size: 40px;
  font-weight: 500;
  color: ${active ? colors.light : colors.primary};

  span {
    color: ${colors.gray7};
    font-size: clamp(16px, 0.5vw + 14px, 20px);
    font-weight: 400;
    vertical-align: middle;
  }
`;

export const buttonContent = (active: boolean) => ({ colors }: Theme) => css`
  padding: 18px 30px;
  background-color: ${active ? '#fbc473' : colors.primary};
  color: ${active ? colors.gray8 : colors.light};
  font-size: 16px;
  text-align: center;
  border-radius: 6px;
  max-width: 246px;
  width: 100%;
`;
