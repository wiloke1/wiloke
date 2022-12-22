import { PageSection } from 'types/Sections';
import { createAsyncAction } from 'wiloke-react-core/utils';

export interface SetThemeFooters {
  type: 'setThemeFooters';
  payload: {
    footers: PageSection[];
  };
}

export interface SetThemeHeaders {
  type: 'setThemeHeaders';
  payload: {
    headers: PageSection[];
  };
}

export const getThemeHeaders = createAsyncAction([
  '@Global/getThemeHeaders/request',
  '@Global/getThemeHeaders/success',
  '@Global/getThemeHeaders/failure',
])<undefined, { headers: PageSection[] }, undefined>();

export const getThemeFooters = createAsyncAction([
  '@Global/getThemeFooters/request',
  '@Global/getThemeFooters/success',
  '@Global/getThemeFooters/failure',
])<undefined, { footers: PageSection[] }, undefined>();
