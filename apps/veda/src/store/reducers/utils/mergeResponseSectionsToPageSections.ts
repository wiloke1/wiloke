import { PageSection } from 'types/Sections';

export const mergeResponseSectionsToPageSections = ({
  originalSections,
  responseSections,
}: {
  originalSections: PageSection[];
  responseSections: PageSection[];
}) => {
  responseSections.forEach(dat => {
    const foundIndex = originalSections.findIndex(ori => ori.id == dat.id);
    if (foundIndex >= 0) {
      originalSections.splice(foundIndex, 1, dat);
    } else {
      originalSections.push(dat);
    }
  });

  return originalSections;
};
