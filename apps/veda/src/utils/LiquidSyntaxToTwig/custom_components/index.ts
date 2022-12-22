import { at } from 'utils/at';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { getMatches } from '../utils/getMatches';
import { svgMountain } from './svgMountain';
import { svgWave } from './svgWave';

export const custom_component = (liquid: string) => {
  return liquid.replace(/(<([^>]+)>)/g, htmlTag => {
    if (htmlTag.includes('svg-mountain')) {
      const propKeys_: Parameters<typeof svgMountain>[0] = { color: '' };
      Object.keys(propKeys_).forEach(key => {
        const key_ = key as keyof typeof propKeys_;
        const attributeClause = at(getMatches(htmlTag, new RegExp(`${strToRegexpPattern(key_)}=["']{{(.*?)}}["']`, 'g')), 0);
        if (attributeClause) {
          const [_, attributeValue = ''] = attributeClause.split('=').map(item => item.trim());
          // Bỏ đi 2 dấu "" ở đầu và cuối
          propKeys_[key_] = attributeValue.replace(/\n/g, '').slice(1, attributeValue.length - 1);
        }
      });
      return svgMountain(propKeys_);
    }
    if (htmlTag.includes('svg-wave')) {
      const propKeys_: Parameters<typeof svgWave>[0] = { color: '' };
      Object.keys(propKeys_).forEach(key => {
        const key_ = key as keyof typeof propKeys_;
        const attributeClause = at(getMatches(htmlTag, new RegExp(`${strToRegexpPattern(key_)}=["']{{(.*?)}}["']`, 'g')), 0);
        if (attributeClause) {
          const [_, attributeValue = ''] = attributeClause.split('=').map(item => item.trim());
          // Bỏ đi 2 dấu "" ở đầu và cuối
          propKeys_[key_] = attributeValue.replace(/\n/g, '').replace(/(^"|"$)/g, '');
        }
      });
      return svgWave(propKeys_);
    }
    return htmlTag;
  });
};
