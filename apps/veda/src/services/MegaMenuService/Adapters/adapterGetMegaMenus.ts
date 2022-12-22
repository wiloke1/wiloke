import { omit } from 'ramda';
import { Schema, SectionSettings } from 'types/Schema';
import { PageSection } from 'types/Sections';

const defaultSchema: Schema = {
  blocks: [],
  settings: [],
};

const defaultSettings: SectionSettings = [];

export const adapterGetMegaMenus = (responseMegaMenus: PageSection[]): PageSection[] => {
  return responseMegaMenus.map<PageSection>(item => {
    return {
      // @tuong -> 2 trường này gây section trước và sau save khác nhau -> rerender
      ...omit(['modifiedDateTimestamp', 'createdDateTimestamp'], item),
      ...item,
      type: 'megamenu',
      commandId: item.commandId,
      addonIds: item.addonIds ?? [],
      category: item.category ? item.category : { name: '', commandId: '', description: '' },
      data: {
        ...item.data,
        schema: !item.data?.schema ? defaultSchema : item.data.schema,
        settings: !item.data?.settings ? defaultSettings : item.data.settings,
      },
      enable: item.enable ? item.enable : true,
    } as PageSection;
  });
};
