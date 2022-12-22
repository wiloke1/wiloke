import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { difference } from 'lodash';
import { uniq } from 'ramda';
import { select } from 'redux-saga/effects';
import { liquidVariables } from 'services/LiquidVariables';
import { getBlogsObject, setSlugsRequest } from 'store/actions/liquid/actionLiquidVariables';
import { liquidVariablesSelector, pageDataSelector } from 'store/selectors';
import { ArticlePageLiquidVariable } from 'types/Page';
import { SettingBlogPicker } from 'types/Schema';
import { Article } from 'utils/LiquidSyntaxToTwig';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

type SettingBlogPickerResult = Exclude<SettingBlogPicker['children'], undefined>;

// NOTE: @tuong -> Tạo 1 object article khi page là mới tinh
const createPlaceholderArticle = (shopifyRepresentPage: ArticlePageLiquidVariable): Article => {
  if (shopifyRepresentPage?.handle === undefined || shopifyRepresentPage.itemId === undefined) {
    return {
      author: 'Shopify API',
      comment_post_url: `/blogs/${shopifyRepresentPage?.blogHandle}/tuong-1/comments`,
      comments: [],
      comments_count: 0,
      comments_enabled: null,
      content: `The day we switch our closets over from knits and padded layers to a rainbow assortment of cropped crochet tanks and breezy linen blouses is the most wonderful time of year. Not only does it mean that winter's glacial wind has finally softened to become a sun-bathing whisper, but it also signals a sartorial refresh: If we hibernated in earth tones and wool, we can reemerge in daring silhouettes and bright colors.
      <br>
      <br>
      This year's reemergence feels particularly special after a prolonged period of dormancy. There's a sense of urgency to get out and be seen like never before and we, at Fashionista, are taking it as a cue to invest in super-special pieces that will help us stand out for many springs and summers to come. With that in mind, we turned to Nordstrom's designer offering to pick our warm-weather must-haves.
      <br>
      From timeless leather bags in poppy hues to the most perfect daytime dresses, click through to see what Fashionista editors are buying — and lusting after — for sunnier days ahead.`,
      created_at: '2022-06-23 14:21:05 +0700',
      excerpt: null,
      excerpt_or_content: null,
      handle: `${shopifyRepresentPage?.blogHandle}/tuong-1`,
      id: 587710628061,
      image: {
        src: 'https://cdn.shopify.com/s/files/1/0552/5510/5616/files/placeholderimageslifestyle1_large-flnazykqey.jpg?v=1669785896',
        alt: 'Blog post placeholder',
        aspect_ratio: 1.5,
      },
      moderated: null,
      published_at: '2022-06-23 14:21:05 +0700',
      tags: [
        'Accessories',
        'Beauty',
        'Collection',
        'Color',
        'Cosmetics',
        'Fall',
        'Fashion',
        'TipsLife',
        'Style',
        'Makeup',
        'Office',
        'Summer',
        'Vintage',
      ],
      template_suffix: 'veda-62b414400c7e532491724f10',
      title: 'Blog post placeholder',
      updated_at: '2022-06-23 14:21:05 +0700',
      url: `/blogs/${shopifyRepresentPage?.blogHandle}/tuong-1`,
    };
  }
  return null;
};

