### Preview
![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/storefront_password.png?alt=media&token=221391cb-b861-4408-8ff7-26793ab824b5)

### Code
```html
{%- form 'storefront_password', class: 'password-form' -%}
  {{ form.errors | default_errors }}
<div class="password-field field{% if form.errors %} password-field--error{% endif %}">
<input
  type="password"
  name="password"
  id="Password"
  class="field__input"
  autocomplete="current-password"
  {% if form.errors %}
    aria-invalid="true"
    aria-describedby="PasswordLoginForm-password-error"
  {%- endif -%}
  placeholder="Password"
>
<label class="field__label" for="password">Password</label>
{%- if form.errors -%}
  <div id="PasswordLoginForm-password-error" role="status">
    <span class="visually-hidden">{{ 'accessibility.error' | t }}</span>
    <span class="form__message">{% render 'icon-error' %} {{ 'general.password_page.login_form_error' | t }}</span>
  </div>
{%- endif -%}
</div>
<button name="commit" class="password-button button button--outline">
Login
</button>
{%- endform -%}
```
