import { css } from 'wiloke-react-core';
import { RgbColors } from 'wiloke-react-core/dist/types/RgbColors';

export const container = (colors: RgbColors) => css`
  display: block;

  :global {
    .rst__lineBlock.rst__lineHalfHorizontalRight.rst__lineHalfVerticalBottom,
    .rst__lineBlock.rst__lineHalfHorizontalRight.rst__lineFullVertical {
      display: none !important;

      &::after,
      &::before {
        display: none;
      }
    }

    .rst__lineBlock.rst__lineFullVertical {
      /* display: block !important; */
      &::after,
      &::before {
        display: none;
      }
    }

    .rst__rowWrapper {
      padding: 0;
      border-radius: 6px;
      overflow: hidden;
    }

    .rst__rowWrapper .rst__row {
      position: relative;
      width: 100%;
    }

    /* .rst__moveHandle {
      display: block;
      position: absolute;
      top: 50%;
      left: 5px;
      transform: translateY(-50%);
      margin: auto;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      box-shadow: -3px -6px 0, 3px -6px 0, -3px 0 0, 3px 0 0, -3px 6px 0, 3px 6px 0;
      opacity: 0.7;
      background: none;
    } */

    .rst__rowLandingPad {
      background-color: rgba(${colors.rgbGray3}, 0.8);
      border-radius: 6px;
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
      overflow: hidden !important;
    }

    .rst__rowLandingPad > *,
    .rst__rowCancelPad > * {
      opacity: 0 !important;
      overflow: hidden !important;
    }
    .rst__rowLandingPad::before,
    .rst__rowCancelPad::before {
      display: none !important;
      overflow: hidden !important;
    }

    .rst__rowContents {
      border: 0px;
      min-width: auto;
      border-radius: 0;
      padding: 0 10px;
    }

    .rst__moveHandle,
    .rst__loadingHandle {
      border: 0px;
      border-radius: 0;
    }

    .rst__rowCancelPad {
      background-color: rgba(${colors.rgbDanger}, 0.2);
      border-radius: 6px;
    }

    .rst__node {
      margin-bottom: 6px;
      display: flex;

      & > {
        background-color: white !important;
        opacity: 1 !important;
      }
    }

    /* .rst__tree:has(.rst_node .rst__lineHalfHorizontalRight) {
      padding-left: 20px;
    } */

    .rst__nodeContent {
      /* flex: 0 1 auto;
      left: auto !important;
      position: relative !important;
      top: auto !important; */

      width: 100%;
      height: 100%;
    }

    .rst__lineBlock,
    .rst__absoluteLineBlock {
      display: none;
    }

    .rst__lineChildren::after {
      display: none;
    }
  }
`;

export const buttonContainer = css`
  debug: button-container;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  padding: 10px;
  user-select: none;
`;

export const buttonIcon = css`
  debug: Icon-angle-right;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
`;

export const menuContainer = css`
  debug: Menu-container;
  padding: 10px;
`;
