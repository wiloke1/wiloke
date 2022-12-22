import Tooltip from 'components/Tooltip';
import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from 'store/selectors';
import { i18n } from 'translation';
import { isIframePage } from 'utils/isFramePage';
import { isPreviewPage } from 'utils/isPreviewPage';
import { View } from 'wiloke-react-core';
import { useCrispChat } from './hooks/useCrispChat';

export const CrispChat: FC = ({ children }) => {
  const { email, shopName } = useSelector(authSelector);
  const { initialized, initCrispChat, setUser } = useCrispChat();

  const isNeedChatBox = useMemo(() => {
    return !isIframePage() && !isPreviewPage();
  }, []);

  const handleShowChatBox = () => {
    if (initialized) {
      window.$crisp.push(['do', 'chat:open']);
    }
  };

  useEffect(() => {
    if (isNeedChatBox) {
      initCrispChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialized && shopName && email) {
      setUser(email, shopName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, shopName, email]);

  if (!isNeedChatBox || !initialized) {
    return null;
  }

  return (
    <Tooltip portal text={i18n.t('CrispChat.openChatBoxMessage')} placement="right">
      <View css={{ cursor: 'pointer' }} onClick={handleShowChatBox}>
        {children}
      </View>
    </Tooltip>
  );
};
