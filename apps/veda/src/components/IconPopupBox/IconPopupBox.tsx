import { TooltipPlacement } from 'antd/lib/tooltip';
import ConfirmAntd from 'components/ConfirmAntd';
import FieldBox from 'components/FieldBox';
import { CSSProperties, FC, ReactNode } from 'react';
import { FontAwesome, FontAwesomeName, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface IconPopupBoxProps {
  iconName?: FontAwesomeName;
  size?: number;
  popupPlacement?: TooltipPlacement;
  content?: ReactNode;
  popupStyle?: CSSProperties;
  containerCss?: ViewProps['css'];
}

export const IconPopupBox: FC<IconPopupBoxProps> = ({
  iconName = 'filter',
  size = 35,
  popupPlacement = 'right',
  content = 'Icon popup box content',
  popupStyle,
  containerCss,
}) => {
  return (
    <ConfirmAntd
      placement={popupPlacement}
      title={content}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      overlayStyle={{ minWidth: '300px', ...popupStyle }}
    >
      <FieldBox css={[styles.container(size), containerCss]}>
        <FontAwesome color="primary" type="far" name={iconName} />
      </FieldBox>
    </ConfirmAntd>
  );
};
