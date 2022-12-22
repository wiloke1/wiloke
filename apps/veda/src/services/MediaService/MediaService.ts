import { AxiosError, AxiosResponse } from 'axios';
import { ProductItem } from 'components/ChooseImage/reducers/reducerShopify';

import { MyMedia, UploadBase64Screenshot, UploadFile, UploadStock } from 'components/ChooseImage/types/MyMedia';
import { imageUrlToFile } from 'components/ChooseImage/utils/imageUrlToFile';
import configApp from 'configureApp';
import { Role } from 'routes/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { objectToFormData } from 'utils/objectToFormData';
import { waitFor } from 'utils/waitFor';
interface SaveUploadSuccessResponse {
  message: string;
  info: {
    id: string;
    name: string;
    description: null;
    path: null;
    publicUrl: string;
    contentType: null;
    locate: string;
    synced: false;
    width: number;
    height: number;
  };
}

interface GetShopifyMediaResponseSuccess {
  message: string;
  status: string;
  data: {
    items: ProductItem[];
    hasNextPage: boolean;
  };
}

const cUrlRemoveBg = 'https://rm-bg.vedabuilder.com/';

export class MediaService {
  POST_PER_PAGE = 30;

  getMyMedia = async (
    lastCursor: string | undefined,
    role: Role,
    name?: string,
    date?: number,
  ): Promise<{ medias: MyMedia[]; lastCursor: string | undefined; hasNextPage: boolean }> => {
    try {
      interface BE_ExpectParams {
        page?: number; // bắt đầu từ 0
        size?: number; // default: 20 Là số image trả lại trên 1 request
        commandIds?: string; // lấy ảnh chỉ rõ id
        name?: string; // tìm các ảnh có tên chứa các ký tự name
        after?: string; // là commandId. Lấy các ảnh bắt đầu từ sau id này
        isOnlyGetMe: true | false; // dành cho api admin. Nếu là true, sẽ chỉ lấy
        // ảnh của admin. ngược lại, sẽ lấy tất cả ảnh
        userId?: number; // dành cho api admin. Nếu isOnlyGetMe là false, có thể
        // chỉ rõ ID của user mà admin muốn lấy ảnh
        autoScreenshot?: boolean;
        start?: number;
      }
      interface Info {
        id: string;
        name: string;
        description: null;
        path: string;
        publicUrl: string;
        contentType: string;
        locate: string;
        synced: boolean;
        width: number | null;
        height: number | null;
      }
      interface Response {
        message: string;
        info: Info[];
      }

      const res: AxiosResponse<Response> = await fetchAPI.request({
        url: role === 'admin' ? `${configApp.endpoint.admin_medias}/images` : `${configApp.endpoint.me_medias}/images`,
        params: {
          size: this.POST_PER_PAGE,
          after: lastCursor,
          autoScreenshot: false,
          name: name !== '' ? name : undefined,
          start: date ? date : undefined,
        } as BE_ExpectParams,
      });
      return {
        medias: res.data.info.map<MyMedia>(item => ({
          id: item.id,
          width: item.width ? item.width : 0,
          height: item.height ? item.height : 0,
          url: item.publicUrl,
          // url: imageUrl(item.publicUrl, 200),
          name: item.name,
        })),
        lastCursor: res.data.info.length ? res.data.info[res.data.info.length - 1].id : undefined,
        hasNextPage: res.data.info.length > 0 ? true : false,
      };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  getShopifyMedia = async (searchKey?: string): Promise<GetShopifyMediaResponseSuccess> => {
    try {
      const _res: AxiosResponse<GetShopifyMediaResponseSuccess> = await fetchAPI.request({
        url: 'manual-products',
        params: {
          s: searchKey ?? '',
          limit: this.POST_PER_PAGE,
        },
      });
      return _res.data;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  deleteMyMedia = async (id: string | number, role: Role) => {
    interface ResponseSuccess {
      message: string;
    }

    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      method: 'DELETE',
      url: role === 'admin' || role === 'dev' ? `${configApp.endpoint.admin_medias}/images/${id}` : `${configApp.endpoint.me_medias}/images/${id}`,
    });

    return response.data;
  };

  getUrlAfterUpload_ = async (id: string, role: Role) => {
    interface Response {
      message: string;
      info?: {
        status: 'WAITING' | 'SUCCESS';
        url?: string;
        width?: number;
        height?: number;
        name?: string;
      };
    }

    try {
      const response: AxiosResponse<Response> = await fetchAPI.request({
        url:
          role === 'admin' || role === 'dev'
            ? `${configApp.endpoint.admin_medias}/images/${id}/shopify/url`
            : `${configApp.endpoint.me_medias}/images/${id}/shopify/url`,
      });
      return response.data;
    } catch (error) {
      const error_ = error as AxiosError<Response>;
      if (error_.isAxiosError) {
        return error_.response?.data;
      }
      throw error;
    }
  };

  pollingGetUrlAfterUpload = async (id: string, role: Role) => {
    const response = await waitFor({
      cb: this.getUrlAfterUpload_,
      args: [id, role],
      condition: apiResponse => {
        if (apiResponse?.info?.status === 'WAITING') {
          return 'requesting';
        }
        if (apiResponse?.info?.status === 'SUCCESS') {
          return 'success';
        }
        if (!apiResponse?.info) {
          return 'failure';
        }
        return 'failure';
      },
      options: {
        expire: 60000,
      },
    });

    return response?.info;
  };

  uploadFileToMyMedia = async (data: UploadFile, role: Role): Promise<MyMedia> => {
    try {
      // đẩy ảnh lên shopify để lấy thông tin trước
      const uploadResponse: AxiosResponse<SaveUploadSuccessResponse> = await fetchAPI.request({
        method: 'POST',
        url:
          role === 'admin' || role === 'dev'
            ? `${configApp.endpoint.admin_medias}/images/single/file`
            : `${configApp.endpoint.me_medias}/images/single/file`,
        data: objectToFormData({ image: data.file }),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const getUrlResponse = await this.pollingGetUrlAfterUpload(uploadResponse.data.info.id, role);

      return {
        url: getUrlResponse?.url ?? '',
        id: uploadResponse.data.info.id,
        width: getUrlResponse?.width ?? uploadResponse.data.info?.width ?? 0,
        height: getUrlResponse?.height ?? uploadResponse.data.info?.height ?? 0,
        name: getUrlResponse?.name ?? uploadResponse.data.info?.name ?? '',
      };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  uploadStockToMyMedia = async (data: UploadStock, role: Role): Promise<MyMedia> => {
    interface BE_ExpectBodyData {
      url: string;
      autoScreenshot: boolean;
    }
    try {
      const uploadResponse: AxiosResponse<SaveUploadSuccessResponse> = await fetchAPI.request({
        method: 'PUT',
        url:
          role === 'admin' || role === 'dev'
            ? `${configApp.endpoint.admin_medias}/images/single/url`
            : `${configApp.endpoint.me_medias}/images/single/url`,
        data: {
          url: data.src,
          autoScreenshot: false,
        } as BE_ExpectBodyData,
      });

      const getUrlResponse = await this.pollingGetUrlAfterUpload(uploadResponse.data.info.id, role);

      return {
        url: getUrlResponse?.url ?? '',
        id: uploadResponse.data.info.id,
        width: getUrlResponse?.width ?? uploadResponse.data.info?.width ?? 0,
        height: getUrlResponse?.height ?? uploadResponse.data.info?.height ?? 0,
        name: getUrlResponse?.name ?? uploadResponse.data.info?.name ?? '',
      };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  uploadBase64ScreenshotToMyMedia = async (data: UploadBase64Screenshot, role: Role): Promise<MyMedia> => {
    interface BE_ExpectBodyData {
      url: string;
      autoScreenshot: boolean;
    }
    try {
      const uploadResponse: AxiosResponse<SaveUploadSuccessResponse> = await fetchAPI.request({
        method: 'PUT',
        url:
          role === 'admin' || role === 'dev'
            ? `${configApp.endpoint.admin_medias}/images/single/base64`
            : `${configApp.endpoint.me_medias}/images/single/base64`,
        data: {
          url: data.base64,
          autoScreenshot: true,
        } as BE_ExpectBodyData,
      });

      const getUrlResponse = await this.pollingGetUrlAfterUpload(uploadResponse.data.info.id, role);

      return {
        url: getUrlResponse?.url ?? '',
        id: uploadResponse.data.info.id,
        width: getUrlResponse?.width ?? uploadResponse.data.info?.width ?? 0,
        height: getUrlResponse?.height ?? uploadResponse.data.info?.height ?? 0,
        name: getUrlResponse?.name ?? uploadResponse.data.info?.name ?? '',
      };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  removeBackground = async (data: UploadFile, name: string) => {
    // raw data
    type ResponseSuccess = string;
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: cUrlRemoveBg,
      method: 'POST',
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: objectToFormData({ image: data.file }),
      withCredentials: false,
    });

    const b64Response = 'data:image/png;base64,' + Buffer.from(response.data, 'binary').toString('base64');
    const file = await imageUrlToFile({ url: b64Response, name });
    return file;
  };
}
