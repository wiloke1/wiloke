import { ThemeSettings, ThemeTranslations } from 'types/Result';
import { WriteTranslation_BEExpectParameters } from './services/writeTranslationToShopify';

type SyncTranslationParamsExpect = DeepPartial<WriteTranslation_BEExpectParameters>[];
interface HandleGetTranslationParams {
  themeSettings: ThemeSettings;
  eventId: string | undefined;
}
export const handleGetTranslationParams = ({ eventId, themeSettings }: HandleGetTranslationParams): SyncTranslationParamsExpect => {
  const languages = themeSettings.globalTranslations;
  const syncTranslationsParams: SyncTranslationParamsExpect = Object.keys(languages).reduce<SyncTranslationParamsExpect>((result, language) => {
    const language_ = language as keyof ThemeTranslations;
    try {
      const translationContent = languages[language_];
      if (translationContent) {
        return result.concat({
          eventId,
          eventType: 'Sync translation',
          lang: language,
          translation: JSON.parse(translationContent),
        });
      }
      return result;
    } catch {
      return result;
    }
  }, []);

  return syncTranslationsParams;
};
