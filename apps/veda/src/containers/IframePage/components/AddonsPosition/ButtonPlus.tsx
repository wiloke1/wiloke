import Tooltip from 'components/Tooltip';
import { FC, memo } from 'react';
import { FontAwesome, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface ButtonPlusProps extends ViewProps {
  innerRef: React.Ref<HTMLElement>;
  tooltip?: string;
}

const ButtonPlusComponent: FC<ButtonPlusProps> = ({ innerRef, tooltip, ...rest }) => {
  return (
    <View {...rest} ref={innerRef} css={[styles.buttonContainer, rest.css]}>
      {!!tooltip ? (
        <Tooltip text={tooltip} portal css={styles.tooltip}>
          <FontAwesome type="far" name="plus" />
        </Tooltip>
      ) : (
        <View css={[styles.tooltip, { fontSize: '14px' }]}>
          <FontAwesome type="far" name="plus" />
        </View>
      )}
    </View>
  );
};

export const ButtonPlus = memo(ButtonPlusComponent);
