import { AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import { ToPartialKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateListMegamenuOfDraft {
  /** Dữ liệu sẽ apply vào record */
  listMegaMenu: ToPartialKeys<DevSection, 'commandId'>[];
}

interface ResponseSuccess {
  message: string;
  info: DevSection[];
}

/** API được sử dụng để "Admin" khi tạo list megamenu của section */
export const createListMegaMenuOfDraft = async ({ listMegaMenu }: CreateListMegamenuOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/list`,
    method: 'POST',
    data: listMegaMenu,
  });
  return response.data;
};
