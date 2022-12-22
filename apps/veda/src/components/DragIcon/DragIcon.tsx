import { FC } from 'react';
import { css, View } from 'wiloke-react-core';

const styles = {
  container: css`
    position: relative;
    width: 10px;
    height: 24px;
  `,
  child: css`
    position: absolute;
    inset: 0;
    margin: auto;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    box-shadow: -3px -6px 0, 3px -6px 0, -3px 0 0, 3px 0 0, -3px 6px 0, 3px 6px 0;
    opacity: 0.7;
  `,
};

const DragIcon: FC = props => {
  return (
    <View css={styles.container} {...props}>
      <View css={styles.child} color="gray6" />
    </View>
  );
};

export default DragIcon;
