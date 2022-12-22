import { SaveForBuilderType } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { pageSectionsSelector, sectionIdCodeVisibleSelector } from 'store/selectors';
import { PreviewImage } from 'types/Page';
import { DevSection, PageSectionType } from 'types/Sections';
import { isSectionMegamenu } from 'utils/functions/checkSectionType';

export const useSaveSection = () => {
  const sectionIdCodeVisible = useSelector(sectionIdCodeVisibleSelector);

  const sections = useSelector(pageSectionsSelector);
  const section = sections.find(section => section.id === sectionIdCodeVisible && !isSectionMegamenu(section.type)) as DevSection | undefined;

  const [type, setType] = useState<SaveForBuilderType>('update');
  const [label, setLabel] = useState(section?.label ?? '');
  const [changelog, setChangelog] = useState(section?.changelog ?? '');
  const [category, setCategory] = useState<{ name: string; description: string }>({
    name: section?.category?.name ?? '',
    description: section?.category?.description ?? '',
  });

  const [createdCategory, setCreateCategory] = useState<{ name: string; description: string }>({
    description: '',
    name: '',
  });

  const [sectionType, setSectionType] = useState<PageSectionType>(section?.type ?? 'default');
  const [image, setImage] = useState<PreviewImage>(section?.image ?? { src: '', width: 0, height: 0 });

  useEffect(() => {
    if (!!section) {
      if (section?.type) {
        setSectionType(section.type);
      }

      if (!!section.changelog) {
        if (typeof section.changelog === 'string') {
          setChangelog(section.changelog);
        } else {
          setChangelog('');
        }
      }

      if (section.label) {
        setLabel(section.label);
      }

      if (section?.category?.name) {
        setCategory({
          name: section.category.name,
          description: section.category.description ?? '',
        });
      }

      if (section.image) {
        setImage(section.image);
      }
    }
  }, [section]);

  return {
    label,
    setLabel,
    changelog,
    setChangelog,
    category,
    setCategory,
    image,
    setImage,
    createdCategory,
    setCreateCategory,
    type,
    setType,
    sectionType,
    setSectionType,
  };
};
