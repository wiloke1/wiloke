import { combineReducers } from 'redux';
import IframePage from './IframePage';
import { reducerSectionsRenderStatus } from './reducers/reducerSectionsRenderStatus';
import { reducerSectionToolbar } from './reducers/reducerSectionToolbar';
import { sliceAddonPositionStart } from './store/sliceAddonsPositionStart';

const reducersIframe = combineReducers({
  addonPositionStart: sliceAddonPositionStart.reducer,
  sectionToolbar: reducerSectionToolbar,
  sectionsRenderStatus: reducerSectionsRenderStatus,
});

export { IframePage, reducersIframe };
export default IframePage;
