### Preview

![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/activate_customer_password.png?alt=media&token=75065efe-b8f7-44e7-85e5-5a40097dee05)

### Code

```html
{% form 'activate_customer_password' %} 
{{ form.errors | default_errors }}

<div class="password">
  <label for="password">Password</label>
  <input type="password" name="customer[password]" />
</div>

<div class="password_confirm">
  <label for="password_confirmation">Password Confirmation</label>
  <input type="password" name="customer[password_confirmation]" />
</div>

<div class="submit">
  <input type="submit" value="Activate account" />
  <span>or</span>
  <input type="submit" name="decline" value="Decline invitation" />
</div>
{% endform %}
```
