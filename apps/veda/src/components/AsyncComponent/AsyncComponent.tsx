import oops from 'assets/oops.svg';
import Empty from 'components/Empty';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import { FC, ReactNode } from 'react';
import { View } from 'wiloke-react-core';

export interface AsyncComponentProps {
  status: Status;
  Request?: ReactNode;
  Success: ReactNode;
  Failure?: ReactNode;
  Empty?: ReactNode;
  isEmpty?: boolean;
}

const RequestComponent: FC = () => {
  return (
    <View css={{ padding: '80px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <VedaLoadingItem />
    </View>
  );
};

const FailureComponent: FC = () => {
  return (
    <View css={{ maxWidth: '600px', margin: 'auto', padding: '80px 10px' }}>
      <img src={oops} />
    </View>
  );
};

const EmptyComponent: FC = () => {
  return (
    <View css={{ padding: '20px 0' }}>
      <Empty />
    </View>
  );
};

const AsyncComponent: FC<AsyncComponentProps> = ({
  status,
  Request = <RequestComponent />,
  Success,
  Failure = <FailureComponent />,
  Empty = <EmptyComponent />,
  isEmpty = false,
}) => {
  const renderMapping: Record<Status, ReactNode> = {
    idle: null,
    loading: Request,
    success: isEmpty ? Empty : Success,
    failure: Failure,
  };

  return <>{renderMapping[status]}</>;
};

export default AsyncComponent;