/** NOTE: Nếu update function này thì xem xét việc update PageLiquidVariable tại src/types/Page.ts để code có thể clean hơn */
export function* handleGetBlogsObject({ payload }: ReturnType<typeof getBlogsObject.request>) {
  const liquidVariablesSelectors: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  const { sections, shopifyRepresentPage: shopifyRepresentPage, type }: ReturnType<typeof pageDataSelector> = yield select(pageDataSelector);
  const { blogSlugsLoaded, blogSlugsLoading, blogSlugsFailed, data } = liquidVariablesSelectors;
  const { blogs: blogsState, blog, articles } = data;

  const _shopifyPresentPage = shopifyRepresentPage as ArticlePageLiquidVariable;

  const isArticlePage = _shopifyPresentPage && _shopifyPresentPage.blogHandle && type === 'article';

  const blogsPicked: SettingBlogPickerResult[] = (
    payload.blogs ??
    (sections ?? []).reduce<SettingBlogPickerResult[]>((res, section) => {
      if (!section.enable) {
        return res;
      }
      const blogSlugs: SettingBlogPickerResult[] = [];
      section.data.settings.forEach(setting => {
        if (setting.type === 'blogPicker' && setting.children) {
          const _children = setting.children as SettingBlogPickerResult;
          blogSlugs.push(_children);
        }
        if (setting.type === 'object') {
          setting.children.forEach(({ children, type }) => {
            if (type === 'blogPicker' && children) {
              const _children = children as SettingBlogPickerResult;
              blogSlugs.push(_children);
            }
          });
        }
      });
      return res.concat(blogSlugs);
    }, [])
  ).concat(isArticlePage ? { id: _shopifyPresentPage.blogId, handle: _shopifyPresentPage.blogHandle, featuredImg: undefined } : []);
  const blogSlugsUniq = uniq(
    payload.blogs
      ? blogsPicked.map(blog => blog.handle)
      : difference(blogsPicked.map(blog => blog.handle).concat(blogSlugsFailed), blogSlugsLoading.concat(blogSlugsLoaded)),
  );

  if (!blogSlugsUniq.length) {
    const payloadForAction = {
      blogs: blogsState,
      articles,
      blog: isArticlePage ? blogsState[_shopifyPresentPage.blogHandle] ?? blog : null,
      article: isArticlePage && _shopifyPresentPage.handle ? articles[_shopifyPresentPage.handle] : createPlaceholderArticle(_shopifyPresentPage),
    };
    yield put(getBlogsObject.success(payloadForAction));
    payload.onSuccess?.(payloadForAction);
    return;
  }

  // Đánh dấu các slug đang trạng thái loading
  yield put(setSlugsRequest.request({ blogs: blogSlugsUniq }));

  try {
    const blogsResponse: Awaited<ReturnType<typeof liquidVariables.getBlogsObject>> = yield retry(3, 1000, liquidVariables.getBlogsObject, {
      handleOfBlogsPicked: blogSlugsUniq,
    });
    const { blogs, failureHandles, successHandles } = blogsResponse;
    const articlesResponse = Object.values(blogs).reduce<Record<string, Article>>((obj, blog) => {
      let articlesOfBlog: Record<string, Article> = {};
      blog?.articles?.forEach(article => {
        if (article && article.handle) {
          articlesOfBlog = {
            ...articlesOfBlog,
            [article.handle]: article as Article,
          };
        }
      });
      return { ...obj, ...articlesOfBlog };
    }, {});

    const payloadForAction = {
      blogs,
      articles: articlesResponse,
      blog: isArticlePage ? blogs[_shopifyPresentPage.blogHandle] ?? blogsState[_shopifyPresentPage.blogHandle] : null,
      article:
        isArticlePage && _shopifyPresentPage.handle
          ? articlesResponse[_shopifyPresentPage.handle] ?? articles[_shopifyPresentPage.handle]
          : createPlaceholderArticle(_shopifyPresentPage),
    };
    yield put(getBlogsObject.success(payloadForAction));
    // Đánh dấu những slug đã được load
    if (successHandles.length) {
      yield put(setSlugsRequest.success({ blogs: successHandles }));
    }
    if (failureHandles.length) {
      yield put(setSlugsRequest.failure({ blogs: failureHandles }));
    }
    payload.onSuccess?.(payloadForAction);
  } catch (error) {
    yield put(getBlogsObject.failure(undefined));
    payload.onFailure?.();
    if (notifyAxiosHandler.isAxiosError(error)) {
      // Đánh dấu những slug load bị lỗi
      yield put(setSlugsRequest.failure({ blogs: blogSlugsUniq }));
    } else {
      yield put(setSlugsRequest.otherException({ blogs: blogSlugsUniq }));
      notifyAxiosHandler.handleError(error as Error);
    }
  }
}

export function* watchGetBlogsObject() {
  yield takeEvery(getActionType(getBlogsObject.request), handleGetBlogsObject);
}
