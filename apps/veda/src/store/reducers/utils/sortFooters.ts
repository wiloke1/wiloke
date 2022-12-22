import { lastIndexOf, insertAll } from 'ramda';
import { PageSection } from 'types/Sections';
import { isDefault, isMain, isFooter, isSectionAddonsOrMegamenu, isHeader } from 'utils/functions/checkSectionType';

export const sortFooters = (sections: PageSection[]) => {
  let result: PageSection[] = [];
  const mainSections = sections.filter(section => isDefault(section.type) || isMain(section.type));
  const footerSections = sections.filter(section => isFooter(section.type));
  const headerSections = sections.filter(section => isHeader(section.type));
  const addonsOrMegaMenus = sections.filter(section => isSectionAddonsOrMegamenu(section.type));

  // Nếu tồn tại mega menu hoặc addon thì add vào trước addon || mega menu
  if (addonsOrMegaMenus.length > 0) {
    const firstIdx = sections.findIndex(section => section.id === addonsOrMegaMenus[0].id);
    result = insertAll(firstIdx, footerSections, [...headerSections, ...mainSections, ...addonsOrMegaMenus]);
  } else {
    // không thì add vào cuối mảng
    const lastIdx = lastIndexOf(sections[sections.length - 1], sections);
    result = insertAll(lastIdx + 1, footerSections, [...headerSections, ...mainSections]);
  }

  return result;
};
