import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { CustomComponentProps } from './types';

const html = `
<svg
  width="60px"
  height="9px"
  viewBox="0 0 60 9"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-3.000000, -47.000000)" stroke-width="2" class="stk:color-gray3" style="stroke: {{ color }}">
          <g transform="translate(0.000000, 45.000000)">
              <polyline points="4 9 9.8 4 15.6 9 21.4 4 27.2 9 33 4 38.8 9 44.6 4 50.4 9 56.2 4 62 9"></polyline>
          </g>
      </g>
  </g>
</svg>`;

export const svgMountain = (props: CustomComponentProps<typeof html>) => {
  return Object.keys(props).reduce<string>((res, variableName) => {
    const variableName_ = variableName as keyof CustomComponentProps<typeof html>;
    const variableValue = props[variableName_];
    return res.replace(new RegExp(`{{\\s*${strToRegexpPattern(variableName_)}\\s*}}`, 'g'), variableValue);
  }, html);
};
