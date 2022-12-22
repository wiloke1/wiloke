import { Table, TableProps } from 'antd';
import { FC } from 'react';
import { css, Theme, View } from 'wiloke-react-core';

const styles = {
  container: ({ colors }: Theme) => css`
    .ant-table-thead .ant-table-cell {
      background-color: rgba(${colors.rgbPrimary}, 0.15);
    }
  `,
};

export interface TableAtndProps extends TableProps<any> {}

const TableAtnd: FC<TableAtndProps> = ({ ...rest }) => {
  return (
    <View css={styles.container}>
      <Table {...rest} />
    </View>
  );
};

export { TableAtnd };
