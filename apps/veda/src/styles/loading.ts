import { css } from 'wiloke-react-core';

export const animatedLoading = css`
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  animation-name: {
    from,
    50%,
    to {
      opacity: 1;
    }

    25%,
    75% {
      opacity: 0.6;
    }
  }
`;
