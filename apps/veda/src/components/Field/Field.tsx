import { FC, memo, ReactNode, Ref, useState } from 'react';
import { createPortal } from 'utils/functions/createPortal';
import offset from 'utils/functions/offset';
import { FontAwesome, FontAwesomeName, Space, Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface FieldProps extends ViewProps {
  children: ReactNode;
  /** Label của field có thể có hoặc không */
  label?: ReactNode;
  /** Font-size của label */
  fontSize?: number;
  /** Font-size của label */
  fontWeight?: number;
  /** Note của Field */
  note?: ReactNode;
  /** Note icon của field */
  noteIcon?: FontAwesomeName;
  /** Description của Field */
  description?: ReactNode;
  labelSpaceWidth?: number;
  Right?: ReactNode;
  innerRef?: Ref<HTMLElement>;
  AfterLabel?: ReactNode;
  notePopoverWidth?: number;
  error?: string;
}

const Field: FC<FieldProps> = ({
  label,
  children,
  color = 'gray8',
  fontSize = 14,
  fontWeight = 500,
  labelSpaceWidth = 5,
  note,
  noteIcon = 'info-circle',
  innerRef,
  Right,
  css,
  description,
  AfterLabel = null,
  notePopoverWidth = 300,
  error = '',
  ...rest
}) => {
  const [visibleNote, setVisibleNote] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const el = event.currentTarget as HTMLElement;
    const { top, left } = offset(el);
    setVisibleNote(true);
    setTop(top);
    setLeft(left);
  };

  const handleMouseLeave = () => {
    setVisibleNote(false);
  };

  return (
    <View {...rest} ref={innerRef} css={[styles.container, css]}>
      <View css={styles.inner}>
        <View css={{ display: 'flex', alignItems: 'center' }}>
          <View css={{ display: 'flex', alignItems: 'center' }}>
            {!!label && (
              <Text color={color} size={fontSize} fontFamily="secondary" tagName="label" css={[styles.label, { fontWeight }]}>
                {label}
              </Text>
            )}
            {AfterLabel}
          </View>
          {!!note && (
            <View css={styles.note} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <View>
                <FontAwesome type="fas" name={noteIcon} size={13} color="gray5" colorHover="primary" css={{ paddingTop: '3px' }} />
              </View>
              {visibleNote && createPortal(<View css={styles.popover(top, left, notePopoverWidth)}>{note}</View>)}
            </View>
          )}
        </View>
        {Right}
      </View>
      {!!label && <Space size={labelSpaceWidth} />}
      {children}
      {!!error && (
        <Text color="danger" size={13} css={{ marginTop: '2px' }}>
          {error}
        </Text>
      )}
      <Text css={styles.description}>{description}</Text>
    </View>
  );
};

export default memo(Field);
