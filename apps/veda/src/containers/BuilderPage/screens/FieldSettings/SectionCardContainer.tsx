import ImageTextCard from 'components/ImageTextCard';
import { useSaveSection } from 'containers/ChooseTemplate/store/actions';
import { useSetTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions/actionTemplateBoardVisible';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { chooseTemplateVisibleSelector, pageSectionsSelector, sectionIdActiveSelector, sectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { imageUrl } from 'utils/functions/imageUrl';

const SectionCardContainer: FC = () => {
  const { savedStatus } = useSelector(sectionsSelector.userSections);
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const sectionIndex = pageSections.findIndex(section => section.id === sectionIdActive);
  const sectionActive = pageSections[sectionIndex];

  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const { navKeys } = useSelector(chooseTemplateVisibleSelector);
  const saveToFavorite = useSaveSection();

  return (
    <ImageTextCard
      label={sectionActive.label}
      src={sectionActive.image?.src}
      previewImg={sectionActive.image ? imageUrl(sectionActive.image.src, 10) : undefined}
      buttonText={i18n.t('general.change_section')}
      backgroundSize="contain"
      loading={savedStatus[(sectionActive as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client)?.parentCommandId ?? ''] === 'loading'}
      onAdd={() => {
        setTemplateBoardVisible({
          visible: true,
          index: sectionIndex,
          isChange: true,
          navKeys: navKeys.length > 0 ? navKeys : ['sections'],
          sectionType: sectionActive.type,
        });
      }}
      onSave={() => {
        saveToFavorite.request({
          id: (sectionActive as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client)?.parentCommandId ?? '',
          categories: sectionActive.category?.name ? [sectionActive.category.name] : [],
          name: sectionActive.label,
          image: sectionActive.image ?? { src: '', width: 0, height: 0 },
        });
      }}
    />
  );
};

export default SectionCardContainer;
