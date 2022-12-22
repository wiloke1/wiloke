import { combineReducers } from 'redux';
import { reducerChooseTemplateVisible } from './reducerChooseTemplateVisible';
import { reducerAdminSections } from './sections/admin.reducerSections';
import { reducerDraftSections } from './sections/draft.reducerSections';
import { sliceSavedSections } from './sections/user.silceSavedSection';
import { sliceCategory } from './sections/user.reducerCategory';
import { sliceTemplateSections } from './sections/user.sliceSections';
import { sliceTemplateAddons } from './addons/user.sliceAddons';
import { sliceDraftCategory } from './sections/draft.reducerCategory';
import { sliceAdminCategory } from './sections/admin.reducerCategory';
import { sliceDraftAddons } from './addons/draft.sliceAddons';
import { sliceDraftAddonCategory } from './addons/draft.sliceAddonCategory';
import { sliceUserAddonsCategory } from './addons/user.sliceAddonCategory';
import { sliceAdminAddons } from './addons/admin.sliceAddons';
import { sliceAdminAddonCategory } from './addons/admin.sliceAddonCategory';
import { sliceDraftMegaMenu } from './megaMenu/draft.sliceMegaMenu';
import { sliceAdminMegaMenu } from './megaMenu/admin.sliceMegaMenu';
import { sliceEnvato } from './sections/user.sliceEnvato';

const reducersChooseTemplate = combineReducers({
  chooseTemplateVisible: reducerChooseTemplateVisible,
  savedSections: sliceSavedSections.reducer,
  // user
  category: sliceCategory.reducer,
  templateSections: sliceTemplateSections.reducer,

  userAddonsCategory: sliceUserAddonsCategory.reducer,
  templateAddons: sliceTemplateAddons.reducer,

  // dev
  draftSections: reducerDraftSections,
  draftCategory: sliceDraftCategory.reducer,

  draftAddons: sliceDraftAddons.reducer,
  draftAddonCategory: sliceDraftAddonCategory.reducer,

  draftMegaMenu: sliceDraftMegaMenu.reducer,
  envato: sliceEnvato.reducer,

  // admin
  adminSections: reducerAdminSections,
  adminCategory: sliceAdminCategory.reducer,

  adminAddons: sliceAdminAddons.reducer,
  adminAddonsCategory: sliceAdminAddonCategory.reducer,

  adminMegaMenu: sliceAdminMegaMenu,
});

export {
  reducersChooseTemplate,
  reducerChooseTemplateVisible,
  reducerAdminSections,
  reducerDraftSections,
  sliceAdminMegaMenu,
  sliceSavedSections,
  sliceCategory,
  sliceTemplateSections,
  sliceTemplateAddons,
  sliceAdminCategory,
  sliceDraftMegaMenu,
};
