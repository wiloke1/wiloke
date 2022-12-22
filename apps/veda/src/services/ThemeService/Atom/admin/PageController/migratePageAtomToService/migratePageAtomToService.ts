import { AxiosResponse } from 'axios';
import { BE_PageInThemeAtom } from 'services/ThemeService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface MigratePageAtomToService {
  /** CommandId của page cần migrate từ Page Atom Service sang Theme Atom Service */
  pageAtomCommandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageInThemeAtom;
}

/** API được sử dụng để move các page atom sang DB của theme atom service -> Phục vụ cho chức năng mở modal mà chọn page để apply page đó vào theme ngoài dashboard */
export const migratePageAtomToService = async ({ pageAtomCommandId }: MigratePageAtomToService) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/imports/${pageAtomCommandId}`,
    method: 'PUT',
  });
  return response.data;
};
