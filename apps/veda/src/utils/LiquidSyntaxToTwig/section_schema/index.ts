import { i18n } from 'translation';

window.Twig.extend(Twig => {
  Twig.exports.extendTag({
    type: 'schema',
    regex: /schema/,
    next: ['endschema'],
    open: true,
    compile: function(token: any) {
      return token;
    },
    parse: function() {
      return {
        output: `<span style='color: red; font-size: 18px'>${i18n.t('twig_error.section_schema')}</span>`,
        chain: false,
      };
    },
  });

  Twig.exports.extendTag({
    type: 'endschema',
    regex: /^endschema$/,
    next: [],
    open: false,
  });
});

/**
 * @link https://shopify.dev/themes/architecture/sections/section-schema
 */
export const schema = (liquid: string) => liquid;
