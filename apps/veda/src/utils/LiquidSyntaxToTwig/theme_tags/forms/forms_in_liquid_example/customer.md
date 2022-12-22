### Preview
![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/customer.png?alt=media&token=9115c982-f7c9-40a8-9694-19ac195c69c3)

### Code
```html
{% form 'customer' %}
{% if form.posted_successfully? %}
  <div class="message_successed"><p class="result">
      Thanks for subscribing!
    </p></div>
{% else %}
  <div class="gt_form">
    <input type="text" value="{% if customer %}{{ customer.first_name }}{% endif %}" name="contact[first_name]" autocorrect="off" autocapitalize="off" placeholder="Your name">
    <input type="email" value="{% if customer %}{{ customer.email }}{% endif %}" name="contact[email]" autocorrect="off" autocapitalize="off" placeholder="Your email address">
    <button type="submit" class="gt_subscrible">
      Sign Up Now
    </button>
  </div>
  {% if form.errors %}
    {% for field in form.errors %}
      <p class="result-error">{{ field }} {{ form.errors.messages[field] }}</p>
    {% endfor %}
  {% endif %}
{% endif %}

{% endform %}
```
