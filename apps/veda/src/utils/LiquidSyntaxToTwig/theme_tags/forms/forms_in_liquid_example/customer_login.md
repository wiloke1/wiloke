### Preview
![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/customer_login.png?alt=media&token=0fab53f6-8ddf-4c2d-b210-3d7e883dbe41)

### Code
```html
{%- form 'customer_login', novalidate: 'novalidate' -%}
{{ form.errors | default_errors }}
<p class="form-row">
  <label for="CustomerEmail">Email<span class="required">*</span></label>
  <input type="email" name="customer[email]" id="CustomerEmail" autocomplete="email" autocorrect="off" autocapitalize="off"{%- if form.errors contains 'form' %} class="input--error" aria-invalid="true"{%- endif -%}>
</p>
{%- if form.password_needed -%}
<p class="form-row">
  <label for="CustomerPassword">Password <span class="required">*</span></label>
  <input type="password" value="" name="customer[password]"id="CustomerPassword"{%- if form.errors contains 'form' %} class="input--error" aria-invalid="true"{%- endif -%}>
</p>
{%- endif -%}
  {%- if form.password_needed -%}
    <p><a href="#recover" data-no-instant rel="nofollow" id="RecoverPassword">Forgot password</a></p>
  {%- endif -%}
  <input type="submit" class="btn js_add_ld" value="Sign in">
  <p><a href="{{routes.account_register_url}}" class="js_add_ld" id="customer_register_link">Create Account</a></p>
{%- endform -%}
```
