import Title from 'components/Title';
import { FC, ReactNode } from 'react';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface HeaderDrawerProps {
  title: string;
  Right?: ReactNode;
  goBack?: () => void;
}

const HeaderDrawer: FC<HeaderDrawerProps> = ({ title, goBack, Right }) => {
  return (
    <View css={styles.container}>
      <Title
        title={title}
        Left={!!goBack ? <FontAwesome type="far" name="arrow-left" size={16} color="gray8" css={styles.back} onClick={goBack} /> : null}
        Right={Right}
      />
    </View>
  );
};

export default HeaderDrawer;
