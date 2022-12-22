import maintain from 'assets/maintain.svg';
import { useCountDown } from 'hooks/useCountDown';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authSelector } from 'store/selectors';
import { Space, View } from 'wiloke-react-core';

export const Maintainance: FC = () => {
  const { siteStatus } = useSelector(authSelector);
  const _endDate = siteStatus !== null && siteStatus.siteStatus === 'MAINTAIN' ? siteStatus.happenAt : 0;
  const { days, hours, minutes, seconds, isExpired } = useCountDown({ endDate: _endDate });
  const history = useHistory();

  useEffect(() => {
    if (isExpired) {
      history.push('/theme');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpired]);

  return (
    <View
      css={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 99999999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={maintain} />

      <View tagName="h1">Hang on! We are under maintainance</View>
      <Space size={4} />
      <View tagName="p" fontFamily="secondary" css={{ fontSize: '18px' }}>
        It will not take a long time till we get the error fixed. We will live again in
      </View>
      <Space size={4} />
      <View tagName="h2" color="primary">
        {days} : {hours} : {minutes} : {seconds}
      </View>
    </View>
  );
};
