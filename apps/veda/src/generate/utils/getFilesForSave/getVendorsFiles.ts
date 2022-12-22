import { CssVariables, File, ThemeGeneralSettings, ThemeVendors, Vendor } from 'types/Result';

interface GetVendorsOfPage {
  vendors: Vendor[];
  lazyload: boolean;
}

export const getVendorsOfPage = ({ vendors, lazyload }: GetVendorsOfPage): [File, File] => {
  let css = `
    {% comment %} vendors css of page {% endcomment %}
  `;
  let js = `
    {% comment %} vendors js of page {% endcomment %}
    ${lazyload ? '<script async src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.5.0/dist/lazyload.min.js"></script>' : ''}
  `;
  vendors.forEach(item => {
    if (item.css) {
      css += `<link rel="stylesheet" href="${item.css}" />\n`;
    }
    if (item.js) {
      js += `<script src="${item.js}"></script>\n`;
    }
  });
  return [
    {
      // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "sections/<pageType>-veda-{pageCommandId}}.liquid" tổng
      // cái này đang không làm dấu (có thể làm dấu để đồng bộ)
      content: css,
      type: 'vendors css tổng của page',
      id: 'vendorsCss',
      name: 'vendorsCss',
      section: undefined,
    },
    {
      // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "sections/<pageType>-veda-{pageCommandId}}.liquid" tổng
      // cái này đang không làm dấu (có thể làm dấu để đồng bộ)
      content: js,
      type: 'vendors js tổng của page',
      id: 'vendorsJs',
      name: 'vendorsJs',
      section: undefined,
    },
  ];
};

interface GetVendorsOfTheme {
  vendors: ThemeVendors;
  themeGeneralSettings: ThemeGeneralSettings;
  cssVariables: CssVariables;
}

export const getVendorsOfTheme = ({ vendors, cssVariables }: GetVendorsOfTheme): [File, File] => {
  const { fonts } = cssVariables;
  let css = '';
  let js = '';
  const defaultVendorsCss = `
    <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.4/css/pro.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/7.2.0/swiper-bundle.css" />
    <link rel="stylesheet" href="https://unpkg.com/veda-template-core@latest/dist/animate.css" />
    <link rel="stylesheet" href="https://unpkg.com/veda-template-core@latest/dist/flags.css" />
    <link rel="stylesheet" href="https://unpkg.com/veda-template-core@latest/dist/main.css" />`;

  const defaultVendorsJs = `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/7.2.0/swiper-bundle.min.js"></script>
    <script src="https://unpkg.com/veda-template-core@latest/dist/main.js"></script>
  `;
  const linkFont = fonts.reduce(
    (str, item) =>
      `${str}<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${item.value.replace(
        /\s/g,
        '+',
      )}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" />\n`,
    '',
  );
  vendors.forEach(item => {
    if (item.css) {
      css += `<link rel="stylesheet" href="${item.css}" />\n`;
    }
    if (item.js) {
      js += `<script src="${item.js}"></script>\n`;
    }
  });
  return [
    {
      // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "snippets/veda-header-scripts.liquid" tổng
      // cái này đang không làm dấu (có thể làm dấu để đồng bộ)
      /** "Làm dấu" để BE có thể xử lí sync shopify */
      content: `
      //startAssets @veda_id:vendorsCss @veda_name:vendorsCss @veda_type:vendorsCss @veda_content:
      ${[css, defaultVendorsCss, linkFont].join('\n')}
    `,
      type: 'vendors css tổng của theme',
      id: 'vendorsCss',
      name: 'vendorsCss',
      section: undefined,
    },
    {
      // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "snippets/veda-header-scripts.liquid" tổng
      // cái này đang không làm dấu (có thể làm dấu để đồng bộ)
      /** "Làm dấu" để BE có thể xử lí sync shopify */
      content: `
        //startAssets @veda_id:vendorsJs @veda_name:vendorsJs @veda_type:vendorsJs @veda_content:
        ${[js, defaultVendorsJs].join('\n')}
      `,
      type: 'vendors js tổng của theme',
      id: 'vendorsJs',
      name: 'vendorsJs',
      section: undefined,
    },
  ];
};
