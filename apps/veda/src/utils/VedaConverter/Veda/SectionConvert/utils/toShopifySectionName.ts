import { Section } from '../@types/Section';

export const toShopifySectionName = (section: Section) => {
  const theorySectionName = section.label;
  if (theorySectionName.length >= 25) {
    return section.label.substring(0, 20);
  }
  return theorySectionName;
};
