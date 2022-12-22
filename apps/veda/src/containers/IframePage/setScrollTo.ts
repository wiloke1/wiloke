import offset from 'utils/functions/offset';
import { isIframePage } from 'utils/isFramePage';

export interface ScrollToOptions {
  smooth?: boolean;
  timeout?: number;
}

const defaultOptions: ScrollToOptions = {
  smooth: true,
};

const setScrollTo = (selector: string, options?: ScrollToOptions) => {
  const opts = { ...defaultOptions, ...options };
  const doc = isIframePage() ? document : (document.querySelector<HTMLIFrameElement>('#iframe-content')?.contentDocument as Document);
  const win = isIframePage() ? window : (document.querySelector<HTMLIFrameElement>('#iframe-content')?.contentWindow as Window);

  const handleScroll = () => {
    const sectionEl: HTMLElement | null = doc.querySelector(selector);
    if (!!sectionEl) {
      let top = offset(sectionEl).top - (win.innerHeight - sectionEl.offsetHeight) / 2;
      if (sectionEl.offsetHeight > win.innerHeight) {
        top = offset(sectionEl).top - 50;
      }
      win.scrollTo({
        behavior: opts.smooth ? 'smooth' : 'auto',
        top,
      });
    }
  };

  if (opts.timeout !== undefined) {
    const timeoutId = setTimeout(() => {
      handleScroll();
      clearTimeout(timeoutId);
    }, opts.timeout);
  } else {
    handleScroll();
  }
};

export default setScrollTo;
