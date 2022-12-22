import { FC, memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'utils/functions/createPortal';
import offset from 'utils/functions/offset';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export interface AddonToolbarProps {
  title: string;
  top: number;
  left: number;
  width: number;
  height: number;
  clickActive?: boolean;
  hoverActive?: boolean;
  onAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const AddonToolbar: FC<AddonToolbarProps> = ({ title, top, left, width, height, clickActive = false, hoverActive = false, onAction }) => {
  const [titlePosition, setTitlePosition] = useState<styles.Position>('left');
  const titleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const isRight = titleRef.current && offset(titleRef.current).left + titleRef.current.offsetWidth > window.innerWidth;
    setTitlePosition(isRight ? 'right' : 'left');
  }, [hoverActive]);

  if (!hoverActive && !clickActive) {
    return null;
  }

  const renderContent = (
    <View onClick={onAction} css={styles.container(top, left, width, height)}>
      <View ref={titleRef} css={styles.title(titlePosition)}>
        {title}
      </View>
    </View>
  );

  return createPortal(renderContent);
};

export default memo(AddonToolbar);
