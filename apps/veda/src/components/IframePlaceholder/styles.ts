import { css } from 'wiloke-react-core';

export const path1 = css`
  stroke-dasharray: 591.36175537px;
  animation-duration: 12s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-name: {
    0% {
      stroke-dashoffset: 591.36175537px;
    }
    22%,
    64% {
      stroke-dashoffset: 0;
    }
    72%,
    100% {
      stroke-dashoffset: -591.36175537px;
    }
  }
`;

export const path2 = css`
  stroke-dasharray: 141.39172363px;
  animation-duration: 12s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-name: {
    0%,
    22% {
      stroke-dashoffset: 141.39172363px;
    }
    32%,
    72% {
      stroke-dashoffset: 0;
    }
    78%,
    100% {
      stroke-dashoffset: -141.39172363px;
    }
  }
`;

export const path3 = css`
  stroke-dasharray: 384.93286133px;
  animation-duration: 12s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-name: {
    0%,
    32% {
      stroke-dashoffset: 384.93286133px;
    }
    50%,
    78% {
      stroke-dashoffset: 0;
    }
    86%,
    100% {
      stroke-dashoffset: -384.93286133px;
    }
  }
`;

// #path1 {
//   animation: move1 12s ease-in-out infinite;
//   stroke-dasharray: 591.36175537px;
// }
// #path2 {
//   animation: move2 12s ease-in-out infinite;
//   stroke-dasharray: 141.39172363px;
// }
// #path3 {
//   animation: move3 12s ease-in-out infinite;
//   stroke-dasharray: 384.93286133px;
// }
// @keyframes move1 {
//   0% {
//     stroke-dashoffset: 591.36175537px;
//   }
//   22%,
//   64% {
//     stroke-dashoffset: 0;
//   }
//   72%,
//   100% {
//     stroke-dashoffset: -591.36175537px;
//   }
// }
// @keyframes move2 {
//   0%,
//   22% {
//     stroke-dashoffset: 141.39172363px;
//   }
//   32%,
//   72% {
//     stroke-dashoffset: 0;
//   }
//   78%,
//   100% {
//     stroke-dashoffset: -141.39172363px;
//   }
// }
// @keyframes move3 {
//   0%,
//   32% {
//     stroke-dashoffset: 384.93286133px;
//   }
//   50%,
//   78% {
//     stroke-dashoffset: 0;
//   }
//   86%,
//   100% {
//     stroke-dashoffset: -384.93286133px;
//   }
// }
// body {
//   display: flex;
//   justify-content: center;
//   height: 100vh;
//   align-items: center;
// }
