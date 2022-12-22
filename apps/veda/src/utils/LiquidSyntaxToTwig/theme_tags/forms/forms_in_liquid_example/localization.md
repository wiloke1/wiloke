### Preview
![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/localization.png?alt=media&token=1e6b6632-b6ba-4ef7-86b0-1237626891f2)

### Code
```html
{%- form 'localization', id: 'FooterLanguageForm', class: 'localization-form' -%}
  <div class="no-js-hidden">
    <h2 class="caption-large text-body" id="FooterLanguageLabel">{{ 'localization.language_label' | t }}</h2>
    <div class="disclosure">
      <button type="button" class="disclosure__button localization-form__select localization-selector link link--text caption-large" aria-expanded="false" aria-controls="FooterLanguageList" aria-describedby="FooterLanguageLabel">
        {{ localization.language.endonym_name | capitalize }}
        {% render 'icon-caret' %}
      </button>
      <div class="disclosure__list-wrapper" hidden>
        <ul id="FooterLanguageList" role="list" class="disclosure__list list-unstyled">
          {%- for language in localization.available_languages -%}
            <li class="disclosure__item" tabindex="-1">
              <a class="link link--text disclosure__link caption-large{% if language.iso_code == localization.language.iso_code %} disclosure__link--active{% endif %} focus-inset" href="#" hreflang="{{ language.iso_code }}" lang="{{ language.iso_code }}"{% if language.iso_code == localization.language.iso_code %} aria-current="true"{% endif %} data-value="{{ language.iso_code }}">
                {{ language.endonym_name | capitalize }}
              </a>
            </li>
          {%- endfor -%}
        </ul>
      </div>
    </div>
    <input type="hidden" name="locale_code" value="{{ localization.language.iso_code }}">
  </div>
{%- endform -%}
```
