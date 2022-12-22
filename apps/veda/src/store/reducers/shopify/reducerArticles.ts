import { changeArticleKey, getArticles, loadMoreArticles, setBlogIdOfArticle } from 'store/actions/shopify';
import { ArticlesApiData } from 'types/Articles';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type ArticleActions = ActionTypes<typeof getArticles | typeof changeArticleKey | typeof loadMoreArticles | typeof setBlogIdOfArticle>;

type BlogId = number;

export interface ArticleDataState {
  articles: ArticlesApiData[];
  requestStatus: Status;
  loadMoreStatus: Status;
  message: string;
  hasNextPage: boolean;
}

interface ArticleState {
  searchKey: string;
  blogId: number;
  data: {
    [blogId: BlogId]: undefined | ArticleDataState;
  };
}

export const defaultArticleDataState: ArticleDataState = {
  articles: [],
  message: '',
  requestStatus: 'idle',
  loadMoreStatus: 'idle',
  hasNextPage: false,
};

const defaultState: ArticleState = {
  searchKey: '',
  blogId: 0,
  data: {},
};

export const reducerArticles = createReducer<ArticleState, ArticleActions>(defaultState, [
  handleAction('@Shopify/changeArticleKey', ({ state, action }) => {
    const { searchKey } = action.payload;
    return {
      ...state,
      searchKey,
    };
  }),
  handleAction('@Shopify/setBlogIdOfArticle', ({ state, action }) => {
    return {
      ...state,
      blogId: action.payload.blogId,
    };
  }),
  handleAction('@Shopify/getArticles/request', ({ state }) => {
    const { blogId } = state;

    return {
      ...state,
      data: {
        ...state.data,
        [blogId]: {
          ...(state.data[blogId] ?? defaultArticleDataState),
          requestStatus: (state.data[blogId] ?? defaultArticleDataState).articles.length > 0 ? 'success' : 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/getArticles/success', ({ state, action }) => {
    const { data, hasNextPage } = action.payload;
    const { blogId } = state;

    return {
      ...state,
      data: {
        ...state.data,
        [blogId]: {
          ...(state.data[blogId] ?? defaultArticleDataState),
          requestStatus: 'success',
          articles: data,
          hasNextPage,
        },
      },
    };
  }),
  handleAction('@Shopify/getArticles/failure', ({ state, action }) => {
    const { message } = action.payload;
    const { blogId } = state;

    return {
      ...state,
      data: {
        ...state.data,
        [blogId]: {
          ...(state.data[blogId] ?? defaultArticleDataState),
          requestStatus: 'failure',
          message,
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreArticles/request', ({ state }) => {
    const { blogId } = state;
    return {
      ...state,
      data: {
        ...state.data,
        [blogId]: {
          ...(state.data[blogId] ?? defaultArticleDataState),
          loadMoreStatus: 'loading',
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreArticles/success', ({ state, action }) => {
    const { data, hasNextPage } = action.payload;
    const { blogId } = state;
    return {
      ...state,
      data: {
        ...state.data,
        [blogId]: {
          ...(state.data[blogId] ?? defaultArticleDataState),
          loadMoreStatus: 'success',
          hasNextPage,
          articles: (state.data[blogId] ?? defaultArticleDataState).articles.concat(data),
        },
      },
    };
  }),
  handleAction('@Shopify/loadMoreArticles/failure', ({ state, action }) => {
    const { message } = action.payload;
    const { blogId } = state;
    return {
      ...state,
      data: {
        ...state.data,
        [blogId]: {
          ...(state.data[blogId] ?? defaultArticleDataState),
          loadMoreStatus: 'failure',
          message,
        },
      },
    };
  }),
]);
