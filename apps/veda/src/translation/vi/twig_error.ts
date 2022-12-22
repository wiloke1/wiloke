export const twig_error = {
  control_flow: {
    case_when: {
      or_in_when_clause: `
        "Case & When": Bạn không thể dùng or trong "when" -> Sử dụng "," thay cho "or" như 1 giải pháp thay thế
        %% error_signal %%
      `,
      example: `
        "Case & When": Có gì đó sai sai -> %% error_signal %%
        Syntax đúng:
          {% assign handle = "cake" %}
          {% case handle %}
            {% when "cake" %}
              This is a cake
            {% when "cookie", "biscuit" %}
              This is a cookie
            {% else %}
              This is not a cake nor a cookie
          {% endcase %}
      `,
    },
    unless: {
      example: `"Unless": Có gì đó sai sai -> %% error_signal %%`,
      warning_message: `"Unless": Hiện tại mệnh đề phức hợp sẽ không chính xác cho tất cả các trường hợp. Để đảm bảo không có trường hợp đáng tiếc nào sẽ xảy ra bạn có thể sử dụng nhiều "Unless" lồng nhau như một phương án thay thế -> %% error_signal %%`,
    },
  },
  deprecated_tags: {
    currency_form: `Tag 'currency form' chưa được support`,
    include: `Tag 'include' chưa được support`,
  },
  filters: {
    abs: '',
    append: '',
    asset_img_url: `"asset_img_url" chưa được support`,
    asset_url: `"asset_url" chưa được support`,
    at_least: {
      params: `"at_least": cần 1 tham số có định dạng là number -> %% error_signal %%`,
      example: `
        "at_least" message: %% message %%
        Case 1:
          - Input: {{ 4 | at_least: 5 }} + {{ 4 | at_least: 3 }}
          - Output: 5 + 4
      `,
    },
    at_most: {
      params: `"at_most": cần 1 tham số có định dạng là number -> %% error_signal %%`,
      example: `
        "at_most" message: %% message %%
        Case 1:
          - Input: {{ 4 | at_most: 5 }} + {{ 4 | at_most: 3 }}
          - Output: 5 + 4
      `,
    },
    base64_decode: {
      value: `"base64_decode": Value phải là string -> %% error_signal %%`,
      example: `
        "base64_decode" message: %% message %%
        Case 1:
          - Input: {{ 4 | at_most: 5 }} + {{ 4 | at_most: 3 }}
          - Output: 5 + 4
      `,
    },
    base64_encode: {
      value: `"base64_encode": Value phải là string -> %% error_signal %%`,
      example: `
      "base64_encode" message: %% message %%
      Case 1:
        - Input: {{ 'one two three' | base64_encode }}
        - Ouput: b25lIHR3byB0aHJlZQ==
    `,
    },
    base64_url_safe_decode: {
      value: `"base64_url_safe_decode": Value phải là string -> %% error_signal %%`,
      example: `
      "base64_url_safe_decode" message: %% message %%
      Case 1:
        - Input: {{ 'PHA-b2s_PC9wPg==' | base64_url_safe_decode }}
        - Ouput: <p>ok?</p>
    `,
    },
    base64_url_safe_encode: {
      value: `"base64_url_safe_encode": Value phải là string -> %% error_signal %%`,
      example: `
      "base64_url_safe_encode" message: %% message %%
      Case 1:
        - Input: {{ '<p>ok?</p>' | base64_url_safe_encode }}
        - Ouput: PHA-b2s_PC9wPg==
    `,
    },
    brightness_difference: `brightness_difference chưa được support`,
    camelcase: ``,
    capitalize: ``,
    ceil: ``,
    color_brightness: {
      value: `"color_brightness": Value phải là string -> %% error_signal %%`,
      example: `
      "color_brightness" message: %% message %%
      Case 1:
        - Input: {{ '#7ab55c' | color_brightness }}
        - Ouput: 153.21
    `,
    },
    color_contrast: {
      params: `"color_contrast" cần 1 tham số có định dạng là string -> %% error_signal %%`,
      value: `"color_contrast": Value phải là string -> %% error_signal %%`,
      color: `"color_contrast": color phải là string -> %% error_signal %%`,
      example: `
      "color_contrast" message: %% message %%
      Case 1:
        - Input: {{ '#495859' | color_contrast: '#fffffb' }}
        - Ouput: 7.4
    `,
    },
    color_darken: {
      params: `"color_darken" cần 1 tham số có định dạng là number -> %% error_signal %%`,
      value: `"color_darken": Value phải là string -> %% error_signal %%`,
      darkenValue: `"color_darken": darkenValue phải là number -> %% error_signal %%`,
      darkenDomain: `"color_darken": darkenValue ∈ [0, 100] -> %% error_signal %%`,
      example: `
      "color_darken" message: %% message %%
      Case 1:
        - Input: {{ '#7ab55c' | color_darken: 30 }}
        - Ouput: #355325
    `,
    },
    color_desaturate: {
      params: `"color_desaturate" cần 1 tham số có định dạng là number -> %% error_signal %%`,
      value: `"color_desaturate": Value phải là string -> %% error_signal %%`,
      desaturateValue: `"color_desaturate": desaturateValue phải là number -> %% error_signal %%`,
      desaturateDomain: `"color_desaturate": desaturateValue ∈ [0, 100] -> %% error_signal %%`,
      example: `
      "color_desaturate" message: %% message %%
      Case 1:
        - Input: {{ '#7ab55c' | color_desaturate: 30 }}
        - Ouput: #869180
    `,
    },
    color_difference: `"color_difference" chưa được support`,
    color_extract: {
      params: `"color_extract" cần 1 tham số có định dạng là string -> %% error_signal %%`,
      value: `"color_extract": Value phải là string -> %% error_signal %%`,
      extractValue: `"color_extract": extractValue chỉ có thể là alpha, red, green, blue, hue, saturation và lightness -> %% error_signal %%`,
      example: `
      "color_extract" message: %% message %%
      Case 1:
        - Input: {{ '#7ab55c' | color_extract: 'red' }}
        - Ouput: 122
    `,
    },
    color_lighten: {
      params: `"color_lighten" cần 1 tham số có định dạng là number -> %% error_signal %%`,
      value: `"color_lighten": Value phải là string -> %% error_signal %%`,
      lightenValue: `"color_lighten": lightenValue phải là number -> %% error_signal %%`,
      example: `
      "color_lighten message: %% message %%
      Case 1:
        - Input: {{ '#7ab55c' | color_lighten: 30 }}
        - Ouput: #d0e5c5
    `,
    },
    color_mix: {
      params: `"color_mix" cần 1 tham số có định dạng là string color -> %% error_signal %%`,
      value: `"color_mix": Value phải là string -> %% error_signal %%`,
      colorValue: `"color_mix": color phải là string -> %% error_signal %%`,
      weightValue: `"color_mix": weight phải là number -> %% error_signal %%`,
      weightDomain: `"color_mix": weight ∈ [0, 100] -> %% error_signal %%`,
      example: `
      "color_mix" message: %% message %%
      Case 1:
        - Input: {{ '#7ab55c' | color_mix: '#ffc0cb', 50 }}
        - Ouput: #bdbb94
    `,
    },
    color_modify: {
      params: `"color_modify" cần 2 tham số, tên trường sẽ thay đổi và giá trị mới -> %% error_signal %%`,
      value: `"color_modify": Value phải là string -> %% error_signal %%`,
      key: `"color_modify": key chỉ có thể là alpha, red, green, blue, hue, saturation và lightness -> %% error_signal %%`,
      newValue: `"color_modify": newValue phải là number -> %% error_signal %%`,
      redDomain: `"color_modify": newValue ∈ [0, 255] -> %% error_signal %%`,
      greenDomain: `"color_modify": newValue ∈ [0, 255] -> %% error_signal %%`,
      blueDomain: `"color_modify": newValue ∈ [0, 255] -> %% error_signal %%`,
      hueDomain: `"color_modify": newValue ∈ [0, 360] -> %% error_signal %%`,
      saturationDomain: `"color_modify": newValue ∈ [0, 100] -> %% error_signal %%`,
      example: `
      "color_modify" message: %% message %%
      Case 1:
        - Input: {{ '#7ab55c' | color_modify: 'red', 255 }}
        - Ouput: #ffb55c
      Case 2:
        - Input: {{ '#7ab55c' | color_modify: 'alpha', 0.85 }}
        - Output: rgba(122, 181, 92, 0.85)
    `,
    },
    color_saturate: {
      params: `"color_saturate" cần 1 tham số có định dạng là number -> %% error_signal %%`,
      value: `"color_saturate": Value phải là string -> %% error_signal %%`,
      saturateValue: `"color_saturate": saturateValue phải là number -> %% error_signal %%`,
      saturateValueDomain: `"color_saturate": saturateValue ∈ [0, 100] -> %% error_signal %%`,
      example: `
      "color_saturate" message: %% message %%
      Case 1:
        - Input: {{ '#7ab55c' | color_saturate: 30 }}
        - Ouput: #6ed938
    `,
    },
    color_to_hex: {
      value: `"color_to_hex": Value phải là string -> %% error_signal %%`,
      example: `
      "color_to_hex" message: %% message %%
      Case 1:
        - Input: {{ 'rgb(122, 181, 92)' | color_to_hex }}
        - Ouput: #7ab55c
      Case 2:
          - Input: {{ 'rgba(122, 181, 92, 0.5)' | color_to_hex }}
          - Ouput: #7ab55c
    `,
    },
    color_to_hsl: {
      value: `"color_to_hsl": Value phải là string -> %% error_signal %%`,
      example: `
      "color_to_hsl" message: %% message %%
      Case 1:
        - Input: {{ '#7ab55c' | color_to_hsl }}
        - Ouput: hsl(100, 38%, 54%)
      Case 2:
          - Input: {{ 'rgba(122, 181, 92, 0.5)' | color_to_hsl }}
          - Ouput: hsla(100, 38%, 54%, 0.5)
    `,
    },
    color_to_rgb: {
      value: `"color_to_rgb": Value phải là string -> %% error_signal %%`,
      example: `
      "color_to_rgb" message: %% message %%
      Case 1:
        - Input: {{ '#7ab55c' | color_to_rgb }}
        - Ouput: rgb(122, 181, 92)
      Case 2:
          - Input: {{ 'hsla(100, 38%, 54%, 0.5)' | color_to_rgb }}
          - Ouput: rgba(122, 181, 92, 0.5)
    `,
    },
    compact: {
      value: `"compact": Value phải là array -> %% error_signal %%`,
      example: `
      "compact" message: %% message %%

      Without "compact" input:
        {% assign site_categories = site.pages | map: "category" %}
        {% for category in site_categories %}
        - {{ category }}
        {% endfor %}
      Without "compact" out:
        - business
        - celebrities
        -
        - lifestyle
        - sports
        -
        - technology

      Without "compact" input:
        {% assign site_categories = site.pages | map: "category" | compact %}
        {% for category in site_categories %}
        - {{ category }}
        {% endfor %}
      Without "compact" out:
        - business
        - celebrities
        - lifestyle
        - sports
        - technology
    `,
    },
    concat: ``,
    customer_login_link: {
      value: `"customer_login_link": Value phải là string -> %% error_signal %%`,
      example: `
      "customer_login_link" message: %% message %%
      Case 1:
        - Input: {{ 'Log in' | customer_login_link }}
        - Ouput: <a href="/account/login" id="customer_login_link">Log in</a>
    `,
    },
    date: {
      example: `
      "date" message: %% message %%
      Case 1:
        - Input: {{ article.published_at | date: "%a, %b %d, %y" }}
        - Ouput: Tue, Apr 22, 14
      Case 2:
          - Input: {{ "March 14, 2016" | date: "%b %d, %y" }}
          - Ouput: Mar 14, 16
      Case 2:
          - Input: {{ 1667814083463 | date: "%b %d, %y" }}
          - Ouput: Dec 4, 22
    `,
    },
    default_errors: {
      value: `"default_errors": Value phải là mảng string -> %% error_signal %%`,
      example: `"default_errors": https://shopify.dev/api/liquid/filters/additional-filters#default_errors -> %% error_signal %%`,
      fake_message: 'Tin nhắn lỗi',
    },
    default_pagination: {
      example: `
      Error message: %% message %%
      Case 1:
        - Input:
        {% paginate collection.products by 2 %}
          {% for product in collection.products %}
            {{ product.title }} product card
          {% endfor %}

          {{ paginate | default_pagination }}
        {% endpaginate %}
        - Ouput: <span class="page current">1</span> <span class="page"><a href="/services/liquid_rendering/resource?page=2" title="">2</a></span> <span class="next"><a href="/services/liquid_rendering/resource?page=2" title="">Next &raquo;</a></span>
    `,
    },
    default: ``,
    divided_by: {
      params: `"divided_by" cần 1 tham số có định dạng là number -> %% error_signal %%`,
      value: `"value": dividend phải là number -> %% error_signal %%`,
      divisor: `"value": divisor phải là number -> %% error_signal %%`,
      example: `
      Error message: %% message %%
      Case 1:
        - Input: {{ 100 | divided_by: 10}}
        - Ouput: 10
    `,
    },
    downcase: ``,
    escape: ``,
    external_video_tag: `external_video_tag chưa được support`,
    external_video_url: `external_video_url chưa được support`,
    file_img_url: `file_img_url chưa được support`,
    file_url: `file_url chưa được support`,
    first: ``,
    floor: ``,
    font_face: `font_face chưa được support`,
    font_modify: `font_modify chưa được support`,
    font_url: `font_url chưa được support`,
    forloop: ``,
    format_address: `format_address chưa được support`,
    global_asset_url: `global_asset_url chưa được support`,
    handle: {
      value: `"handle": Value phải là string -> %% error_signal %%`,
      example: `
      "handle" message: %% message %%
      Case 1:
        - Input: {{ '100% M & Ms!!!' | handleize }}
        - Ouput: 100-m-ms
    `,
    },
    highlight_active_tag: `highlight_active_tag chưa được support`,
    highlight: `highlight chưa được support`,
    hmac_sha1: `hmac_sha1 chưa được support`,
    hmac_sha256: `hmac_sha256 chưa được support`,
    image_tag: `image_tag chưa được support`,
    image_url: {
      size: `"image_url": Liquid error: Width & Height must be between 1 and 5760 -> %% error_signal %%`,
      crop: `"image_url": Liquid error: Invalid crop mode -> %% error_signal %%`,
      format: `"image_url": Liquid error: Invalid extension -> %% error_signal %%`,
      pad_color: `"image_url": Liquid error: Color padding must be between 000000 and ffffff -> %% error_signal %%`,
      unexpect_params: `"image_url": Liquid error: Unexpect parameters -> %% error_signal %%`,
      example: `
      "image_url" message: %% message %%
      Case 1:
        - Input: <img src="{{ product.featured_image | image_url: 300 }}"  alt="{{ product.title }}" />
        - Ouput: ...
      Case 2:
        - Input: <img src="{{ product.featured_image | image_url }}"  alt="{{ product.title }}" />
        - Ouput: ...
    `,
    },
    img_url: {
      size: `"img_url": img_url cần nhiều nhất 1 tham số có định dạng string -> %% error_signal %%`,
      example: `
      "img_url" message: %% message %%
      Case 1:
        - Input: <img src="{{ product.featured_image | img_url: '300x300' }}"  alt="{{ product.title }}" />
        - Ouput: ...
      Case 2:
        - Input: <img src="{{ product.featured_image | img_url }}"  alt="{{ product.title }}" />
        - Ouput: ...
    `,
    },
    join: ``,
    json: {
      warning: 'Kết quả filter json khác so với shopify. Chú ý test',
    },
    last: ``,
    link_to_add_tag: {
      params: `"link_to_add_tag" cần ít nhất 1 tham số có định dạng là string -> %% error_signal %%`,
      value: `"link_to_add_tag": Value phải là string -> %% error_signal %%`,
      params_invalid: `"link_to_add_tag": Thiếu giá trị attributeName hoặc attributeValue -> %% error_signal %%`,
      example: `
      "link_to_add_tag" message: %% message %%
      Case 1
        - Input:
          <!-- collection.tags = ["Mens", "Womens", "Sale"] -->
          {% for tag in collection.tags %}
            {{ tag | link_to_add_tag: tag }}
          {% endfor %}
        - Output:
          <!-- If you're on "/collections/frontpage/mens": -->
          <a title="Show products matching tag Mens" href="/collections/frontpage/mens">Mens</a>
          <a title="Show products matching tag Womens" href="/collections/frontpage/womens+mens">Womens</a>
          <a title="Show products matching tag Sale" href="/collections/frontpage/sale+mens">Sale</a>
      `,
    },
    link_to_remove_tag: {
      params: `"link_to_remove_tag" cần ít nhất 1 tham số có định dạng là string -> %% error_signal %%`,
      params_invalid: `"link_to_remove_tag": Thiếu giá trị attributeName hoặc attributeValue -> %% error_signal %%`,
      value: `"link_to_remove_tag": Value phải là string -> %% error_signal %%`,
      example: `
      "link_to_remove_tag" message: %% message %%
      Case 1
        - Input:
          <!-- collection.tags = ["Mens", "Womens", "Sale"] -->
          {% for tag in collection.tags %}
            {{ tag | link_to_remove_tag: tag }}
          {% endfor %}
        - Output:
          <!-- If you're on "/collections/frontpage/mens": -->
          <a title="Remove tag Mens" href="/collections/frontpage">Mens</a>
      `,
    },
    link_to_tag: {
      params: `"link_to_tag" cần ít nhất 1 tham số có định dạng là string -> %% error_signal %%`,
      value: `"link_to_tag": Value phải là string -> %% error_signal %%`,
      params_invalid: `"link_to_tag": Thiếu giá trị attributeName hoặc attributeValue -> %% error_signal %%`,
      example: `
      "link_to_tag" message: %% message %%
      Case 1
        - Input:
          <!-- collection.tags = ["Mens", "Womens", "Sale"] -->
          {% for tag in collection.tags %}
            {{ tag | link_to_tag: tag }}
          {% endfor %}
        - Output:
          <a title="Show products matching tag Mens" href="/collections/frontpage/mens">Mens</a>
          <a title="Show products matching tag Womens" href="/collections/frontpage/womens">Womens</a>
          <a title="Show products matching tag Sale" href="/collections/frontpage/sale">Sale</a>
      `,
    },
    link_to_type: {
      params: `"link_to_type": link_to_type params sai định dạng -> %% error_signal %%`,
      value: `"link_to_type": Value phải là string -> %% error_signal %%`,
      params_invalid: `"link_to_type": Thiếu giá trị attributeName hoặc attributeValue -> %% error_signal %%`,
      example: `
      "link_to_type" message: %% message %%
      Case 1
        - Input: {{ "jeans" | link_to_type }}
        - Output: <a href="/collections/types?q=jeans" title="jeans">jeans</a>
      Case 2
        - Input: {{ 'jeans' | link_to_type: class: "link-class" }}
        - Output: <a href="/collections/types?q=jeans" class="link-class" title="jeans">jeans</a>
      `,
    },
    link_to_vendor: {
      params: `"link_to_vendor": link_to_vendor params sai định dạng -> %% error_signal %%`,
      value: `"link_to_vendor": Value phải là string -> %% error_signal %%`,
      params_invalid: `"link_to_vendor": Thiếu giá trị attributeName hoặc attributeValue -> %% error_signal %%`,
      example: `
      "link_to_vendor" message: %% message %%
      Case 1
        - Input: {{ 'Shopify' | link_to_vendor }}
        - Output: <a href="/collections/vendors?q=Shopify" title="Shopify">Shopify</a>
      Case 2
        - Input: {{ 'Shopify' | link_to_vendor: class: "link-class" }}
        - Output: <a href="/collections/vendors?q=Shopify" class="link-class" title="Shopify">Shopify</a>
      `,
    },
    link_to: {
      params: `"link_to" cần ít nhất 1 tham số có định dạng là string -> %% error_signal %%`,
      value: `"link_to": Value phải là string -> %% error_signal %%`,
      params_invalid: `"link_to": Thiếu giá trị attributeName hoặc attributeValue -> %% error_signal %%`,
      example: `
      "link_to" message: %% message %%
      Case 1
        - Input: {{ 'Shopify' | link_to: 'https://www.shopify.com', title: "A link to Shopify", class: "link-class" }}
        - Output: <a title="A link to Shopify" class="link-class" href="https://www.shopify.com">Shopify</a>
      Case 2
        - Input: {{ 'Shopify' | link_to: 'https://www.shopify.com' }}
        - Output: <a href="https://www.shopify.com">Shopify</a>
      `,
    },
    lstrip: {
      value: `"lstrip": Value phải là string -> %% error_signal %%`,
      example: `
      "lstrip" message: %% message %%
      Case 1:
        - Input: {{ '   too many spaces           ' | lstrip }}
        - Ouput: too many spaces
    `,
    },
    map: {
      params: `"map" cần 1 tham số có định dạng là string -> %% error_signal %%`,
      property: `"map": Property là bắt buộc -> %% error_signal %%`,
      value: `"map": Value phải là array -> %% error_signal %%`,
      property_non_exist: `"map": Property không tồn tại -> %% error_signal %%`,
      example: `
      "map" message: %% message %%
      Case 1:
        - Input:
          {% assign all_categories = site.pages | map: "category" %}
          {% for item in all_categories %}
          + {{ item }}
          {% endfor %}
        - Ouput:
          + business
          + celebrities
          + lifestyle
          + sports
          + technology
    `,
    },
    md5: `md5 chưa được support`,
    media_tag: `media_tag chưa được support`,
    metafield_tag: `metafield_tag chưa được support`,
    metafield_text: `metafield_text chưa được support`,
    minus: {
      params: `"minus" cần 1 tham số có định dạng là number -> %% error_signal %%`,
      value: `"minus": subtrahend phải là number -> %% error_signal %%`,
      minus_number: `"minus": minus_number phải là number -> %% error_signal %%`,
      example: `
      "minus" message: %% message %%
      Case 1:
        - Input: {{ 100 | minus: 10}}
        - Ouput: 90
    `,
    },
    model_viewer_tag: `model_viewer_tag chưa được support`,
    modulo: {
      params: `"modulo" cần 1 tham số có định dạng là number -> %% error_signal %%`,
      value: `"modulo": dividend phải là number -> %% error_signal %%`,
      modulo_number: `"modulo": modulo_number phải là number -> %% error_signal %%`,
      example: `
      "modulo" message: %% message %%
      Case 1:
        - Input: {{ 100 | modulo: 10}}
        - Ouput: 0
    `,
    },
    money: {
      value: `"money / money_with_currency / money_without_trailing_zeros / money_without_currency": Value phải là number -> %% error_signal %%`,
      example_money: `
      "money" message: %% message %%
      Case 1:
        - Input: {{ 145 | money }}
        - Ouput: $1.45
    `,
      example_money_with_currency: `
      "money_with_currency" message: %% message %%
      Case 1:
        - Input: {{ 145 | money_with_currency }}
        - Ouput: $1.45 CAD
    `,
      example_money_without_trailing_zeros: `
      "money_without_trailing_zeros" message: %% message %%
      Case 1:
        - Input:
          {{ 2000 | money_without_trailing_zeros }}
          {{ 145 | money_without_trailing_zeros }}
        - Ouput:
          $20
          $1.45
    `,
      money_without_currency: `
      "money_without_currency" message: %% message %%
      Case 1:
        - Input: {{ 145 | money_without_currency }}
        - Ouput: 1.45
    `,
    },
    newline_to_br: {
      value: `"newline_to_br": Value phải là string -> %% error_signal %%`,
      example: `
      "newline_to_br" message: %% message %%
      Case 1:
        - Input:
          {% capture var %}
          One
          Two
          Three
          {% endcapture %}
          {{ var | newline_to_br }}
        - Ouput:
          One<br>
          Two<br>
          Three<br>
    `,
    },
    payment_type_img_url: {
      value: `"payment_type_img_url":Value phải là string -> %% error_signal %%`,
      domain_value: `"payment_type_img_url": Value phải là %% domain_value %% -> %% error_signal %%`,
    },
    payment_type_svg_tag: {
      params: `"payment_type_svg_tag" cần 1 tham số có định dạng là string -> %% error_signal %%`,
      value: `"payment_type_svg_tag":Value phải là string -> %% error_signal %%`,
      domain_value: `"payment_type_svg_tag": Value phải là %% domain_value %% -> %% error_signal %%`,
      params_invalid: `"payment_type_svg_tag": Thiếu giá trị attributeName hoặc attributeValue -> %% error_signal %%`,
      example: `
      "payment_type_svg_tag" message: %% message %%
      Case 1
        - Input:
          {% for type in shop.enabled_payment_types %}
            {{ type | payment_type_svg_tag: class: 'custom-class' }}
          {% endfor %}
        - Output:
          <svg class="custom-class" xmlns="http://www.w3.org/2000/svg">
            <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
            <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
            ...
          </svg>
          <svg class="custom-class" xmlns="http://www.w3.org/2000/svg">
            <path fill="#494949" d="M9 11h20v2H9z"></path>
            ...
          </svg>
    `,
    },
    placeholder_svg_tag: {
      value: `"placeholder_svg_tag": Value phải là %% domain_value %% -> %% error_signal %%`,
      params_invalid: `"placeholder_svg_tag": Tham số sai định dạng -> %% error_signal %%`,
      example: `
        "placeholder_svg_tag" message: %% error_signal %%
        - Input: {{ 'collection-1' | placeholder_svg_tag }}
        - Output: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.5 525.5">...omitted for brevity...</svg>
        - Input: {{ 'collection-1' | placeholder_svg_tag: 'custom' }}
        - Output: <svg class="custom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.5 525.5">...omitted for brevity...</svg>
      `,
    },
    pluralize: {
      params: `"pluralize" cần 2 tham số có định dạng là string -> %% error_signal %%`,
      value: `"pluralize": Value phải là number -> %% error_signal %%`,
      singular: `"pluralize": singular là bắt buộc -> %% error_signal %%`,
      plural: `"pluralize": plural là bắt buộc -> %% error_signal %%`,
      example: `
      "pluralize" message: %% message %%
      Case 1:
        - Input:
          {{ cart.item_count }}
          {{ cart.item_count | pluralize: 'item', 'items' }}
        - Ouput: 3 items
    `,
    },
    plus: {
      params: `"plus" cần 1 tham số có định dạng là number -> %% error_signal %%`,
      value: `"plus": number1 phải là number -> %% error_signal %%`,
      number2: `"plus": number2 phải là number -> %% error_signal %%`,
      example: `
      "plus" message: %% message %%
      Case 1:
        - Input: {{ 100 | plus: 10}}
        - Ouput: 110
    `,
    },
    preload_tag: `preload_tag chưa được support`,
    prepend: {
      params: `"prepend" cần 1 tham số có định dạng là string -> %% error_signal %%`,
      value: `"prepend": Value phải là string -> %% error_signal %%`,
      example: `
      "prepend" message: %% message %%
      Case 1:
        - Input:
          {{ 'World' | prepend: 'Hello' }}
          {% assign str = "apples, oranges, and bananas" | prepend: prependStr | truncate: 10 %}
          {{ "apples, oranges, and bananas" | truncate: 10 | prepend: prependStr }}
        - Ouput:
          Hello World.
    `,
    },
    remove_first: {
      params: `"remove_first" cần 1 tham số có định dạng là string -> %% error_signal %%`,
      value: `"remove_first": Value phải là string -> %% error_signal %%`,
      example: `
      "remove_first" message: %% message %%
      Case 1:
        - Input: {{ 'Hello, world. Goodbye, world.' | remove_first: 'world' }}
        - Ouput: Hello, . Goodbye, world.
    `,
    },
    remove: ``,
    replace_first: {
      params: `"remove_first" cần 2 tham số có định dạng là string -> %% error_signal %%`,
      value: `"remove_first": Value phải là string -> %% error_signal %%`,
      example: `
      "remove_first" message: %% message %%
      Case 1:
        - Input:
          <!-- product.title = "Awesome Awesome Shoes" -->
          {{ product.title | replace_first: 'Awesome', 'Mega' }}
        - Ouput: Mega Awesome Shoes
    `,
    },
    replace: {
      params: `"remove" cần 2 tham số có định dạng là string -> %% error_signal %%`,
      value: `"remove": Value phải là string -> %% error_signal %%`,
      example: `
      "remove" message: %% message %%
      Case 1:
        - Input:
          <!-- product.title = "Awesome Awesome Shoes" -->
          {{ product.title | replace: 'Awesome', 'Mega' }}
        - Ouput: Mega Mega Shoes
    `,
    },
    reverse: ``,
    round: ``,
    rstrip: {
      value: `"rstrip": Value phải là string -> %% error_signal %%`,
      example: `
      "rstrip" message: %% message %%
      Case 1:
        - Input: {{ '              too many spaces      ' | rstrip }}
        - Ouput: too many spaces
    `,
    },
    script_tag: `script_tag chưa được support`,
    sha1: `sha1 chưa được support`,
    sha256: `sha256 chưa được support`,
    shopify_asset_url: `shopify_asset_url chưa được support`,
    size: ``,
    slice: {
      params: `"slice' cần ít nhất 1 tham số có định dạng là string -> %% error_signal %%`,
      value: `"slice": Value phải là string hoặc mảng primitive -> %% error_signal %%`,
      from: `"slice": "from" phải là number -> %% error_signal %%`,
      to: `"slice": "to" phải là number -> %% error_signal %%`,
      example: `
      "slice" message: %% message %%
      Case 1:
        - Input: {{ "Liquid" | slice: 0 }}
        - Ouput: L
      Case 2:
        - Input: {{ "Liquid" | slice: 2, 5 }}
        - Ouput: quid
      Case 3:
        - Input:
          {% assign beatles = "John, Paul, George, Ringo" | split: ", " %}
          {{ beatles | slice: 1, 2 }}
        - Ouput: PaulGeorge
    `,
    },
    sort_by: {
      params: `"sort_by" cần 1 tham số có định dạng là string -> %% error_signal %%`,
      value: `"sort_by": Value phải là string -> %% error_signal %%`,
      example: `
      "sort_by" message: %% message %%
      Case 1:
        - Input: {{ collection.url | sort_by: 'best-selling' }}
        - Ouput: /collections/widgets?sort_by=best-selling
    `,
    },
    sort_natural: {
      value: `"sort_natural": Value phải là 1 mảng primitive hoặc 1 mảng object -> %% error_signal %%`,
      example: `
      "sort_natural" message: %% message %%
      Case 1:
        - Input:
        {% assign my_array = "zebra, octopus, giraffe, Sally Snake" | split: ", " %}
        {{ my_array | sort_natural | join: ", " }}
        - Ouput: giraffe, octopus, Sally Snake, zebra
      Case 2:
      {% assign products_by_company = collection.products | sort_natural: "company" %}
      {% for product in products_by_company %}
        <h4>{{ product.title }}</h4>
      {% endfor %}
    `,
    },
    sort: {
      value: `"sort": Value phải là array -> %% error_signal %%`,
      property_non_exist: `"sort": Property không tồn tại -> %% error_signal %%`,
      example: `
      "sort" message: %% message %%
      Case 1:
        - Input:
          {% assign my_array = "zebra, octopus, giraffe, Sally Snake" | split: ", " %}
          {{ my_array | sort | join: ", " }}

        - Ouput: Sally Snake, giraffe, octopus, zebra
    `,
    },
    split: ``,
    strip_html: ``,
    strip_newlines: {
      value: `"strip_newlines": Value phải là string -> %% error_signal %%`,
      example: `
      "strip_newlines" message: %% message %%
      Case 1:
        - Input:
          {% capture string_with_newlines %}
          Hello
          there
          {% endcapture %}
          {{ string_with_newlines | strip_newlines }}
        - Ouput: Hellothere
    `,
    },
    strip: ``,
    stylesheet_tag: `stylesheet_tag chưa được support`,
    t: {
      format_invalid: `"t": Sai format -> %% error_signal %%`,
      example: `
      "t" message: %% message %%
      Case 1:
        - Input:
          Liquid: <span>{{ 'products.product.sold_out' | t }}</span>
          JSON:
            en.json: {
              "products": {
                "product": {
                    "sold_out": "Sold out"
                }
              }
            }
            fr.json: {
              "products": {
                "product": {
                  "sold_out": "Épuisé"
                }
              }
            }
        - Ouput:
            en: <span>Sold out</span>
            fr: <span>Épuisé</span>
    `,
    },
    time_tag: `time_tag chưa được support`,
    times: {
      params: `"times": cần 1 tham số có định dạng là number -> %% error_signal %%`,
      value: `"times": factor1 phải là number -> %% error_signal %%`,
      factor: `"times": factor2 phải là number -> %% error_signal %%`,
      example: `
      "times" message: %% message %%
      Case 1:
        - Input: {{ 100 | times: 10}}
        - Ouput: 1000
    `,
    },
    truncate: {
      params: `"truncate" tham số có định dạng là string -> %% error_signal %%`,
      value: `"truncate": value phải là string -> %% error_signal %%`,
      example: `
      "truncatewords" message: %% message %%
      Case 1:
        - Input: {{ "Ground control to Major Tom." | truncate: 20 }}
        - Output: Ground control to...

      Case 2:
        - Input: {{ "Ground control to Major Tom." | truncate: 25, ", and so on" }}
        - Output: Ground control, and so on
      `,
    },
    truncatewords: {
      params: `"truncatewords" cần ít nhất 1 tham số có định dạng là number và string -> %% error_signal %%`,
      value: `"truncatewords": value phải là string -> %% error_signal %%`,
      quantity_words: `"truncatewords": quanlityWords phải là number -> %% error_signal %%`,
      example: `
      "truncatewords" message: %% message %%
      Case 1:
        - Input: {{ "Ground control to Major Tom." | truncatewords: 3 }}
        - Ouput: Ground control to...
      Case 2:
        - Input: {{ "Ground control to Major Tom." | truncatewords: 3, "--" }}
        - Ouput: Ground control to--
    `,
    },
    uniq: {
      value: `"uniq": Value phải là mảng primitive -> %% error_signal %%`,
      example: `
      "uniq" message: %% message %%
      Case 1:
        - Input:
          {% assign my_array = "ants, bugs, bees, bugs, ants" | split: ", " %}
          {{ my_array | uniq | join: ", " }}
        - Ouput: ants, bugs, bees
    `,
    },
    upcase: ``,
    url_decode: {
      value: `"url_decode": Value phải là string -> %% error_signal %%`,
      example: `
      "url_decode" message: %% message %%
      Case 1:
        - Input:
        {{ "%27Stop%21%27+said+Fred" | url_decode }}
        - Ouput: 'Stop!' said Fred
    `,
    },
    url_encode: ``,
    url_escape: {
      value: `"url_escape": Value phải là string -> %% error_signal %%`,
      example: `
      "url_escape" message: %% message %%
      Case 1:
        - Input:
          {{ '<hello> & <shopify>' | url_escape }}
        - Ouput: <hello> %26 <shopify>
    `,
    },
    url_for_type: {
      value: `"url_for_type": Value phải là string -> %% error_signal %%`,
      example: `
       "url_for_type" message: %% message %%
       Case 1:
         - Input:
          {{ "T-shirt" | url_for_type }}
         - Ouput:
          /collections/types?q=T-shirt
     `,
    },
    url_for_vendor: {
      value: `"url_for_vendor": Value phải là string -> %% error_signal %%`,
      example: `
        "url_for_vendor" message: %% message %%
        Case 1:
          - Input:
           {{ "Shopify" | url_for_vendor }}
          - Ouput:
           /collections/vendors?q=Shopify
      `,
    },
    url_param_escape: ``,
    video_tag: `video_tag chưa được support`,
    weight_with_unit: {
      example: `
      "weight_with_unit" message: %% message %%
      Case 1:
        - Input: {{ product.variants.first.weight | weight_with_unit }}
        - Ouput: 24.0 kg
      Case 2:
        - Input: {{ variant.weight | weight_with_unit: variant.weight_unit }}
        - Ouput: 52.9 lb
    `,
    },
    where: {
      params: `"where" cần ít nhất 1 tham số có định dạng là string -> %% error_signal %%`,
      value: `"where": Value phải là array -> %% error_signal %%`,
      property: `"where": Property là bắt buộc -> %% error_signal %%`,
      property_non_exist: `"where": Property không tồn tại -> %% error_signal %%`,
      example: `
      "where" message: %% message %%
      Case 1:
        - Input:
          {% for product in products %}
          - {{ product.title }}
          {% endfor %}
          {% assign kitchen_products = products | where: "type", "kitchen" %}
          Kitchen products:
          {% for product in kitchen_products %}
          - {{ product.title }}
          {% endfor %}
        - Ouput:
          All products:
          - Vacuum
          - Spatula
          - Television
          - Garlic press

          Kitchen products:
          - Spatula
          - Garlic press
    `,
    },
    within: {
      params: `"within" cần 1 tham số có định dạng là object collection -> %% error_signal %%`,
      value: `"within": value phải là string -> %% error_signal %%`,
      example: `
      "within" message: %% message %%
        - Input: <a href="{{ product.url | within: collection }}">{{ product.title }}</a>
        - Ouput: <a href="/collections/frontpage/products/alien-poster">Alien Poster</a>
    `,
    },
  },
  global_object: {
    powered_by_link: ``,
  },
  iteration: {
    break: `break chưa được support. Bạn có thể dùng if để giải quyết trường hợp này`,
    continue: `continue chưa được support. Bạn có thể dùng if để giải quyết trường hợp này`,
    cycle: `Tag 'cycle' chưa được support. Bạn có thể dùng if else kết hợp filter 'slice' để giải quyết trường hợp này`,
    limit: `
      "Limit" Có gì đó sai sai! %%error_signal%%
      Input:
      {% for item in array limit: 2 %}
       {{ item }}
      {% endfor %}

      {% for item in array limit: variableName %}
       {{ item }}
      {% endfor %}

      {% for item in array limit: variableObject.key %}
       {{ item }}
      {% endfor %}
      Output:
      {% for item in array | slice(0, 2) %}
        {{ item }}
      {% endfor %}

      {% for item in array | slice(0, variableName) %}
       {{ item }}
      {% endfor %}

      {% for item in array | slice(0, variableObject.key) %}
       {{ item }}
      {% endfor %}
    `,
    offset: `
      "Offset": Có gì đó sai sai! %%error_signal%%
      Input:
        {% for item in array offset: 2 %}
          {{ item }}
        {% endfor %}

        {% for item in array offset: variableName %}
          {{ item }}
        {% endfor %}

        {% for item in array offset: variableObject.key %}
          {{ item }}
        {% endfor %}
        Output:
        {% for item in array | slice(2, 99999999) %}
          {{ item }}
        {% endfor %}

        {% for item in array | slice(variableName, 99999999) %}
          {{ item }}
        {% endfor %}

        {% for item in array | slice(variableObject.key, 99999999) %}
          {{ item }}
        {% endfor %}
    `,
    reversed: ``,
    tablerow: `Tag 'tablerow' chưa được support. Bạn có thể dùng forloop thông thường trong trường hợp này như 1 giải pháp thay thế`,
  },
  section_schema: "Tag 'schema' chưa được support",
  theme_tags: {
    forms: {
      unnestable: "Tag 'form' chưa support kiểu nested Vì đơn giản là nó không cần thiết",
      activate_customer_password: `"activate_customer_password": Có gì đó sai sai -> %% error_signal %%`,
      reset_customer_password: `"reset_customer_password": Có gì đó sai sai -> %% error_signal %%`,
      contact: `"contact": Có gì đó sai sai -> %% error_signal %%`,
      create_customer: `"create_customer": Có gì đó sai sai -> %% error_signal %%`,
      customer_login: `"customer_login": Có gì đó sai sai -> %% error_signal %%`,
      customer: `"customer": Có gì đó sai sai -> %% error_signal %%`,
      guest_login: `"guest_login": Có gì đó sai sai -> %% error_signal %%`,
      new_comment: `"new_comment": Có gì đó sai sai -> %% error_signal %%`,
      product: `"product": Có gì đó sai sai -> %% error_signal %%`,
      recover_customer_password: `"recover_customer_password": Có gì đó sai sai -> %% error_signal %%`,
      storefront_password: `"storefront_password": Có gì đó sai sai -> %% error_signal %%`,
      localization: `"localization": Có gì đó sai sai -> %% error_signal %%`,
    },
    comment: {
      example: `
      "example": Có gì đó sai sai -> %% error_signal %%
      Syntax đúng:
      {% comment %}
        content
      {% endcomment %}
      `,
    },
    layout: `Tag 'layout' chưa được support`,
    liquid: {
      example: `
      "liquid": Có gì đó sai sai -> %% error_signal %%
      Syntax đúng:
      {% liquid
        assign product_type = product.type | downcase
        assign message = ''

        case product_type
          when 'health'
            assign message = 'This is a health potion!'
          when 'love'
            assign message = 'This is a love potion!'
          else
            assign message = 'This is a potion!'
        endcase

        echo message
      %}
      `,
    },
    paginate: {
      example: `
        "paginate": Có gì đó sai sai -> %% error_signal %%
        Syntax đúng:
          {% paginate collection.products by 2 %}
            {% for product in collection.products %}
              {{ product.title }} product card
            {% endfor %}
          {% endpaginate %}
      `,
    },
    render: {
      not_exist: '%% snippet_name %% not exist -> %% error_signal %%',
      example: `
        "render": Có gì đó sai sai -> %% error_signal %%
        {% render 'fileName', variable1: value, variable2: value %}
      `,
    },
    section: `Tag 'section' chưa được support`,
    style: ``,
  },
  variable_tags: {
    capture: ``,
    decrement: ``,
    increment: ``,
  },
  exception_of_code_liquid: {
    variable: `%% error_signal %%: 2.2: Đặt tên trùng với tên biến, tags, filters của shopify`,
    variable_outside_shopify_tag: `%% error_signal %%: Cần phải bọc đoạn code trong cặp thẻ <shopify></shopify> để có thể sử dụng dữ liệu Shopify`,
    filter: `%% error_signal %%: 2.3: Filter và tags phải nằm trong tag "shopify" để có thể tự động convert theo shop`,
    filter_in_if_tag: `%% error_signal %%: 2.15: Dùng filter trong tag "if" là không thể`,
    field_value: `%% error_signal %%: Liquid không có kiểu dữ liệu object và array`,
    nested_form: `%% error_signal %%: "{% form %}...{% endform %} lồng nhau chưa được support`,
    nested_paginate: `%% error_signal %%: {% paginate %}...{% endpaginate %} lồng nhau chưa được support`,
    nested_liquid_tag: `%% error_signal %%: {% liquid ... %} lồng nhau chưa được support`,
  },
  clause_in_shopify: {
    navigation: `Bạn không thể dùng "navigation" trong thẻ shopify`,
    products: `Bạn không thể dùng "products" trong thẻ shopify`,
    array: `2.1: Bạn không thể dùng array trong thẻ shopify`,
    translate_field: 'Bạn không thể dùng chức năng translation trong array',
    reassign_value_in_liquid_tag: `Biến "%% variable_name %%" - biến đang được sử dụng trong forloop - không thể reassign trong {% liquid ... %}. Bạn có thể sử dụng {% assign %% variable_name %% = ... %} như một giải pháp thay thế`,
  },
  error_notification_title: `Section %% section_name %% có lỗi:`,
} as const;
