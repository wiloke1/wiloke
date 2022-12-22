import { watchGetAuthors } from './sagas/watchGetAuthors';
import { watchLoadmoreAuthors } from './sagas/watchLoadmoreAuthors';
import { watchUpdateAuthorRole } from './sagas/watchUpdateAuthorRole';

export { reducerAuthors } from './reducer';

export const sagasAuthors = [watchGetAuthors, watchLoadmoreAuthors, watchUpdateAuthorRole];
