import AsyncComponent from 'components/AsyncComponent';
import { MessageMaintain } from 'components/MessageMaintain';
import NotEnoughWidth from 'components/NotEnoughWidth';
import ScrollBars from 'components/ScrollBars';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import { SideBar } from 'containers/Dashboard/components/SideBar';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { authSelector, globalMountSelector } from 'store/selectors';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export interface DashboardProps {
  disabledPaddingContent?: boolean;
  hasSubmenu?: boolean;
  disabledScroll?: boolean;
  scrollTo?: number;
  onScroll?: ({ scrollHeight, scrollTop, clientHeight }: { scrollHeight: number; scrollTop: number; clientHeight: number }) => void;
  Content: () => ReactNode;
  Modals?: () => ReactNode;
}

export const Dashboard = ({
  Content,
  Modals,
  disabledPaddingContent = false,
  hasSubmenu = true,
  disabledScroll = false,
  scrollTo,
  onScroll,
}: DashboardProps) => {
  const { status } = useSelector(globalMountSelector);
  const { siteStatus } = useSelector(authSelector);
  const { width } = useWindowSize();

  const renderMessageMaintain =
    siteStatus !== null && siteStatus.siteStatus === 'ANNOUNCEMENT' ? (
      <MessageMaintain contentHtml={siteStatus.description} timeEnd={siteStatus.happenAt} />
    ) : null;

  const content = (
    <View css={styles.container}>
      {width < 1100 ? <NotEnoughWidth /> : null}

      <View css={styles.sidebar(hasSubmenu)}>
        <SideBar />
      </View>
      <View className="template-body" backgroundColor="gray1" css={styles.content(hasSubmenu, disabledScroll)}>
        {disabledScroll ? (
          <>
            {renderMessageMaintain}
            <View css={{ padding: disabledPaddingContent ? '0px' : '30px', height: '100%' }}>{Content()}</View>
          </>
        ) : (
          <ScrollBars
            scrollTo={scrollTo}
            onScrollFrame={value => {
              const { scrollHeight, scrollTop, clientHeight } = value;
              onScroll?.({ scrollHeight, scrollTop, clientHeight });
            }}
          >
            {renderMessageMaintain}
            <View css={{ padding: disabledPaddingContent ? '0px' : '30px', height: '100%' }}>{Content()}</View>
          </ScrollBars>
        )}
      </View>
      {Modals?.()}
    </View>
  );
  return (
    <AsyncComponent
      status={status}
      Request={
        <View
          css={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <VedaLoadingItem />
        </View>
      }
      Success={content}
    />
  );
};
