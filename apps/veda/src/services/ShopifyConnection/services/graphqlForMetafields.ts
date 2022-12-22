import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { Metafield, OwnerType } from 'types/Metafields';
import fetchAPI from 'utils/functions/fetchAPI';

interface ResponseSuccess {
  message: string;
  info: {
    metafieldDefinitions: {
      pageInfo: { hasNextPage: boolean };
      edges: Array<{
        cursor: string;
        node: {
          ownerType: OwnerType;
          id: string;
          key: string;
          name: string;
          namespace: string;
          description: string;
          type: {
            category: string;
            name: string;
          };
        };
      }>;
    };
  };
}

export const graphqlForMetafields = async (graphql: string): Promise<{ metafields: Metafield[]; hasNextPage: boolean }> => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${configureApp.endpoint['shopify-connections']}/metafields`,
    method: 'post',
    data: {
      query: graphql,
    },
  });

  return {
    metafields: response.data.info.metafieldDefinitions.edges.map(edge => ({
      ...edge.node,
      cursor: edge.cursor,
    })),
    hasNextPage: response.data.info.metafieldDefinitions.pageInfo.hasNextPage,
  };
};
