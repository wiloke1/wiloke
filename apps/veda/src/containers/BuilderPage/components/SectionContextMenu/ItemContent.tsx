import { FC } from 'react';
import { css, FontAwesome, FontAwesomeName, Text, Theme, View } from 'wiloke-react-core';

const styles = {
  item: ({ colors }: Theme) => css`
    display: flex;
    align-items: center;
    color: ${colors.gray8};
    font-size: 14px;
    padding: 7px 12px;
    cursor: pointer;
    &:hover {
      background-color: ${colors.gray2};
    }
  `,

  icon: css`
    margin-right: 5px;
    width: 16px;
  `,

  divider: ({ colors }: Theme) => css`
    background-color: ${colors.gray3};
    height: 1px;
    margin: 3px 0;
  `,
};

export interface ItemContentProps {
  icon?: FontAwesomeName;
  label: string;
}

export const ItemContent: FC<ItemContentProps> = ({ icon, label }) => {
  return (
    <View css={styles.item}>
      {!!icon && <FontAwesome type="far" name={icon} size={12} color="gray7" css={styles.icon} />}
      <Text>{label}</Text>
    </View>
  );
};
