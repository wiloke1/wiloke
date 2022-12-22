import { useEffect, useState } from 'react';

const useOnLine = () => {
  const [onLine, setOnLine] = useState(navigator.onLine);

  const updateOnlineStatus = (event: Event) => {
    setOnLine(event.type === 'online');
  };

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return onLine;
};

export default useOnLine;
