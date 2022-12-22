import { CssColorVariable, CssFontVariable } from 'types/PresetStyles';
import { Consts } from 'utils/constants/constants';
import hexToRgb from 'utils/functions/hexToRgb';

/**
 * @description Tạo ra content của file javascript cho các section
 */
export const getJs = (id: string, js: string, useCleanup = false) => {
  const functionName = `fn_${id.replaceAll('-', '')}`;
  let cleanupFn = '';
  if (useCleanup) {
    cleanupFn = `
      if (window.${functionName}Cleanup === undefined) {
        window.${functionName}Cleanup = {
          listeners: [],
          push(listener) {
            this.listeners.push(listener);
          },
          cleanup() {
            this.listeners.forEach(listener => listener());
            this.listeners = [];
          }
        }
      }
      window.${functionName}Cleanup.cleanup();
    `;
  }
  return `
  ${cleanupFn}
  function ${functionName}() {
    try {
      const uniqueId = /* _____Start/Id_____ */"${id}"/* _____End/Id_____ */;
      const containers = document.querySelectorAll(\`[data-id="\${uniqueId}"]:not(${Consts.FakeTags.Addons}, ${Consts.FakeTags.Megamenu})\`);
      containers.forEach(container => {
        if (!container) {
          return;
        }
        veda.plugins.videoCover(container);
        /* _____Start/Content_____ */
        ${useCleanup ? js.replace(/(\s)(onCleanup\()/g, `$1window.${functionName}Cleanup.push(`) : js}
        /* _____End/Content_____ */
      });
    } catch (error) {
      console.log(error);
    }
  };\n${functionName}();\n`;
};

/**
 * @description Lấy ra rgb từ 1 mã màu hex: #xxx, rgb() hoặc rgba()
 * @example ```ts
 * const rgb = getRgb('#fff');
 * // Result rgb: '255,255,255'
 * ```
 */
export const getRgb = (color: string) => {
  if (color.includes('#')) {
    const { r, g, b } = hexToRgb(color);
    return `${r}, ${g}, ${b}`;
  }
  if (color.includes('rgb(')) {
    return color.replace(/rgb\(|\)/g, '');
  }
  return color.replace(/(rgba\()(.*(?=,)).*/g, '$2');
};

/**
 * @description Truyền vào 1 mảng color variable và trả về 1 chuỗi css variable
 * tự động phân tích thêm biến freeze và biến rgb
 * @example ```ts
 * const colors = [{ id: '1', name: '--color-primary', value: 'rgba(xxx)' }];
 * const css = getCssColorVariables(colors);
 * // css: '--color-primary:rgba(xxx);--color-primary-freeze:rgba(xxx);--rgb-color-primary:xxx;--rgb-color-primary-freeze:xxx;'
 * ```
 */
export const getCssColorVariables = (colors: CssColorVariable[], isDark = false, freeze = false) => {
  return colors.reduce(
    (str, item) =>
      `${str}${item.name}${freeze ? '-freeze' : ''}:${item[isDark ? 'dark' : 'light']};${item.name.replace(/^--/g, '--rgb-')}${
        freeze ? '-freeze' : ''
      }:${getRgb(item[isDark ? 'dark' : 'light'])};`,
    '',
  );
};

/**
 * @description Truyền vào 1 mảng font variable và trả về 1 chuỗi css variable
 * @example ```ts
 * const fonts = [{ id: '1', name: '--font-primary', value: 'Poppins' }, { id: '1', name: '--font-secondary', value: 'Roboto' }];
 * const css = getCssFontVariables(fonts);
 * // css: '--font-primary:Poppins;--font-secondary:Roboto;'
 * ```
 */
export const getCssFontVariables = (fonts: CssFontVariable[]) => {
  return fonts.reduce((str, item) => `${str}${item.name}:${item.value};`, '');
};

/**
 * Given a dictionary of key-value pairs, return a CSS linear interpolation
 * @param value - Record<number, number>
 * @returns A string that can be used in a CSS calc() function.
 */
export const cssLinearInterpolation = (value: Record<number, number>) => {
  const keys = Object.keys(value);
  const values = Object.values(value);
  if (keys.length !== 2) {
    throw new Error('linearInterpolation() value must be exactly 2 values');
  }
  // The slope
  const m = (values[1] - values[0]) / (Number(keys[1]) - Number(keys[0]));
  // The y-intercept
  let b = values[0] - m * Number(keys[0]);
  // Determine if the sign should be positive or negative
  let sign = '+';

  if (b < 0) {
    sign = '-';
    b = Math.abs(b);
  }

  return `${m * 100}vw ${sign} ${b}px`;
};

export const replaceTagFake = (tag: string, to = '{% comment %}<!-- Code Here -->{% endcomment %}') => {
  return tag.replace(new RegExp(`<(${Consts.FakeTags.EditCode}|${Consts.FakeTags.AddElement}) \\/>`, 'g'), to);
};

export const optimizeSectionJs = (jsArr: string[]) => {
  const regexpContent = /\/\* _____Start\/Content_____ \*\/.*([\s\S]*?).*\/\* _____End\/Content_____ \*\//g;
  const regexpId = /\/\* _____Start\/Id_____ \*\/.*([\s\S]*?).*\/\* _____End\/Id_____ \*\//g;

  const jsContentArr = jsArr.map(item => {
    return {
      id: (item.match(regexpId) ?? [''])[0].replace(/"?\/\* _____(Start|End)\/Id_____ \*\/"?/g, ''),
      content: (item.match(regexpContent) ?? [''])[0].replace(/"?\/\* _____(Start|End)\/Content_____ \*\/"?/g, '').trim(),
    };
  });

  const mergeId = jsContentArr.reduce<Record<string, string>>((obj, item) => {
    return {
      ...obj,
      [item.content]: `${obj[item.content] ? `${obj[item.content]},` : ''}"${item.id}"`,
    };
  }, {});

  const result = Object.entries(mergeId).map(([content, ids], index) => {
    if (ids.includes(',')) {
      return `function fn_${index} () {
        const uniqueIds = [${ids}];
        uniqueIds.forEach(uniqueId => {
          const containers = document.querySelectorAll(\`[data-id="\${uniqueId}"]\`);
          containers.forEach(container => {
            if (!container) {
              return;
            }
            veda.plugins.videoCover(container);
            ${content}
          });
        });
      }\nfn_${index} ();`;
    }
    return `function fn_${index} () {
      const uniqueId = ${ids};
      const containers = document.querySelectorAll(\`[data-id="\${uniqueId}"]\`);
      containers.forEach(container => {
        if (!container) {
          return;
        }
        veda.plugins.videoCover(container);
        ${content}
      });
    }\nfn_${index} ();`;
  });
  return result.join('\n');
};

export const getCssFromLayoutSettings = (containerWidth: number, containerGap: number, columnGapX: number, columnGapY: number) => {
  return `
  html .container {
    max-width: ${containerWidth}px;
    padding-left: ${containerGap}px;
    padding-right: ${containerGap}px;
  }
  html .row {
    margin-top: -${columnGapY}px;
    margin-left: -${columnGapX / 2}px;
    margin-right: -${columnGapX / 2}px;
  }
  html .row > * {
    margin-top: ${columnGapY}px;
    padding-left: ${columnGapX / 2}px;
    padding-right: ${columnGapX / 2}px;
  }
  html .veda-grid-auto {
    column-gap: ${columnGapX}px !important;
    row-gap: ${columnGapY}px !important;
  }
`;
};

export const htmlWithLazyload = (html: string) => {
  // <img src="{{ "abc" }}" alt="" class="{{ "abc" }}" />  ----> src="{{ " và class="{{ "=> Vẫn chính xác => Chấp nhận phương án này
  return html.replace(/<img[^>]+>/g, LOC => {
    return LOC.replace(/(\w*) *= *((['"])?((\\\3|[^\3])*?)\3|(\w+))/g, attributeWithValue => {
      if (attributeWithValue.startsWith('src')) {
        return attributeWithValue.replace('src', 'data-src');
      }
      if (attributeWithValue.startsWith('class')) {
        return attributeWithValue.replace(/("|')[^("|')]+("|')/g, valueWithQuote => {
          return valueWithQuote.replace(/"|'/, value => `${value}lazy `);
        });
      }
      return attributeWithValue;
    });
  });
};

export const getJsLazyload = (lazyload: boolean) => {
  if (!lazyload) {
    return '';
  }
  return `
    window.lazyLoadOptions = {
      threshold: 0
    };
    window.addEventListener("LazyLoad::Initialized", event => {
      window.lazyLoadInstance = event.detail.instance;
      const handleMutationObserver = (mutations) => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (node.nodeName.toLowerCase() === 'img') {
                window.lazyLoadInstance.update();
              }
            });
          }
        });
      }
      const observer = new MutationObserver(handleMutationObserver);
      observer.observe(document.body, { childList: true });
    }, false );
  `;
};

export const deleteComponentAttr = (html: string) => {
  return html.replace(/component=("|')\w*("|')/g, '');
};

// NOTE: @tuong -> Chức năng "Addon Placholder" cần sự kết hợp của nhiều file -> Cần xem xét việc update tất cả các file khi có sự thay đổi nào đó ở 1 file bất kì
// ["LiquidComponent.tsx", "AddonPosition.tsx", "useAddonsPosition.ts", "reducerPages.ts", "generateHelpers.ts/deleteAddonPlaceholder"]
export const deleteAddonPlaceholder = (html: string) => {
  return html.replace(new RegExp(`<${Consts.FakeTags.AddonsPlaceholder.tagName}>.*<\/${Consts.FakeTags.AddonsPlaceholder.tagName}>`, 'gi'), '');
};
