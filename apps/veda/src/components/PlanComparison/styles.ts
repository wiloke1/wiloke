import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: PlanComparison-container;
  border: 1px solid ${colors.gray3};
  border-radius: 10px;
  display: flex;
  font-size: clamp(14px, 0.25vw + 13px, 16px);
`;

export const features = css`
  debug: PlanComparison-features;
  position: relative;
  width: 30%;
`;

export const featuresHeader = ({ colors }: Theme) => css`
  debug: PlanComparison-features__header;
  border-radius: 10px 0 0 0;
  position: sticky;
  top: 50px;
  align-items: center;
  background-color: ${colors.gray2};
  border-bottom: 1px solid ${colors.gray3};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 180px;
  padding: 10px;
  z-index: 9;
`;

export const featuresTitle = css`
  debug: PlanComparison-features__title;
  font-size: 20px;
`;

export const featuresContent = ({ colors }: Theme) => css`
  debug: PlanComparison-features__content;
  background-color: ${colors.light};

  li {
    border-bottom: 1px solid ${colors.gray3};
    padding: 19px clamp(15px, 1.875vw + 7.5px, 30px);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  h3 {
    border-bottom: 1px solid ${colors.gray3};
    font-size: clamp(18px, 0.75vw + 15px, 24px);
    padding: 23px 30px;
  }
`;

export const last = css`
  border-bottom: 0 !important;
`;

export const plans = css`
  debug: PlanComparison-plans;
  display: flex;
  position: relative;
  width: 70%;
`;

export const plan = css`
  debug: PlanComparison-plan;
  width: calc(100% / 3);
  text-align: center;
`;

export const planHeader = ({ colors }: Theme) => css`
  debug: PlanComparison-plan__header;
  border-radius: 10px 0 0 0;
  position: sticky;
  top: 50px;
  align-items: center;
  background-color: ${colors.gray2};
  border-bottom: 1px solid ${colors.gray3};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 180px;
  padding: 10px;
  z-index: 9;
`;

export const planTitle = css`
  debug: PlanComparison-plan__title;
  font-size: clamp(16px, 0.5vw + 14px, 20px);
`;

export const planBody = ({ colors }: Theme) => css`
  debug: PlanComparison-plan__body;
  background-color: ${colors.light};

  li {
    border-bottom: 1px solid ${colors.gray3};
    padding: 19px clamp(15px, 1.875vw + 7.5px, 30px);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  h3 {
    border-bottom: 1px solid ${colors.gray3};
    font-size: clamp(18px, 0.75vw + 15px, 24px);
    padding: 23px 30px;
  }

  h3:before {
    content: 'Veda';
    display: block;
    opacity: 0;
  }
`;

export const planPrice = ({ colors }: Theme) => css`
  debug: PlanComparison-plan__price;
  color: ${colors.primary};
  font-size: clamp(26px, 1.125vw + 21.5px, 35px);
  font-weight: 500;

  span {
    color: ${colors.gray7};
    font-size: clamp(16px, 0.5vw + 14px, 20px);
    font-weight: 400;
    vertical-align: middle;
  }
`;

export const planButton = ({ colors }: Theme) => css`
  debug: PlanComparison-plan__button;
  border-radius: 6px;
  background-color: ${colors.primary};
  color: ${colors.light};
  width: 100%;
  max-width: 200px;
  text-align: center;
  padding: 14px 30px;
  font-size: 14px;
`;
