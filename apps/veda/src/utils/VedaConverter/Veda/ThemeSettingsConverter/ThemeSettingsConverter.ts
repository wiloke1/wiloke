import { ThemeInfo } from '../../Shopify/ThemeConfigs/ThemeInfo';
import { ThemeSchema } from '../../Shopify/ThemeConfigs/ThemeSchema';
import { ThemeSetting } from '../../Shopify/ThemeConfigs/ThemeSetting';
import { ThemeSettings } from './@types/ThemeSettings';

interface RTSCHEMA_ThemeSettings {
  themeInfo: ThemeInfo;
  themeSchema: ThemeSchema[];
  themeSetting: ThemeSetting;
}

export const SCHEMA_ThemeSettings = (_: ThemeSettings): RTSCHEMA_ThemeSettings => {
  const themeInfo_: RTSCHEMA_ThemeSettings['themeInfo'] = {
    name: 'theme_info',
    theme_author: 'Veda',
    theme_documentation_url: 'https://help.shopify.com/manual/online-store/themes',
    theme_name: 'Veda',
    theme_version: '1.0',
    theme_support_url: 'https://vedabuilder.com',
  };

  const themeSchema_: RTSCHEMA_ThemeSettings['themeSchema'] = [
    // {
    // 	name: "Custom colors for theme", // FIXME: Translation
    // 	settings: [
    // 		{ type: "header", content: "Light colors" },
    // 		...colors.map<ThemeSchema["settings"][number]>((color) => {
    // 			return {
    // 				type: "color",
    // 				default: color.dark,
    // 				label: `Light -> ${getColorTitle(color.name)}`, // FIXME: Translation
    // 				id: `light__${color.name}`, // FIXME: utils function
    // 			};
    // 		}),
    // 		{ type: "header", content: "Dark colors" },
    // 		...colors.map<ThemeSchema["settings"][number]>((color) => {
    // 			return {
    // 				type: "color",
    // 				default: color.dark,
    // 				label: `Dark -> ${getColorTitle(color.name)}`, // FIXME: Translation
    // 				id: `dark__${color.name}`, // FIXME: utils function
    // 			};
    // 		}),
    // 	],
    // },
    // {
    // 	name: "Layout", // FIXME: Translation
    // 	settings: [
    // 		{
    // 			type: "number",
    // 			label: getLayoutTitle("containerWidth"), // FIXME: Translation
    // 			id: "containerWidth", // FIXME: Utils function
    // 			default: containerWidth,
    // 			placeholder: undefined,
    // 		},
    // 		{
    // 			type: "number",
    // 			label: getLayoutTitle("containerGap"), // FIXME: Translation
    // 			id: "containerGap", // FIXME: Utils function
    // 			default: containerGap,
    // 			placeholder: undefined,
    // 		},
    // 		{
    // 			type: "number",
    // 			label: getLayoutTitle("columnGapY"), // FIXME: Translation
    // 			id: "columnGapY", // FIXME: Utils function
    // 			default: columnGapY,
    // 			placeholder: undefined,
    // 		},
    // 		{
    // 			type: "number",
    // 			label: getLayoutTitle("columnGapX"), // FIXME: Translation
    // 			id: "columnGapX", // FIXME: Utils function
    // 			default: columnGapX,
    // 			placeholder: undefined,
    // 		},
    // 	],
    // },
  ];

  const themeSetting_: RTSCHEMA_ThemeSettings['themeSetting'] = {
    // ...colors.reduce<Omit<RTSCHEMA_ThemeSettings["themeSetting"], "sections">>((res, color) => {
    // 	const lightColorKey = `light__${color.name}`;
    // 	const darkColorKey = `dark__${color.name}`;
    // 	return {
    // 		...res,
    // 		[lightColorKey]: color.light,
    // 		[darkColorKey]: color.dark,
    // 	};
    // }, {}),
    // columnGapX,
    // columnGapY,
    // containerWidth,
    // containerGap,
    // sections: {},
  };

  return {
    themeSetting: themeSetting_,
    themeInfo: themeInfo_,
    themeSchema: themeSchema_,
  };
};
