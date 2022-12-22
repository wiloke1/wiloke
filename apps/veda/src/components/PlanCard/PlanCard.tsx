import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import { FC, ReactNode, useEffect, useState } from 'react';
import { FontAwesome, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface PlanCardProps {
  active?: boolean;
  title: string;
  price: number;
  yearlyPrice: number;
  buttonText: string;
  bodyContent?: ReactNode;
  loading?: boolean;
  selectedYear: boolean;
  onClickLearnMore?: ViewProps['onClick'];
  onClick?: ViewProps['onClick'];
  onSelect?: (value: boolean) => void;
}

const PlanCard: FC<PlanCardProps> = ({
  active = false,
  price,
  yearlyPrice,
  title,
  buttonText,
  loading = false,
  selectedYear = false,
  bodyContent,
  onClickLearnMore,
  onClick,
  onSelect,
}) => {
  const [selected, setSelected] = useState(selectedYear);

  useEffect(() => {
    if (typeof selectedYear !== 'undefined') {
      setSelected(selectedYear);
    }
  }, [selectedYear]);

  const handleSelect = (val: boolean) => {
    setSelected(val);
    onSelect?.(val);
  };

  const monthly =
    price === 0 ? (
      'Free'
    ) : (
      <>
        ${price}
        <View tagName="span">/mo</View>
      </>
    );

  const yearly =
    yearlyPrice === 0 ? (
      ''
    ) : (
      <>
        ${yearlyPrice}
        <View tagName="span">/year</View>
      </>
    );

  return (
    <View css={styles.container(active)}>
      <View>
        <View css={styles.header}>
          <View tagName="h3" css={styles.title(active)}>
            {title}
          </View>
          <View css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <View css={styles.price(active)}>{monthly}</View>
            {yearly && <View css={{ fontSize: '16px' }}>Or</View>}
            <View css={styles.price(active)}>{yearly}</View>
          </View>
        </View>

        <Checkbox disabled={price === 0} size="small" activeColor="primary" checked={selected} onValueChange={handleSelect}>
          Enable Yearly
        </Checkbox>
        <View css={styles.divider(active)} />
        <View css={styles.button}>
          <Button size="medium" css={styles.buttonContent(active)} onClick={onClick} loading={loading}>
            {buttonText}
          </Button>
        </View>
        <View css={styles.body}>{bodyContent}</View>
      </View>
      <View tagName="span" css={styles.learnMore(active)} onClick={onClickLearnMore}>
        Lean more
        <View tagName="span" css={{ marginLeft: '8px', fontSize: '12px', display: 'inline-block' }}>
          <FontAwesome type="far" name="arrow-right" />
        </View>
      </View>
    </View>
  );
};

export default PlanCard;
