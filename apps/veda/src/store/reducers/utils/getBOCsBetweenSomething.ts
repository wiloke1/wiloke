import { checkSingleTag } from 'utils/checkSingleTag';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';

interface GetBOCsBetweenSomething {
  liquid: string;
  tagName: string;
  openTag: string;
}

// NOTE: @tuong -> indexBOCs liên quan đến src/containers/IframePage/utils
// add position addon vào code
export const getBOCsBetweenSomething = ({ openTag, liquid, tagName }: GetBOCsBetweenSomething) => {
  const _openTagName = new RegExp(`<${tagName}`);
  const _closeTagName = checkSingleTag(tagName) ? new RegExp(/>|\/>/) : new RegExp(`</${tagName}>`);
  const _openTag = new RegExp(strToRegexpPattern(openTag));
  let signals;
  // Các vị trí mở tag
  const startIndexes: Array<{ index: number; indexBOC: number | undefined }> = [];
  const indexBOCs: Record<string, number> = {};
  const bocsWithOpenTag: Array<{ code: string; indexBOC: number }> = [];
  const regex = new RegExp(`${_openTag.source}|${_openTagName.source}|${_closeTagName.source}`, 'gm');

  // @tuong -> Bằng một cách nào đấy "<h3\s\n" tại "signal" lại = "<h3\r\n" nên phải check startWiths như thế này
  const isStartWithOpenTag = (str: string) => _openTag.test(str);
  while (true) {
    signals = regex.exec(liquid);
    if (signals !== null) {
      const signal = signals[0];
      // Trường hợp <img > và <img /> -> phải check startBOC
      // nếu dùng endBOC performance sẽ tốt hơn
      if (_openTagName.test(signal)) {
        const startIndex = regex.lastIndex - signal.length;
        if (isStartWithOpenTag(signal)) {
          indexBOCs[openTag] = (indexBOCs[openTag] ?? 0) + 1;
          startIndexes.push({ indexBOC: indexBOCs[openTag], index: startIndex });
        } else {
          startIndexes.push({ indexBOC: undefined, index: startIndex });
        }
      } else {
        const startIndex = startIndexes.pop();
        if (startIndex !== undefined) {
          const { index, indexBOC } = startIndex;
          const BOC = liquid.slice(index, regex.lastIndex);
          if (isStartWithOpenTag(openTag) && indexBOC !== undefined) {
            bocsWithOpenTag.push({ code: BOC, indexBOC });
          }
        }
      }
    } else {
      break;
    }
  }
  return bocsWithOpenTag;
};
