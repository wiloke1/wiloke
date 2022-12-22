import direction from 'generate/scss/abstracts/direction';
import media from 'generate/scss/abstracts/media';
import polyFluidSizing from 'generate/scss/abstracts/polyFluidSizing';

class SassCompile {
  /**
   * @description Compile `scss` sang `css` và thêm 1 biến `scss` với `id` cho trước
   */
  client(scss: string, id?: string): Promise<string> {
    const scss_ = `${polyFluidSizing}\n${direction}\n${media}\n${
      !!id ? `$uniqueId: "${id}";\n$container: "[data-id='#{$uniqueId}']";\n` : ''
    }${scss}`.trim();
    return new Promise(resolve => {
      window.Sass.compile(scss_, ({ text: css }: any) => {
        resolve(css ?? '');
      });
    });
  }

  /**
   * @description Compile `scss` bằng SERVER sang `css` và thêm 1 biến `scss` với `id` cho trước
   */
  async server(scss: string, id?: string): Promise<string> {
    const scss_ = `${polyFluidSizing}\n${direction}\n${media}\n${!!id ? `$uniqueId: "${id}";\n` : ''}${scss}`.trim();
    try {
      const res = await fetch('https://api.sassmeister.com/compile', {
        method: 'POST',
        body: JSON.stringify({ input: scss_, compiler: 'dart-sass/1.32.12', syntax: 'SCSS', outputStyle: 'expanded' }),
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      });
      const data = await res.json();
      return data.css as string;
    } catch {
      return '';
    }
  }
}

export const sassCompile = new SassCompile();
