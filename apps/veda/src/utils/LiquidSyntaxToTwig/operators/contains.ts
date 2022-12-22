/**
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * NOTE: @tuong -> Không chắc đúng cho toàn bộ các trường hợp
 * @link https://shopify.github.io/liquid/basics/operators/
 * @example
  Input:
    {% assign form = {"errors": ["author","body","email","password","form"]} %}
    {% if form.errors contains 'author' %}
      Hello
    {% endif %}
  Output:
    {% set form = {"errors": ["author","body","email","password","form"]} %}
    {% if 'author' in form.errors %}
      Hello
    {% endif %}
 */
export const contains = (liquid: string) => {
  return liquid.replace(/({%|{{).*\scontains\s.*(}}|%})/g, value => {
    let _value = value.replace(/\s+/g, ' ');
    const blocks = _value
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(item => item.trim());
    blocks.forEach((block, index) => {
      if (block === 'contains') {
        const arrayBlock = blocks[index - 1];
        const itemBlock = blocks[index + 1];
        _value = _value.replace(`${arrayBlock} contains ${itemBlock}`, `${itemBlock} in ${arrayBlock}`);
      }
    });
    return _value;
  });
};
