import { compose } from 'ramda';
import { ComponentData } from 'types/Page';
import { HandleLiquidFile } from 'generate/utils/getFilesForSave/getHtmlFiles/utils/handleLiquidFile';
import { handleBOCDelimiters as handleBOCDelimitersPostProcess } from './postprocess';
import { case_when, unless } from './control_flow';
import {
  abs,
  append,
  asset_img_url,
  asset_url,
  at_least,
  at_most,
  base64_decode,
  base64_encode,
  base64_url_safe_decode,
  base64_url_safe_encode,
  brightness_difference,
  camelcase,
  capitalize,
  ceil,
  color_brightness,
  color_contrast,
  color_darken,
  color_desaturate,
  color_difference,
  color_extract,
  color_lighten,
  color_mix,
  color_modify,
  color_saturate,
  color_to_hex,
  color_to_hsl,
  color_to_rgb,
  compact,
  concat,
  customer_login_link,
  date,
  default_errors,
  default_pagination,
  divided_by,
  downcase,
  escape_once,
  escape,
  external_video_tag,
  external_video_url,
  file_img_url,
  file_url,
  first,
  floor,
  font_face,
  font_modify,
  font_url,
  forloop,
  format_address,
  global_asset_url,
  handle,
  handleize,
  highlight,
  highlight_active_tag,
  hmac_sha1,
  hmac_sha256,
  image_tag,
  image_url,
  img_url,
  join,
  json,
  last,
  link_to,
  link_to_add_tag,
  link_to_remove_tag,
  link_to_tag,
  link_to_type,
  link_to_vendor,
  lstrip,
  map,
  md5,
  media_tag,
  metafield_tag,
  metafield_text,
  minus,
  model_viewer_tag,
  modulo,
  money,
  newline_to_br,
  payment_type_img_url,
  payment_type_svg_tag,
  placeholder_svg_tag,
  pluralize,
  plus,
  preload_tag,
  prepend,
  remove,
  remove_first,
  replace,
  replace_first,
  reverse,
  round,
  rstrip,
  script_tag,
  sha1,
  sha256,
  shopify_asset_url,
  size,
  slice,
  sort_natural,
  sort,
  sort_by,
  split,
  strip,
  strip_html,
  strip_newlines,
  stylesheet_tag,
  t,
  times,
  time_tag,
  truncate,
  truncatewords,
  uniq,
  upcase,
  url_decode,
  url_encode,
  url_escape,
  url_for_type,
  url_for_vendor,
  url_param_escape,
  video_tag,
  weight_with_unit,
  where,
  within,
  _default,
} from './filters';
import { getExceptionOfCodeLiquid } from './getExceptionOfCodeLiquid';
import { powered_by_link } from './global_object';
import { handleReplaceShopifyPickerInSectionSettingToLiquid } from './handleReplaceShopifyPickerInSectionSettingToLiquid';
import {
  handleBOCDelimiters,
  handleReplaceToGeneralAssign,
  handleReplaceToGeneralIfElseElseIf,
  handleReplaceGeneralOpenCloseBlock,
} from './preprocess';
import { cycle, limit, offset, reversed, tablerow, _break, _continue } from './iteration';
import { contains } from './operators';
import { schema } from './section_schema';
import { comment, form, layout, liquid as __liquid, paginate, raw, render, section, style } from './theme_tags';
import { capture, decrement, increment } from './variable_tags';
import { custom_component } from './custom_components';
import { handleFieldIsTranslation } from './handleFieldIsTranslation';
import { handleArrayFieldInShopifyTag } from './handleArrayFieldInShopifyTagNArrayFieldHasShopifyPicker';
import { handleShopifyTagInForloop } from './handleShopifyTagInForloop';
import { handleRenderTagBeforeAll } from './handleRenderTagBeforeAll';

interface LiquidSyntaxToTwig extends Pick<ComponentData, 'liquid' | 'settings'> {
  variant: HandleLiquidFile['variant'];
}

