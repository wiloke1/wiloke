import { AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface RejectAtom {
  /** CommandId của section sẽ unpublish */
  commandId: string;
  /** Id của dev sẽ được gán vào để sửa */
  devId?: number;
  /** Comment của admin nhắn nhủ với dev */
  comment?: string;
}
interface ResponseSuccess {
  message: string;
  info: DevSection;
}

/** API được sử dụng để "Admin" gỡ từ "Atom" về "Drafts" khi có trường hợp lỗi khẩn cấp */
export const rejectAtom = async ({ commandId, devId, comment }: RejectAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'PUT',
    url: `${baseUrl}/rejects/${commandId}`,
    params: {
      devId,
      comment,
    },
  });

  return response.data;
};
