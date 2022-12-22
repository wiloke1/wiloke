import { v4 } from 'uuid';

interface GetBOCsBetweenSomething {
  liquid: string;
  startBOC: RegExp;
  endBOC: RegExp;
  isValid: (BOC: string) => boolean;
  ignoreNested: boolean;
  withUniqId: boolean;
}

export const getBOCsBetweenSomething = ({ endBOC, liquid, startBOC, isValid, ignoreNested, withUniqId }: GetBOCsBetweenSomething) => {
  let signals;
  const startIndexes = [];
  const BOCs = [];
  const regex = new RegExp(`${startBOC.source}|${endBOC.source}`, 'gm');
  while (true) {
    signals = regex.exec(liquid);
    if (signals !== null) {
      const signal = signals[0];
      if (!endBOC.test(signal)) {
        if (!ignoreNested) {
          // Bắt đầu 1 root
          const startIndex = regex.lastIndex - signal.length;
          startIndexes.push(startIndex);
        } else if (ignoreNested && !startIndexes.length) {
          const startIndex = regex.lastIndex - signal.length;
          startIndexes.push(startIndex);
        }
      } else {
        const startIndex = startIndexes.pop();
        if (startIndex !== undefined) {
          // Kết thúc 1 root
          const endIndex = regex.lastIndex;
          const content = liquid.slice(startIndex, endIndex);
          if (isValid(content)) {
            BOCs.push({
              content,
              startIndex,
              id: withUniqId ? v4() : undefined,
            });
          }
        }
      }
    } else {
      break;
    }
  }

  return BOCs;
};
