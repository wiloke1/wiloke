import { changeBlogKey, getBlogs, loadMoreBlogs } from 'store/actions/shopify';
import { BlogApiData } from 'types/Blogs';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type BlogActions = ActionTypes<typeof getBlogs | typeof changeBlogKey | typeof loadMoreBlogs>;

export interface DataState {
  data: BlogApiData[];
  requestStatus: Status;
  loadMoreStatus: Status;
  hasNextPage: boolean;
  message: string;
}

export interface BlogState {
  searchKey: string;
  blogs: Record<string, undefined | DataState>;
}

const defaultState: BlogState = {
  searchKey: '',
  blogs: {},
};

export const defaultBlogDataState: DataState = {
  data: [],
  requestStatus: 'idle',
  loadMoreStatus: 'idle',
  message: '',
  hasNextPage: false,
};

export const reducerBlogs = createReducer<BlogState, BlogActions>(defaultState, [
  handleAction('@Shopify/changeBlogKey', ({ state, action }) => {
    const { searchKey } = action.payload;
    return {
      ...state,
      searchKey,
    };
  }),
  handleAction('@Shopify/getBlogs/request', ({ state, action }) => {
    const { searchKey, blogs } = state;
    const { refresh } = action.payload;
    return {
      ...state,
      blogs: {
        ...blogs,
        [searchKey]: {
          ...(blogs[searchKey] ?? defaultBlogDataState),
          requestStatus: (blogs[searchKey] ?? defaultBlogDataState).data.length > 0 && !refresh ? 'success' : 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/getBlogs/success', ({ state, action }) => {
    const { data, hasNextPage } = action.payload;
    const { blogs, searchKey } = state;
    return {
      ...state,
      blogs: {
        ...blogs,
        [searchKey]: {
          ...(blogs[searchKey] ?? defaultBlogDataState),
          requestStatus: 'success',
          data,
          hasNextPage,
        },
      },
    };
  }),
  handleAction('@Shopify/getBlogs/failure', ({ state, action }) => {
    const { message } = action.payload;
    const { blogs, searchKey } = state;
    return {
      ...state,
      blogs: {
        ...blogs,
        [searchKey]: {
          ...(blogs[searchKey] ?? defaultBlogDataState),
          requestStatus: 'failure',
          message,
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreBlogs/request', ({ state }) => {
    const { searchKey, blogs } = state;
    return {
      ...state,
      blogs: {
        ...blogs,
        [searchKey]: {
          ...(blogs[searchKey] ?? defaultBlogDataState),
          loadMoreStatus: 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreBlogs/success', ({ state, action }) => {
    const { searchKey, blogs } = state;
    return {
      ...state,
      blogs: {
        ...blogs,
        [searchKey]: {
          ...(blogs[searchKey] ?? defaultBlogDataState),
          loadMoreStatus: 'success',
          data: (blogs[searchKey] ?? defaultBlogDataState).data.concat(action.payload.data),
          hasNextPage: action.payload.hasNextPage,
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreBlogs/failure', ({ state }) => {
    const { searchKey, blogs } = state;
    return {
      ...state,
      blogs: {
        ...blogs,
        [searchKey]: {
          ...(blogs[searchKey] ?? defaultBlogDataState),
          loadMoreStatus: 'failure',
        },
      },
    };
  }),
]);
