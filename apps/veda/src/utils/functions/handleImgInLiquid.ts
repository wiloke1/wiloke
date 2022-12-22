import { jsonParse } from './jsonParse';

/**
 * @description Hàm này dùng để thay thế filter image_url chỉ có chứa width, height
 * thành append: '&width=xxx'
 */
export const handleImgInLiquid = (liquid: string) => {
  return liquid.replace(/.*\|\s*image_url:\s*(\w*:\s*\d*(,\s*)?)*/g, value => {
    const objStr = value.replace(/.*\|\s*image_url:\s*/, '').trim();
    if (/VEDA_|__src/.test(value) && /width|height/.test(objStr)) {
      const { width, height } = jsonParse(`{${objStr}}`);
      const _width = width ? `&width=${width}` : '';
      const _height = height ? `&height=${height}` : '';
      return `${value.replace(/\|\s*image_url.*/g, '')}| append: '${_width}${_height}'`;
    }
    return value;
  });
};
