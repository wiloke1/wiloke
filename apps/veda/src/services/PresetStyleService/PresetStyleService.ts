import { getPresetStyle, getPresetStyles } from './fakeData';

class PresetStyleService {
  async getPresetStyles() {
    return getPresetStyles();
  }

  async getPresetStyle(id: string) {
    return getPresetStyle(id);
  }
}

export { PresetStyleService };
