import { ArticlePickerResult } from 'components/ArticlePicker/types';
import { BlogPickerResult } from 'components/BlogPicker/types';
import { CollectionPickerResult } from 'components/CollectionPicker';
import { FlexOrderDataItem, FlexOrderValue } from 'components/FlexOrder';
import { GoogleFonts } from 'components/FontField/FontField';
import { IconValue } from 'components/IconUIField';
import { SingleProductPickerResult } from 'components/ProductPicker';
import { MultiProductsPickerResult } from 'components/ProductPicker/MultiProductsPicker';
import { ResponsiveValue } from 'components/Responsive';
import { Option } from 'components/SelectAntd';
import { SettingDragMenu } from 'containers/BuilderPage/components/DraggableMenu';
import { AnimateInOutValue } from 'containers/BuilderPage/components/StyleBox/AnimateInOutField';
import { Animate } from 'containers/BuilderPage/components/StyleBox/types';
import { PreviewImage } from './Page';

export type SettingLabel = string | Record<string, string>;
export type SettingHelpText = SettingLabel;
export type SettingDeps = string;

export interface SettingDefault {
  /** schema id */
  id: string;
  /** schema name */
  name: string;
  /** label của các trường */
  label: SettingLabel;
  /** description của trường */
  summary?: SettingHelpText;
  /** ẩn các trường */
  disable?: boolean;
  /** Dependencies */
  deps?: SettingDeps;
  /** @tuong -> Bắt buộc rerender lại cả section -> Xét bài toán 1 button có js toggle dark light và button đó có settings là "variant" -> Nếu thay đổi variant DOM mới được tạo ra nhưng JS lại không được tạo lại -> JS không có tác dụng -> "forceRerender" sinh ra để khắc phục */
  forceRenderSection?: boolean;
}

export interface SettingText extends SettingDefault {
  type: 'text';
  children: string;
}

export interface SettingTags extends SettingDefault {
  type: 'tags';
  children: string;
}

export interface SettingDivider extends SettingDefault {
  type: 'divider';
  children: number;
}

export interface SettingTextArea extends SettingDefault {
  type: 'textarea';
  children: string;
}

export interface SettingTextEditor extends SettingDefault {
  type: 'richText';
  children: string;
}

export interface SettingColor extends SettingDefault {
  type: 'color';
  children: string;
}

export interface SettingSelect extends SettingDefault {
  type: 'select';
  options: (Option & { id: string | number })[];
  children: string;
}

export interface SettingFont extends SettingDefault {
  type: 'font';
  children: GoogleFonts;
}

export interface SettingVideo extends SettingDefault {
  type: 'video';
  children: string;
}

export interface SettingSpaceChildren {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface SettingSpace extends SettingDefault {
  type: 'space';
  children: SettingSpaceChildren;
}

export interface SettingRadioGroup extends SettingDefault {
  type: 'radioGroup';
  options: (Option & { id: string | number })[];
  children: string;
}

export interface StyleBoxChildren {
  id: string;
  css: string;
}

export interface SettingStyleBox extends SettingDefault {
  type: 'styleBox';
  children: StyleBoxChildren | string;
}

export interface SettingSlider extends SettingDefault {
  type: 'slider';
  min?: number;
  max?: number;
  step?: number;
  children: number | undefined;
}

export interface SettingSwitch extends SettingDefault {
  type: 'switch';
  children: boolean;
}

export interface SettingChooseImage extends SettingDefault {
  type: 'image';
  children?: PreviewImage;
}

export interface SettingDateTime extends SettingDefault {
  type: 'date';
  children: number;
}

export interface SettingIcon extends SettingDefault {
  type: 'icon';
  children: IconValue;
}

export interface SettingBlockObject extends SettingDefault {
  type: 'object';
  /** Đóng mở field */
  open: boolean;
  /** Chuyển sang dạng drawer tức là bấm vào sẽ lật sang màn mới */
  drawer: boolean;
  children: SchemaSettingField[];
}

export interface SettingCollectionPicker extends SettingDefault {
  type: 'collectionPicker';
  children: CollectionPickerResult;
}

export interface SettingLinkPicker extends SettingDefault {
  type: 'linkPicker';
  children: string;
}

export interface SettingSingleProductPicker extends SettingDefault {
  type: 'productPicker';
  children: SingleProductPickerResult;
}

export interface SettingBlogPicker extends SettingDefault {
  type: 'blogPicker';
  children: BlogPickerResult;
}

export interface SettingArticlePicker extends SettingDefault {
  type: 'articlePicker';
  children?: ArticlePickerResult;
}

export interface SettingDragNavigation extends SettingDefault {
  type: 'navigation';
  children: SettingDragMenu[];
  enabledMulti?: boolean;
}

export interface SettingFlexOrder extends SettingDefault {
  type: 'flexOrder';
  options: FlexOrderDataItem[];
  children: FlexOrderValue;
}

export interface SettingResponsive extends SettingDefault {
  type: 'responsive';
  min?: number;
  max?: number;
  children: ResponsiveValue;
}

export interface SettingTextReadOnly extends SettingDefault {
  type: 'textReadOnly';
  children: string;
}

export interface SettingAnimate extends SettingDefault {
  type: 'animate';
  children: Animate;
}
export interface SettingAnimateInOut extends SettingDefault {
  type: 'animateInOut';
  children: AnimateInOutValue;
}

export interface SettingHidden extends SettingDefault {
  type: 'hidden';
  children: any;
}

export interface SettingMultiProducts extends SettingDefault {
  type: 'products';
  children: MultiProductsPickerResult;
}

export interface SettingBlockArray extends Omit<SettingBlockObject, 'type'> {
  type: 'array';
  max?: number;
}

export type SettingBlock = SettingBlockObject | SettingBlockArray;

export type SchemaSettingField =
  | SettingText
  | SettingTextArea
  | SettingColor
  | SettingSelect
  | SettingFont
  | SettingSlider
  | SettingSwitch
  | SettingRadioGroup
  | SettingStyleBox
  | SettingChooseImage
  | SettingIcon
  | SettingSpace
  | SettingDateTime
  | SettingDragNavigation
  | SettingCollectionPicker
  | SettingLinkPicker
  | SettingFlexOrder
  | SettingSingleProductPicker
  | SettingResponsive
  | SettingVideo
  | SettingBlogPicker
  | SettingArticlePicker
  | SettingTextReadOnly
  | SettingTags
  | SettingTextEditor
  | SettingHidden
  | SettingDivider
  | SettingMultiProducts
  | SettingAnimate
  | SettingAnimateInOut;

export type SchemaSettingType = SchemaSettingField['type'];

export interface Schema {
  /** schema settings */
  settings: SchemaSettingField[];
  blocks: SettingBlock[];
}

export interface SettingArrayValue {
  id: string;
  children: SchemaSettingField[];
}

export interface SettingArray extends SettingDefault {
  type: 'array';
  /** Đóng mở field */
  open: boolean;
  /** Chuyển sang dạng drawer tức là bấm vào sẽ lật sang màn mới */
  drawer: boolean;
  children: SettingArrayValue[];
  max?: number;
}

export type SectionSetting = SchemaSettingField | SettingBlockObject | SettingArray;

export type SectionSettingType = SectionSetting['type'];

export type SectionSettings = SectionSetting[];
