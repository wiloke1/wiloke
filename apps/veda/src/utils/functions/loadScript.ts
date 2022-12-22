export interface LoadScriptInput {
  file?: string;
  content?: string;
  insertPosition?: InsertPosition;
  id?: string;
  el?: HTMLElement;
}

const loadScript = async ({ file, content, insertPosition = 'beforeend', id, el = document.head }: LoadScriptInput): Promise<HTMLScriptElement> => {
  if (!!id) {
    const el = document.getElementById(id);
    el?.remove();
  }
  const scriptEl = document.createElement('script');
  if (!!id) {
    scriptEl.id = id;
  }
  if (!!file) {
    scriptEl.src = file;
  }
  if (!!content) {
    scriptEl.textContent = content;
  }
  if (!!file || !!content) {
    el.insertAdjacentElement(insertPosition, scriptEl);
    return new Promise(resolve => {
      scriptEl.onload = () => {
        resolve(scriptEl);
      };
    });
  }
  return new Promise(resolve => {
    resolve(scriptEl);
  });
};

export default loadScript;
