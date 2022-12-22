import { PageSection } from 'types/Sections';
import { createAction, createDispatchAction } from 'wiloke-react-core/utils';
import { RenderHtmlStatus } from '../components/LiquidComponent/LiquidComponent';

export interface SetSectionRenderStatus {
  section: PageSection;
  status: RenderHtmlStatus;
}
export const setSectionRenderStatus = createAction('@Sections/setSectionRenderStatus', (payload: SetSectionRenderStatus) => payload);

export const useSetSectionRenderStatus = createDispatchAction(setSectionRenderStatus);
