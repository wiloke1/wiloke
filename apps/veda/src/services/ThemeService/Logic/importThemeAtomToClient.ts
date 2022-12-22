import { ImportThemeAtomToClientServiceMessage } from 'hooks/useSocket/useSocketForImportThemeAtomToClientService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface ImportThemeAtomToClientService {
  themeAtomCommandId: string;
  eventType: ImportThemeAtomToClientServiceMessage['eventType'];
  eventId: string;
}

export const importThemeAtomToClientService = async ({ themeAtomCommandId, eventType, eventId }: ImportThemeAtomToClientService) => {
  const { role } = getUserInfo();
  if (role === 'dev' || role === 'admin' || role === 'user') {
    const response = await themeApis.vedaApplication.userApi.theme.importThemeAtom({
      themeAtomCommandId,
      eventType,
      eventId,
    });
    return response;
  }
  throw new RoleException();
};
