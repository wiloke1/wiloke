import { AxiosResponse } from 'axios';
import { BE_ThemeDraft } from 'services/ThemeService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface RejectAtom {
  /** CommandId của theme atom sẽ bị reject */
  commandId: string;
  /** UserId được gán trách nhiệm sửa */
  assignTo: number;
  /** Message */
  comment: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeDraft;
}

/** API được sử dụng để "Admin" gỡ từ "Atom" về "Drafts" khi có trường hợp lỗi khẩn cấp */
export const rejectAtom = async ({ commandId, assignTo, comment }: RejectAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/rejects/${commandId}`,
    method: 'PUT',
    params: {
      assignTo,
      comment,
    },
  });
  return response.data;
};
