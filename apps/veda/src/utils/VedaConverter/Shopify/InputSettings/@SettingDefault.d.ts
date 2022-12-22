// https://shopify.dev/themes/architecture/settings/input-settings
type ShopifyFieldOfInputSettings =
  | 'text'
  | 'textarea'
  | 'image_picker'
  | 'radio'
  | 'select'
  | 'checkbox'
  | 'range'
  | 'color'
  | 'font_picker'
  | 'collection'
  | 'product'
  | 'blog'
  | 'page'
  | 'link_list'
  | 'url'
  | 'video_url'
  | 'richtext'
  | 'html'
  | 'article'
  | 'font_picker';

export interface SettingDefault {
  type: ShopifyFieldOfInputSettings;
  id: string;
  label: string;
  info?: string;
}
