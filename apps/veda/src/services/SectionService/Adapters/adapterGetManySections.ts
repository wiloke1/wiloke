import { omit } from 'ramda';
import { Schema, SectionSettings } from 'types/Schema';
import { PageSection } from 'types/Sections';

const defaultSchema: Schema = {
  blocks: [],
  settings: [],
};

const defaultSettings: SectionSettings = [];

const defaultData: PageSection['data'] = {
  liquid: '',
  schema: defaultSchema,
  settings: defaultSettings,
  js: '',
  jsHook: '',
  scss: '',
};

/* Biến đổi mảng sections của server trả về do thỉnh thoảng server sẽ trả thiếu trường */
export const adapterGetManySections = (responseSections: PageSection[]): PageSection[] => {
  return responseSections.map<PageSection>(item => {
    return {
      // @tuong -> 2 trường này gây section trước và sau save khác nhau -> rerender
      ...omit(['modifiedDateTimestamp', 'createdDateTimestamp'], item),
      ...item,
      type: item.type ?? 'default',
      commandId: item.commandId,
      addonIds: item.addonIds ?? [],
      category: item.category ? item.category : { name: '', commandId: '', description: '' },
      image: item.image
        ? {
            src: item.image.src,
            width: item.image.width,
            height: item.image.height,
          }
        : undefined,
      data: item.data
        ? {
            ...item.data,
            schema: !item.data?.schema ? defaultSchema : item.data.schema,
            settings: !item.data?.settings ? defaultSettings : item.data.settings,
          }
        : defaultData,
      enable: item.enable ? item.enable : true,
    } as PageSection;
  });
};
