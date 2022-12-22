import { memo, useEffect, useRef } from 'react';
import loadScript from 'utils/functions/loadScript';

interface ScriptTagProps {
  rerender: boolean;
  content: string;
  id: string;
}

const ScriptTag = ({ rerender, content, id }: ScriptTagProps) => {
  const mounted = useRef<boolean>(false);
  const prevRerenderValue = useRef<boolean>(rerender);

  useEffect(() => {
    // Mounted thì chứng tỏ trạng thái 2 biến là như nhau
    if (rerender == prevRerenderValue.current) {
      loadScript({
        id,
        content: content.replace(/(const|let)\s/g, 'var '),
        el: document.body,
      });
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Do "htmlReactParseOptions" tại "LiquidComponent.tsx" luôn luôn được chạy lại nên cần check trạng thái trước đó chứ không thể check mỗi "!rerender"
    // Section rerender khi "rerender" tại useJs toggle true false và trạng thái cuối cùng của biến "rerender" là false
    // Song cái nhận biết nó đang render bởi "rerender" là rerender trước đó là true
    if (mounted.current && !rerender && prevRerenderValue.current) {
      loadScript({
        id,
        content: content.replace(/(const|let)\s/g, 'var '),
        el: document.body,
      });
    }
    prevRerenderValue.current = rerender;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  return rerender ? <></> : null;
};

export default memo(ScriptTag);
