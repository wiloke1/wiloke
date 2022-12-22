import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { without } from 'ramda';
import { GET_BLOG_PLACEHOLDER } from 'store/reducers/liquid/randomPlaceholderLiquidObject';
import { getCurrentVersion } from 'utils/CacheControl/CacheControl';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';
import { Blog } from 'utils/LiquidSyntaxToTwig';
import { BlogItem, normalizationBlog } from '../utils/Blog';

interface GetBlogsObject {
  handleOfBlogsPicked: string[];
}

interface GetBlogsObjectResponse {
  blogs: Record<string, Blog>;
  failureHandles: string[];
  successHandles: string[];
}

interface BE_Response {
  blogs: BlogItem[];
}
interface BE_Params {
  shopName: string;
  handles: string;
}

const limitBlogHandlesPerRequest = 3;

export const getBlogsObject = async ({ handleOfBlogsPicked }: GetBlogsObject): Promise<GetBlogsObjectResponse> => {
  if (!handleOfBlogsPicked.length) {
    return {
      blogs: {},
      failureHandles: [],
      successHandles: [],
    };
  }
  if (configureApp.apiFake) {
    return {
      blogs: handleOfBlogsPicked.reduce(res => {
        const blog = GET_BLOG_PLACEHOLDER();
        if (blog && blog.handle) {
          return {
            ...res,
            [blog.handle]: blog,
          };
        }
        return res;
      }, {}),
      failureHandles: [],
      successHandles: [],
    };
  } else {
    const handlesForRequest = handleOfBlogsPicked.slice(0, limitBlogHandlesPerRequest);
    const response: AxiosResponse<BE_Response> = await fetchAPI.request({
      baseURL: '',
      url: `${configureApp.endpoint['shopify-connections']}/blogs/static`,
      params: {
        shopName: getShopName(),
        version: getCurrentVersion(),
        handles: handlesForRequest.join(','),
      } as BE_Params,
    });
    const blogs = response.data.blogs.reduce<Record<string, Blog>>((res, blog) => {
      if (blog && blog.handle) {
        return {
          ...res,
          [blog.handle]: normalizationBlog(blog),
        };
      }
      return res;
    }, {});

    return {
      blogs,
      successHandles: handlesForRequest,
      failureHandles: without(handlesForRequest, handleOfBlogsPicked),
    };
  }
};
