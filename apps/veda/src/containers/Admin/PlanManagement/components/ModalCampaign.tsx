import Button from 'components/Button';
import MyModal from 'components/MyModal';
import { useCrispChat } from 'containers/CrispChat/hooks/useCrispChat';
import { useSelector } from 'react-redux';
import { customerReportService } from 'services/CustomerReportService';
import { authSelector } from 'store/selectors';
import parser from 'html-react-parser';
import { Space } from 'wiloke-react-core';
import storage from 'utils/functions/storage';
import { couponSelector, useSetVisibleModalCampaign } from '../store/sliceCoupon';

export const ModalCampaign: React.FC = () => {
  const { visibleMyCampaign, myCoupon } = useSelector(couponSelector);
  const setVisible = useSetVisibleModalCampaign();
  const { sendMessage } = useCrispChat();
  const { email, shopName } = useSelector(authSelector);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleClaimCoupon = () => {
    sendMessage({ message: ' I want to Claim Free Trial Coupon' });
    setVisible(false);
    customerReportService.reportCampaignInvitation({ shopName, customerEmail: email });
    storage.setItem('isClaimFreeCoupon', 'true');
  };

  if (!myCoupon || storage.getItem('isClaimFreeCoupon') === 'true') {
    return null;
  }

  return (
    <MyModal headerText="Free coupon for you" isVisible={visibleMyCampaign} onCancel={handleCancel} cancelText="" okText="">
      {parser(myCoupon.description)}

      <Space size={8} />

      <Button block radius={6} onClick={handleClaimCoupon}>
        Claim this counpon
      </Button>
    </MyModal>
  );
};
