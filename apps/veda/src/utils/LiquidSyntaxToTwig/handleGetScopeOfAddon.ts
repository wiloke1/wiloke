import { at } from 'utils/at';
import { getBOCsBetweenSomething } from './utils/getBOCsBetweenSomething';
import { getMatches } from './utils/getMatches';

interface HandleGetScopeOfAddon {
  /** Đoạn code liquid trước thẻ <addons>  */
  liquidCompiled: string;
}

export const handleGetScopeOfAddon = ({ liquidCompiled }: HandleGetScopeOfAddon) => {
  const variables = new Set<string>();

  const BOCs = getBOCsBetweenSomething({ liquid: liquidCompiled, endBOC: new RegExp('%}', 'g'), startBOC: new RegExp('{%', 'g') });
  BOCs.forEach(BOC => {
    // Xử lý cho assign trước
    if (/assign.*=/.test(BOC)) {
      const _BOC = BOC.replace(/\n/g, '');
      const targetAssignClause = getMatches(_BOC, new RegExp(/assign.*=/g))[0];
      const variableName = at(targetAssignClause?.split(' '), 1);
      if (variableName) {
        variables.add(variableName);
      }
    }
    if (/for\s+.*\s+in/.test(BOC)) {
      const _BOC = BOC.replace(/\n/g, '');
      const targetAssignClause = getMatches(_BOC, new RegExp(/for\s+.*\s+in/g))[0];
      const variableName = at(targetAssignClause?.split(' '), 1);
      if (variableName) {
        variables.add(variableName);
      }
    }
  });

  return Array.from(variables);
};
