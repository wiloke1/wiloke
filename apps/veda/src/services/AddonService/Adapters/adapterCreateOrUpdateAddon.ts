import { ThemeAddon } from 'types/Addons';

export const adapterCreateOrUpdateAddon = (addonResponse: ThemeAddon) => {
  return {
    ...addonResponse,
    sectionId: addonResponse.body.id,
    body: {
      ...addonResponse.body,
      commandId: addonResponse.commandId,
      category: addonResponse.category,
      enable: addonResponse.enable ?? true,
    },
  } as ThemeAddon;
};
