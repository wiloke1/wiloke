import { css } from 'wiloke-react-core';

const getIndicatorSize = (size: number) => {
  return `${size}px`;
};

const getItemClip = (size: number) => {
  return `rect(0, ${size}px, ${size}px, ${size / 2}px)`;
};

export const container = css`
  debug: VedaLoadingItem-container;
  display: inline-block;
  position: relative;
`;

export const svg = (size: number) => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${size - 30}px;
`;

export const indicator = (size: number) => css`
  debug: VedaLoadingItem-indicator;
  position: relative;
  width: ${getIndicatorSize(size)};
  height: ${getIndicatorSize(size)};
`;

export const item = (size: number) => css`
  debug: VedaLoadingItem-item;
  height: 100%;
  width: 100%;
  position: absolute;
  transform: translateZ(0);
  clip: ${getItemClip(size)};
  animation-duration: 1.2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: {
    0% {
      visibility: hidden;
      display: none;
      transform: rotate(0);
    }
    100% {
      visibility: visible;
      display: block;
      transform: rotate(220deg);
    }
  }
`;

export const itemChild = css`
  debug: VedaLoadingItem-itemChild;
  position: absolute;
  top: 0;
  left: 0;
  color: inherit;
  clip: inherit;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  box-shadow: inset 0 0 0 2px;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-name: {
    0% {
      box-shadow: inset 0 0 0 3px;
      transform: rotate(-140deg);
    }
    50% {
      box-shadow: inset 0 0 0 3px;
    }
    100% {
      box-shadow: inset 0 0 0 3px;
      transform: rotate(140deg);
    }
  }
`;
