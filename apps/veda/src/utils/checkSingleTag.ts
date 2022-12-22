export const checkSingleTag = (tagName: string) => {
  const singleTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
  return singleTags.includes(tagName);
};
