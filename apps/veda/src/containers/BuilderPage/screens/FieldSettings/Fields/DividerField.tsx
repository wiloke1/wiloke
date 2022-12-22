import { FC } from 'react';
import { css, Divider, Text, View } from 'wiloke-react-core';

export interface DividerFieldProps {
  label: string;
}

const styles = {
  container: css`
    display: flex;
    align-items: center;
    padding: 15px 0;
  `,
  divider: css`
    flex: 1;
  `,
  label: css`
    margin-right: 15px;
  `,
};

const DividerField: FC<DividerFieldProps> = ({ label }) => {
  return (
    <View css={styles.container}>
      {!!label && (
        <Text tagName="h6" css={styles.label}>
          {label}
        </Text>
      )}
      <Divider size={1} css={styles.divider} />
    </View>
  );
};

export default DividerField;
