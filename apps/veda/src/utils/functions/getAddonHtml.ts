import { Consts } from 'utils/constants/constants';

export const getAddonHtml = (addonsSectionId: string) => `<${Consts.FakeTags.Addons} data-id="${addonsSectionId}"></${Consts.FakeTags.Addons}>`;
