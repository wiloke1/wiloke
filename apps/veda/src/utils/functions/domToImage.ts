import html2canvas, { Options } from 'html2canvas';

export interface DomToImageOptions extends Partial<Options> {}

const intialOptions: DomToImageOptions = {};

const PROXY = 'https://cors-anywhere.vedabuilder.com/';

const imageToBase64 = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  return dataUrl as string;
};

const changeImageUrlAsync = (el: HTMLElement) => {
  const imgEls = Array.from(el.querySelectorAll('img'));

  return Promise.all(
    imgEls.map(async imgEl => {
      const src = imgEl.getAttribute('src');
      if (!src || src.includes('data:image')) {
        return;
      }
      try {
        const imageBase64 = await imageToBase64(`${PROXY}${src}`);
        imgEl.setAttribute('src', imageBase64);
        return {
          el: imgEl,
          prevSrc: src,
        };
      } catch (err) {
        console.log(err);
      }
    }),
  );
};

const changeBackgroundUrlAsync = (el: HTMLElement) => {
  const selector =
    'div, section, article, aside, table, thead, tbody, tfoot, th, td, a,[style*="background-image"], [style*="background: url"], [style*="background-image:url"], [data-veda-lazyloaded]';
  const els = Array.from(el.querySelectorAll<HTMLElement>(selector));
  const imgEls = els.reduce<{ src: string; el: HTMLElement }[]>((arr, el) => {
    const bgImg = window.getComputedStyle(el).backgroundImage;
    if (!bgImg || !bgImg.includes('http')) {
      return arr;
    }
    const src = bgImg.replace(/url\(["']?|["']?\)$/g, '');
    return [...arr, { src, el }];
  }, []);

  return Promise.all(
    imgEls.map(async ({ src, el }) => {
      try {
        const imageBase64 = await imageToBase64(`${PROXY}${src}`);
        const prevInlineBackground = el.style.backgroundImage;
        el.style.backgroundImage = `url(${imageBase64})`;
        return {
          el,
          prevInlineBackground,
        };
      } catch (err) {
        console.log(err);
      }
    }),
  );
};

export const domToImage = async (selector: string, options = intialOptions) => {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el || !el.childNodes.length) {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/1/yPwAINAMYyt59LwAAAABJRU5ErkJggg==';
  }

  const [imgResult, bgResult] = await Promise.all([changeImageUrlAsync(el), changeBackgroundUrlAsync(el)]);
  const canvas = await html2canvas(el, options);
  const dataUrl = canvas.toDataURL('image/png');
  imgResult.forEach(item => {
    if (item) {
      if (item.prevSrc) {
        item.el.src = item.prevSrc;
      }
    }
  });
  bgResult.forEach(item => {
    if (item) {
      if (item.prevInlineBackground) {
        item.el.style.setProperty('background-image', item.prevInlineBackground, 'important');
      } else {
        item.el.style.removeProperty('background-image');
      }
    }
  });
  return dataUrl;
};
