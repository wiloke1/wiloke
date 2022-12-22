import IframeWrapper from 'components/IframeWrapper';
import { useDowngradeToFreePlan, useGoToShopifyPayment } from 'containers/Admin/PlanManagement/store/actions';
import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect, useRef } from 'react';
import { pmLanding } from 'utils/functions/postMessage';

const IFRAME_URL = 'https://vedabuilder.com/pricing-for-veda-builder?&plantype=monthly';

type _PlanType = 'monthly' | 'yearly';

export const PricingPage: FC = () => {
  // const { getStatus, plans, getShopifyUrlStatus } = useSelector(planSelector);
  const gotoShopifyPayment = useGoToShopifyPayment();
  const downgradeFree = useDowngradeToFreePlan();

  const pmRequestPlan = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    pmRequestPlan.current = pmLanding.on('@landing/plan/request', ({ handle, type }) => {
      if (handle === 'starter' || handle === 'free') {
        downgradeFree.request({
          planHandle: handle,
          returnUrl: window.location.href,
          onFulfill: url => {
            window.location.replace(url);
          },
        });
      } else {
        gotoShopifyPayment.request({
          coupon: '',
          planHandle: handle,
          returnUrl: window.location.href,
          yearly: type === 'yearly',
          onFulfill: url => {
            window.location.replace(url);
          },
        });
      }
    });

    return () => {
      pmRequestPlan.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dashboard
      hasSubmenu={false}
      disabledPaddingContent
      disabledScroll
      Content={() => <IframeWrapper id="iframe-landing" src={IFRAME_URL} iframeCss={{ height: '100vh' }} />}
    />
  );
};
