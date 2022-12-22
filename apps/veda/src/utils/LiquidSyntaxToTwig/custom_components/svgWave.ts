import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { CustomComponentProps } from './types';

const html = `
<svg
  width="56px"
  height="7px"
  viewBox="0 0 56 7"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  fill="none"
>
  <g transform="translate(-288.000000, -4390.000000)" class="stk:color-gray3" style="stroke: {{ color }}">
      <g transform="translate(135.000000, 4033.000000)">
          <g transform="translate(0.000000, 48.000000)">
              <g transform="translate(153.000000, 310.000000)">
                  <path d="M0,0 C4.64733427,0 4.65894638,2 9.33333333,2 C14.0077203,2 13.9400367,0 18.6666667,0 C23.3932966,0 23.3301172,2 28,2 C32.6698828,2 32.6447946,0 37.3333333,0 C42.0218721,0 41.9540981,2 46.6666667,2 C51.3792353,2 51.3554302,0 56,0"></path>
                  <path d="M0,3 C4.64733427,3 4.65894638,5 9.33333333,5 C14.0077203,5 13.9400367,3 18.6666667,3 C23.3932966,3 23.3301172,5 28,5 C32.6698828,5 32.6447946,3 37.3333333,3 C42.0218721,3 41.9540981,5 46.6666667,5 C51.3792353,5 51.3554302,3 56,3"></path>
              </g>
          </g>
      </g>
  </g>
</svg>`;

export const svgWave = (props: CustomComponentProps<typeof html>) => {
  return Object.keys(props).reduce<string>((res, variableName) => {
    const variableName_ = variableName as keyof CustomComponentProps<typeof html>;
    const variableValue = props[variableName_];
    return res.replace(new RegExp(`{{\\s*${strToRegexpPattern(variableName_)}\\s*}}`, 'g'), variableValue);
  }, html);
};
