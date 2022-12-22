/**
 * Function thực hiện quy hết các syntax "if elseif else" của liquid về 1
 */
export const handleReplaceToGeneralIfElseElseIf = (liquid: string) => {
  return liquid.replace(/{%\s*else\s*if/g, '{% elseif').replace(/{%\s*elsif/gm, '{% elseif');
};
