import { useEffect } from 'react';
import { useState } from 'react';

const useBodyHeight = () => {
  const [bodyHeight, setBodyHeight] = useState(document.body.offsetHeight);

  const handleSetBodyHeight = () => {
    setBodyHeight(document.body.offsetHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleSetBodyHeight);
    return () => {
      window.removeEventListener('resize', handleSetBodyHeight);
    };
  }, []);

  return bodyHeight;
};

export default useBodyHeight;
