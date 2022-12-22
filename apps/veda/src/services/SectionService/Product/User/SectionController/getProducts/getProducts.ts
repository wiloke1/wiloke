import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ProductSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface ResponseSuccess {
  info: ProductSection[];
  message: string;
}
interface GetProducts {
  type: 'GET FIRST PAGE';
  /** Lọc "Section Product" theo category */
  category: string;
  size?: number;
}
interface LoadmoreProducts {
  type: 'LOADMORE';
  /** Lọc "Section Product" theo category */
  category: string;
  /** Cursor để loadmore */
  lastCursor: string;
  size?: number;
}

/** API lấy về các template section đã được publish bởi "Admin" lên cho user dùng */
export const getProducts = async ({ type, size = 20, ...params }: GetProducts | LoadmoreProducts) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    const { category } = params;
    requestConfig = {
      url: `${baseUrl}/search`,
      params: {
        size,
        categoryNames: category !== '' ? category : undefined,
      },
    };
  } else {
    const { category, lastCursor } = params as LoadmoreProducts;
    requestConfig = {
      url: `${baseUrl}/search`,
      params: {
        size,
        categoryNames: category !== '' ? category : undefined,
        after: lastCursor,
      },
    };
  }

  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);

  return response.data;
};
