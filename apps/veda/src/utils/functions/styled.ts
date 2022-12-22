import hash from 'string-hash';

export type Listener = (name: string, content: string) => void;
export type Unsubscribe = () => void;

interface StyledInterface {
  css: (template: TemplateStringsArray) => Promise<string>;
  subscribe: (listener: Listener) => void;
}

class Styled implements StyledInterface {
  private listeners: Listener[];

  constructor() {
    this.listeners = [];
  }

  public css = async (template: TemplateStringsArray, ...args: any[]): Promise<string> => {
    const scssContent = template.reduce((acc, cur, index) => {
      const v = !!args[index] ? args[index] : '';
      return acc + cur + v;
    }, '');
    const name = `style-${hash(scssContent).toString(36)}`;
    return new Promise(resolve => {
      window.Sass.compile(scssContent.trim(), ({ text: styles }: any) => {
        this.listeners.forEach(listener => {
          listener(name, styles);
        });
        resolve(styles);
      });
    });
  };

  public subscribe = (listener: Listener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(listen => listen !== listener);
    };
  };
}

const styled = new Styled();

export default styled;
