import { Styles } from 'polished/lib/types/style';
import { FC } from 'react';
import { createPortal } from 'utils/functions/createPortal';
import { View } from 'wiloke-react-core';
import cursor from './cursor.svg';

export interface MouseProps {
  x: number;
  y: number;
}

const containerStyles: Styles = {
  position: 'fixed',
  zIndex: 999999,
  pointerEvents: 'none',
  width: '30px',
  willChange: 'top, left',
  transition: 'all 200ms',
};

const Mouse: FC<MouseProps> = ({ x, y }) => {
  const renderContent = (
    <View css={containerStyles} style={{ top: `${y}%`, left: `${x}%` }}>
      <img src={cursor} alt="" />
    </View>
  );

  return <>{createPortal(renderContent)}</>;
};

export default Mouse;
