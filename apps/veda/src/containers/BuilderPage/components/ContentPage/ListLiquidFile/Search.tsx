import { FC } from 'react';
import { css, View } from 'wiloke-react-core';

export interface SearchProps {
  value: string;
  onChange?: (value: string) => void;
}

const styles = {
  container: css`
    padding: 10px;
  `,
  input: css`
    background-color: transparent;
    border: 1px solid #2b2c4d;
    padding: 10px;
    height: 30px;
    margin-left: -5px;
    width: calc(100% + 5px);
  `,
};

export const Search: FC<SearchProps> = ({ value, onChange }) => {
  return (
    <View css={styles.container}>
      <View
        tagName="input"
        value={value}
        placeholder="Search Snippets"
        css={styles.input}
        onChange={event => {
          if (event.target instanceof HTMLInputElement) {
            onChange?.(event.target.value);
          }
        }}
      />
    </View>
  );
};
