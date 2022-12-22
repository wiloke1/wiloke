### Preview
![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/contact.png?alt=media&token=ad2f601f-09cf-42da-af53-1368b86e4399)

### Code
```html
{%- form 'contact', id: 'ContactForm', class: 'isolate' -%}
{{ form.errors | default_errors }}

  {%- if form.posted_successfully? -%}
    <h2 class="form-status form-status-list form__message" tabindex="-1" autofocus>
      {% render 'icon-success' %} {{ 'templates.contact.form.post_success' | t }}
    </h2>
  {%- endif -%}
  <div class="contact__fields">
    <div class="field">
      <input class="field__input" autocomplete="name" type="text" id="ContactForm-name" name="contact[name]" value="{% if form.name %}{{ form.name }}{% elsif customer %}{{ customer.name }}{% endif %}" placeholder="Name">
      <label class="field__label" for="ContactForm-name">Name</label>
    </div>
    <div class="field field--with-error">
      <input
        autocomplete="email"
        type="email"
        id="ContactForm-email"
        class="field__input"
        name="contact[email]"
        spellcheck="false"
        autocapitalize="off"
        value="{% if form.email %}{{ form.email }}{% elsif customer %}{{ customer.email }}{% endif %}"
        aria-required="true"
        {% if form.errors contains 'email' %}
          aria-invalid="true"
          aria-describedby="ContactForm-email-error"
        {% endif %}
        placeholder="Email"
      >
      <label class="field__label" for="ContactForm-email">Email <span aria-hidden="true">*</span></label>
      {%- if form.errors contains 'email' -%}
        <small class="contact__field-error" id="ContactForm-email-error">
          <span class="visually-hidden">{{ 'accessibility.error' | t }}</span>
          <span class="form__message">{% render 'icon-error' %}{{ form.errors.translated_fields['email'] | capitalize }} {{ form.errors.messages['email'] }}</span>
        </small>
      {%- endif -%}
    </div>
  </div>
  <div class="field">
    <input type="tel" id="ContactForm-phone" class="field__input" autocomplete="tel" name="contact[phone]" pattern="[0-9\-]*" value="{% if form.phone %}{{ form.phone }}{% elsif customer %}{{ customer.phone }}{% endif %}" placeholder="Phone">
    <label class="field__label" for="ContactForm-phone">Phone</label>
  </div>
  <div class="field">
    <textarea
      rows="10"
      id="ContactForm-body"
      class="text-area field__input"
      name="contact[comment]"
      placeholder="Comment"
    >
      {{- form.body -}}
    </textarea>
    <label class="form__label field__label" for="ContactForm-body">Comment</label>
  </div>
  <div class="contact__button">
    <button type="submit" class="button">
      Send
    </button>
  </div>
{%- endform -%}
```
