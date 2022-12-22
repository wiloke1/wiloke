import { PageSection, PageSectionType } from 'types/Sections';

export const reorderSectionWithType = (list: PageSection[], startIndex: number, endIndex: number, type?: PageSectionType) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, { ...removed, type: type || removed.type });

  return result;
};
