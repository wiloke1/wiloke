export const imageUrl = (url: string, width?: number | string, height?: number | string) => {
  const _url = url.replace(/(\?|&)width=\d*/g, '');
  const joiner = _url.includes('?') ? '&' : '?';
  const paramWidth = width ? `${joiner}width=${width}` : '';
  const paramHeight = height ? `${joiner}height=${height}` : '';
  return `${_url}${paramWidth}${paramHeight}`;
};
