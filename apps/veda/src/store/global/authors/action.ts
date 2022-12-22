import { Role } from 'routes/types';
import { Author } from 'types/Author';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getAuthors = createAsyncAction(['@Authors/getAuthorsRequest', '@Authors/getAuthorsSuccess', '@Authors/getAuthorsFailure'])<
  { role?: Role },
  { authors: Author[]; page: number; totalPages: number },
  undefined
>();

export const loadmoreAuthors = createAsyncAction([
  '@Authors/loadmoreAuthorsRequest',
  '@Authors/loadmoreAuthorsSuccess',
  '@Authors/loadmoreAuthorsFailure',
])<{ page: number; role?: Role }, { authors: Author[]; page: number; totalPages: number }, undefined>();

export const updateAuthorRole = createAsyncAction([
  '@Authors/updateAuthorRole/request',
  '@Authors/updateAuthorRole/success',
  '@Authors/updateAuthorRole/failure',
])<{ userId: number; role: string }, { userId: number }, { userId: number }>();

export const useGetAuthors = createDispatchAsyncAction(getAuthors);
export const useLoadmoreAuthors = createDispatchAsyncAction(loadmoreAuthors);
export const useUpdateAuthorRole = createDispatchAsyncAction(updateAuthorRole);
