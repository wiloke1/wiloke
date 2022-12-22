function isYoutube(url: string): boolean {
  return url.search(/^http.*:\/\/(www|)\.youtube\.com/g) !== -1;
}

function isVimeo(url: string): boolean {
  return url.search(/^http.*:\/\/vimeo\.com/g) !== -1;
}

function changeUrlVimeo(url: string): string {
  const re = /\d+/g;
  const c = url.match(re);
  return `https://player.vimeo.com/video/${c ? c[0] : ''}`;
}

function changeUrlYoutube(url: string): string {
  const re = /\?v=.\w*/g;
  const found: string[] | null = re.exec(url);
  if (!found) {
    return url;
  }
  const res: string = found[0].replace(/\?v=/g, '');
  return `https://www.youtube.com/embed/${res}`;
}

function changeUrlToEmbed(url: string): string {
  if (isVimeo(url)) {
    return changeUrlVimeo(url);
  }
  if (isYoutube(url)) {
    return changeUrlYoutube(url);
  }
  return url;
}
export default changeUrlToEmbed;
