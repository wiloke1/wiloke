import { StackNavigatorState } from 'components/StackNavigator/types';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useSetModalAdminAddonsVisible, useSetModalDevAddonsVisible } from 'containers/BuilderPage/store/saveForBuilder/slice';
import { useSectionDeleteFlow, useSectionDuplicateFlow } from 'containers/BuilderPage/store/toolbarActions/action';
import { useSetTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions/actionTemplateBoardVisible';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddToFooter, useAddToHeader, useAddToMain } from 'store/actions/actionPages';
import { useSetSectionIdActive } from 'store/actions/actionSectionIdActive';
import { useReorderFields } from 'store/global/allowReorderingFields/slice';
import { useSetSectionIdCodeVisible } from 'store/global/sectionIdCodeVisible/slice';
import { useSetActiveAddon } from 'store/global/themeAddons';
import { pageSectionsSelector, themeAddonsSelector } from 'store/selectors';
import { PageSection } from 'types/Sections';
import { Consts } from 'utils/constants/constants';
import { isSectionAddons } from 'utils/functions/checkSectionType';
import fileDownload from 'utils/functions/fileDownload';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pmParent } from 'utils/functions/postMessage';
import { Placement } from '../containers/BuilderPage/components/SectionDropDown/data';

export interface AddonsToKeepItem {
  label: string;
  addonId: string;
  active: boolean;
  disabled: boolean;
}

const useDropdownActions = (navigation: StackNavigatorState<LeftBarParamList>, placement: Placement = 'out') => {
  const [sectionIdActiveState, setSectionIdActiveState] = useState('');
  const [modalRenameVisible, setModalRenameVisible] = useState(false);
  const pageSections = useSelector(pageSectionsSelector);
  const sectionActive = pageSections.find(section => section.id === sectionIdActiveState);
  const { data: themeAddons } = useSelector(themeAddonsSelector);

  const setSectionIdCodeVisible = useSetSectionIdCodeVisible();
  const reorderFields = useReorderFields();
  const setSectionIdActive = useSetSectionIdActive();
  const addToHeader = useAddToHeader();
  const addToMain = useAddToMain();
  const addToFooter = useAddToFooter();
  const sectionDuplicateFlow = useSectionDuplicateFlow();
  const sectionDeleteFlow = useSectionDeleteFlow();
  const setModalDevAddonsVisible = useSetModalDevAddonsVisible();
  const setModalAdminAddonsVisible = useSetModalAdminAddonsVisible();

  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const setActiveAddon = useSetActiveAddon();
  const { role } = getUserInfo();

  const dropdownActions: Record<string, (sectionId: string) => void> = {
    editcode: sectionId => {
      setSectionIdCodeVisible({ sectionId });
      setSectionIdActive('');
      pmParent.emit('@section/sectionIdActive', '');
    },
    duplicate: async () => {
      sectionDuplicateFlow({
        sectionIdActive: sectionIdActiveState,
        goBack: navigation.goBack,
      });
    },
    delete: () => {
      sectionDeleteFlow({
        sectionIdActive: sectionIdActiveState,
        goBack: navigation.goBack,
      });
    },
    rename: () => {
      setModalRenameVisible(true);
    },
    reorder: () => {
      if (placement === 'in') {
        reorderFields(true);
      }
    },
    export: sectionId => {
      const currentSection = pageSections.find(item => item.id === sectionId);
      if (currentSection && !isSectionAddons(currentSection.type)) {
        const data = JSON.stringify(currentSection);
        const name = `Section-${currentSection.label.replace(/\s/g, '-')}.${Consts.AppName}`;
        fileDownload({
          data,
          name,
        });
      } else {
        const currentAddons = themeAddons.find(item => item.sectionId === sectionId);
        const data = JSON.stringify(currentAddons);
        const name = `Addons-${currentAddons?.label.replace(/\s/g, '-')}.${Consts.AppName}`;
        fileDownload({
          data,
          name,
        });
      }
    },
    move_to_header: addToHeader,
    move_to_main: addToMain,
    move_to_footer: addToFooter,
    setting: sectionId => {
      const currentAddons = themeAddons.find(item => item.sectionId === sectionId);
      if (currentAddons) {
        setActiveAddon({ addon: currentAddons });
        if (role === 'dev') {
          setModalDevAddonsVisible(true);
        }
        if (role === 'admin') {
          setModalAdminAddonsVisible(true);
        }
      }
    },
    import: sectionId => {
      const sectionIndex = pageSections.findIndex(section => section.id === sectionId);
      const currentSection = pageSections.find(item => item.id === sectionId) as PageSection;
      if (isSectionAddons(currentSection.type)) {
        setTemplateBoardVisible({
          navKeys: ['import', 'Addons'],
        });
      } else {
        setTemplateBoardVisible({
          navKeys: ['import', 'Section'],
        });
      }
      setTemplateBoardVisible({ visible: true, index: sectionIndex });
    },
  };

  const setDisableModalName = () => {
    setModalRenameVisible(false);
  };

  return {
    dropdownActions,
    modalRenameVisible,
    sectionActive,
    sectionIdActiveState,
    setDisableModalName,
    setSectionIdActiveState,
  };
};

export default useDropdownActions;
