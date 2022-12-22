import { SettingDragMenu, SettingDragMenuChildren } from '../types';

/**
 * Chuyển đổi data mega menu, nếu menu con bật megaMenuEnabled = true thì menu con sẽ có thêm key megaMenuId và menu cha sẽ sinh thêm key hasMegaMenu = true
 *  */

export const flatDataOnChange = (items: SettingDragMenu[] | SettingDragMenuChildren[]) => {
  items.forEach(item => {
    delete (item as SettingDragMenuChildren | any).megaMenuEnabled;
    delete (item as SettingDragMenuChildren | any).megaMenuId;

    if (Array.isArray(item.children) && item.children.length > 0) {
      const condition = item.children.some(child => child.megaMenuEnabled === true && child.megaMenuId !== '');
      if (condition) {
        item.hasMegaMenu = true;
      } else {
        item.hasMegaMenu = false;
      }

      item.children.forEach(child2 => {
        if (child2['megaMenuEnabled'] === undefined && child2['megaMenuId'] === undefined) {
          child2.megaMenuEnabled = false;
          child2.megaMenuId = '';
        }

        if (Array.isArray(child2.children) && child2.children.length > 0) {
          child2.children.forEach(child3 => {
            if (child3['megaMenuEnabled'] !== undefined && child3['megaMenuId'] !== undefined) {
              // @ts-ignore
              delete child3.megaMenuEnabled;
              // @ts-ignore
              delete child3.megaMenuId;
            }
          });
        }
      });
    }
  });

  return items;
};
