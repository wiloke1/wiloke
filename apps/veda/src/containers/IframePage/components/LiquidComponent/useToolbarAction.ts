import setScrollTo from 'containers/IframePage/setScrollTo';
import { PageSectionType } from 'types/Sections';
import { pmChildren } from 'utils/functions/postMessage';
import { ActionType } from '../ComponentToolbar';

const useToolbarAction = () => {
  const toolbarActionMapping: Record<ActionType, (sectionId: string, index: number, type?: PageSectionType) => void> = {
    add_to_bottom: (_id, index, sectionType) => {
      pmChildren.emit('@section/addToBottom', { index: index + 1, sectionType });
    },
    add_to_top: (_id, index, sectionType) => {
      pmChildren.emit('@section/addToTop', { index, sectionType });
    },
    delete: sectionId => {
      pmChildren.emit('@section/delete', { sectionId });
    },
    down: (sectionId, index, sectionType) => {
      pmChildren.emit('@section/sortable', { srcIndex: index, desIndex: index + 1, sectionId, sectionType, direction: 'down' });
      setScrollTo(`[data-id="${sectionId}"]`, { timeout: 0 });
    },
    duplicate: sectionId => {
      pmChildren.emit('@component/duplicate', { sectionId });
    },
    up: (sectionId, index, sectionType) => {
      pmChildren.emit('@section/sortable', { srcIndex: index, desIndex: Math.max(index - 1, 0), sectionId, sectionType, direction: 'up' });
      setScrollTo(`[data-id="${sectionId}"]`, { timeout: 0 });
    },
  };

  const handleToolbarAction = (id: string, index: number, sectionType?: PageSectionType) => (type: ActionType) => {
    toolbarActionMapping[type](id, index, sectionType);
  };

  return handleToolbarAction;
};

export default useToolbarAction;
