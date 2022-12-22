import { Schema } from 'types/Schema';

interface ComparedField {
  id: string;
  [x: string]: any;
}
function getDeletedFields({ newSettings, oldSettings }: { oldSettings: ComparedField[]; newSettings: ComparedField[] }) {
  return newSettings.filter(({ id: newId }) => !oldSettings.some(({ id: oldId }) => newId === oldId));
}

function getNewFields({ newSettings, oldSettings }: { oldSettings: ComparedField[]; newSettings: ComparedField[] }) {
  return oldSettings.filter(({ id: oldId }) => !newSettings.some(({ id: newId }) => newId === oldId));
}

function getUpdatedFields({ newSettings, oldSettings }: { oldSettings: ComparedField[]; newSettings: ComparedField[] }) {
  return newSettings.filter(({ id: newSettingId }) => oldSettings.some(({ id: oldSettingId }) => newSettingId === oldSettingId));
}

export function* handleCompareSettings(oldSchema: Schema, newSchema: Schema) {
  return {
    // settings
    newSettings: getNewFields({ newSettings: oldSchema.settings, oldSettings: newSchema.settings }) as Schema['settings'],
    updatedSettings: getUpdatedFields({ newSettings: oldSchema.settings, oldSettings: newSchema.settings }) as Schema['settings'],
    deletedSettings: getDeletedFields({ newSettings: oldSchema.settings, oldSettings: newSchema.settings }) as Schema['settings'],
    // blocks
    newBlocks: getNewFields({ newSettings: oldSchema.blocks, oldSettings: newSchema.blocks }) as Schema['blocks'],
    updatedBlocks: getUpdatedFields({ newSettings: oldSchema.blocks, oldSettings: newSchema.blocks }) as Schema['blocks'],
    deletedBlocks: getDeletedFields({ newSettings: oldSchema.blocks, oldSettings: newSchema.blocks }) as Schema['blocks'],
  };
}

export function* handleCompareString(oldString: string, newString: string) {
  const result = oldString.localeCompare(newString);
  if (result === 0) {
    return 'equals';
  } else {
    return 'changes';
  }
}
