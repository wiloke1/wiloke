import { Prettier } from 'utils/functions/Prettier';
import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry, select } from 'redux-saga/effects';
import { handleSaveInBuilderPage, shopifyConnectionService } from 'services/ShopifyConnection';
import { pagesSelector } from 'store/selectors';
import { getAddonHtml } from 'utils/functions/getAddonHtml';
import getPageInfo from 'utils/functions/getInfo';
import { handleGetScopeOfAddon } from 'utils/LiquidSyntaxToTwig';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { SyncAddonsEnablePositionResult } from '../syncAddons';

export interface SyncPage {
  pageParams: ReturnType<typeof handleSaveInBuilderPage>['pagesParams'][number];
  signalToReplaceAddonInLiquidCode: SyncAddonsEnablePositionResult['signalToReplaceAddonInLiquidCode'];
}

export interface SyncPageResult {
  statusSyncPage: SyncFulfillStatus;
}

/** @tuong ->
  Tại thời điểm comment này được viết -> Chỉ có thể truyền các biến được tạo trong cặp thẻ shopify vì các biến khác có thể gán bằng cách settings

  - Giả sử bài toán cần truyền 1 giá trị nằm trong "section" chứa "addon" -> Cơ bản là khi đó cần tìm các biến nằm trong liquid gốc - liquid chưa được compile - để lấy tên các biến và gán lại vào tag "render"
  -> Nhiều hướng giải bài toán
 */
const replaceAddonHtml = (liquid: string, addonFilesAfterSync: Array<{ addonId: string; fileName: string }>) => {
  let _liquid = liquid;
  addonFilesAfterSync.forEach(addonFile => {
    const { addonId, fileName } = addonFile;
    const regexp = new RegExp(`${strToRegexpPattern(getAddonHtml(addonId))}`, 'g');
    const variables = handleGetScopeOfAddon({ liquidCompiled: liquid.substring(0, liquid.search(regexp)) });
    _liquid = _liquid.replace(
      regexp,
      `
        {% capture addon_${addonId}_content %}
          {% render '${fileName}' %}
        {% endcapture %}

        {% unless addon_${addonId}_content contains "Could not find asset" %}
         {% render '${fileName}', ${variables.map(variable => `${variable}:${variable}`).join(',')} %}
        {% endunless %}
      `,
    );
  });
  return _liquid;
};

export function* syncPage({ pageParams, signalToReplaceAddonInLiquidCode }: SyncPage) {
  const addonFilesAfterSync = signalToReplaceAddonInLiquidCode.map(item => ({ addonId: item.id, fileName: item.fileName }));
  const pages: ReturnType<typeof pagesSelector> = yield select(pagesSelector);
  const pageIdParams = getPageInfo('id');
  if (pageIdParams) {
    yield retry(3, 1000, shopifyConnectionService.writePageToShopify, {
      ...pageParams,
      pageCommandId: pages.data[pageIdParams].commandId,
      assets: {
        ...pageParams.assets,
        files: pageParams.assets?.files?.map(file => {
          if (file && file.type === 'section' && file.content) {
            return {
              ...file,
              content: Prettier.liquid(replaceAddonHtml(file.content, addonFilesAfterSync)),
            };
          }
          return file;
        }),
      },
      isPreview: false,
    });
    const statusSyncPage: SyncFulfillStatus = yield call(handleWaitForSocketOfSyncShopifyFulfill, 'Ghi file khi save ở builder page / Ghi page');
    return { statusSyncPage } as SyncPageResult;
  } else {
    throw new Error('syncPage');
  }
}
