import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { handlePreviewInBuilderPage, shopifyConnectionService } from 'services/ShopifyConnection';

export interface SyncAddonsDisablePosition {
  addonsDisablePositionParams: ReturnType<typeof handlePreviewInBuilderPage>['addonsDisablePositionParams'];
}

export interface SyncAddonsDisablePositionResult {
  statusSyncAddonsDisablePosition: SyncFulfillStatus;
}

/**
 * @tuong
 * Câu hỏi 1: Tại sao addon lại ghi ra 1 file mới?
   => @tuong: "Addon" là global -> Xét ngữ cảnh "Page A" và "Page B" cùng có 1 "Addon A" -> Vào một ngày đẹp trời "User" vào "Page A" và xoá "Addon A" -> "Page B" cũng cần được xoá nhưng xét bài toán số lượng "Page" lên đến cả trăm -> Regex là rất khó và tốn kèm -> Hack bằng cách tạo "addon" ra 1 file liquid riêng và dùng code để check file tồn tại hay không -> Khi xoá "Addon" thì các "Page" khác cũng không ảnh hưởng
 */
export function* syncAddonsDisablePosition({ addonsDisablePositionParams }: SyncAddonsDisablePosition) {
  try {
    const signalToReplaceAddonInLiquidCode: Awaited<ReturnType<typeof shopifyConnectionService.writeAddonToShopify>> = yield retry(
      3,
      1000,
      shopifyConnectionService.writeAddonToShopify,
      { ...addonsDisablePositionParams, isPreview: false },
    );
    const statusSyncAddonsDisablePosition: SyncFulfillStatus = yield call(
      handleWaitForSocketOfSyncShopifyFulfill,
      'Ghi file khi save ở builder page / Ghi addon disable position',
    );
    if (statusSyncAddonsDisablePosition === 'failure') {
      return { statusSyncAddonsDisablePosition: 'failure' } as SyncAddonsDisablePositionResult;
    } else {
      const addonFilesAfterSync = signalToReplaceAddonInLiquidCode.map(item => ({ addonId: item.id, fileName: item.fileName }));
      const content = addonFilesAfterSync
        .map(addonFile => {
          const { addonId, fileName } = addonFile;
          return `
            {% capture addon_${addonId}_content %}
              {% render '${fileName}' %}
            {% endcapture %}

            {% unless addon_${addonId}_content contains "Could not find asset" %}
              {% render '${fileName}' %}
            {% endunless %}
          `;
        })
        .join('\n');
      yield retry(3, 1000, shopifyConnectionService.updateAddonsDisablePositionToShopify, {
        isPreview: false,
        eventType: 'Ghi file khi save ở builder page / Ghi các addon disable position vừa tạo xong vào file theme',
        content,
        eventId: addonsDisablePositionParams.eventId,
        themeName: addonsDisablePositionParams.themeName,
      });
      return { statusSyncAddonsDisablePosition: 'success' } as SyncAddonsDisablePositionResult;
    }
  } catch {
    return { statusSyncAddonsDisablePosition: 'failure' } as SyncAddonsDisablePositionResult;
  }
}
