import { Children, FC, useEffect, useMemo, useRef, useState } from 'react';

interface DeferProps {
  chunkSize: number;
  timeout?: number;
}

export const Defer: FC<DeferProps> = ({ chunkSize, timeout = 100, children }) => {
  const [renderedItemsCount, setRenderedItemsCount] = useState(chunkSize);
  const ref = useRef<any>(null);

  const childrenArray = useMemo(() => {
    return Children.toArray(children);
  }, [children]);

  useEffect(() => {
    if (renderedItemsCount < childrenArray.length) {
      ref.current = window.requestIdleCallback(
        () => {
          setRenderedItemsCount(Math.min(renderedItemsCount + chunkSize, childrenArray.length));
        },
        { timeout },
      );
    }
    return () => {
      window.cancelIdleCallback(ref.current);
    };
  }, [renderedItemsCount, childrenArray.length, chunkSize, timeout]);
  return <>{childrenArray.slice(0, renderedItemsCount)}</>;
};
