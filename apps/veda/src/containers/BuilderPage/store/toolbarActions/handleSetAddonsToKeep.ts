import { put, select } from 'redux-saga/effects';
import { ThemeAddonsState } from 'store/global/themeAddons';
import { themeAddonsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PageSection } from 'types/Sections';
import { sectionModalDuplicateFlow } from './action';
import { AddonsToKeepItem, setAddonsToKeep } from './sliceAddonsToKeep';

function* handleSetAddonsToKeep(section: PageSection, forDuplicate = false, goBack: () => void) {
  const themeAddons: ThemeAddonsState = yield select(themeAddonsSelector);
  const addonsToKeep = themeAddons.data.reduce((arr, addon) => {
    if (section.addonIds?.includes(addon.sectionId)) {
      return [
        ...arr,
        {
          label: `${addon.label}${forDuplicate && !addon.canAddMulti ? ` (${i18n.t('builderPage.only_have_one')})` : ''}`,
          addonId: addon.sectionId,
          active: false,
          disabled: forDuplicate && !addon.canAddMulti,
        },
      ];
    }
    return arr;
  }, [] as AddonsToKeepItem[]);

  // addonsToKeep.length === 0 tức liquid của section đấy chứa thẻ addons mà addons đấy lại không tồn tại
  // => force duplicate section
  if (addonsToKeep.length === 0 && forDuplicate) {
    yield put(sectionModalDuplicateFlow({ goBack }));
  }
  yield put(setAddonsToKeep(addonsToKeep));
}

export default handleSetAddonsToKeep;
