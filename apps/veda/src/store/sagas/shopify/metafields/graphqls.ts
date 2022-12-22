import { OwnerType } from 'types/Metafields';

export const graphqlForGetMetafields = (ownerType: OwnerType) => {
  return `
    query MyQuery {
      metafieldDefinitions(ownerType: ${ownerType}, first: 10) {
        edges {
          node {
            ownerType
            id
            key
            name
            namespace
            description
            type {
              category
              name
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `;
};

export const graphqlForLoadmoreMetafields = (ownerType: OwnerType, cursor: string) => {
  return `
    query MyQuery {
      metafieldDefinitions(ownerType: ${ownerType}, after: ${cursor}, first: 10) {
        edges {
          node {
            ownerType
            id
            key
            name
            namespace
            description
            type {
              category
              name
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `;
};
