import { FC } from 'react';
import { i18n } from 'translation';
import { css, LineAwesome, Theme, View, Text } from 'wiloke-react-core';

export interface MoreProps {
  onClick?: () => void;
}

const styles = {
  container: ({ colors }: Theme) => css`
    debug: More_container;
    position: relative;
    background-color: ${colors.light};
    padding-top: 100%;
    border-radius: 10px;
    cursor: pointer;
  `,
  content: css`
    debug: More_content;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};

const More: FC<MoreProps> = ({ onClick }) => {
  return (
    <View css={styles.container} onClick={onClick}>
      <View css={styles.content}>
        <LineAwesome name="plus" size={30} color="primary" />
        <Text tagName="h6" color="primary" size={14}>
          {i18n.t('general.more')}
        </Text>
      </View>
    </View>
  );
};

export default More;
