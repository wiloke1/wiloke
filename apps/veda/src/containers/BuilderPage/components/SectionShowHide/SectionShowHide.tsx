import BoxCenter from 'components/BoxCenter';
import { FC } from 'react';
import { useToggleVisibleSection } from 'store/actions/actionPages';
import { FontAwesome, FontAwesomeName } from 'wiloke-react-core';

export interface SectionShowHideProps {
  iconName?: FontAwesomeName;
  sectionId: string;
}

const SectionShowHide: FC<SectionShowHideProps> = ({ sectionId, iconName = 'eye' }) => {
  const toggleVisibleSection = useToggleVisibleSection();

  return (
    <BoxCenter
      onClick={() => {
        toggleVisibleSection(sectionId);
      }}
    >
      <FontAwesome type="far" name={iconName} size={14} color="gray6" />
    </BoxCenter>
  );
};

export default SectionShowHide;
