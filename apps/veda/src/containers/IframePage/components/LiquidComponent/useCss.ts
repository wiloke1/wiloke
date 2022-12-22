import { useEffect, useRef } from 'react';
import loadStyle from 'utils/functions/loadStyle';
import { sassCompile } from 'utils/functions/sass';

const useCss = (scss: string, id: string) => {
  const cssCompiled = useRef('');

  useEffect(() => {
    const handleAsync = async () => {
      if (!!scss.trim()) {
        cssCompiled.current = await sassCompile.client(scss, id);
        loadStyle({ content: cssCompiled.current, id: `css_${id}` });
      } else {
        loadStyle({
          content: `/** FILE TRẮNG NÊN CẦN THÊM ĐOẠN COMMENT NÀY CHO NÓ CHẠY "loadStyle" nhằm xoá css cũ đi nếu scss trước đó có mà sau thì rỗng */`,
          id: `css_${id}`,
        });
      }
    };
    handleAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scss]);
};

export default useCss;
