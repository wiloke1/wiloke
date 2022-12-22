import { useSelector } from 'react-redux';
import { pageSectionsSelector, sectionIdActiveSelector } from 'store/selectors';

export const useSectionActive = () => {
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const sectionActive = pageSections.find(section => section.id === sectionIdActive);

  return sectionActive;
};
