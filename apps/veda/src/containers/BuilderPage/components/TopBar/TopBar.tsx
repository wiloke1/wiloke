import { FC } from 'react';
import { FontAwesome, Space, useTheme, View } from 'wiloke-react-core';
import { CrispChat } from 'containers/CrispChat/CrispChat';
import SelectPage from '../SelectPage/SelectPage';
import ModalSettings from '../Settings/ModalSettings';
import { FullScreen } from './FullScreen';
import { Responsive } from './Responsive';
import RightActions from './RightActions';
import * as styles from './styles';
import UndoRedo from './UndoRedo';
import { RenewButton } from './RenewButton';

const TopBar: FC = () => {
  const { colors } = useTheme();

  return (
    <View css={styles.container}>
      <View css={styles.left}>
        <SelectPage />
        <FullScreen />
        <Space size={10} type="horizontal" />
        <Responsive />
        <Space size={10} type="horizontal" />
        <UndoRedo />
        <Space size={10} type="horizontal" />
        <ModalSettings />
        <Space size={10} type="horizontal" />
        <RenewButton />
        <Space size={10} type="horizontal" />
        <CrispChat>
          <View backgroundColor="secondary" color="light" css={[styles.iconWrap, { backgroundColor: colors.secondary, color: colors.light }]}>
            <FontAwesome type="far" name="comments" size={16} />
          </View>
        </CrispChat>
      </View>
      <RightActions />
    </View>
  );
};

export default TopBar;
