import { ComponentType, FC, useEffect, useRef, useState } from 'react';

const withDebounce = <P extends any>(WrappedComponent: ComponentType<P>, propValue: keyof P, propOnChange: keyof P, time = 200) => {
  const WithDebounce: FC<P> = props => {
    const timeIdRef = useRef(-1);
    const [mounted, setMouted] = useState(false);
    const [valueState, setValueState] = useState((props as any)[propValue]);

    useEffect(() => {
      setValueState((props as any)[propValue]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [(props as any)[propValue]]);

    useEffect(() => {
      if (mounted) {
        clearTimeout(timeIdRef.current);
        timeIdRef.current = window.setTimeout(() => {
          (props as any)[propOnChange]?.(valueState);
        }, time);
      }
      setMouted(true);
      return () => {
        clearTimeout(timeIdRef.current);
        setMouted(false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueState]);

    const handleChange = (value: any) => {
      setValueState(value);
    };

    return <WrappedComponent {...props} {...{ [propOnChange]: handleChange, [propValue]: valueState }} />;
  };
  return WithDebounce;
};

export default withDebounce;
