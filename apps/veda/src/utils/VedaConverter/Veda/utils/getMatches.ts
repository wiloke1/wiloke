/**
 * Lấy ra tất cả đoạn string được match bởi regex
 */
export function getMatches(string: string, regex: RegExp) {
  const matches: Array<string | undefined> = [];
  let match;
  while ((match = regex.exec(string))) {
    matches.push(...match);
  }
  return matches;
}
