/**
 * Function thực hiện quy hết các dấu đóng mở 1 block của liquid về 1
 */
export const handleReplaceGeneralOpenCloseBlock = (liquid: string) => {
  return liquid
    .replace(/{%-/g, '{%')
    .replace(/-%}/g, '%}')
    .replace(/{{-/g, '{{')
    .replace(/-}}/g, '}}');
};
