import SectionPageHeader from 'components/SectionPageHeader';
import { Tabs } from 'components/Tabs';
import { Dashboard } from 'containers/Dashboard';
import { FC, useState } from 'react';
import { i18n } from 'translation';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { Styles, Theme, View, Text } from 'wiloke-react-core';
import { Coupons } from './Coupons';
import { ModalCreateCoupon } from './components/ModalCreateCoupon';
import { ModalCreatePlan } from './components/ModalCreatePlan';
import { Plans } from './Plans';
import { useSetVisibleModalCoupon } from './store/sliceCoupon';
import { useSetVisibleModalCreatePlan } from './store/slicePlan';
import { ModalEditCoupon } from './components/ModalEditCoupon';
import { ModalEditPlan } from './components/ModalEditPlan';

export const overlay = ({ colors }: Theme): Styles => ({
  backgroundColor: `rgba(${colors.rgbGray5}, 0.6)`,
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  borderRadius: '6px',
});

export const PlanManagement: FC = () => {
  const { role } = getUserInfo();
  const setVisibleModalCreatePlan = useSetVisibleModalCreatePlan();
  const setVisibleModalCoupon = useSetVisibleModalCoupon();

  const [filterType, setFilterType] = useState<'plan' | 'coupon' | string>('plan');

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreatePlan />
          <ModalCreateCoupon />
          <ModalEditCoupon />
          <ModalEditPlan />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            description=""
            title={`Plan ${i18n.t('general.manager')}`}
            buttonContent={filterType === 'plan' ? 'Create new plan' : ' Create new coupon'}
            disableButton={role !== 'admin'}
            onClick={() => {
              if (filterType === 'plan') {
                setVisibleModalCreatePlan(true);
              } else {
                setVisibleModalCoupon(true);
              }
            }}
          />

          <View row css={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <View columns={[12, 6, 6]}>
              <Tabs variants="style2" activeKey={filterType} tabTitleGutter={10} onChange={setFilterType}>
                <Tabs.Pane tab={<Text>Plan</Text>} key="plan" />
                <Tabs.Pane tab={<Text>Coupon</Text>} key="coupon" />
              </Tabs>
            </View>
          </View>

          {filterType === 'plan' && <Plans />}
          {filterType === 'coupon' && <Coupons />}
        </View>
      )}
    />
  );
};
