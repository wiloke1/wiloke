import NavigateItem from 'components/NavigateItem';
import { FC, ReactNode, useEffect, useState } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface FieldGroupProps {
  /** Tên của field group */
  label: string;
  /** Mô tả của field group */
  summary?: string;
  /** Font size của label */
  labelSize?: number;
  /** Ẩn hiện */
  visible?: boolean;
  /** Style cho thẻ bao lớn nhất */
  containerCss?: ViewProps['css'];
  /** Style cho content */
  contentCss?: ViewProps['css'];
  /** Khi bấm vào để bật tắt */
  onToggle?: (back: boolean) => void;
  AfterLabel?: ReactNode;
}

const FieldGroup: FC<FieldGroupProps> = ({
  label,
  summary,
  AfterLabel = null,
  labelSize = 14,
  children,
  visible = false,
  containerCss,
  contentCss,
  onToggle,
}) => {
  const [visibleState, setVisible] = useState(false);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const renderTitle = (
    <NavigateItem
      label={label}
      summary={summary}
      labelSize={labelSize}
      AfterLabel={AfterLabel}
      onClick={() => {
        setVisible(visible => !visible);
        onToggle?.(false);
      }}
      iconCss={styles.icon(visibleState)}
      containerCss={styles.title(visibleState)}
    />
  );

  return (
    <View css={[styles.container, containerCss]}>
      {renderTitle}
      {visibleState && <View css={[styles.content, contentCss]}>{children}</View>}
    </View>
  );
};

export default FieldGroup;
