import { PageSectionType } from 'types/Sections';

export const isSectionAddons = (type?: PageSectionType) => {
  return ['built-in-add-ons', 'embedded-add-ons', 'third-party-add-ons'].includes(type ?? '');
};

export const isHeader = (type?: PageSectionType) => {
  return type === 'header';
};

export const isFooter = (type?: PageSectionType) => {
  return type === 'footer';
};

export const isMain = (type?: PageSectionType) => {
  return !type;
};

export const isDefault = (type?: PageSectionType) => {
  return type === 'default';
};

export const isSectionMegamenu = (type?: PageSectionType) => {
  return ['megamenu'].includes(type ?? '');
};

export const isSectionAddonsOrMegamenu = (type?: PageSectionType) => {
  return isSectionAddons(type) || isSectionMegamenu(type);
};
