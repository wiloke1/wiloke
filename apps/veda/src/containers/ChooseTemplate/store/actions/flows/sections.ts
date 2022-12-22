import { AdminSection, DevSection } from 'types/Sections';
import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const addAtomSectionNoRequestFlow = createAction('@BuilderPage/addAtomSectionNoRequestFlow', (index: number, section: AdminSection) => ({
  index,
  section,
}));

export const addDraftSectionNoRequestFlow = createAction('@BuilderPage/addDraftSectionNoRequestFlow', (index: number, section: DevSection) => ({
  index,
  section,
}));

export const useAddAtomSectionNoRequestFlow = createDispatchAction(addAtomSectionNoRequestFlow);
export const useAddDraftSectionNoRequestFlow = createDispatchAction(addDraftSectionNoRequestFlow);
