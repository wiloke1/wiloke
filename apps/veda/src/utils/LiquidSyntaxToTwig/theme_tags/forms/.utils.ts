interface HandleFormAttributes {
  lineOfCodeOpenTagForm: string;
  additionAttributes: Record<string, string>;
  onException: (err: unknown) => Error;
}

export const handleFormAttributes = ({ lineOfCodeOpenTagForm, additionAttributes, onException }: HandleFormAttributes) => {
  try {
    // Xoá đi "{% form" và "%}" để lấy ra mệnh đề chứa các tham số đầu vào cho form liquid
    const content_properties_of_form = lineOfCodeOpenTagForm.replace(/{%\s*form/, '').replace(/%}/, '');
    const properties = content_properties_of_form
      .split(',')
      .slice(1)
      .map(item => item.trim());
    const form = document.createElement('form');
    Object.entries(additionAttributes).forEach(([key, value]) => {
      form.setAttribute(key, value);
    });
    properties.forEach(property => {
      if (property.includes(':')) {
        const [key, value] = property.split(':').map(item => item.trim());
        const valueIsVariable = !/^(\'|\")/.test(value);
        if (valueIsVariable) {
          form.setAttribute(key, `{{ ${value} }}`);
        } else {
          form.setAttribute(key, value.replace(/^(\'|\")/, '').replace(/(\'|\")$/, ''));
        }
      }
    });

    return form;
  } catch (err) {
    throw onException(err);
  }
};

export const handlePreprocess = (BOC: string) => {
  // Xử lí để {% form ... } và {% endform %} k nằm trên cùng 1 dòng để có thể regex
  return BOC.replace(/%}(?!\n)/gm, '%}\n').replace(/{%\s*endform\s*%}/gm, '\n{% endform %}');
};
