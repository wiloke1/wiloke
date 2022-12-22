import { css } from 'wiloke-react-core';

export const stepper = css`
  position: relative;
  overflow: hidden;
  display: block;
  padding: 20px;
`;

export const stepWrapper = css`
  width: 600px;
  height: 100%;
`;

export const stepperSelector = css`
  position: absolute;
  top: 0;
  height: 100%;
  display: inline-flex;
  /* Animate each step movement */
  transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0s;
`;

export const stepperProgress = css`
  position: absolute;
  top: 15px;
  width: 100%;
  z-index: 9;
`;

export const stepperProgressWrapper = css`
  width: 90%;
  position: relative;
  display: flex;
  margin: auto;
  justify-content: space-between;
`;

export const stepTitle = css`
  text-align: center;
  font-size: 0.7rem;
  align-items: center;
  padding: 0 1rem;
  height: 30px;
`;

export const stepTitleNumber = css`
  font-size: 1rem;
  background: #ceeeff;
  height: 24px;
  width: 24px;
  margin: 0.3rem auto;
  line-height: 1.5;
  border: 3px solid #fff;
  border-radius: 100%;
`;

export const stepperProgressBar = css`
  position: absolute;
  width: 100%;
  height: 3px;
  top: 13px;
  z-index: -1;
  background: #e91e63;
  transition: width 1s cubic-bezier(0.23, 1, 0.32, 1) 0s;
`;
