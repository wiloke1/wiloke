const fixLiquid = (value: string) => {
  return value
    .replace(/(\w|'|")(\s)(else)/g, '$1$2\n$3')
    .replace(/(\w|'|")(\s)(assign)/g, '$1$2\n$3')
    .replace(/(\w|'|")(\s)(endif)/g, '$1$2\n$3');
};

export class Prettier {
  static liquid = (value: string): string => {
    return window.prettier
      .format(fixLiquid(value), {
        parser: 'liquid-html',
        plugins: [window.prettierPluginLiquid],
      })
      .replace(/{{-/g, '{{')
      .replace(/-}}/g, '}}')
      .replace(/{%-/g, '{%')
      .replace(/-%}/g, '%}')
      .replace(/{{(?!\s)/g, '{{ ')
      .replace(/(\w)(}})/g, '$1 $2');
  };

  static javascript = (value: string): string => {
    return window.prettier.format(value, {
      parser: 'babel',
      plugins: window.prettierPlugins,
    });
  };

  static scss = (value: string): string => {
    return window.prettier.format(value, {
      parser: 'scss',
      plugins: [window.prettierPlugins.postcss],
    });
  };

  static json = (value: string): string => {
    return window.prettier.format(value, {
      parser: 'json',
      plugins: [window.prettierPlugins.babel],
    });
  };
}
