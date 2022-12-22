import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { PageType } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { getEndpointRole } from 'utils/functions/getUserInfo';
import { ResponseTemplatePage } from '.';
import { getTemplates } from './dataFake';

export class TemplatesPageService {
  async getTemplatesPage(pageType: PageType, _tabActive: string, limit = 5) {
    if (configureApp.apiFake) {
      return getTemplates();
    }
    const response: AxiosResponse<ResponseTemplatePage> = await fetchAPI.request({
      url: `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/${getEndpointRole()}`,
      params: {
        size: limit,
        isGetMeOnly: true,
        type: pageType,
      },
    });

    const newResponse = {
      info: response.data.info.map(item => {
        return {
          ...item,
          id: item.commandId,
        };
      }),
      message: response.data.message,
    } as ResponseTemplatePage;

    return newResponse;
  }

  async loadMoreTemplate(pageType: PageType, cursor: string): Promise<ResponseTemplatePage> {
    const response: AxiosResponse<ResponseTemplatePage> = await fetchAPI.request({
      url: `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/${getEndpointRole()}/search`,
      params: {
        after: cursor,
        isGetMeOnly: true,
        type: pageType,
      },
    });

    return {
      info: response.data.info.map(item => {
        return {
          ...item,
          id: item.commandId,
        };
      }),
      message: response.data.message,
    };
  }

  async loadMoreMyTemplates(cursor: string): Promise<ResponseTemplatePage> {
    const response: AxiosResponse<ResponseTemplatePage> = await fetchAPI.request({
      url: `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/${getEndpointRole()}/search`,
      params: {
        after: cursor,
        saved: true,
        isGetMeOnly: true,
      },
    });

    return {
      info: response.data.info.map(item => {
        return {
          ...item,
          id: item.commandId,
        };
      }),
      message: response.data.message,
    };
  }

  async getMyTemplates(limit = 20) {
    if (configureApp.apiFake) {
      return {
        info: [],
        message: '',
      };
    }
    const response: AxiosResponse<ResponseTemplatePage> = await fetchAPI.request({
      url: `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/${getEndpointRole()}`,
      params: {
        size: limit,
        saved: true,
        isGetMeOnly: true,
      },
    });

    return {
      info: response.data.info.map(item => {
        return {
          ...item,
          id: item.commandId,
        };
      }),
      message: response.data.message,
    };
  }
}
