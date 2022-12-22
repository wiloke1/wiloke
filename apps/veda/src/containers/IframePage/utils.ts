import { i18n } from 'translation';
import { ProductSection } from 'types/Sections';
import { Consts } from 'utils/constants/constants';
import { getAddonHtml } from 'utils/functions/getAddonHtml';
import { LiquidSyntaxToTwigError, handleGetScopeOfAddon } from 'utils/LiquidSyntaxToTwig';

export const removeCssAndJs = (id: string) => {
  const styleEl = document.getElementById(`css_${id}`);
  const scriptEl = document.getElementById(`js_${id}`);
  const styleInlineEl = document.getElementById(`inline_${id}`);
  styleEl?.remove();
  scriptEl?.remove();
  styleInlineEl?.remove();
};

// NOTE: @tuong -> indexBOCs và veda-index-boc liên quan đến chức năng thêm addon (src/store/reducers/reducerPages.ts, src/store/reducers/utils/getBOCsBetweenSomething.ts, src/containers/IframePage/components/AddonsPosition/AddonsPosition.tsx)
// NOTE: veda-component-index liên quan đến src/containers/IframePage/components/AddonsPosition/useAddonsPositions.ts và LiquidComponent.tsx
// NOTE: veda-length-of-loop liên quan đến src/containers/IframePage/components/AddonsPosition/useAddonsPositions.ts và LiquidComponent.tsx
// NOTE: veda-open-tag liên quan đến chức năng chèn code addon vào code liquid đúng vị trí khi chọn vị trí addon
export const addAttrDataTag = (twig: string) => {
  const checkPoint = '\n==============addAttrDataTag==============';
  const SPACE = 'DẤU_CÁCH';
  const BREAK_LINE = 'DẤU_XUỐNG_DÒNG';
  const indexBOCs: Record<string, number> = {};
  return (
    twig
      // @tuong ->  Commit "fix loi attrbute veda k dc add vao nhung the ma co code html xuong dong" ảnh hưởng đến chức năng "chọn vị trí addon - reducerPages.tsx + getBocsBetweenSomething.ts" do xóa mất dấu xuống dòng và dấu cách ==> Chuyển regex theo cách này để giữ nguyên hiện trạng của code liquid trong editor
      // @tuong -> Việc xóa "\r" ảnh hưởng đến cả "reducerPages" -> trong "reducerPages" cũng sẽ phải xóa đi "\r" ("\r" xuất hiện do dấu xuống dòng của window)
      // Regex lấy hết content giữa <> và </>
      .replace(/(<([^>]+)>)/g, htmlTag => {
        // Xóa dấu xuống dòng (coi chỉ attribute mới xuống dòng)
        return htmlTag.replace(/\r?\n/g, BREAK_LINE).replace(/\s/g, SPACE);
      })
      .replace(/>/g, `>${checkPoint}`)
      .replace(/<\w*\s*.*(?=>)/g, tag => {
        // NOTE: @tuong -> Không thêm data vào thẻ <shopify> vì thẻ này chỉ để đánh dấu -> nếu thêm vào nhiều chỗ regex sẽ sai
        // NOTE: @tuong -> Không thêm data vào thẻ <addons-context> vì thẻ này chỉ để đánh dấu -> nếu thêm vào nhiều chỗ regex sẽ sai
        if (
          tag.includes('</') ||
          tag.startsWith(`<${Consts.FakeTags.Shopify}`) ||
          tag.startsWith(`<${Consts.FakeTags.Compiler}`) ||
          tag.startsWith(`<${Consts.FakeTags.AddonsContext.tagName}`)
        ) {
          return tag;
        }
        indexBOCs[tag] = (indexBOCs[tag] ?? 0) + 1;
        // Check nếu là thẻ đơn có /> thì ta thêm / ở cuối ( nghĩa là sẽ trước > )
        const lastStr = /\/$/g.test(tag) ? '/' : '';

        // Trả về veda open tag nguyên hiện trạng trong editor
        const vedaOpenTag = tag.replace(new RegExp(BREAK_LINE, 'g'), '\n').replace(new RegExp(SPACE, 'g'), ' ');
        return (
          `${tag.replace(/\/$/, '')} veda-index-boc="${indexBOCs[tag]}" ` +
          `veda-open-tag="${btoa(encodeURIComponent(`${vedaOpenTag}>`))}" ` +
          `{{forloop.length ? ' veda-length-of-loop="' ~ forloop.length ~ '"' : null}} ${lastStr}`
        );
      })
      .replace(new RegExp(checkPoint, 'g'), '')
      .replace(new RegExp(BREAK_LINE, 'g'), '\n')
      .replace(new RegExp(SPACE, 'g'), ' ')
  );
};

