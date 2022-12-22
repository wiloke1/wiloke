import BoxCenter from 'components/BoxCenter';
import Dropdown from 'components/Dropdown';
import { useStackNavigator } from 'components/StackNavigator';
import useDropdownActions from 'hooks/useDropdownActions';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSetSectionLabel } from 'store/actions/actionPages';
import { useSetSectionEdittingId } from 'store/global/sectionEdittingId/actions';
import { useSetActiveAddon, useUpdateActiveAddons } from 'store/global/themeAddons';
import { themeAddonsSelector } from 'store/selectors';
import { AdminAddon } from 'types/Addons';
import { AdminSection } from 'types/Sections';
import { isSectionAddons } from 'utils/functions/checkSectionType';
import { pmParent } from 'utils/functions/postMessage';
import { FontAwesome } from 'wiloke-react-core';
import { ModalRename } from '../ModalRename/ModalRename';
import { LeftBarParamList } from '../SidebarScreen/SidebarScreen';
import { getAddonsDropdown, getSectionDropdown, Placement } from './data';

export interface SectionDropDownProps {
  sectionId: string;
  /** Đặt bên trong hay bên ngoài section setting */
  placement?: Placement;
}

const SectionDropDown: FC<SectionDropDownProps> = ({ sectionId, placement = 'out' }) => {
  const setSectionEdittingId = useSetSectionEdittingId();
  const setSectionLabel = useSetSectionLabel();
  const [label, setLabel] = useState('');
  const navigation = useStackNavigator<LeftBarParamList>();
  const {
    sectionActive,
    sectionIdActiveState,
    dropdownActions,
    modalRenameVisible,
    setDisableModalName,
    setSectionIdActiveState,
  } = useDropdownActions(navigation, placement);

  const { activeAddon } = useSelector(themeAddonsSelector);
  const reSetActiveAddon = useSetActiveAddon();
  const updateActiveAddon = useUpdateActiveAddons();

  useEffect(() => {
    if (!!sectionActive?.label) {
      setLabel(sectionActive.label);
    }
  }, [sectionActive?.label]);

  const handleRename = () => {
    setSectionLabel(sectionIdActiveState, label);
    setDisableModalName();
    if (isSectionAddons(sectionActive?.type)) {
      const updatedAddons: AdminAddon = {
        ...(activeAddon as AdminAddon),
        label,
        body: {
          ...(sectionActive as AdminSection),
          label,
        },
      };
      reSetActiveAddon({
        addon: updatedAddons,
      });
      updateActiveAddon({ addons: updatedAddons });
    }
  };

  return (
    <>
      <Dropdown
        data={isSectionAddons(sectionActive?.type) ? getAddonsDropdown(placement) : getSectionDropdown(placement, sectionActive?.type)}
        onClick={async type => {
          await setSectionEdittingId(sectionId);
          dropdownActions[type](sectionId);
        }}
      >
        <BoxCenter
          onClick={() => {
            setSectionIdActiveState(sectionId);
            pmParent.emit('@section/dropdownOpen', { sectionId });
          }}
        >
          <FontAwesome type="far" name="ellipsis-v" size={16} color="gray6" colorHover="primary" />
        </BoxCenter>
      </Dropdown>
      <ModalRename visible={modalRenameVisible} label={label} setLabel={setLabel} onCancel={setDisableModalName} onRename={handleRename} />
    </>
  );
};

export default SectionDropDown;
