import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { FilterTypePage } from 'containers/Admin/types';
import { PageSettingsResponse, ServerResponsePageService } from 'services/ResultService';
import { PageType } from 'types/Page';
import { PageSettings } from 'types/Result';
import { DeleteAtomVariant } from 'utils/constants/constants';
import fetchAPI from 'utils/functions/fetchAPI';
import { getEndpointRole } from 'utils/functions/getUserInfo';
import { v4 } from 'uuid';
import { GetPageBuilderItemsResponse, GetTemplatePagesResponse } from './types';
import { transformFilterType } from './utils/transformFilterType';

export class PagesBuilderService {
  async getPagesItem(pageType: PageType, filterType: FilterTypePage, s?: string): Promise<GetPageBuilderItemsResponse> {
    if (configureApp.apiFake) {
      return {
        info: [],
        message: '',
      };
    }
    const response: AxiosResponse<GetPageBuilderItemsResponse> = await fetchAPI.request({
      url: `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/${getEndpointRole()}`,
      params: {
        type: pageType,
        label: s ? s : undefined,
        size: 7,
        enable: filterType === 'all' ? undefined : transformFilterType(filterType),
        isGetMeOnly: true,
      },
    });

    return {
      info: response.data.info.map(item => {
        delete (item as any).addonCommandIds;
        delete (item as any).addons;
        delete (item as any).sectionCommandIds;
        delete (item as any).sections;
        delete (item as any).files;
        return {
          ...item,
          id: v4(),
          pageSettings:
            item.pageSettings === undefined
              ? {
                  vendors: [],
                  generalSettings: {
                    headerFooterEnabled: false,
                    label: '',
                    metaDescription: '',
                    metaTitle: '',
                    handle: '',
                    socialShareImage: '',
                    lazyload: false,
                  },
                  globalJs: '',
                  globalScss: '',
                }
              : {
                  ...item.pageSettings,
                  generalSettings: {
                    ...item.pageSettings.generalSettings,
                    handle: item.pageSettings.generalSettings.handle,
                  },
                },
        };
      }),
      message: response.data.message,
    };
  }

  async updateStatusPage(id: string, enable: boolean, isApplyToAll: boolean) {
    const response: AxiosResponse<ServerResponsePageService> = await fetchAPI.request({
      url: `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/${getEndpointRole()}/${id}`,
      method: 'put',
      data: {
        data: {
          page: {
            enable,
            isApplyToAll,
          },
        },
      },
    });

    return response.data;
  }

  async updatePageSettings({ id, pageSettings }: { id: string; pageSettings: PageSettingsResponse }) {
    interface Response {
      message: string;
      info: {
        commandId: string;
        label: string;
        handle: string;
        image: { src: string; width: number; height: number };
        pageSettings: PageSettings;
        sectionCommandIds: string[];
        addonCommandIds: any[];
        type: PageType;
        enable: boolean;
        userId: number;
        createdDateGMT: string;
        modifiedDateGMT: string;
        createdDateTimestamp: number;
        modifiedDateTimestamp: number;
      };
    }
    const response: AxiosResponse<Response> = await fetchAPI.request({
      url: `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/${getEndpointRole()}/${id}`,
      method: 'put',
      data: {
        data: {
          pageSettings,
        },
      },
    });
    const transformData: Response = {
      info: {
        ...response.data.info,
        label: response.data.info.pageSettings.generalSettings.label,
      },
      message: response.data.message,
    };

    return transformData;
  }

  async loadMorePages(lastCursor: string, pageType: PageType, filterType: FilterTypePage, searchKey?: string) {
    if (configureApp.apiFake) {
      return {
        info: [],
        message: 'Đây là fake api',
      };
    }

    const response: AxiosResponse<GetPageBuilderItemsResponse> = await fetchAPI.request({
      url: `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/${getEndpointRole()}/search`,
      params: {
        type: pageType,
        label: searchKey ? searchKey : undefined,
        enable: filterType === 'all' ? undefined : transformFilterType(filterType),
        after: lastCursor,
        size: 5,
        isGetMeOnly: true,
      },
    });

    return {
      info: response.data.info.map(item => {
        delete (item as any).addonCommandIds;
        delete (item as any).addons;
        delete (item as any).sectionCommandIds;
        delete (item as any).sections;
        delete (item as any).files;
        return {
          ...item,
          id: v4(),
          pageSettings:
            item.pageSettings === undefined
              ? {
                  vendors: [],
                  generalSettings: {
                    headerFooterEnabled: false,
                    label: '',
                    metaDescription: '',
                    metaTitle: '',
                    handle: '',
                    socialShareImage: '',
                    lazyload: false,
                  },
                  globalJs: '',
                  globalScss: '',
                }
              : {
                  ...item.pageSettings,
                  generalSettings: {
                    ...item.pageSettings.generalSettings,
                    handle: item.pageSettings.generalSettings.handle,
                  },
                },
        };
      }),
      message: response.data.message,
    };
  }

  async duplicateItem(_name: string) {}

  async getTemplatePages(type?: PageType): Promise<GetTemplatePagesResponse> {
    if (configureApp.apiFake) {
      return {
        info: [],
        message: '',
      };
    } else {
      const response: AxiosResponse<GetTemplatePagesResponse> = await fetchAPI.request({
        url: `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/publish`,
        params: {
          type: type ? type : undefined,
          isGetMeOnly: true,
        },
      });
      return response.data;
    }
  }

  async saveToMyPage(commandId: string, saved: boolean, pageType?: PageType) {
    const response: AxiosResponse<ServerResponsePageService> = await fetchAPI.request({
      url: `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/${getEndpointRole()}/${commandId}`,
      method: 'put',
      data: {
        data: {
          page: {
            saved,
            type: pageType,
          },
        },
      },
    });
    return response.data;
  }

  async deletePage({ commandId, variant }: { commandId: string; variant: DeleteAtomVariant }) {
    let url = '';
    if (variant === 'Delete section/addon/page của product') {
      url = `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/${getEndpointRole()}/${commandId}`;
    }
    await fetchAPI.request({
      url,
      method: 'delete',
    });
  }

  async deleteManyPage(ids: string[]) {
    interface Response {
      message: string;
    }

    const response: AxiosResponse<Response> = await fetchAPI.request({
      method: 'DELETE',
      url: `${configureApp.endpoint.product}/${configureApp.endpoint.pages}/${getEndpointRole()}/pages?backendIds=${ids.join(',')}`,
    });

    return response.data;
  }
}
