# 1. Custom những cái mà Twig chưa cung cấp sẵn

## 1.1 Lưu ý dữ liệu các object liquid nên là Object để có thể linh hoạt trong việc custom lại những thứ này

- Ví dụ như trường hợp filter "img_url" với "featured_image" là object ta có thể custom giống y hêt shopify. Chi tiết xem tại code.

## 1.2 Extending twig.js

- Chi tiết xem tại: https://github.com/twigjs/twig.js/wiki/Extending-twig.js
- Type đã được viết và nó khá đơn giản

## 1.3 Extending twig.js With Custom Tags

- Chi tiết xem tại: https://github.com/twigjs/twig.js/wiki/Extending-twig.js-With-Custom-Tags
- “Custom tags“ nên là phương án cuối cùng nếu việc regex để biến đổi về syntax hợp lệ là không thể vì:
  - Vẫn phải regex hoặc làm bất cứ thứ gì để trả về twig syntax → có thể ra việc lặp lại hàm “handleLiquidSyntaxToTwig“
  - Performance sẽ bị giảm là điều chắc chắn vì sẽ phải compile riêng cho phần đó r lại compile twig cho toàn bộ
  - ...

# 2. Những ràng buộc về code

## 2.1 Không thể sử dụng schema array trong cặp thể "shopify"

- Vì đơn giản kiểu dữ liệu array cần index mới có thể trích xuất dữ liệu để có thể thay thế vào code liquid -> Không thể giải quyết được

## 2.2 Không thể sử dụng 1 số tên biến trong Schema

- Chi tiết xem tại file code "src/utils/LiquidSyntaxToTwig/const.ts"

## 2.3 Không thể sử dụng 1 số filter ngoài cặp thẻ "shopify"

- Chi tiết xem tại file code "src/utils/LiquidSyntaxToTwig/const.ts"

## 2.4 Ảnh bắt buộc phải đi theo filter “img_url” mới có thể sử dụng tại liquid shopify

## 2.5 Không thể sử dụng nested tag "shopify"

## 2.6 Các biến product, blog, article, collection chỉ xuất hiện tại những page tương ứng

## 2.7 Để có lấy được giá trị của product, blog, article, collection với các picker ở schema ta cần code như sau

- all_products[product_picker_name_in_schema]
- collections[collection_picker_name_in_schema]
- blogs[blog_picker_name_in_schema]
- articles[article_picker_name_in_schema]
- {% assign bloghandle = name_of_blog_picker_in_schema %}

## 2.8 Một số thứ của các object, array không thể dùng được

- Ví dụ .empty, .size của products, collections, ...

## 2.9 Tên biến không được chứa các kỹ tự regex đặc biệt như . \ / ' ", ...

## 2.10 {% if article.comments_enabled? %}...{% endif %} -> dấu ? là không thể

## 2.11 form.errors chỉ có thể sử dụng như 1 array

- Chỉ có thể sử dụng {% for error in form.errors %} {{ error }} ... {% endfor %} để xử lý các bài toán

## 2.12 Những field có value là 1 object (VD: "flexOrder" và "responsive") hoặc "Block Object" dùng trong cặp thẻ "shopify" phải tuân theo những quy tắc sau

- Trường hợp field là "settings"

  - Không thể gán vào 1 biến khác

    ```typescript
    Input:
    const section: PageSection = {
      ...generalSectionData,
      data: {
        ...,
        settings: [
          {
              id: 'Sample 1',
              type: 'responsive',
              label: 'Responsive',
              name: 'responsive',
              disable: false,
              children: {
                lg: 4,
                md: 3,
                sm: 2,
                xs: 1,
              },
          }
        ]
        liquid: `
          <shopify>
            {% assign newVar = responsive %}
            {{ newVar.lg }}
          </shopify>
        ` -> 🔴 Builder vẫn sẽ chạy nhưng shopify thì KHÔNG
        liquid: `
          {{ responsive.lg }}
        ` -> ✅ Cách duy nhất
      }
    }
    ```

- Trường hợp field là "blocks"

  - Không thể gán vào 1 biến khác

    ```typescript
    Input:
    const section: PageSection = {
      ...generalSectionData,
      data: {
        ...,
        settings: [
          {
            id: 'id_473e9c2b-18b9-46a3-9830-b7993f51d9e2',
            children: [
              {
                children: {
                  lg: 1,
                  md: 1,
                  sm: 1,
                  xs: 1
                },
                type: 'responsive',
                label: 'Column',
                summary: '',
                name: 'column',
                id: 'id_525a82e4-dec5-4e49-8c2b-cb5e79ff254c',
                disable: false,
                max: 12,
                min: 1
              }
            ],
            type: 'object',
            label: {
              en: 'General settings',
              vi: 'Cài đặt chung'
            },
            name: 'general_settings',
            open: true,
            drawer: false,
            disable: false
          }
        ]
        liquid: `
          <shopify>
            {% assign newVar = general_settings %}
            {{ newVar.responsive.lg }}
          </shopify>
        ` -> 🔴 Builder vẫn sẽ chạy nhưng shopify thì KHÔNG
        liquid: `
          <shopify>
            {% assign newVar = general_settings.responsive %}
            {{ newVar.lg }}
          </shopify>
        ` -> 🔴 Builder vẫn sẽ chạy nhưng shopify thì KHÔNG
        liquid: `
          {{ general_settings.responsive.lg }}
        ` -> ✅ Cách duy nhất
      }
    }
    ```

## 2.13 Chỉ có thể khai báo tên biến có chứa "\_" hoặc "-"

## 2.14 Dùng filter trong tag "if" là không thể

- {% if product.images | size > 0 %} -> 🔴 SAI
  ```
  Giải pháp thay thế
  {% assign image_size = product.images | size %}
  {% if product.images | size > 0 %}
  ```

## 2.15 Nhiều thứ liên quan đến liquid trong trường hợp những đoạn code giống y hệt nhau chưa test được hết

- Hiện tại nhiều thứ liên quan đến liquid trong trường hợp những đoạn code giống y hệt nhau chưa test được hết -> Trong quá trình làm nếu có lỗi cần để ý lỗi này đầu tiên

## 2.16 Muốn dùng translation trong field sẽ phải giới hạn vài thứ
- k thể dùng "filter" -> Ví dụ {{ translationField | split: " " }}
- chỉ có thể check falsy trong if, elsif, case when -> Ví dụ {% if heading.title %} thì đc nhưng {% if heading.title == ... %} thì k 
- K thể dùng trong assign
- ===> chỉ có thể là in ra giá trị chứ k dùng trong {% ... %} đc

## Nhiều thứ nữa mà chưa biết đến