export const addAttrVedaComponentIndex = (twig: string) => {
  return twig.replace(/\scomponent=/g, `{{loop.index ? ' veda-component-index="' ~ loop.index0 ~ '"' : null}} component=`);
};

const { tagName } = Consts.FakeTags.AddonsContext;
export const addAttrDataAddonsAndAddonContext = (twig: string, isAddons: boolean, sectionAddonIds: ProductSection['addonIds']) => {
  if (!isAddons) {
    // Addon context
    let _twig = twig;
    sectionAddonIds?.forEach(addonId => {
      _twig = _twig.replace(new RegExp(getAddonHtml(addonId), 'g'), (addonHtml, index) => {
        const variables = handleGetScopeOfAddon({ liquidCompiled: _twig.substring(0, index) });
        const context = `{ ${variables.map(variable => `"${variable}": {{ ${variable} | json }}`).join(',')} }`;
        return `<${tagName}><script type="application/json">${context}</script></${tagName}>${addonHtml}`;
      });
    });
    return _twig;
  }

  return twig.replace(/\sdata-id=/g, ` veda-addons="true" data-id=`);
};

export const addAttrDataMegamenu = (twig: string, isMegamenu: boolean) => {
  if (!isMegamenu) {
    return twig;
  }

  return twig.replace(/\sdata-id=/g, ` veda-megamenus="true" data-id=`);
};

export const handleErrorLiquidSyntaxToTwig = ({ err, sectionName, id }: { err: unknown; sectionName: string; id: string }) => {
  const message =
    err instanceof LiquidSyntaxToTwigError
      ? err.message
      : (() => {
          console.log(err);
          return `Something went wrong \n ${err}`;
        })();

  // NOTE: @tuong -> "data-id"
  return `
    <div data-id="${id}" style="padding: 7rem; box-sizing: border-box; background-color: rgba(244, 244, 244, 0.9); -webkit-font-smoothing: antialiased; text-rendering: optimizelegibility; -webkit-tap-highlight-color: transparent">
      <div style="font-size: 2em; font-family: Roboto, sans-serif; color: rgb(206, 17, 38); margin: 0px 2rem 2.5rem 0px; flex: 0 0 auto; max-height: 50%; overflow: auto; font-weight: 400;">
        ${i18n.t('twig_error.error_notification_title', { section_name: sectionName })}
      </div>
      <div style="font-size: 1.5em; font-family: Consolas, Menlo, monospace; color: black; margin: 0px; flex: 0 0 auto; max-height: 50%; overflow: auto; font-weight: 300; padding-bottom: 1rem; border-bottom: 1px solid rgb(221, 221, 221);">${message.replaceAll(
        '\n',
        '<br />',
      )}</div>
    </div>
  `;
};

export const handleLoadingLiquidSyntaxToTwig = ({ id }: { id: string }) => {
  // NOTE: @tuong -> "data-id"
  return `
    <div data-id="${id}" style="padding: 7rem; box-sizing: border-box; background-color: rgba(244, 244, 244, 0.9); -webkit-font-smoothing: antialiased; text-rendering: optimizelegibility; -webkit-tap-highlight-color: transparent">
      <div style="font-size: 2em; font-family: Roboto, sans-serif; color: rgb(206, 17, 38); margin: 0px 2rem 2.5rem 0px; flex: 0 0 auto; max-height: 50%; overflow: auto; font-weight: 400;">
        Fetching data ...
      </div>
    </div>
  `;
};
