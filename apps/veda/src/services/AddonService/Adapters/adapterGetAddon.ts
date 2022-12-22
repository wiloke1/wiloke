import { ProductAddon, ThemeAddon } from 'types/Addons';
import { v4 } from 'uuid';

export const adapterGetAddon = (addon: ThemeAddon) => {
  const _newSectionId = `id_${v4()}`;

  return {
    ...addon,
    id: `id_${v4()}`,
    sectionId: addon.sectionId ? addon.sectionId : _newSectionId,
    body: {
      ...addon.body,
      id: addon.sectionId ? addon.sectionId : _newSectionId,
      commandId: addon.commandId,
      parentCommandId: (addon as ProductAddon).parentCommandId === undefined ? '' : (addon as ProductAddon).parentCommandId,
      image: addon.image,
      category: addon.category,
      enable: addon.enable ?? true,
    },
  } as ThemeAddon;
};
