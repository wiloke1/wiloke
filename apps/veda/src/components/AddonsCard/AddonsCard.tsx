import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import Body from './Body';
import Feature from './Feature';
import Footer from './Footer';
import { AddonsCardLoading } from './Loading';
import * as styles from './styles';

export interface AddonsCardProps {
  hide?: boolean;
  onClick?: () => void;
}

type AddonsCardFC = FC<AddonsCardProps> & {
  Feature: typeof Feature;
  Body: typeof Body;
  Footer: typeof Footer;
  Loading: typeof AddonsCardLoading;
};

const AddonsCard: AddonsCardFC = ({ children, hide = false, onClick }) => {
  return (
    <View css={styles.container(hide)} onClick={onClick}>
      {hide ? (
        <Tooltip css={{ display: 'block' }} portal text={i18n.t('general.limit_add_addons')}>
          {children}
        </Tooltip>
      ) : (
        children
      )}
    </View>
  );
};

AddonsCard.Feature = Feature;
AddonsCard.Body = Body;
AddonsCard.Footer = Footer;
AddonsCard.Loading = AddonsCardLoading;

export default AddonsCard;
