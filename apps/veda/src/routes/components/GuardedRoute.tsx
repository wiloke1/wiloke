import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { authSelector } from 'store/selectors';

export interface GuardedRouteProps extends RouteProps {
  title?: string;
}

const GuardedRoute: FC<GuardedRouteProps> = ({ title, ...rest }) => {
  const { status, siteStatus } = useSelector(authSelector);
  const history = useHistory();

  useEffect(() => {
    document.title = title ?? 'Veda Builder';
  }, [title]);

  // login failed
  useEffect(() => {
    if (status === 'failure') {
      window.location.href = 'https://vedabuilder.com/install';
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // check app is maintained
  useEffect(() => {
    if (status === 'success' && siteStatus && siteStatus.siteStatus === 'MAINTAIN') {
      history.push('/maintainance');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, siteStatus]);

  return <Route {...rest} />;
};

export default GuardedRoute;
