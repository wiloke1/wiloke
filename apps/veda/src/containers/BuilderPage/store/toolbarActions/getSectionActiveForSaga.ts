import { select } from 'redux-saga/effects';
import { pageSectionsSelector } from 'store/selectors';
import { PageSection } from 'types/Sections';

function* getSectionActive(sectionIdActive: string) {
  const pageSections: PageSection[] = yield select(pageSectionsSelector);
  const sectionActive = pageSections.find(section => section.id === sectionIdActive);
  return sectionActive;
}

export default getSectionActive;
