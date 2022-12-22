import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import { FC } from 'react';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import xss from 'xss';
import * as styles from './styles';

export interface EmailServiceCardProps {
  text: string;
  logoSrc: string;
  isActive?: boolean;
  isSelected?: boolean;
  isLoading?: boolean;
  onActive: (value: boolean) => void;
  onSelect: () => void;
}

const EmailServiceCard: FC<EmailServiceCardProps> = ({
  text,
  logoSrc,
  isLoading = false,
  isActive = false,
  isSelected = false,
  children,
  onActive,
  onSelect,
}) => {
  return (
    <View css={styles.container(isActive, isLoading)}>
      <View>
        <img src={logoSrc} alt="" />
        <View css={{ marginTop: '5px' }} dangerouslySetInnerHTML={{ __html: xss(text) }} />
      </View>
      <View css={styles.right}>
        <View css={styles.select}>{children}</View>
        {isSelected && (
          <View css={styles.active}>
            <Checkbox size="small" checked={isActive} onValueChange={onActive}>
              {i18n.t(isActive ? 'general.enable' : 'general.disable')}
            </Checkbox>
          </View>
        )}
        <Button
          backgroundColor={isSelected ? 'secondary' : 'gray3'}
          color={isSelected ? 'light' : 'gray9'}
          size="small"
          radius={10}
          fontFamily="secondary"
          css={{ fontWeight: 500 }}
          onClick={onSelect}
        >
          {isSelected ? i18n.t('general.edit') : 'Select'}
        </Button>
      </View>
    </View>
  );
};

export default EmailServiceCard;
