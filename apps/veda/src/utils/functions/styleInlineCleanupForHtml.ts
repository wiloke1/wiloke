export const styleInlineCleanupForHtml = (html: string) => {
  return html.replace(/[\w-]*:\s*(px|%|vh|vw|em|rem|pt|cm|mm|in|pc|ex|ch|vmin|vmax|lh|rlh|vb|vi|svw|svh|lvw|lvh|dvw|dvh)(;|)\s*(?!\w)/g, '');
};
