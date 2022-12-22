import Button, { ButtonProps } from 'components/Button';
import ModalHeader from 'components/ModalHeader';
import ScrollBars from 'components/ScrollBars';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { i18n } from 'translation';
import { createPortal } from 'utils/functions/createPortal';
import { Colors, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface MyModalProps<T extends any = any> {
  children: ReactNode;
  size?: 'medium' | 'large' | 'small';
  headerText?: ReactNode;
  isVisible: boolean;
  isLoading?: boolean;
  cancelText?: string;
  okText?: string;
  okBackgroundColor?: keyof Colors;
  okButtonDisabled?: ButtonProps['disabled'];
  scrollDisabled?: boolean;
  contentCss?: ViewProps['css'];
  bodyCss?: ViewProps['css'];
  /** Để tính lại chiều cao cho modal */
  depsHeightRecalculation?: T;
  onCancel?: () => void;
  /** Event cancel cho riêng nút button ( không phải nút x hay overlay ) */
  onButtonCancel?: () => void;
  onOk?: () => void;
  FooterRight?: ReactNode;
  FooterLeft?: ReactNode;
}

const MyModal = <T extends any = any>({
  size = 'small',
  children,
  headerText = '',
  isVisible,
  isLoading = false,
  cancelText = i18n.t('general.cancel'),
  okButtonDisabled,
  scrollDisabled = false,
  okText = i18n.t('general.ok'),
  okBackgroundColor = 'primary',
  contentCss,
  bodyCss,
  depsHeightRecalculation,
  onButtonCancel,
  onCancel,
  onOk,
  FooterRight,
  FooterLeft,
}: MyModalProps<T>) => {
  const [height, setHeight] = useState<string>('auto');
  const childRef = useRef<HTMLElement | null>(null);
  // useKey('Escape', onCancel);

  const setHeightState = () => {
    const maxHeight = window.innerHeight - 60;
    if (!!childRef.current) {
      setHeight(
        childRef.current.offsetHeight >= maxHeight
          ? `${maxHeight}px`
          : `${childRef.current.offsetHeight + 50 + (!!cancelText || !!okText || !!FooterRight ? 56 : 0)}px`,
      );
    }
  };

  useEffect(() => {
    if (isVisible) {
      setHeightState();
      window.addEventListener('resize', setHeightState);
      return () => {
        window.removeEventListener('resize', setHeightState);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, depsHeightRecalculation]);

  const renderChild = (
    <View ref={childRef} css={[styles.child(size), contentCss]}>
      {children}
    </View>
  );

  const renderContent = (
    <View css={styles.container}>
      <View css={styles.overlay} onClick={onCancel} />
      <View css={[styles.content(size, height), bodyCss]}>
        <ModalHeader title={headerText} onClose={onCancel} />
        {scrollDisabled ? (
          <View css={styles.body(!!cancelText || !!okText || !!FooterRight)}>{renderChild}</View>
        ) : (
          <ScrollBars css={styles.body(!!cancelText || !!okText || !!FooterRight)}>{renderChild}</ScrollBars>
        )}
        <View css={styles.footer}>
          <View>{FooterLeft}</View>
          <View css={{ display: 'flex' }}>
            {!!cancelText && (
              <View>
                <Button
                  backgroundColor="gray2"
                  color="gray8"
                  size="extra-small"
                  radius={4}
                  fontFamily="secondary"
                  css={{ fontWeight: 500 }}
                  onClick={() => {
                    onButtonCancel?.();
                    onCancel?.();
                  }}
                >
                  {cancelText}
                </Button>
              </View>
            )}
            {!!okText && (
              <View css={{ marginLeft: '10px' }}>
                <Button
                  disabled={okButtonDisabled}
                  loading={isLoading}
                  backgroundColor={okBackgroundColor}
                  size="extra-small"
                  radius={4}
                  fontFamily="secondary"
                  css={{ fontWeight: 500 }}
                  onClick={onOk}
                >
                  {okText}
                </Button>
              </View>
            )}
            {!!FooterRight && <View css={styles.footerRight}>{FooterRight}</View>}
          </View>
        </View>
      </View>
    </View>
  );

  if (!isVisible) {
    return null;
  }

  return createPortal(renderContent, document.body);
};

export default MyModal;
