import { useCallback, useEffect, useRef, useState } from 'react';

export const useDetectNetworkStatus = () => {
  const [isOnlineState, setIsOnlineState] = useState(navigator.onLine);
  const prevIsOnlineState = useRef(isOnlineState);

  const updateOnlineStatus = useCallback(() => {
    const isOnline = navigator.onLine;
    prevIsOnlineState.current = isOnlineState;
    setIsOnlineState(isOnline);
  }, [isOnlineState]);

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [updateOnlineStatus]);

  return { isOnline: isOnlineState, prevIsOnline: prevIsOnlineState.current };
};