// NOTE: Để không có sự cố đáng tiếc xảy ra -> Không đổi thứ tự các function trong đây
const liquidSyntaxToTwig = ({ liquid, settings, variant }: LiquidSyntaxToTwig) => {
  // console.log('liquidSyntaxToTwig -> Input', liquid);
  // console.time("liquidSyntaxToTwig")

  const _twig = compose((liquid: string) => {
    // Tiền xử lý các kiểu code liquid
    let _liquid = handleRenderTagBeforeAll(liquid);
    // 2 bước này không thể thay đổi thứ tự thực hiện và bắt buộc thực hiện trước "handleFieldIsTranslation"
    _liquid = handleArrayFieldInShopifyTag({ liquid: _liquid, settings, variant: 'Liquid là toàn bộ file liquid -> Extract các cặp thẻ shopify' }); // Xử lý forloop trong shopify
    _liquid = handleShopifyTagInForloop({ liquid: _liquid, settings }); // Xử lý shopify trong forloop
    // Xử lý các field chứa translation
    _liquid = handleFieldIsTranslation({ liquid: _liquid, settings });

    // Custom component
    _liquid = custom_component(_liquid);

    // @tuong -> handleReplaceGeneralOpenCloseBlock BẮT BUỘC phải thực hiện đầu tiên để quy tất cả open và close tag về 1 kiểu ("{% ... %}" và "{{ ... }}")
    _liquid = handleReplaceGeneralOpenCloseBlock(_liquid);

    // Gắn các biến picker
    _liquid = handleReplaceShopifyPickerInSectionSettingToLiquid({ liquid: _liquid, settings });

    _liquid = handleBOCDelimiters(_liquid);
    _liquid = __liquid(_liquid); // Cái này là "theme_tags" (không liên quan đến tiền xử lí) nhưng bắt buộc thực hiện trước (chỉ sau 2 cái trên)
    _liquid = handleReplaceToGeneralIfElseElseIf(_liquid);
    _liquid = handleReplaceToGeneralAssign(_liquid);

    // Bắt đầu
    // Lỗi trong code
    getExceptionOfCodeLiquid({ liquid: _liquid, settings, variant });

    // Operators
    _liquid = contains(_liquid);
    // Filters
    _liquid = abs(_liquid);
    _liquid = append(_liquid);
    _liquid = asset_img_url(_liquid);
    _liquid = asset_url(_liquid);
    _liquid = at_least(_liquid);
    _liquid = at_most(_liquid);
    _liquid = base64_decode(_liquid);
    _liquid = base64_encode(_liquid);
    _liquid = base64_url_safe_decode(_liquid);
    _liquid = base64_url_safe_encode(_liquid);
    _liquid = brightness_difference(_liquid);
    _liquid = camelcase(_liquid);
    _liquid = capitalize(_liquid);
    _liquid = ceil(_liquid);
    _liquid = color_brightness(_liquid);
    _liquid = color_contrast(_liquid);
    _liquid = color_darken(_liquid);
    _liquid = color_desaturate(_liquid);
    _liquid = color_difference(_liquid);
    _liquid = color_extract(_liquid);
    _liquid = color_lighten(_liquid);
    _liquid = color_mix(_liquid);
    _liquid = color_modify(_liquid);
    _liquid = color_saturate(_liquid);
    _liquid = color_to_hex(_liquid);
    _liquid = color_to_hsl(_liquid);
    _liquid = color_to_rgb(_liquid);
    _liquid = compact(_liquid);
    _liquid = concat(_liquid);
    _liquid = customer_login_link(_liquid);
    _liquid = date(_liquid);
    _liquid = default_errors(_liquid);
    _liquid = default_pagination(_liquid);
    _liquid = divided_by(_liquid);
    _liquid = downcase(_liquid);
    _liquid = escape_once(_liquid);
    _liquid = escape(_liquid);
    _liquid = external_video_tag(_liquid);
    _liquid = external_video_url(_liquid);
    _liquid = file_img_url(_liquid);
    _liquid = file_url(_liquid);
    _liquid = first(_liquid);
    _liquid = floor(_liquid);
    _liquid = font_face(_liquid);
    _liquid = font_modify(_liquid);
    _liquid = font_url(_liquid);
    _liquid = forloop(_liquid);
    _liquid = format_address(_liquid);
    _liquid = global_asset_url(_liquid);
    _liquid = handle(_liquid);
    _liquid = handleize(_liquid);
    _liquid = highlight(_liquid);
    _liquid = highlight_active_tag(_liquid);
    _liquid = hmac_sha1(_liquid);
    _liquid = hmac_sha256(_liquid);
    _liquid = image_tag(_liquid);
    _liquid = image_url(_liquid);
    _liquid = img_url(_liquid);
    _liquid = join(_liquid);
    _liquid = json(_liquid);
    _liquid = last(_liquid);
    _liquid = link_to(_liquid);
    _liquid = link_to_add_tag(_liquid);
    _liquid = link_to_remove_tag(_liquid);
    _liquid = link_to_tag(_liquid);
    _liquid = link_to_type(_liquid);
    _liquid = link_to_vendor(_liquid);
    _liquid = lstrip(_liquid);
    _liquid = map(_liquid);
    _liquid = md5(_liquid);
    _liquid = media_tag(_liquid);
    _liquid = metafield_tag(_liquid);
    _liquid = metafield_text(_liquid);
    _liquid = minus(_liquid);
    _liquid = model_viewer_tag(_liquid);
    _liquid = modulo(_liquid);
    _liquid = money(_liquid);
    _liquid = newline_to_br(_liquid);
    _liquid = payment_type_img_url(_liquid);
    _liquid = payment_type_svg_tag(_liquid);
    _liquid = placeholder_svg_tag(_liquid);
    _liquid = pluralize(_liquid);
    _liquid = plus(_liquid);
    _liquid = preload_tag(_liquid);
    _liquid = prepend(_liquid);
    _liquid = remove(_liquid);
    _liquid = remove_first(_liquid);
    _liquid = replace(_liquid);
    _liquid = replace_first(_liquid);
    _liquid = reverse(_liquid);
    _liquid = round(_liquid);
    _liquid = rstrip(_liquid);
    _liquid = script_tag(_liquid);
    _liquid = sha1(_liquid);
    _liquid = sha256(_liquid);
    _liquid = shopify_asset_url(_liquid);
    _liquid = size(_liquid);
    _liquid = slice(_liquid);
    _liquid = sort_natural(_liquid);
    _liquid = sort(_liquid);
    _liquid = sort_by(_liquid);
    _liquid = split(_liquid);
    _liquid = strip(_liquid);
    _liquid = strip_html(_liquid);
    _liquid = strip_newlines(_liquid);
    _liquid = stylesheet_tag(_liquid);
    _liquid = t(_liquid);
    _liquid = times(_liquid);
    _liquid = time_tag(_liquid);
    _liquid = truncate(_liquid);
    _liquid = truncatewords(_liquid);
    _liquid = uniq(_liquid);
    _liquid = upcase(_liquid);
    _liquid = url_decode(_liquid);
    _liquid = url_encode(_liquid);
    _liquid = url_escape(_liquid);
    _liquid = url_for_type(_liquid);
    _liquid = url_for_vendor(_liquid);
    _liquid = url_param_escape(_liquid);
    _liquid = video_tag(_liquid);
    _liquid = weight_with_unit(_liquid);
    _liquid = where(_liquid);
    _liquid = within(_liquid);
    _liquid = _default(_liquid);

    // theme_tags
    _liquid = comment(_liquid);
    _liquid = layout(_liquid);
    _liquid = paginate(_liquid);
    _liquid = raw(_liquid);
    _liquid = render(_liquid);
    _liquid = section(_liquid);
    _liquid = style(_liquid);

    // theme_tags/forms
    _liquid = form(_liquid);

    // control_flow
    _liquid = case_when(_liquid);
    _liquid = unless(_liquid);

    // iteration
    _liquid = _break(_liquid);
    _liquid = _continue(_liquid);
    _liquid = cycle(_liquid);
    _liquid = limit(_liquid);
    _liquid = offset(_liquid);
    _liquid = reversed(_liquid);
    _liquid = tablerow(_liquid);

    // variable_tags
    _liquid = capture(_liquid);
    _liquid = decrement(_liquid);
    _liquid = increment(_liquid);

    // global_object
    _liquid = powered_by_link(_liquid);

    // section_schema
    _liquid = schema(_liquid);
    // Hậu xử lý
    _liquid = handleBOCDelimitersPostProcess(_liquid);

    return _liquid;
  })(liquid);
  // console.log('liquidSyntaxToTwig -> Output', _twig.replace(/\n+/g, '\n'));
  // console.timeEnd("liquidSyntaxToTwig")
  return _twig;
};

export { VARIABLES_NAME } from './const';
export { handleReplaceSectionSetingsValueToTagShopify } from './handleReplaceSectionSetingsValueToTagShopify';
export { handleGetScopeOfAddon } from './handleGetScopeOfAddon';
export { handleGetTwigScope } from './handleGetTwigScope';
export { handleTranslationToPreview } from './handleTranslationToPreview';
export { isFieldTranslation } from './utils/isFieldTranslation';
export { LiquidSyntaxToTwigError } from './Error';
export * from './objects';
export { liquidSyntaxToTwig };
export { handleShopifyTagInForloop };
export { handleTagLiquidBeforeSyncShopify as handleTagLiquidTagBeforeSyncShopify } from './handleTagLiquidBeforeSyncShopify';
