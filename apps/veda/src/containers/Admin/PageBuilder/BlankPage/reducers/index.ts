import { combineReducers } from 'redux';
import { reducerBlankPage as reducerBlank } from './reducerBlankPage';
import { reducerTemplatePopup } from './reducerTemplatePopup';

export const reducerBlankPage = combineReducers({
  reducerTemplatePopup,
  reducerBlank,
});
