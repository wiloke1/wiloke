import { LIQUID_SettingAnimate } from '../../../SchemaSettings/SettingAnimate/SettingAnimate';
import { LIQUID_SettingAnimateInOut } from '../../../SchemaSettings/SettingAnimateInOut/SettingAnimateInOut';
import { LIQUID_SettingArticlePicker } from '../../../SchemaSettings/SettingArticlePicker/SettingArticlePicker';
import { LIQUID_SettingBlogPicker } from '../../../SchemaSettings/SettingBlogPicker/SettingBlogPicker';
import { LIQUID_SettingChooseImage } from '../../../SchemaSettings/SettingChooseImage/SettingChooseImage';
import { LIQUID_SettingCollectionPicker } from '../../../SchemaSettings/SettingCollectionPicker/SettingCollectionPicker';
import { LIQUID_SettingColor } from '../../../SchemaSettings/SettingColor/SettingColor';
import { LIQUID_SettingDateTime } from '../../../SchemaSettings/SettingDateTime/SettingDateTime';
import { LIQUID_SettingDivider } from '../../../SchemaSettings/SettingDivider/SettingDivider';
import { LIQUID_SettingDragNavigation } from '../../../SchemaSettings/SettingDragNavigation/SettingDragNavigation';
import { LIQUID_SettingFlexOrder } from '../../../SchemaSettings/SettingFlexOrder/SettingFlexOrder';
import { LIQUID_SettingFont } from '../../../SchemaSettings/SettingFont/SettingFont';
import { LIQUID_SettingHidden } from '../../../SchemaSettings/SettingHidden/SettingHidden';
import { LIQUID_SettingIcon } from '../../../SchemaSettings/SettingIcon/SettingIcon';
import { LIQUID_SettingLinkPicker } from '../../../SchemaSettings/SettingLinkPicker/SettingLinkPicker';
import { LIQUID_SettingMultiProductsPicker } from '../../../SchemaSettings/SettingMultiProductsPicker/SettingMultiProductsPicker';
import { LIQUID_SettingRadioGroup } from '../../../SchemaSettings/SettingRadioGroup/SettingRadioGroup';
import { LIQUID_SettingResponsive } from '../../../SchemaSettings/SettingResponsive/SettingResponsive';
import { LIQUID_SettingSelect } from '../../../SchemaSettings/SettingSelect/SettingSelect';
import { LIQUID_SettingSingleProductPicker } from '../../../SchemaSettings/SettingSingleProductPicker/SettingSingleProductPicker';
import { LIQUID_SettingSlider } from '../../../SchemaSettings/SettingSlider/SettingSlider';
import { LIQUID_SettingSpace } from '../../../SchemaSettings/SettingSpace/SettingSpace';
import { LIQUID_SettingStyleBox } from '../../../SchemaSettings/SettingStyleBox/SettingStyleBox';
import { LIQUID_SettingSwitch } from '../../../SchemaSettings/SettingSwitch/SettingSwitch';
import { LIQUID_SettingTags } from '../../../SchemaSettings/SettingTags/SettingTags';
import { LIQUID_SettingText } from '../../../SchemaSettings/SettingText/SettingText';
import { LIQUID_SettingTextArea } from '../../../SchemaSettings/SettingTextArea/SettingTextArea';
import { LIQUID_SettingTextEditor } from '../../../SchemaSettings/SettingTextEditor/SettingTextEditor';
import { LIQUID_SettingTextReadOnly } from '../../../SchemaSettings/SettingTextReadOnly/SettingTextReadOnly';
import { LIQUID_SettingVideo } from '../../../SchemaSettings/SettingVideo/SettingVideo';
import { SettingBlockArray } from '../@types/SettingBlockArray';

type Converters =
  | typeof LIQUID_SettingAnimate
  | typeof LIQUID_SettingAnimateInOut
  | typeof LIQUID_SettingArticlePicker
  | typeof LIQUID_SettingBlogPicker
  | typeof LIQUID_SettingCollectionPicker
  | typeof LIQUID_SettingColor
  | typeof LIQUID_SettingDateTime
  | typeof LIQUID_SettingDivider
  | typeof LIQUID_SettingFlexOrder
  | typeof LIQUID_SettingFont
  | typeof LIQUID_SettingHidden
  | typeof LIQUID_SettingIcon
  | typeof LIQUID_SettingChooseImage
  | typeof LIQUID_SettingLinkPicker
  | typeof LIQUID_SettingDragNavigation
  | typeof LIQUID_SettingSingleProductPicker
  | typeof LIQUID_SettingMultiProductsPicker
  | typeof LIQUID_SettingRadioGroup
  | typeof LIQUID_SettingResponsive
  | typeof LIQUID_SettingTextEditor
  | typeof LIQUID_SettingSelect
  | typeof LIQUID_SettingSlider
  | typeof LIQUID_SettingSpace
  | typeof LIQUID_SettingStyleBox
  | typeof LIQUID_SettingSwitch
  | typeof LIQUID_SettingTags
  | typeof LIQUID_SettingText
  | typeof LIQUID_SettingTextReadOnly
  | typeof LIQUID_SettingTextArea
  | typeof LIQUID_SettingVideo;

export const LIQUID_Converters: Record<SettingBlockArray['children'][number]['type'], Converters | undefined> = {
  animate: LIQUID_SettingAnimate,
  animateInOut: LIQUID_SettingAnimateInOut,
  articlePicker: LIQUID_SettingArticlePicker,
  blogPicker: LIQUID_SettingBlogPicker,
  collectionPicker: LIQUID_SettingCollectionPicker,
  color: LIQUID_SettingColor,
  date: LIQUID_SettingDateTime,
  divider: LIQUID_SettingDivider,
  flexOrder: LIQUID_SettingFlexOrder,
  font: LIQUID_SettingFont,
  hidden: LIQUID_SettingHidden,
  icon: LIQUID_SettingIcon,
  image: LIQUID_SettingChooseImage,
  linkPicker: LIQUID_SettingLinkPicker,
  navigation: LIQUID_SettingDragNavigation,
  productPicker: LIQUID_SettingSingleProductPicker,
  products: LIQUID_SettingMultiProductsPicker,
  radioGroup: LIQUID_SettingRadioGroup,
  responsive: LIQUID_SettingResponsive,
  richText: LIQUID_SettingTextEditor,
  select: LIQUID_SettingSelect,
  slider: LIQUID_SettingSlider,
  space: LIQUID_SettingSpace,
  styleBox: LIQUID_SettingStyleBox,
  switch: LIQUID_SettingSwitch,
  tags: LIQUID_SettingTags,
  text: LIQUID_SettingText,
  textReadOnly: LIQUID_SettingTextReadOnly,
  textarea: LIQUID_SettingTextArea,
  video: LIQUID_SettingVideo,
};
