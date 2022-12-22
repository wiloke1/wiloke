export interface LoadStyleInput {
  file?: string;
  content?: string;
  insertPosition?: InsertPosition;
  id?: string;
  element?: HTMLElement;
}

const loadStyle = ({ file, content, insertPosition = 'beforeend', id, element = document.head }: LoadStyleInput) => {
  if (!!id) {
    const el = document.getElementById(id);
    el?.remove();
  }
  if (!!file) {
    const el = document.createElement('link');
    if (!!id) {
      el.id = id;
    }
    el.rel = 'stylesheet';
    el.href = file;
    element.insertAdjacentElement(insertPosition, el);
    return el;
  }
  if (!!content) {
    const el = document.createElement('style');
    if (!!id) {
      el.id = id;
    }
    el.textContent = content;
    element.insertAdjacentElement(insertPosition, el);
    return el;
  }
};

export default loadStyle;
