import { useEffect, useState } from 'react';
import { parseDecimal } from './parseDecimal';

function removeZero(value: number) {
  return Number(value.toString().replace(/^0+(?!\.|$)/, ''));
}

export interface UseCountOptions {
  min?: number;
  max?: number;
  step?: number;
  value?: number | undefined;
}

const useCount = ({ min = 0, max = Infinity, step = 1, value }: UseCountOptions) => {
  const [count, setCount] = useState(value);

  const _setCount = (value: number | undefined) => {
    // xóa cố 0 đằng trước các số khi onChange. Vd: 013 => 13
    const newValue = typeof value !== 'number' ? value : removeZero(value);
    setCount(newValue);
  };

  useEffect(() => {
    _setCount(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const _increment = (_step = step) => {
    if (typeof count === 'number') {
      const _val = Math.min(count + _step, max);
      const _parsedVal = parseDecimal(_val);
      _setCount(_parsedVal);
    } else {
      _setCount(0);
    }
  };

  const _decrement = (_step = step) => {
    const _val = Math.max((count || 0) - _step, min);
    const _parsedVal = parseDecimal(_val);
    _setCount(_parsedVal);
  };

  const _clear = () => {
    _setCount(undefined);
  };

  return {
    count,
    setCount: _setCount,
    increment: _increment,
    decrement: _decrement,
    clear: _clear,
  };
};
export default useCount;
