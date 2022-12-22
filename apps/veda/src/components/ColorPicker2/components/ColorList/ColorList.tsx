import { useColorPicker } from 'components/ColorPicker2/context';
import { FC, RefObject, useState } from 'react';
import { useWindowSize } from 'react-use';
import { createPortal } from 'utils/functions/createPortal';
import { View } from 'wiloke-react-core';
import { Left } from './Left';
import { Right } from './Right';
import * as styles from './styles';

export interface ColorListProps {
  innerRef?: RefObject<HTMLDivElement>;
}

export const ColorList: FC<ColorListProps> = ({ innerRef }) => {
  const { visible, measure, color } = useColorPicker();
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const { height } = useWindowSize();

  const renderContent = () => {
    if (!visible) {
      return null;
    }
    const portalHeight = portalEl?.offsetHeight ?? 0;

    return (
      <View
        ref={setPortalEl}
        css={[
          styles.portal(measure, color.includes('var')),
          measure.top + portalHeight > height
            ? {
                top: `${measure.top - 5}px`,
                transform: 'translateY(-100%)',
              }
            : {
                top: `${measure.top + measure.height + 5}px`,
              },
        ]}
      >
        <Left />
        <Right />
      </View>
    );
  };

  return (
    <>
      {createPortal(
        <View ref={innerRef}>
          <View>{renderContent()}</View>
        </View>,
      )}
    </>
  );
};
