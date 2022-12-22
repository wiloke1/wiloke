import { PageSection } from 'types/Sections';
import { v4 } from 'uuid';

/* Khi cài 1 section của atom admin hoặc product cần tạo 1 fe id mới để tránh bị trùng key */
export const adapterGetMegaMenu = (section: PageSection) => {
  return {
    ...section,
    id: `id_${v4()}`,
    type: 'megamenu',
    addonIds: section.addonIds ?? [],
    data: section.data,
  } as PageSection;
};
