import { omit } from 'ramda';
import { ThemeAddon } from 'types/Addons';
import { v4 } from 'uuid';

export const adapterGetAddons = (addonsResponse: ThemeAddon[]): ThemeAddon[] => {
  const _newSectionId = `id_${v4()}`;

  return addonsResponse.map<ThemeAddon>((addon: any) => {
    return {
      ...omit(['modifiedDateTimestamp', 'createdDateTimestamp'], addon),
      ...addon,
      authorName: addon.authorName ?? '',
      id: addon.id ? addon.id : `id_${v4()}`,
      sectionId: addon.body.id ? addon.body.id : _newSectionId,
      body: {
        ...addon.body,
        id: addon.body.id ? addon.body.id : _newSectionId,
        commandId: addon.commandId,
        image: addon.image,
        category: addon.category,
        enable: addon.enable ?? true,
      },
    };
  });
};
