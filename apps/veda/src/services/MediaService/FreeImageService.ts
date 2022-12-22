import axios, { AxiosResponse } from 'axios';
import { FreeImageCategoriesResponse, FreeImagesResponse } from 'components/ChooseImage/types/FreeImage';

const baseUrl = 'https://cors-anywhere.vedabuilder.com/https://burst.shopify.com/api';

async function getFreeImages({ category, search, offset }: { offset: number; category?: string; search?: string }): Promise<FreeImagesResponse> {
  if (category) {
    const response: AxiosResponse<FreeImagesResponse> = await axios.request({
      baseURL: `${baseUrl}/categories/${category}/photos`,
      method: 'get',
      params: {
        limit: 50,
        offset,
      },
    });
    const _data = response.data.data;

    return {
      data: _data,
      metadata: response.data.metadata,
    };
  }
  const response: AxiosResponse<FreeImagesResponse> = await axios.request({
    baseURL: `${baseUrl}/photos${search ? '/search?q=' + search : ''}`,
    method: 'get',
    params: {
      limit: 50,
      offset,
    },
  });

  const _data = response.data.data;

  return {
    data: _data,
    metadata: response.data.metadata,
  };
}

async function getCategoriesOfFreeImage() {
  const response: AxiosResponse<FreeImageCategoriesResponse> = await axios.request({
    baseURL: `${baseUrl}/categories`,
    method: 'get',
    params: {
      limit: 50,
      offset: 0,
    },
  });

  return response.data;
}

export const freeImageService = {
  getFreeImages,
  getCategoriesOfFreeImage,
};
