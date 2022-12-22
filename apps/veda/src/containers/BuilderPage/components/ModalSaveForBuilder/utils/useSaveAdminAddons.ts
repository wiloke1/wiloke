import { SaveForBuilderType } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { pageSectionsSelector, themeAddonsSelector } from 'store/selectors';
import { AdminAddon } from 'types/Addons';
import { AdminSection } from 'types/Sections';

export const useSaveAdminAddon = () => {
  const { activeAddon } = useSelector(themeAddonsSelector);
  const sections = useSelector(pageSectionsSelector);

  const addon = activeAddon as AdminAddon | undefined;
  const section = sections.find(item => item.id === addon?.sectionId) as AdminSection | undefined;

  // state
  const [type, setType] = useState<SaveForBuilderType>('update');
  const [createdCategory, setCreateCategory] = useState<{ name: string; description: string }>({
    description: '',
    name: '',
  });

  const [changelog, setChangelog] = useState<string>('');
  const [version, setVersion] = useState<string>(addon?.currentVersion ?? '');

  useEffect(() => {
    if (!!addon) {
      if (addon?.currentVersion) {
        setVersion(addon?.currentVersion ?? '');
      }
    }
  }, [addon]);

  return {
    type,
    setType,
    createdCategory,
    setCreateCategory,
    changelog,
    setChangelog,
    version,
    setVersion,
    addon,
    section,
  };
};
