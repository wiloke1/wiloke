interface GetBOCsBetweenSomething {
  liquid: string;
  startBOC: RegExp;
  endBOC: RegExp;
  ignoreNested?: boolean;
}

/** Function thực hiện lấy block code giữa 2 cái j đó */
export const getBOCsBetweenSomething = ({ endBOC, liquid, startBOC, ignoreNested = false }: GetBOCsBetweenSomething) => {
  let signals;
  const startIndexes: number[] = [];
  const BOCs: string[] = [];
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
          BOCs.push(liquid.slice(startIndex, endIndex));
        }
      }
    } else {
      break;
    }
  }

  return BOCs;
};
