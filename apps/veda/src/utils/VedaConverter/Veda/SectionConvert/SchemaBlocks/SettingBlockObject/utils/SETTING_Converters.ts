import { SETTING_SettingAnimate } from '../../../SchemaSettings/SettingAnimate/SettingAnimate';
import { SETTING_SettingAnimateInOut } from '../../../SchemaSettings/SettingAnimateInOut/SettingAnimateInOut';
import { SETTING_SettingArticlePicker } from '../../../SchemaSettings/SettingArticlePicker/SettingArticlePicker';
import { SETTING_SettingBlogPicker } from '../../../SchemaSettings/SettingBlogPicker/SettingBlogPicker';
import { SETTING_SettingChooseImage } from '../../../SchemaSettings/SettingChooseImage/SettingChooseImage';
import { SETTING_SettingCollectionPicker } from '../../../SchemaSettings/SettingCollectionPicker/SettingCollectionPicker';
import { SETTING_SettingColor } from '../../../SchemaSettings/SettingColor/SettingColor';
import { SETTING_SettingDateTime } from '../../../SchemaSettings/SettingDateTime/SettingDateTime';
import { SETTING_SettingDivider } from '../../../SchemaSettings/SettingDivider/SettingDivider';
import { SETTING_SettingDragNavigation } from '../../../SchemaSettings/SettingDragNavigation/SettingDragNavigation';
import { SETTING_SettingFlexOrder } from '../../../SchemaSettings/SettingFlexOrder/SettingFlexOrder';
import { SETTING_SettingFont } from '../../../SchemaSettings/SettingFont/SettingFont';
import { SETTING_SettingHidden } from '../../../SchemaSettings/SettingHidden/SettingHidden';
import { SETTING_SettingIcon } from '../../../SchemaSettings/SettingIcon/SettingIcon';
import { SETTING_SettingLinkPicker } from '../../../SchemaSettings/SettingLinkPicker/SettingLinkPicker';
import { SETTING_SettingMultiProductsPicker } from '../../../SchemaSettings/SettingMultiProductsPicker/SettingMultiProductsPicker';
import { SETTING_SettingRadioGroup } from '../../../SchemaSettings/SettingRadioGroup/SettingRadioGroup';
import { SETTING_SettingResponsive } from '../../../SchemaSettings/SettingResponsive/SettingResponsive';
import { SETTING_SettingSelect } from '../../../SchemaSettings/SettingSelect/SettingSelect';
import { SETTING_SettingSingleProductPicker } from '../../../SchemaSettings/SettingSingleProductPicker/SettingSingleProductPicker';
import { SETTING_SettingSlider } from '../../../SchemaSettings/SettingSlider/SettingSlider';
import { SETTING_SettingSpace } from '../../../SchemaSettings/SettingSpace/SettingSpace';
import { SETTING_SettingStyleBox } from '../../../SchemaSettings/SettingStyleBox/SettingStyleBox';
import { SETTING_SettingSwitch } from '../../../SchemaSettings/SettingSwitch/SettingSwitch';
import { SETTING_SettingTags } from '../../../SchemaSettings/SettingTags/SettingTags';
import { SETTING_SettingText } from '../../../SchemaSettings/SettingText/SettingText';
import { SETTING_SettingTextArea } from '../../../SchemaSettings/SettingTextArea/SettingTextArea';
import { SETTING_SettingTextEditor } from '../../../SchemaSettings/SettingTextEditor/SettingTextEditor';
import { SETTING_SettingTextReadOnly } from '../../../SchemaSettings/SettingTextReadOnly/SettingTextReadOnly';
import { SETTING_SettingVideo } from '../../../SchemaSettings/SettingVideo/SettingVideo';
import { SchemaSettingField } from '../@types/SettingBlockObject';

type Converters =
  | typeof SETTING_SettingAnimate
  | typeof SETTING_SettingAnimateInOut
  | typeof SETTING_SettingArticlePicker
  | typeof SETTING_SettingBlogPicker
  | typeof SETTING_SettingCollectionPicker
  | typeof SETTING_SettingColor
  | typeof SETTING_SettingDateTime
  | typeof SETTING_SettingDivider
  | typeof SETTING_SettingFlexOrder
  | typeof SETTING_SettingFont
  | typeof SETTING_SettingHidden
  | typeof SETTING_SettingIcon
  | typeof SETTING_SettingChooseImage
  | typeof SETTING_SettingLinkPicker
  | typeof SETTING_SettingDragNavigation
  | typeof SETTING_SettingSingleProductPicker
  | typeof SETTING_SettingMultiProductsPicker
  | typeof SETTING_SettingRadioGroup
  | typeof SETTING_SettingResponsive
  | typeof SETTING_SettingTextEditor
  | typeof SETTING_SettingSelect
  | typeof SETTING_SettingSlider
  | typeof SETTING_SettingSpace
  | typeof SETTING_SettingStyleBox
  | typeof SETTING_SettingSwitch
  | typeof SETTING_SettingTags
  | typeof SETTING_SettingText
  | typeof SETTING_SettingTextReadOnly
  | typeof SETTING_SettingTextArea
  | typeof SETTING_SettingVideo;

export const SETTING_Converters: Record<SchemaSettingField['type'], Converters | undefined> = {
  animate: SETTING_SettingAnimate,
  animateInOut: SETTING_SettingAnimateInOut,
  articlePicker: SETTING_SettingArticlePicker,
  blogPicker: SETTING_SettingBlogPicker,
  collectionPicker: SETTING_SettingCollectionPicker,
  color: SETTING_SettingColor,
  date: SETTING_SettingDateTime,
  divider: SETTING_SettingDivider,
  flexOrder: SETTING_SettingFlexOrder,
  font: SETTING_SettingFont,
  hidden: SETTING_SettingHidden,
  icon: SETTING_SettingIcon,
  image: SETTING_SettingChooseImage,
  linkPicker: SETTING_SettingLinkPicker,
  navigation: SETTING_SettingDragNavigation,
  productPicker: SETTING_SettingSingleProductPicker,
  products: SETTING_SettingMultiProductsPicker,
  radioGroup: SETTING_SettingRadioGroup,
  responsive: SETTING_SettingResponsive,
  richText: SETTING_SettingTextEditor,
  select: SETTING_SettingSelect,
  slider: SETTING_SettingSlider,
  space: SETTING_SettingSpace,
  styleBox: SETTING_SettingStyleBox,
  switch: SETTING_SettingSwitch,
  tags: SETTING_SettingTags,
  text: SETTING_SettingText,
  textReadOnly: SETTING_SettingTextReadOnly,
  textarea: SETTING_SettingTextArea,
  video: SETTING_SettingVideo,
};
