import { useEffect, useState } from 'react';
import { View } from 'wiloke-react-core';

export interface DragIconProps {
  value: number;
  setValue: (value: number) => void;
}

export const DragIcon = ({ value, setValue }: DragIconProps) => {
  const [snapshot, setSnapshot] = useState(value);
  const [startValue, setStartValue] = useState(0);

  const _handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setStartValue(e.clientX);
    setSnapshot(value);
  };

  useEffect(() => {
    const onUpdate = (e: MouseEvent) => {
      if (startValue) {
        setValue(e.clientX - snapshot);
      }
    };

    const onEnd = () => {
      setStartValue(0);
    };

    document.addEventListener('mousemove', onUpdate);
    document.addEventListener('mouseup', onEnd);

    return () => {
      document.removeEventListener('mousemove', onUpdate);
      document.removeEventListener('mouseup', onEnd);
    };
  }, [startValue, setValue, snapshot]);

  return (
    <View
      onMouseDown={_handleMouseDown}
      css={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '4px', cursor: 'ew-resize', userSelect: 'none' }}
    />
  );
};
