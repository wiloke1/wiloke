### Preview
![image info](https://firebasestorage.googleapis.com/v0/b/veda-builder-liquid-docs.appspot.com/o/new_comment.png?alt=media&token=d14dda2c-a7b1-4d25-a9ea-860bdacd1273)


### Code
```html
{% form 'new_comment', article %}
{%- liquid
  assign post_message = 'blogs.article.success'
  if blog.moderated? and comment.status == 'unapproved'
    assign post_message = 'blogs.article.success_moderated'
  endif
-%}
<h2>Leave a comment</h2>
{%- if form.errors -%}
  {{ form.errors | default_errors }}
{%- elsif form.posted_successfully? -%}
  <div class="form-status-list form__message" role="status">
    <h3 class="form-status" tabindex="-1" autofocus>{% render 'icon-success' %} Your comment was posted successfully. We will publish it in a little while, as our blog is moderated.</h3>
  </div>
{%- endif -%}

<div {% if blog.moderated? == false %} class="article-template__comments-fields"{% endif %}>
  <div class="article-template__comment-fields">
    <div class="field field--with-error">
      <input
        type="text"
        name="comment[author]"
        id="CommentForm-author"
        class="field__input"
        autocomplete="name"
        value="{{ form.author }}"
        aria-required="true"
        required
        {% if form.errors contains 'author' %}
          aria-invalid="true"
          aria-describedby="CommentForm-author-error"
        {% endif %}
        placeholder="Name"
      >
      <label class="field__label" for="CommentForm-author">Name <span aria-hidden="true">*</span></label>
      {%- if form.errors contains 'author' -%}
        <small id="CommentForm-author-error">
          <span class="form__message">{% render 'icon-error' %}Name {{ form.errors.messages['author'] }}.</span>
        </small>
      {%- endif -%}
    </div>
    <div class="field field--with-error">
      <input
        type="email"
        name="comment[email]"
        id="CommentForm-email"
        autocomplete="email"
        class="field__input"
        value="{{ form.email }}"
        autocorrect="off"
        autocapitalize="off"
        aria-required="true"
        required
        {% if form.errors contains 'email' %}
          aria-invalid="true"
          aria-describedby="CommentForm-email-error"
        {% endif %}
        placeholder="Email"
      >
      <label class="field__label" for="CommentForm-email">Email <span aria-hidden="true">*</span></label>
      {%- if form.errors contains 'email' -%}
        <small id="CommentForm-email-error">
          <span class="form__message">{% render 'icon-error' %}Email {{ form.errors.messages['email'] }}.</span>
        </small>
      {%- endif -%}
    </div>
  </div>
  <div class="field field--with-error">
    <textarea
      rows="5"
      name="comment[body]"
      id="CommentForm-body"
      class="text-area field__input"
      aria-required="true"
      required
      {% if form.errors contains 'body' %}
        aria-invalid="true"
        aria-describedby="CommentForm-body-error"
      {% endif %}
      placeholder="Comment"
    >{{ form.body }}</textarea>
      <label class="form__label field__label" for="CommentForm-body">Comment <span aria-hidden="true">*</span></label>
  </div>
  {%- if form.errors contains 'body' -%}
    <small id="CommentForm-body-error">
      <span class="form__message">{% render 'icon-error' %}Comment {{ form.errors.messages['body'] }}.</span>
    </small>
  {%- endif -%}
</div>
{%- if blog.moderated? -%}
  <p class="article-template__comment-warning caption">Please note, comments need to be approved before they are published.</p>
{%- endif -%}
<input type="submit" class="button" value="Post comment">
{% endform %}
```
