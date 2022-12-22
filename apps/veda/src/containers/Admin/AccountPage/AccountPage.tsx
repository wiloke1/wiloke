import { Navigation } from 'components/Navigation';
import ScrollBars from 'components/ScrollBars';
import Title from 'components/Title';
import { Dashboard } from 'containers/Dashboard';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from 'store/selectors';
import { css, Text, Theme, View } from 'wiloke-react-core';
import { getMenu } from './menu';

const styles = {
  container: css`
    min-height: 100vh;
    display: flex;
  `,
  body: css`
    padding: 30px;
    min-height: 100%;
  `,
  content: css`
    max-width: 500px;
    margin-top: 20px;
  `,
  menu: ({ colors }: Theme) => css`
    width: 280px;
    background-color: ${colors.light};
    border-right: 1px solid ${colors.gray2};
  `,
  anchor: ({ fonts, colors }: Theme) => css`
    display: block;
    padding: 10px 15px;
    background-color: ${colors.light};
    border-bottom: 1px solid ${colors.gray2};
    font-size: 13px;
    font-family: ${fonts.secondary};
    color: ${colors.gray9};
    transition: 0.3s;
    &:hover {
      color: ${colors.primary};
    }
  `,
};

export const AccountPage: FC = () => {
  const { shopName, username } = useSelector(authSelector);

  return (
    <Dashboard
      hasSubmenu={false}
      disabledPaddingContent
      Content={() => (
        <View css={styles.container}>
          <View css={styles.menu}>
            <ScrollBars>
              <Navigation data={getMenu(shopName)} />
            </ScrollBars>
          </View>
          <View css={styles.body}>
            <View>
              <Title title={`Xin chào ${username}`} text={shopName} titleCss={{ fontSize: '30px' }} />
            </View>
            <Text css={styles.content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque quam eget mi finibus, quis vehicula dolor volutpat.
            </Text>
          </View>
        </View>
      )}
    />
  );
};
