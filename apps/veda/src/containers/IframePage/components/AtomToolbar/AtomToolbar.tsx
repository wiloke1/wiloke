import { FC, memo, ReactNode } from 'react';
import { createPortal } from 'utils/functions/createPortal';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export interface AtomToolbarProps {
  title: ReactNode;
  top: number;
  left: number;
  width: number;
  height: number;
  clickActive?: boolean;
  hoverActive?: boolean;
  onAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const AtomToolbar: FC<AtomToolbarProps> = ({ title, top, left, width, height, clickActive = false, hoverActive = false, onAction }) => {
  if (!hoverActive && !clickActive) {
    return null;
  }

  const renderContent = (
    <View onClick={onAction} css={styles.container(top, left, width, height)}>
      <View css={styles.title}>{title}</View>
    </View>
  );

  return createPortal(renderContent);
};

export default memo(AtomToolbar);
