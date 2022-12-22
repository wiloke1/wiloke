import { SaveForBuilderType } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { pageSectionsSelector, themeAddonsSelector } from 'store/selectors';
import { DevAddon } from 'types/Addons';
import { DevSection } from 'types/Sections';

export const useSaveDevAddons = () => {
  const { activeAddon } = useSelector(themeAddonsSelector);

  const addon = activeAddon as DevAddon | undefined;
  const sections = useSelector(pageSectionsSelector);
  const section = sections.find(item => item.id === addon?.sectionId) as DevSection | undefined;

  // state
  const [type, setType] = useState<SaveForBuilderType>('update');

  const [createdCategory, setCreateCategory] = useState<{ name: string; description: string }>({
    description: '',
    name: '',
  });

  return {
    type,
    setType,
    createdCategory,
    setCreateCategory,
    addon,
    section,
  };
};
