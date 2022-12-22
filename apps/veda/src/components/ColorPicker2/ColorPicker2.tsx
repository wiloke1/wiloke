import { useMeasure } from 'hooks/useMeasure';
import useOuterClick from 'hooks/useOuterClick';
import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { ColorList } from './components/ColorList/ColorList';
import { Trigger } from './components/Trigger/Trigger';
import { ColorPickerProvider } from './context';
import { ColorPicker2Props } from './types';

const ColorPicker2: FC<ColorPicker2Props> = ({ data, triggerSmall = false, triggerCss = {}, color = '', onChange, onAddOrEditColor = () => {} }) => {
  const [visibleState, setVisibleState] = useState(false);
  const { setMeasure, ...measure } = useMeasure();
  const colorRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);
  const [colorSchemeElement, setColorSchemeElement] = useState<HTMLElement | null>(null);

  const handleObserver = () => {
    const colorSchemeElement = document.querySelector<HTMLElement>('.veda-custom-color');
    if (colorSchemeElement) {
      setColorSchemeElement(colorSchemeElement);
    }
  };

  useEffect(() => {
    const observer = new MutationObserver(handleObserver);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, []);

  useOuterClick([colorRef.current, childRef.current, colorSchemeElement], () => {
    setVisibleState(false);
  });

  const handleClick: MouseEventHandler<HTMLDivElement> = event => {
    setMeasure(event);
    setVisibleState(true);
  };

  return (
    <ColorPickerProvider
      value={{ data, triggerSmall, triggerCss, color, visible: visibleState, measure, setVisible: setVisibleState, onChange, onAddOrEditColor }}
    >
      <Trigger onClick={handleClick} colorRef={colorRef} />
      <ColorList innerRef={childRef} />
    </ColorPickerProvider>
  );
};

export default ColorPicker2;
