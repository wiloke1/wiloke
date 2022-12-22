import MyModal from 'components/MyModal';
import Tooltip from 'components/Tooltip';
import { useBackToPage } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useBeforeUnload } from 'react-use';
import { fullscreenSelector } from 'store/selectors';
import { i18n } from 'translation';
import getPageInfo from 'utils/functions/getInfo';
import { css, FontAwesome, Text, Theme, View } from 'wiloke-react-core';

const styles = {
  iconWrap: ({ colors }: Theme) => css`
    debug: TopBar_iconWrap;
    background-color: ${colors.light};
    min-width: 54px;
    height: 53px;
    text-align: center;
    border-right: 1px solid ${colors.gray3};
    margin-right: 15px;
    margin-left: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  itemFull: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  `,
};

export const Exit: FC = () => {
  const [visible, setVisible] = useState(false);
  const history = useHistory<'/builder'>();
  const location = useLocation<'/builder'>();
  const backToPage = useBackToPage();
  const themeId = getPageInfo('themeId');
  const fullscreen = useSelector(fullscreenSelector);
  useBeforeUnload(true, 'Before Unload');

  // back lại dashboard thì xóa pages ở trong reducerPage
  const handleExit = () => {
    setVisible(false);
    const state = {
      ...history.location.state,
      label: '',
      handle: '',
      id: '',
      isCreate: false,
    };
    history.replace({ ...history.location, state });
    if (!!themeId) {
      history.push('/theme');
    } else {
      if (location.state?.backToPage) {
        history.push(location.state.backToPage);
      } else {
        history.push('/page');
      }
    }
    backToPage();
  };

  useEffect(() => {
    const unregister = history.listen(() => {
      if (history.action === 'POP') {
        handleExit();
      }
    });
    return () => {
      unregister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fullscreen) {
    return null;
  }

  return (
    <View>
      <View css={styles.iconWrap}>
        <Tooltip
          placement="bottom"
          text={i18n.t('general.exit')}
          onClick={() => {
            setVisible(true);
          }}
          css={styles.itemFull}
        >
          <FontAwesome type="far" name="arrow-left" size={18} color="gray8" colorHover="primary" />
        </Tooltip>
      </View>
      <MyModal
        headerText={i18n.t('builderPage.exit_without_saving')}
        isVisible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={handleExit}
      >
        <Text>{i18n.t('builderPage.back_to_dashboard')}</Text>
      </MyModal>
    </View>
  );
};
