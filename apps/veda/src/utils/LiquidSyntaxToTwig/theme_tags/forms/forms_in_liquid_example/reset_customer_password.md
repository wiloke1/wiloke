### Preview
![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/reset_customer_password.png?alt=media&token=9c47acb3-3c91-4f22-9ec9-eae903cf7c9c)


### Code
```html

{%- form 'reset_customer_password' -%}
{%- if form.errors -%}
  <h2 class="form__message" tabindex="-1" autofocus>
    <span class="visually-hidden">{{ 'accessibility.error' | t }} </span>
    <svg aria-hidden="true" focusable="false" role="presentation">
      <use href="#icon-error" />
    </svg>
    {{ 'templates.contact.form.error_heading' | t }}
  </h2>
  <ul>
    {%- for field in form.errors -%}
      <li>
        {%- if field == 'form' -%}
          {{ form.errors.messages[field] }}
        {%- else -%}
          <a href="#{{ field }}">
            {{ form.errors.translated_fields[field] | capitalize }}
            {{ form.errors.messages[field] }}
          </a>
        {%- endif -%}
      </li>
    {%- endfor -%}
  </ul>
{%- endif -%}

<div class="field">      
  <input
    type="password"
    name="customer[password]"
    id="password"
    autocomplete="new-password"
    {% if form.errors contains 'password' %}
      aria-invalid="true"
      aria-describedby="password-error"
    {% endif %}
    placeholder="Password"
  >
  <label for="password">
    Password
  </label>
  {%- if form.errors contains 'password' -%}
    <small id="password-error" class="form__message">
      <svg aria-hidden="true" focusable="false" role="presentation">
        <use href="#icon-error" />
      </svg>
      {{ form.errors.translated_fields['password'] | capitalize }} {{ form.errors.messages['password'] }}
    </small>
  {%- endif -%}
</div>

<div class="field">      
  <input
    type="password"
    name="customer[password_confirmation]"
    id="password_confirmation"
    autocomplete="new-password"
    {% if form.errors contains 'password_confirmation' %}
      aria-invalid="true"
      aria-describedby="password_confirmation-error"
    {% endif %}
    placeholder="Confirm"
  >
  <label for="password_confirmation">
    Confirm
  </label>
  {%- if form.errors contains 'password_confirmation' -%}
    <small id="password_confirmation-error" class="form__message">
      <svg aria-hidden="true" focusable="false" role="presentation">
        <use href="#icon-error" />
      </svg>
      {{ form.errors.translated_fields['password_confirmation'] | capitalize }} {{ form.errors.messages['password_confirmation'] }}
    </small>
  {%- endif -%}
</div>

<button>
  Submit
</button>
{%- endform -%}
```
