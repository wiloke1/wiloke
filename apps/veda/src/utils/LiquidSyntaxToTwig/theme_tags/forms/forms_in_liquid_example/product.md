### Preview
![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/product.png?alt=media&token=eceee353-5dca-46e6-8050-caa22eed79ea)

### Code
```html
{%- form 'product', product -%}
  {{ form.errors | default_errors }}
  <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}" disabled>
  <div class="product-form__buttons">
    <button
      type="submit"
      name="add"
      class="product-form__submit button button--full-width {% if block.settings.show_dynamic_checkout and product.selling_plan_groups == empty %}button--secondary{% else %}button--primary{% endif %}"
      {% if product.selected_or_first_available_variant.available == false %}disabled{% endif %}
    >
        <span>
          {%- if product.selected_or_first_available_variant.available -%}
            Add to cart
          {%- else -%}
            Sold out
          {%- endif -%}
        </span>
        <div class="loading-overlay__spinner hidden">
          <svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
          </svg>
        </div>
    </button>
    {%- if block.settings.show_dynamic_checkout -%}
      {{ form | payment_button }}
    {%- endif -%}
  </div>
{%- endform -%}
```
