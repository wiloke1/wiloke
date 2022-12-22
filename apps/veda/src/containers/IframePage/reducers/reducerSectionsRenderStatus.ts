import { PageSection } from 'types/Sections';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { setSectionRenderStatus } from '../actions/actionSectionsRenderStatus';
import { RenderHtmlStatus } from '../components/LiquidComponent/LiquidComponent';

type State = Record<
  string,
  {
    section: PageSection;
    status: RenderHtmlStatus;
  }
>;
type Actions = ActionTypes<typeof setSectionRenderStatus>;
const initialState: State = {};

export const reducerSectionsRenderStatus = createReducer<State, Actions>(initialState, [
  handleAction('@Sections/setSectionRenderStatus', ({ state, action }) => {
    const { id } = action.payload.section;
    return {
      ...state,
      [id]: action.payload,
    };
  }),
]);
