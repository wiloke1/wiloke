import { SchemaSettingField } from '../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SCHEMA_SettingAnimate } from '../SchemaSettings/SettingAnimate/SettingAnimate';
import { SCHEMA_SettingAnimateInOut } from '../SchemaSettings/SettingAnimateInOut/SettingAnimateInOut';
import { SCHEMA_SettingArticlePicker } from '../SchemaSettings/SettingArticlePicker/SettingArticlePicker';
import { SCHEMA_SettingBlogPicker } from '../SchemaSettings/SettingBlogPicker/SettingBlogPicker';
import { SCHEMA_SettingChooseImage } from '../SchemaSettings/SettingChooseImage/SettingChooseImage';
import { SCHEMA_SettingCollectionPicker } from '../SchemaSettings/SettingCollectionPicker/SettingCollectionPicker';
import { SCHEMA_SettingColor } from '../SchemaSettings/SettingColor/SettingColor';
import { SCHEMA_SettingDateTime } from '../SchemaSettings/SettingDateTime/SettingDateTime';
import { SCHEMA_SettingDivider } from '../SchemaSettings/SettingDivider/SettingDivider';
import { SCHEMA_SettingDragNavigation } from '../SchemaSettings/SettingDragNavigation/SettingDragNavigation';
import { SCHEMA_SettingFlexOrder } from '../SchemaSettings/SettingFlexOrder/SettingFlexOrder';
import { SCHEMA_SettingFont } from '../SchemaSettings/SettingFont/SettingFont';
import { SCHEMA_SettingHidden } from '../SchemaSettings/SettingHidden/SettingHidden';
import { SCHEMA_SettingIcon } from '../SchemaSettings/SettingIcon/SettingIcon';
import { SCHEMA_SettingLinkPicker } from '../SchemaSettings/SettingLinkPicker/SettingLinkPicker';
import { SCHEMA_SettingMultiProductsPicker } from '../SchemaSettings/SettingMultiProductsPicker/SettingMultiProductsPicker';
import { SCHEMA_SettingRadioGroup } from '../SchemaSettings/SettingRadioGroup/SettingRadioGroup';
import { SCHEMA_SettingResponsive } from '../SchemaSettings/SettingResponsive/SettingResponsive';
import { SCHEMA_SettingSelect } from '../SchemaSettings/SettingSelect/SettingSelect';
import { SCHEMA_SettingSingleProductPicker } from '../SchemaSettings/SettingSingleProductPicker/SettingSingleProductPicker';
import { SCHEMA_SettingSlider } from '../SchemaSettings/SettingSlider/SettingSlider';
import { SCHEMA_SettingSpace } from '../SchemaSettings/SettingSpace/SettingSpace';
import { SCHEMA_SettingStyleBox } from '../SchemaSettings/SettingStyleBox/SettingStyleBox';
import { SCHEMA_SettingSwitch } from '../SchemaSettings/SettingSwitch/SettingSwitch';
import { SCHEMA_SettingTags } from '../SchemaSettings/SettingTags/SettingTags';
import { SCHEMA_SettingText } from '../SchemaSettings/SettingText/SettingText';
import { SCHEMA_SettingTextArea } from '../SchemaSettings/SettingTextArea/SettingTextArea';
import { SCHEMA_SettingTextEditor } from '../SchemaSettings/SettingTextEditor/SettingTextEditor';
import { SCHEMA_SettingTextReadOnly } from '../SchemaSettings/SettingTextReadOnly/SettingTextReadOnly';
import { SCHEMA_SettingVideo } from '../SchemaSettings/SettingVideo/SettingVideo';

type Converters =
  | typeof SCHEMA_SettingAnimate
  | typeof SCHEMA_SettingAnimateInOut
  | typeof SCHEMA_SettingArticlePicker
  | typeof SCHEMA_SettingBlogPicker
  | typeof SCHEMA_SettingCollectionPicker
  | typeof SCHEMA_SettingColor
  | typeof SCHEMA_SettingDateTime
  | typeof SCHEMA_SettingDivider
  | typeof SCHEMA_SettingFlexOrder
  | typeof SCHEMA_SettingFont
  | typeof SCHEMA_SettingHidden
  | typeof SCHEMA_SettingIcon
  | typeof SCHEMA_SettingChooseImage
  | typeof SCHEMA_SettingLinkPicker
  | typeof SCHEMA_SettingDragNavigation
  | typeof SCHEMA_SettingSingleProductPicker
  | typeof SCHEMA_SettingMultiProductsPicker
  | typeof SCHEMA_SettingRadioGroup
  | typeof SCHEMA_SettingResponsive
  | typeof SCHEMA_SettingTextEditor
  | typeof SCHEMA_SettingSelect
  | typeof SCHEMA_SettingSlider
  | typeof SCHEMA_SettingSpace
  | typeof SCHEMA_SettingStyleBox
  | typeof SCHEMA_SettingSwitch
  | typeof SCHEMA_SettingTags
  | typeof SCHEMA_SettingText
  | typeof SCHEMA_SettingTextReadOnly
  | typeof SCHEMA_SettingTextArea
  | typeof SCHEMA_SettingVideo;

export const SCHEMA_Converters: Record<SchemaSettingField['type'], Converters | undefined> = {
  animate: SCHEMA_SettingAnimate,
  animateInOut: SCHEMA_SettingAnimateInOut,
  articlePicker: SCHEMA_SettingArticlePicker,
  blogPicker: SCHEMA_SettingBlogPicker,
  collectionPicker: SCHEMA_SettingCollectionPicker,
  color: SCHEMA_SettingColor,
  date: SCHEMA_SettingDateTime,
  divider: SCHEMA_SettingDivider,
  flexOrder: SCHEMA_SettingFlexOrder,
  font: SCHEMA_SettingFont,
  hidden: SCHEMA_SettingHidden,
  icon: SCHEMA_SettingIcon,
  image: SCHEMA_SettingChooseImage,
  linkPicker: SCHEMA_SettingLinkPicker,
  navigation: SCHEMA_SettingDragNavigation,
  productPicker: SCHEMA_SettingSingleProductPicker,
  products: SCHEMA_SettingMultiProductsPicker,
  radioGroup: SCHEMA_SettingRadioGroup,
  responsive: SCHEMA_SettingResponsive,
  richText: SCHEMA_SettingTextEditor,
  select: SCHEMA_SettingSelect,
  slider: SCHEMA_SettingSlider,
  space: SCHEMA_SettingSpace,
  styleBox: SCHEMA_SettingStyleBox,
  switch: SCHEMA_SettingSwitch,
  tags: SCHEMA_SettingTags,
  text: SCHEMA_SettingText,
  textReadOnly: SCHEMA_SettingTextReadOnly,
  textarea: SCHEMA_SettingTextArea,
  video: SCHEMA_SettingVideo,
};
