## Trường hợp add new

### Preview

![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/customer_address_add_new.png?alt=media&token=292d555f-bba8-4a36-b858-2a25ec3cf7d2)

### Code

```html
{%- form 'customer_address', customer.new_address -%} 
{{ form.errors | default_errors }}
<div class="field">
  <input
    type="text"
    id="AddressFirstNameNew"
    name="address[first_name]"
    value="{{ form.first_name }}"
    autocomplete="given-name"
    placeholder="First Name"
  />
  <label for="AddressFirstNameNew">First Name</label>
</div>
<div class="field">
  <input
    type="text"
    id="AddressLastNameNew"
    name="address[last_name]"
    value="{{ form.last_name }}"
    autocomplete="family-name"
    placeholder="Last Name"
  />
  <label for="AddressLastNameNew">Last Name</label>
</div>
<div class="field">
  <input type="text" id="AddressCompanyNew" name="address[company]" value="{{ form.company }}" autocomplete="organization" placeholder="Company" />
  <label for="AddressCompanyNew">Company</label>
</div>
<div class="field">
  <input
    type="text"
    id="AddressAddress1New"
    name="address[address1]"
    value="{{ form.address1 }}"
    autocomplete="address-line1"
    placeholder="Address 1"
  />
  <label for="AddressAddress1New">Address 1</label>
</div>
<div class="field">
  <input
    type="text"
    id="AddressAddress2New"
    name="address[address2]"
    value="{{ form.address2 }}"
    autocomplete="address-line2"
    placeholder="Address 2"
  />
  <label for="AddressAddress2New">Address 2</label>
</div>
<div class="field">
  <input type="text" id="AddressCityNew" name="address[city]" value="{{ form.city }}" autocomplete="address-level2" placeholder="City" />
  <label for="AddressCityNew">City</label>
</div>
<div>
  <label for="AddressCountryNew">Country</label>
  <div class="select">
    <select id="AddressCountryNew" name="address[country]" data-default="{{ form.country }}" autocomplete="country">
      {{ all_country_option_tags }}
    </select>
    <svg aria-hidden="true" focusable="false" viewBox="0 0 10 6">
      <use href="#icon-caret" />
    </svg>
  </div>
</div>
<div id="AddressProvinceContainerNew" style="display: none">
  <label for="AddressProvinceNew">Province</label>
  <div class="select">
    <select id="AddressProvinceNew" name="address[province]" data-default="{{ form.province }}" autocomplete="address-level1"> </select>
    <svg aria-hidden="true" focusable="false" viewBox="0 0 10 6">
      <use href="#icon-caret" />
    </svg>
  </div>
</div>
<div class="field">
  <input
    type="text"
    id="AddressZipNew"
    name="address[zip]"
    value="{{ form.zip }}"
    autocapitalize="characters"
    autocomplete="postal-code"
    placeholder="Postal/Zip code"
  />
  <label for="AddressZipNew">Postal/Zip code</label>
</div>
<div class="field">
  <input type="tel" id="AddressPhoneNew" name="address[phone]" value="{{ form.phone }}" autocomplete="tel" placeholder="Phone" />
  <label for="AddressPhoneNew">Phone</label>
</div>
<div>
  {{ form.set_as_default_checkbox }}
  <label for="address_default_address_new">Set as default address</label>
</div>
<div>
  <button>Add</button>
  <button type="reset">Cancel</button>
</div>
{%- endform -%}
```

## Trường hợp update

### Preview

![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/customer_address_update.png?alt=media&token=e5f4b999-ab61-4ce3-8d7d-7d10363954ff)

### Code

```html
{%- for address in customer.addresses -%}
<h2>Edit address</h2>
{%- form 'customer_address', address -%}
<div class="field">
  <input
    type="text"
    id="AddressFirstName_{{ form.id }}"
    name="address[first_name]"
    value="{{ form.first_name }}"
    autocomplete="given-name"
    placeholder="First Name"
  />
  <label for="AddressFirstName_{{ form.id }}">First Name</label>
</div>
<div class="field">
  <input
    type="text"
    id="AddressLastName_{{ form.id }}"
    name="address[last_name]"
    value="{{ form.last_name }}"
    autocomplete="family-name"
    placeholder="Last Name"
  />
  <label for="AddressLastName_{{ form.id }}">Last Name</label>
</div>
<div class="field">
  <input
    type="text"
    id="AddressCompany_{{ form.id }}"
    name="address[company]"
    value="{{ form.company }}"
    autocomplete="organization"
    placeholder="Company"
  />
  <label for="AddressCompany_{{ form.id }}">Company</label>
</div>
<div class="field">
  <input
    type="text"
    id="AddressAddress1_{{ form.id }}"
    name="address[address1]"
    value="{{ form.address1 }}"
    autocomplete="address-line1"
    placeholder="Address 1"
  />
  <label for="AddressAddress1_{{ form.id }}">Address 1</label>
</div>
<div class="field">
  <input
    type="text"
    id="AddressAddress2_{{ form.id }}"
    name="address[address2]"
    value="{{ form.address2 }}"
    autocomplete="address-line2"
    placeholder="Address 2"
  />
  <label for="AddressAddress2_{{ form.id }}">Address 2</label>
</div>
<div class="field">
  <input type="text" id="AddressCity_{{ form.id }}" name="address[city]" value="{{ form.city }}" autocomplete="address-level2" placeholder="City" />
  <label for="AddressCity_{{ form.id }}">City</label>
</div>
<div>
  <label for="AddressCountry_{{ form.id }}">
    Country
  </label>
  <div class="select">
    <select
      id="AddressCountry_{{ form.id }}"
      name="address[country]"
      data-address-country-select
      data-default="{{ form.country }}"
      data-form-id="{{ form.id }}"
      autocomplete="country"
    >
      {{ all_country_option_tags }}
    </select>
    <svg aria-hidden="true" focusable="false" viewBox="0 0 10 6">
      <use href="#icon-caret" />
    </svg>
  </div>
</div>
<div id="AddressProvinceContainer_{{ form.id }}" style="display:none;">
  <label for="AddressProvince_{{ form.id }}">
    Province
  </label>
  <div class="select">
    <select id="AddressProvince_{{ form.id }}" name="address[province]" data-default="{{ form.province }}" autocomplete="address-level1"> </select>
    <svg aria-hidden="true" focusable="false" viewBox="0 0 10 6">
      <use href="#icon-caret" />
    </svg>
  </div>
</div>
<div class="field">
  <input
    type="text"
    id="AddressZip_{{ form.id }}"
    name="address[zip]"
    value="{{ form.zip }}"
    autocapitalize="characters"
    autocomplete="postal-code"
    placeholder="Postal/Zip code"
  />
  <label for="AddressZip_{{ form.id }}">Postal/Zip code</label>
</div>
<div class="field">
  <input type="tel" id="AddressPhone_{{ form.id }}" name="address[phone]" value="{{ form.phone }}" autocomplete="tel" placeholder="Phone" />
  <label for="AddressPhone_{{ form.id }}">Phone</label>
</div>
<div>
  {{ form.set_as_default_checkbox }}
  <label for="address_default_address_{{ form.id }}">
    Set as default address
  </label>
</div>
<div>
  <button>Update</button>
  <button type="reset">Cancel</button>
</div>
{%- endform -%} {%- endfor -%}
```
