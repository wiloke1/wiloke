/**
 * Function thực hiện chuyển "assign" của liquid thành "set" của twig
 */
export const handleReplaceToGeneralAssign = (liquid: string) => {
  return liquid.replace(/({%|{%-)\s*assign/g, '{% set');
};
