import ContextMenu from 'components/ContextMenu';
import { getSectionDropdown } from 'containers/BuilderPage/components/SectionDropDown/data';
import { useGlobalSidebarNavigation } from 'containers/BuilderPage/components/SidebarScreen/useGlobalSidebarNavigation';
import useDropdownActions from 'hooks/useDropdownActions';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSetSectionLabel } from 'store/actions/actionPages';
import { useSetSectionEdittingId } from 'store/global/sectionEdittingId/actions';
import { sectionIdActiveSelector, sectionIdCodeVisibleSelector } from 'store/selectors';
import offset from 'utils/functions/offset';
import { ModalRename } from '../ModalRename/ModalRename';
import { ItemContent } from './ItemContent';

export interface SectionContextMenuProps {
  iframeEl: HTMLIFrameElement | null;
}

export const SectionContextMenu: FC<SectionContextMenuProps> = ({ children, iframeEl }) => {
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const sectionIdCodeVisible = useSelector(sectionIdCodeVisibleSelector);
  const codeVisible = !!sectionIdCodeVisible;
  const navigation = useGlobalSidebarNavigation();
  const setSectionLabel = useSetSectionLabel();
  const {
    sectionActive,
    sectionIdActiveState,
    dropdownActions,
    modalRenameVisible,
    setDisableModalName,
    setSectionIdActiveState,
  } = useDropdownActions(navigation);
  const setSectionEdittingId = useSetSectionEdittingId();
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!!sectionActive?.label) {
      setLabel(sectionActive.label);
    }
  }, [sectionActive?.label]);

  useEffect(() => {
    if (!!iframeEl) {
      const { top, left } = offset(iframeEl);
      setTop(top);
      setLeft(left);
    }
  }, [iframeEl]);

  useEffect(() => {
    setSectionIdActiveState(sectionIdActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIdActive]);

  const handleRename = () => {
    setSectionLabel(sectionIdActiveState, label);
    setDisableModalName();
  };

  return (
    <>
      {codeVisible ? (
        children
      ) : (
        <ContextMenu
          root={iframeEl?.contentDocument?.body}
          top={top}
          left={left}
          triggerContainerCss={{ width: '100%', height: '100%' }}
          Trigger={children}
        >
          {getSectionDropdown().map(item => {
            return (
              <ContextMenu.Item
                key={item.value}
                onClick={async () => {
                  await setSectionEdittingId(sectionIdActiveState);
                  dropdownActions[item.value](sectionIdActiveState);
                }}
              >
                <ItemContent icon={item.icon} label={item.label} />
              </ContextMenu.Item>
            );
          })}
        </ContextMenu>
      )}
      <ModalRename visible={modalRenameVisible} label={label} setLabel={setLabel} onCancel={setDisableModalName} onRename={handleRename} />
    </>
  );
};
