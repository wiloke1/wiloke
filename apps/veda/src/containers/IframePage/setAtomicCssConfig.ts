import { atomic, pfs, rtl, Plugin, stylesMap, groupHover } from 'mota-css';

atomic.setConfig({
  cache: false,
  breakpoints: {
    sm: '768px',
    md: '992px',
    lg: '1200px',
  },
});

function numberOfLines(): Plugin {
  return ({ input, addComponent }) => {
    addComponent(`[class*="lines-"] {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}`);

    const classNames = input.match(/lines-\d*/g);
    if (classNames) {
      classNames.forEach(className => {
        const lineClamp = Number(className.replace(/lines-/g, ''));
        addComponent(`.${className} { -webkit-line-clamp: ${lineClamp} }`);
      });
    }
  };
}

const childrenStyles = (): Plugin => {
  return ({ styles, addStyles }) => {
    addStyles(
      stylesMap(styles, (selector, css) => {
        const [property, value] = css;
        if (/\*\w*$/g.test(selector)) {
          const childTag = selector.replace(/.*\*/g, '') as string;
          return {
            [`${selector.replace(/\*/g, '\\*')} ${childTag}`]: [property, value.replace(/\*\w*$/g, '')],
          };
        }
        return {
          [selector]: css,
        };
      }),
    );
  };
};

function tableResponsive(): Plugin {
  const defaultCss = `[class*="table-responsive-"] {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}
`;
  const getResponsiveCss = (maxWidth: number, className: string) => {
    if (isNaN(maxWidth)) {
      return '';
    }
    return `@media (max-width: ${maxWidth}px) {
  .${className},
  .${className} tbody,
  .${className} tfoot,
  .${className} tr,
  .${className} th,
  .${className} td {
    display: block
  }
  .${className} thead { display: none }
  .${className} tr { margin-bottom: 20px }
  .${className} td { text-align: right }
  .${className} td:before {
    content: attr(data-th)': ';
    float: left;
  }
}`;
  };

  return ({ input, addComponent }) => {
    addComponent(defaultCss);

    const classNames = input.match(/table-responsive-\d*/g);
    if (classNames) {
      classNames.forEach(className => {
        const maxWidth = Number(className.replace(/table-responsive-/g, ''));
        addComponent(getResponsiveCss(maxWidth, className));
      });
    }
  };
}

atomic.plugins([rtl(), pfs(), groupHover(), numberOfLines(), tableResponsive(), childrenStyles()]);

atomic.customValue(value => {
  if (value.includes('var(--')) {
    return value;
  }
  if (/color-\w*/g.test(value)) {
    const val = Array.from(new Set(value.match(/color(-\w*)*(\.\d*|)/g)));
    return val.reduce((str, val) => {
      if (/\.\d*/g.test(val)) {
        const alpha = val.replace(/.*(?=\.\d*)/g, '');
        return str.replaceAll(val, `rgba(var(--rgb-${val.replace(/\.\d*$/g, '')}), ${alpha})`).replace(/\)\.\d*/g, ')');
      }
      return str.replaceAll(val, `var(--${val})`);
    }, value);
  }
  if (/font-\w*/g.test(value)) {
    const val = value.match(/font(-\w*)*/g)?.[0];
    return value.replace(/font(-\w*)*/g, `var(--${val})`);
  }
  return value;
});

atomic.on('invalid', diagnostic => {
  const { message, className } = diagnostic;
  const warn = `⚠️  ${message} (class: ${className})`;
  console.log(`\n\x1b[31m${warn}\x1b[0m`);
});
