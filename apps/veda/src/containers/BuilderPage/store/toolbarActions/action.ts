import { PageSectionType } from 'types/Sections';
import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export interface SectionDuplicateFlowParams {
  sectionIdActive: string;
  goBack: () => void;
}

export interface SectionDeleteFlowParams extends SectionDuplicateFlowParams {}

export const sectionDuplicateFlow = createAction('@BuilderPage/sectionDuplicateFlow', (args: SectionDuplicateFlowParams) => args);
export const sectionModalDuplicateFlow = createAction('@BuilderPage/sectionModalDuplicateFlow', (args: { goBack: () => void }) => args);
export const cancelModalDuplicateFlow = createAction('@BuilderPage/cancelModalDuplicateFlow');

export const sectionDeleteFlow = createAction('@BuilderPage/sectionDeleteFlow', (args: SectionDeleteFlowParams) => args);

export const deleteAllSectionsFlow = createAction('@BuilderPage/deleteAllSectionsFlow');

export const sortSectionsFlow = createAction(
  '@BuilderPage/sortSectionsFlow',
  (srcIndex: number, desIndex: number, sectionId: string, sectionType?: PageSectionType, direction?: 'up' | 'down') => ({
    srcIndex,
    desIndex,
    sectionId,
    sectionType,
    direction,
  }),
);

export const useSectionDuplicateFlow = createDispatchAction(sectionDuplicateFlow);
export const useSectionModalDuplicateFlow = createDispatchAction(sectionModalDuplicateFlow);
export const useCancelModalDuplicateFlow = createDispatchAction(cancelModalDuplicateFlow);
export const useDeleteAllSectionsFlow = createDispatchAction(deleteAllSectionsFlow);

export const useSectionDeleteFlow = createDispatchAction(sectionDeleteFlow);
export const useSortSectionFlow = createDispatchAction(sortSectionsFlow);
