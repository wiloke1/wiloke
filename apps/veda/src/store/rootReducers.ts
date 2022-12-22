import { reducersImageGallery } from 'components/ChooseImage/reducers';
import { adminDashboardReducers } from 'containers/Admin';
import { reducerModals } from 'containers/Admin/Modals';
import { sliceCoupon } from 'containers/Admin/PlanManagement/store/sliceCoupon';
import { slicePlan } from 'containers/Admin/PlanManagement/store/slicePlan';
import { slicePresetStyle } from 'containers/Admin/PresetStylesPage';
import { reducersBuilderPage } from 'containers/BuilderPage';
import { reducersChooseTemplate } from 'containers/ChooseTemplate/store/reducers';
import { reducersIframe } from 'containers/IframePage';
import { sliceAskBeforeSave } from 'containers/ModalAskBeforeSave';
import { reducerAuthors } from './global/authors';
import { sliceGlobalMount } from './global/globalMount/slice';
import { slicePageCounter } from './global/pageCounter';
import { reducerRenewData } from './global/renewDataBuilder/reducers';
import { reducerSocket } from './global/socket/reducer';
import reducersGlobal from './reducers';
import { reducerDefaultPickerFieldRelateShopify } from './reducers/liquid/reducerDefaultPickerFieldRelateShopify';
import { reducerLiquidVariables } from './reducers/liquid/reducerLiquidVariables';

const reducers = {
  global: reducersGlobal,
  chooseTemplate: reducersChooseTemplate,
  adminDashboard: adminDashboardReducers,
  modals: reducerModals,
  iframe: reducersIframe,
  imageGallery: reducersImageGallery,
  builderPage: reducersBuilderPage,
  globalMount: sliceGlobalMount.reducer,
  presetStyles: slicePresetStyle.reducer,
  askBeforeSave: sliceAskBeforeSave.reducer,
  defaultPickerFieldRelateShopify: reducerDefaultPickerFieldRelateShopify,
  liquidVariables: reducerLiquidVariables,
  socket: reducerSocket,
  authors: reducerAuthors,
  plan: slicePlan.reducer,
  renewDataBuilder: reducerRenewData,
  pageCounter: slicePageCounter.reducer,
  coupon: sliceCoupon.reducer,
};

export default reducers;
