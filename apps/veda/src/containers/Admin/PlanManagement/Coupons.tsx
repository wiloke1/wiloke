import AsyncComponent from 'components/AsyncComponent';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Coupon } from 'types/Coupon';
import { timeConverter } from 'utils/timeAgo';
import { View } from 'wiloke-react-core';
import { CouponCard } from './components/CouponCard';
import { useDeleteCoupon, useGetCoupons } from './store/actions';
import { couponSelector, useEditCoupon } from './store/sliceCoupon';

export const Coupons: React.FC = () => {
  const { getStatus, coupons, deleteStatus } = useSelector(couponSelector);

  const getCoupons = useGetCoupons();
  const setCoupon = useEditCoupon();
  const deleteCoupon = useDeleteCoupon();

  useEffect(() => {
    getCoupons.request(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCoupon = (item: Coupon) => {
    return (
      <View key={item.commandId} columns={[3]}>
        <CouponCard
          code={item.code}
          discountText={
            item.type === 'FIXED' ? `$${item.number} Off` : item.type === 'PERCENTAGE' ? `${item.number}% Off` : `Trial days: ${item.number}`
          }
          expireOn={`Expire on: ${timeConverter(new Date(item.expiredOn).getTime())}`}
          onEdit={() => {
            setCoupon(item);
          }}
          onDelete={() => {
            deleteCoupon.request({ commandId: item.commandId });
          }}
          deleteLoading={deleteStatus[item.commandId] === 'loading'}
        />
      </View>
    );
  };

  return (
    <View>
      <AsyncComponent status={getStatus} isEmpty={coupons.length === 0} Success={<View row>{coupons.map(renderCoupon)}</View>} />
    </View>
  );
};
