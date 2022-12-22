import AsyncComponent from 'components/AsyncComponent';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import { CouponCard } from './components/CouponCard';
import { useDeleteUserPlan, useGetUserPlans } from './store/actions';
import { planSelector, useSetEditPlan } from './store/slicePlan';

export const Plans: React.FC = () => {
  const { getStatus, plans, deleteStatus } = useSelector(planSelector);
  const getUserPlans = useGetUserPlans();
  const deletePlan = useDeleteUserPlan();
  const setEditPlan = useSetEditPlan();

  useEffect(() => {
    getUserPlans.request(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSuccess = (
    <View row>
      {plans.map(item => (
        <View columns={[3]}>
          <CouponCard
            code={`handle: ${item.handle}`}
            discountText={item.name}
            expireOn={`Price: ${item.price}`}
            onDelete={() => {
              deletePlan.request({ commandId: item.commandId });
            }}
            deleteLoading={deleteStatus[item.commandId] === 'loading'}
            onEdit={() => {
              setEditPlan(item);
            }}
          />
        </View>
      ))}
    </View>
  );

  return <AsyncComponent status={getStatus} isEmpty={plans.length === 0} Success={renderSuccess} />;
};
