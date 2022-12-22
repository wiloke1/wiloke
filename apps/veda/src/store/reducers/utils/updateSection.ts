import { Schema, SchemaSettingField, SectionSettings, SettingBlock } from 'types/Schema';
import { AdminSection, PageSection, SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';

interface ComparedField {
  id: string;
  [x: string]: any;
}

function getDeletedFields({ newSettings, oldSettings }: { oldSettings: ComparedField[]; newSettings: ComparedField[] }) {
  return oldSettings.filter(({ id: oldId }) => !newSettings.some(({ id: newId }) => newId === oldId));
}

function getNewFields({ newSettings, oldSettings }: { oldSettings: ComparedField[]; newSettings: ComparedField[] }) {
  return newSettings.filter(({ id: newId }) => !oldSettings.some(({ id: oldId }) => newId === oldId));
}

const compareBlocksOfSchema = (oldBlocks: SettingBlock[], newBlocks: SettingBlock[]): SettingBlock[] => {
  const newFields = getNewFields({ newSettings: newBlocks, oldSettings: oldBlocks }) as SettingBlock[];
  const deletedFieldsInNewVersionIds = getDeletedFields({ oldSettings: oldBlocks, newSettings: newBlocks }).map(item => item.id);

  const updatedFields = oldBlocks.map(oldBlock => {
    const newBlock = newBlocks.find(newSetting => newSetting.id === oldBlock.id);
    if (newBlock) {
      return {
        ...newBlock,
        children: (oldBlock.children as SettingBlock['children']).map(oldBlockChild => {
          const newSettingArrObj = (newBlock.children as SchemaSettingField[]).find(newBlockChild => newBlockChild.id === oldBlockChild.id);
          if (newSettingArrObj) {
            return {
              ...newSettingArrObj,
              children: oldBlockChild.children,
            };
          }
          return oldBlockChild;
        }),
      };
    }
    return oldBlock;
  });

  const result: SettingBlock[] = [...updatedFields, ...newFields].filter(item => !deletedFieldsInNewVersionIds.includes(item.id));
  return result;
};

const compareSettingsOfSchema = (oldSettings: SchemaSettingField[], newSettings: SchemaSettingField[]) => {
  const newFields = getNewFields({ newSettings, oldSettings }) as SchemaSettingField[];
  const deletedFieldsInNewVersionIds = getDeletedFields({ oldSettings, newSettings }).map(item => item.id);

  const updatedFields = oldSettings.map(oldSet => {
    const foundNewSetting = newSettings.find(newSetting => newSetting.id === oldSet.id);
    if (foundNewSetting) {
      return {
        ...foundNewSetting,
        children: oldSet.children,
      };
    }
    return oldSet;
  });

  const result = [...updatedFields, ...newFields].filter(item => !deletedFieldsInNewVersionIds.includes(item.id));

  return result;
};

const compareSettings = (oldSettings: SectionSettings, newSettings: SectionSettings) => {
  const newFields = getNewFields({ oldSettings, newSettings }) as SectionSettings;
  const deletedFieldsInNewVersionIds = getDeletedFields({ oldSettings, newSettings }).map(item => item.id);

  const updatedFields = oldSettings.map(oldSetting => {
    const foundNewSetting = newFields.find(newSetting => newSetting.id === oldSetting.id);
    if (foundNewSetting) {
      if (foundNewSetting.type === 'object' || foundNewSetting.type === 'array') {
        return {
          ...foundNewSetting,
          children: (oldSetting.children as SettingBlock['children']).map(item => {
            const newSettingArrObj = (foundNewSetting.children as SettingBlock['children']).find(foundItem => foundItem.id === item.id);
            if (newSettingArrObj) {
              return {
                ...newSettingArrObj,
                children: item.children,
              };
            }
            return item;
          }),
        };
      } else {
        return {
          ...foundNewSetting,
          children: oldSetting.children,
        };
      }
    }

    return oldSetting;
  });

  const result = [...updatedFields, ...newFields].filter(item => !deletedFieldsInNewVersionIds.includes(item.id)) as SectionSettings;

  return result;
};

const compareSchemas = (oldSchema: Schema, newSchema: Schema): Schema => {
  return {
    blocks: compareBlocksOfSchema(oldSchema.blocks, newSchema.blocks),
    settings: compareSettingsOfSchema(oldSchema.settings, newSchema.settings),
  };
};

export function updateSection(oldSection: PageSection, newSection: PageSection): PageSection {
  const oldSection_ = oldSection as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
  const newSection_ = newSection as AdminSection;

  if (oldSection_.parentCommandId === newSection_.commandId) {
    const updatedSchema = compareSchemas(oldSection_.data.schema, newSection_.data.schema);
    const updatedSettings = compareSettings(oldSection_.data.settings, newSection_.data.settings);

    return {
      ...oldSection_,
      currentVersion: newSection_.currentVersion,
      data: {
        js: newSection_.data.js,
        liquid: newSection_.data.liquid,
        scss: newSection_.data.scss,
        schema: updatedSchema,
        settings: updatedSettings,
        jsHook: newSection_.data.jsHook,
      },
    };
  }

  return oldSection;
}
