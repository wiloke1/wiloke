import Checkbox from 'components/Checkbox';
import { FC, ReactNode, useEffect, useState } from 'react';
import { ActivityIndicator, ColorNames, FontAwesome, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface ActiveProps extends ViewProps {
  /** chế độ active */
  active: boolean;
  isLoading?: boolean;
  variant?: styles.Variant;
  colorActive?: ColorNames;
  colorDefault?: ColorNames;
  activeNumber?: number;
  /** Bật lên sẽ sử dụng được function onActive(active: boolean) và disable function onClick */
  disabledMulti?: boolean;
  onActive?: (active: boolean) => void;
  onClick?: () => void;
}

const Active: FC<ActiveProps> = ({
  children,
  active,
  isLoading = false,
  disabledMulti = false,
  variant = 'style1',
  activeNumber,
  colorActive = 'primary',
  colorDefault = 'light',
  css,
  onActive,
  onClick,
  ...rest
}) => {
  const [activeState, setActive] = useState(active);

  useEffect(() => {
    if (active !== undefined) {
      setActive(active);
    }
  }, [active]);

  const contentMapping: Record<styles.Variant, ReactNode> = {
    style1: (
      <>
        <View css={styles.icon}>
          <FontAwesome type="far" name="check" size={16} color="light" />
        </View>
        <View css={styles.overlay} />
      </>
    ),
    style2: (
      <View css={[styles.icon, styles.icon2]}>
        <FontAwesome type="far" name="check" size={12} color="light" />
      </View>
    ),
    style3: <View css={styles.num(activeState, colorActive, colorDefault)}>{activeNumber}</View>,
  };

  const _handleClick = () => {
    if (disabledMulti) {
      return;
    }
    setActive(!activeState);
    onClick?.();
  };

  return (
    <View {...rest} onClick={_handleClick} css={[styles.container, styles.container2(activeState, variant, colorDefault, colorActive), css]}>
      {variant === 'style3' ? contentMapping[variant] : activeState && contentMapping[variant]}
      {children}
      {isLoading && (
        <View css={{ position: 'absolute', inset: '0' }}>
          <View css={[styles.overlay, { opacity: '0.6' }]} />
          <View css={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
            <ActivityIndicator color="light" />
          </View>
        </View>
      )}

      {disabledMulti && (
        <Checkbox
          checked={activeState}
          containerCss={styles.checkbox}
          onValueChange={val => {
            setActive(val);
            onActive?.(val);
          }}
        ></Checkbox>
      )}
    </View>
  );
};

export default Active;
