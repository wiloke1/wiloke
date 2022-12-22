import { useEffect, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';

export interface UseGenerateParams<T extends Record<string, any>> {
  props: T;
  createCss: () => Promise<string>;
  createJs: () => string;
  createLiquid: (props: T) => string;
}

const useGenerate = <T extends Record<string, any>>({ props, createCss, createJs, createLiquid }: UseGenerateParams<T>) => {
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [liquid, setLiquid] = useState('');

  useEffect(() => {
    const handleAsync = async () => {
      const css = await createCss();
      setCss(css);
    };
    handleAsync();
    setJs(createJs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDeepCompareEffect(() => {
    setLiquid(createLiquid(props));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return {
    css,
    js,
    liquid,
  };
};

export default useGenerate;
