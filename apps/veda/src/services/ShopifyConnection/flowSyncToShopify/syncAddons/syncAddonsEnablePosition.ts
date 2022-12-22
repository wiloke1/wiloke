import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, retry } from 'redux-saga/effects';
import { handleSaveInBuilderPage, shopifyConnectionService } from 'services/ShopifyConnection';

export interface SyncAddonsEnablePosition {
  addonsEnablePositionParams: ReturnType<typeof handleSaveInBuilderPage>['addonsEnablePositionParams'];
}

export interface SyncAddonsEnablePositionResult {
  statusSyncAddonsEnablePosition: SyncFulfillStatus;
  signalToReplaceAddonInLiquidCode: Awaited<ReturnType<typeof shopifyConnectionService.writeAddonToShopify>>;
}

/**
 * @tuong
 * Câu hỏi 1: Tại sao addon lại ghi ra 1 file mới?
   => @tuong: "Addon" là global -> Xét ngữ cảnh "Page A" và "Page B" cùng có 1 "Addon A" -> Vào một ngày đẹp trời "User" vào "Page A" và xoá "Addon A" -> "Page B" cũng cần được xoá nhưng xét bài toán số lượng "Page" lên đến cả trăm -> Regex là rất khó và tốn kèm -> Hack bằng cách tạo "addon" ra 1 file liquid riêng và dùng code để check file tồn tại hay không -> Khi xoá "Addon" thì các "Page" khác cũng không ảnh hưởng
 */
export function* syncAddonsEnablePosition({ addonsEnablePositionParams }: SyncAddonsEnablePosition) {
  const signalToReplaceAddonInLiquidCode: Awaited<ReturnType<typeof shopifyConnectionService.writeAddonToShopify>> = yield retry(
    3,
    1000,
    shopifyConnectionService.writeAddonToShopify,
    { ...addonsEnablePositionParams, isPreview: false },
  );
  const statusSyncAddonsEnablePosition: SyncFulfillStatus = yield call(
    handleWaitForSocketOfSyncShopifyFulfill,
    'Ghi file khi save ở builder page / Ghi addon enable position',
  );
  return { statusSyncAddonsEnablePosition, signalToReplaceAddonInLiquidCode } as SyncAddonsEnablePositionResult;
}
