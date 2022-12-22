import { SaveForBuilderType } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sectionIdCodeVisibleSelector, pageSectionsSelector } from 'store/selectors';
import { PreviewImage } from 'types/Page';
import { AdminSection, PageSectionType } from 'types/Sections';
import { isSectionMegamenu } from 'utils/functions/checkSectionType';

export const useSaveAdminSection = () => {
  const sectionIdCodeVisible = useSelector(sectionIdCodeVisibleSelector);

  const sections = useSelector(pageSectionsSelector);
  const section = sections.find(section => section.id === sectionIdCodeVisible && !isSectionMegamenu(section.type)) as AdminSection | undefined;

  const [methodType, setMethodType] = useState<SaveForBuilderType>('update');

  const [label, setLabel] = useState(section?.label ?? '');
  const [image, setImage] = useState<PreviewImage>(section?.image ?? { src: '', width: 0, height: 0 });
  const [category, setCategory] = useState<{ name: string; description: string }>({
    name: section?.category?.name ?? '',
    description: section?.category?.description ?? '',
  });
  const [createdCategory, setCreateCategory] = useState<{ name: string; description: string }>({
    description: '',
    name: '',
  });
  const [type, setType] = useState<PageSectionType>(section?.type ?? 'default');
  const [changelog, setChangelog] = useState<string>('');
  const [version, setVersion] = useState<string>(section?.currentVersion ?? '');

  useEffect(() => {
    if (!!section) {
      setLabel(section.label);
      setType(section.type ?? 'default');

      if (section.image) {
        setImage(section.image);
      }

      if (section?.category?.name) {
        setCategory({
          name: section.category.name ?? '',
          description: section.category.description ?? '',
        });
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
    createdCategory,
    setCreateCategory,
    type,
    setType,
    category,
    setCategory,
    section,
    changelog,
    setChangelog,
    version,
    setVersion,
  };
};
