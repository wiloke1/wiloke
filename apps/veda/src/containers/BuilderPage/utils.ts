import { SchemaSettingField } from 'types/Schema';
import { getLabel } from 'utils/functions/getLabel';
import { imageUrl } from 'utils/functions/imageUrl';

const getDescription = (value: SchemaSettingField[], componentName: string) => {
  return value
    .map(item => {
      if (typeof item.children === 'object' && item.type !== 'image') {
        return '';
      }
      if (item.type === 'styleBox' || item.type === 'divider') {
        return '';
      }
      if (item.type === 'select' && item.name === 'component') {
        return '';
      }
      const regexp = new RegExp(`\\.component.*["']${componentName}["']`, 'g');
      if (item.deps && !regexp.test(item.deps)) {
        return '';
      }

      const childrenStr = item.children?.toString() || '';
      if (item.children?.src) {
        const imgSmall = imageUrl(item.children.src, 30);
        return `<img src="${imgSmall}" style="width: 16px; height: 13px; border-radius: 3px; object-fit: cover" />`;
      }
      if (!/<|>/g.test(childrenStr) && childrenStr.length > 20) {
        const text = childrenStr.slice(0, 17);
        const label = !!text ? `${getLabel(item.label)}: ` : '';
        return `${label}${text}${text ? '..., ' : ''}`;
      }
      const label = !!childrenStr ? `${getLabel(item.label)}: ` : '';
      return `${label}${childrenStr}${childrenStr ? ', ' : ''}`;
    }, '')
    .join(' ')
    .replace(/,\s+$/g, '');
};

export default getDescription;
