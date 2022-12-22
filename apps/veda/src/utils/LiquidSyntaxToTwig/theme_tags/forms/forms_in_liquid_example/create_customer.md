### Preview
![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/create_customer.png?alt=media&token=d1c6c2b5-0992-4280-bdc4-e2ca2992d5b1)

### Code
```html
{%- form 'create_customer' -%}
  {{ form.errors | default_errors }}
  <div class="field">      
    <input
      type="text"
      name="customer[first_name]"
      id="RegisterForm-FirstName"
      {% if form.first_name %}value="{{ form.first_name }}"{% endif %}
      autocomplete="given-name"
      placeholder="First Name"
    >
    <label for="RegisterForm-FirstName">
      First Name
    </label>
  </div>
  <div class="field">
    <input
      type="text"
      name="customer[last_name]"
      id="RegisterForm-LastName"
      {% if form.last_name %}value="{{ form.last_name }}"{% endif %}
      autocomplete="family-name"
      placeholder="Last Name"
    >
    <label for="RegisterForm-LastName">
      Last Name
    </label>
  </div>
  <div class="field">      
    <input
      type="email"
      name="customer[email]"
      id="RegisterForm-email"
      {% if form.email %} value="{{ form.email }}"{% endif %}
      spellcheck="false"
      autocapitalize="off"
      autocomplete="email"
      aria-required="true"
      {% if form.errors contains 'email' %}
        aria-invalid="true"
        aria-describedby="RegisterForm-email-error"
      {% endif %}
      placeholder="Email"
    >
    <label for="RegisterForm-email">
      Email
    </label>
  </div>
  <div class="field">     
    <input
      type="password"
      name="customer[password]"
      id="RegisterForm-password"
      aria-required="true"
      {% if form.errors contains 'password' %}
        aria-invalid="true"
        aria-describedby="RegisterForm-password-error"
      {% endif %}
      placeholder="Password"
    >
    <label for="RegisterForm-password">
      Password
    </label>
  </div>
  <button type="submit">
    Submit
  </button>
{%- endform -%}
```
