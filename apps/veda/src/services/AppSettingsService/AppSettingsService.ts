import { AppSettings } from 'types/AppSettings';
import delay from 'utils/functions/delay';

const data: AppSettings = {
  currentVersion: {
    commandId: '',
    content: '',
    versionId: '',
    version: '',
  },
  jsHookEnabled: true,
  tsSuggestions: window.tsSuggestions,
};

export class AppSettingsService {
  async getAppSettings(): Promise<AppSettings> {
    return new Promise(resolve => {
      resolve(data);
    });
  }

  async postAppSettings(settings: AppSettings) {
    await delay(1000);
    return settings;
  }
}
