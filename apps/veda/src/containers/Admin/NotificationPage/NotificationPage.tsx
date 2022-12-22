import IframeWrapper from 'components/IframeWrapper';
import { Dashboard } from 'containers/Dashboard';
import { useRef } from 'react';

const IFRAME_URL = 'https://vedabuilder.com/notifications';

export const NotificationPage = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  return (
    <Dashboard
      hasSubmenu={false}
      disabledPaddingContent
      disabledScroll
      Content={() => (
        <IframeWrapper
          innerRef={iframeRef}
          src={IFRAME_URL}
          iframeCss={{ height: '100vh' }}
          onLoaded={() => {
            console.log(iframeRef.current);
            console.log(iframeRef.current?.contentDocument);
          }}
        />
      )}
    />
  );
};
