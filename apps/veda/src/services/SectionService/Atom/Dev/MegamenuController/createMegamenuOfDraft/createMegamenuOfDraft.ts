import { AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import { ToPartialKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateMegamenuOfDraft {
  /** Dữ liệu sẽ apply vào record */
  megamenu: ToPartialKeys<DevSection, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: DevSection;
}

/** API được sử dụng để "Dev" khi tạo section có megamenu */
export const createMegamenuOfDraft = async ({ megamenu }: CreateMegamenuOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: megamenu,
  });
  return response.data;
};
