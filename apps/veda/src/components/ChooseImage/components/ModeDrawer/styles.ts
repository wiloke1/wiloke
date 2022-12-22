import { css } from 'wiloke-react-core';
import transparentSvg from '../../transparency.png';

export const actions = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
  align-items: center;
`;

export const imageContainer = css`
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
  background-image: url(${transparentSvg});
  background-size: contain;

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;

export const input = css`
  flex: 1 1 55%;
  height: 41px;
`;

export const button = css`
  flex: 1 1 45%;
  padding-left: 4px;
`;
