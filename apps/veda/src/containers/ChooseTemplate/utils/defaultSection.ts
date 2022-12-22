import { i18n } from 'translation';
import { AdminSection, DevSection } from 'types/Sections';
import { Consts } from 'utils/constants/constants';
import { v4 } from 'uuid';

export const useGetDefaultSection = () => {
  const _blockId = `id_${v4()}`;
  const _sectionSettings = {
    background_fixed: `id_${v4()}`,
    background_type: `id_${v4()}`,
    background_image: `id_${v4()}`,
    background_color: `id_${v4()}`,
    background_size: `id_${v4()}`,
    background_overlay_enable: `id_${v4()}`,
    background_overlay_color: `id_${v4()}`,
    padding: `id_${v4()}`,
  };

  const _options = {
    image: v4(),
    color: v4(),
    none: v4(),
    cover: v4(),
    contain: v4(),
  };

  const defaultAdminSection: AdminSection = {
    id: `id_${v4()}`,
    label: 'Blank Section',
    megaMenuCommandIds: [],
    commandId: '',
    category: {
      commandId: '',
      name: '',
      description: '',
    },
    data: {
      liquid: '<div class="container">\r\n    <edit-code />\r\n  </div>',
      schema: {
        blocks: [],
        settings: [],
      },
      settings: [],
      js: '',
      scss: '$container: "[data-id=\'#{$uniqueId}\']";',
      jsHook: Consts.JsHookComment,
    },
    enable: true,
    addonIds: [],
    type: 'default',
    currentVersion: '0',
    syncedToServices: null,
    // syncedToServices: ['veda_product'],
  };

  const defaultDevSection: DevSection = {
    id: `id_${v4()}`,
    megaMenuCommandIds: [],
    label: 'Blank Section',
    status: 'draft',
    commandId: '',
    category: {
      commandId: '',
      name: '',
      description: '',
    },
    data: {
      liquid:
        "{% liquid\r\n  if section_settings.background_fixed assign backgroundFixed = 'fixed' else assign backgroundFixed = 'scroll' endif\r\n  if section_settings.background_type == 'color' assign backgroundColor = 'background-color: ' | append: section_settings.background_color | append: ';' else assign backgroundColor = '' endif\r\n  if section_settings.background_type == 'image' assign backgroundImage = 'background-image: url(' | append: section_settings.background_image | append:\r\n  ');background-attachment: ' | append: backgroundFixed | append: ';background-size: ' | append: section_settings.background_size | append: ';' else assign backgroundImage = '' endif\r\n  assign sectionPadding = 'padding-top: ' | append: section_settings.padding.top | append: 'px;padding-right: ' | append: section_settings.padding.right | append: 'px;padding-bottom: ' | append: section_settings.padding.bottom | append: 'px;padding-left: ' | append: section_settings.padding.left | append: 'px;'\r\n%}\r\n\r\n<section data-id=\"{{ uniqueId }}\" class=\"pos:relative z:1 bgz:cover bgp:center\" css=\"{{ backgroundColor }}{{ backgroundImage }}{{ sectionPadding }}\">\r\n  <div class=\"container\">\r\n    <edit-code />\r\n  </div>\r\n\r\n  {% if section_settings.background_type == 'video' and section_settings.background_video %}\r\n    <div data-veda-video=\"{{ section_settings.background_video }}\"></div>\r\n  {% endif %}\r\n  {% if section_settings.background_overlay_enable %}\r\n    <div class=\"pos:absolute ins:0 z:-1\" css=\"background-color: {{ section_settings.background_overlay_color }}\"></div>\r\n  {% endif %}\r\n</section>",
      schema: {
        blocks: [
          {
            id: 'id_f7017755-5a1b-4392-b6d3-d9dd46365814',
            children: [
              {
                children: 'none',
                type: 'select',
                label: {
                  en: 'Background Type',
                  vi: 'Loại Nền',
                },
                summary: '',
                name: 'background_type',
                id: 'id_9bbe3fb4-fb6e-438d-a97e-60de35542644',
                disable: false,
                options: [
                  {
                    label: 'Image',
                    value: 'image',
                    id: '952d953c-7d1e-4983-a74c-3eb85d0764c9',
                  },
                  {
                    label: 'Color',
                    value: 'color',
                    id: 'f87e6c2e-918c-4274-916b-ba8055d1c30b',
                  },
                  {
                    label: 'Video',
                    value: 'video',
                    id: '16c91c46-1eff-4dde-8a33-0b858eccf6aa',
                  },
                  {
                    label: 'None',
                    value: 'none',
                    id: '8b141df8-aa37-4b27-b9d9-2ae7f09c7e31',
                  },
                ],
                forceRenderSection: true,
              },
              {
                children: undefined,
                type: 'image',
                label: {
                  en: 'Background Image',
                  vi: 'Hình Nền',
                },
                summary: '',
                name: 'background_image',
                id: 'id_0ec955d1-4218-4bb6-ab67-bd0345982951',
                disable: false,
                deps: 'section_settings.background_type === "image"',
              },
              {
                children: '#fff',
                type: 'color',
                label: {
                  en: 'Background Color',
                  vi: 'Màu Nền',
                },
                summary: '',
                name: 'background_color',
                id: 'id_30505bfa-8402-4f58-8918-1e7c4d6c56f2',
                disable: false,
                deps: 'section_settings.background_type === "color"',
              },
              {
                children: '',
                type: 'video',
                label: {
                  vi: 'Video Nền',
                  en: 'Background Video',
                },
                summary: '',
                name: 'background_video',
                id: 'id_b4354107-cca3-410f-b1d7-eee74303c705',
                disable: false,
                deps: 'section_settings.background_type === "video"',
                forceRenderSection: true,
              },
              {
                children: false,
                type: 'switch',
                label: {
                  en: 'Background Fixed',
                  vi: 'Nền Cố Định',
                },
                summary: '',
                name: 'background_fixed',
                id: 'id_f6947103-30ca-416d-b0f7-b6f4742855d0',
                disable: false,
                deps: 'section_settings.background_type === "image"',
              },
              {
                children: 'cover',
                type: 'select',
                label: {
                  en: 'Background Size',
                  vi: 'Kích Thước Nền',
                },
                summary: '',
                name: 'background_size',
                id: 'id_f4c55e13-ed8b-4a91-8870-1d97accbc5d0',
                disable: false,
                options: [
                  {
                    label: 'Cover',
                    value: 'cover',
                    id: 'b995902e-8f97-4a37-8de2-58dd030b3836',
                  },
                  {
                    label: 'Contain',
                    value: 'contain',
                    id: 'b6559395-5c4f-4b89-a155-0dc6d405eea5',
                  },
                ],
                deps: 'section_settings.background_type === "image"',
              },
              {
                children: false,
                type: 'switch',
                label: {
                  en: 'Background Overlay Enable',
                  vi: 'Bật Nền Đè Lên',
                },
                summary: '',
                name: 'background_overlay_enable',
                id: 'id_f7ce2748-0b6c-404c-9232-7ab055bbc253',
                disable: false,
              },
              {
                children: '#fff',
                type: 'color',
                label: {
                  en: 'Background Overlay Color',
                  vi: 'Màu Nền Đè Lên',
                },
                summary: '',
                name: 'background_overlay_color',
                id: 'id_14fd0fb9-1b35-4833-aeab-51833a1d0402',
                disable: false,
                deps: 'section_settings.background_overlay_enable === true',
              },
              {
                children: {
                  left: 0,
                },
                type: 'space',
                label: {
                  en: 'Padding',
                  vi: 'Đệm',
                },
                summary: '',
                name: 'padding',
                id: 'id_1da7bd8d-b9c5-45ec-9062-625bfbcea59b',
                disable: false,
              },
            ],
            type: 'object',
            label: {
              en: 'Section Settings',
              vi: 'Cấu Hình Mục',
            },
            summary: '',
            name: 'section_settings',
            open: false,
            drawer: false,
            disable: false,
          },
        ],
        settings: [],
      },
      settings: [
        {
          id: 'id_f7017755-5a1b-4392-b6d3-d9dd46365814',
          children: [
            {
              children: 'none',
              type: 'select',
              label: {
                en: 'Background Type',
                vi: 'Loại Nền',
              },
              summary: '',
              name: 'background_type',
              id: 'id_9bbe3fb4-fb6e-438d-a97e-60de35542644',
              disable: false,
              options: [
                {
                  label: 'Image',
                  value: 'image',
                  id: '952d953c-7d1e-4983-a74c-3eb85d0764c9',
                },
                {
                  label: 'Color',
                  value: 'color',
                  id: 'f87e6c2e-918c-4274-916b-ba8055d1c30b',
                },
                {
                  label: 'Video',
                  value: 'video',
                  id: '16c91c46-1eff-4dde-8a33-0b858eccf6aa',
                },
                {
                  label: 'None',
                  value: 'none',
                  id: '8b141df8-aa37-4b27-b9d9-2ae7f09c7e31',
                },
              ],
              forceRenderSection: true,
            },
            {
              children: undefined,
              type: 'image',
              label: {
                en: 'Background Image',
                vi: 'Hình Nền',
              },
              summary: '',
              name: 'background_image',
              id: 'id_0ec955d1-4218-4bb6-ab67-bd0345982951',
              disable: false,
              deps: 'section_settings.background_type === "image"',
            },
            {
              children: '',
              type: 'color',
              label: {
                en: 'Background Color',
                vi: 'Màu Nền',
              },
              summary: '',
              name: 'background_color',
              id: 'id_30505bfa-8402-4f58-8918-1e7c4d6c56f2',
              disable: false,
              deps: 'section_settings.background_type === "color"',
            },
            {
              children: '',
              type: 'video',
              label: {
                vi: 'Video Nền',
                en: 'Background Video',
              },
              summary: '',
              name: 'background_video',
              id: 'id_b4354107-cca3-410f-b1d7-eee74303c705',
              disable: false,
              deps: 'section_settings.background_type === "video"',
              forceRenderSection: true,
            },
            {
              children: false,
              type: 'switch',
              label: {
                en: 'Background Fixed',
                vi: 'Nền Cố Định',
              },
              summary: '',
              name: 'background_fixed',
              id: 'id_f6947103-30ca-416d-b0f7-b6f4742855d0',
              disable: false,
              deps: 'section_settings.background_type === "image"',
            },
            {
              children: 'cover',
              type: 'select',
              label: {
                en: 'Background Size',
                vi: 'Kích Thước Nền',
              },
              summary: '',
              name: 'background_size',
              id: 'id_f4c55e13-ed8b-4a91-8870-1d97accbc5d0',
              disable: false,
              options: [
                {
                  label: 'Cover',
                  value: 'cover',
                  id: 'b995902e-8f97-4a37-8de2-58dd030b3836',
                },
                {
                  label: 'Contain',
                  value: 'contain',
                  id: 'b6559395-5c4f-4b89-a155-0dc6d405eea5',
                },
              ],
              deps: 'section_settings.background_type === "image"',
            },
            {
              children: false,
              type: 'switch',
              label: {
                en: 'Background Overlay Enable',
                vi: 'Bật Nền Đè Lên',
              },
              summary: '',
              name: 'background_overlay_enable',
              id: 'id_f7ce2748-0b6c-404c-9232-7ab055bbc253',
              disable: false,
            },
            {
              children: '',
              type: 'color',
              label: {
                en: 'Background Overlay Color',
                vi: 'Màu Nền Đè Lên',
              },
              summary: '',
              name: 'background_overlay_color',
              id: 'id_14fd0fb9-1b35-4833-aeab-51833a1d0402',
              disable: false,
              deps: 'section_settings.background_overlay_enable === true',
            },
            {
              children: {
                left: 0,
                top: 50,
                bottom: 50,
              },
              type: 'space',
              label: {
                en: 'Padding',
                vi: 'Đệm',
              },
              summary: '',
              name: 'padding',
              id: 'id_1da7bd8d-b9c5-45ec-9062-625bfbcea59b',
              disable: false,
            },
          ],
          type: 'object',
          label: {
            en: 'Section Settings',
            vi: 'Cấu Hình Mục',
          },
          summary: '',
          name: 'section_settings',
          open: false,
          drawer: false,
          disable: false,
        },
      ],
      js: '',
      scss: '$container: "[data-id=\'#{$uniqueId}\']";',
      jsHook: i18n.t('builderPage.js_hook_state'),
    },
    enable: true,
    addonIds: [],
    type: 'default',
    changelog: '',
    userId: 0,
  };

  return { defaultDevSection, defaultAdminSection };
};
