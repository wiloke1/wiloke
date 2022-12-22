import { AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateMegamenuOfDraft {
  /** Dữ liệu sẽ apply vào record */
  megamenu: DevSection;
}

interface ResponseSuccess {
  message: string;
  info: DevSection;
}

/** API được sử dụng để "Dev" update megamenu của section atom */
export const updateMegamenuOfDraft = async ({ megamenu }: UpdateMegamenuOfDraft) => {
  const { commandId } = megamenu;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: megamenu,
  });

  return response.data;
};
