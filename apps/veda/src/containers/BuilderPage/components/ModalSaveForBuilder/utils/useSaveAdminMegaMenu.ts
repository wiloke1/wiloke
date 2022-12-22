import { SaveForBuilderType } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sectionIdCodeVisibleSelector, pageSectionsSelector } from 'store/selectors';
import { PreviewImage } from 'types/Page';
import { AdminSection } from 'types/Sections';

export const useSaveAdminMegaMenu = () => {
  const sectionIdCodeVisible = useSelector(sectionIdCodeVisibleSelector);

  const sections = useSelector(pageSectionsSelector);
  const section = sections.find(section => section.id === sectionIdCodeVisible) as AdminSection | undefined;

  const [methodType, setMethodType] = useState<SaveForBuilderType>('update');

  const [label, setLabel] = useState(section?.label ?? '');
  const [image, setImage] = useState<PreviewImage>(section?.image ?? { src: '', width: 0, height: 0 });

  const [changelog, setChangelog] = useState<string>('');
  const [version, setVersion] = useState<string>(section?.currentVersion ?? '');

  useEffect(() => {
    if (!!section) {
      setLabel(section.label);

      if (section.image) {
        setImage(section.image);
      }

      if (section?.currentVersion) {
        setVersion(section.currentVersion);
      }
    }
  }, [section]);

  return {
    methodType,
    setMethodType,
    label,
    setLabel,
    image,
    setImage,
    section,
    changelog,
    setChangelog,
    version,
    setVersion,
  };
};
