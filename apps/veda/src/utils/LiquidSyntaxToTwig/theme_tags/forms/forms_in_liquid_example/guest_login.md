### Preview
![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/guest_login.png?alt=media&token=7f36a964-190a-4d94-8adc-a3777484ea94)

### Code
```html
{%- if shop.checkout.guest_login -%}
  <div>
    <hr>
    <h2>{{ 'customer.login_page.guest_title' | t }}</h2>

    {%- form 'guest_login' -%}
      <button>
        {{ 'customer.login_page.guest_continue' | t }}
      </button>
    {%- endform -%}
  </div>
{%- endif -%}
```
