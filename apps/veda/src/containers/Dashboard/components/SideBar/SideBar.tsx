import Logo from 'components/Logo';
import { Navigation } from 'components/Navigation';
import ScrollBars from 'components/ScrollBars';
import { useSetValidateCouponVisible } from 'containers/Admin/PlanManagement/store/sliceCoupon';
import { CrispChat } from 'containers/CrispChat/CrispChat';
import { useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { pageCounterSelector } from 'store/global/pageCounter';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { FontAwesome, useStyleSheet, useTheme, View, withStyles } from 'wiloke-react-core';
import { adminTypeRoute, builderTypeRoute, managerItems, menuItem, themeItems } from './data';
import * as styles from './styles';
// @ts-ignore
const NavLinkWithStyles = withStyles(NavLink);

export const SideBar = () => {
  const { data: pageCounter } = useSelector(pageCounterSelector);

  const location = useLocation();
  const history = useHistory();

  const { colors } = useTheme();
  const { styles: classNames } = useStyleSheet(colors);
  const { role } = getUserInfo();
  const setValidateVisible = useSetValidateCouponVisible();

  const isUser = role === 'user';
  const isDev = role === 'dev';

  return (
    <View css={styles.container} backgroundColor="light">
      <View css={styles.nav}>
        <View css={styles.themeBar}>
          <View css={styles.sideUp}>
            <View
              css={{ paddingBottom: '8px', cursor: 'pointer' }}
              onClick={() => {
                history.push('/theme');
              }}
            >
              <Logo variant="style2" />
            </View>
            {builderTypeRoute(isUser).map(item => {
              return (
                <NavLinkWithStyles
                  key={item.id}
                  color="gray8"
                  colorHover="primary"
                  backgroundColor="light"
                  to={item.href}
                  exact={item.exact}
                  css={styles.link}
                  activeClassName={classNames(styles.active)}
                >
                  <FontAwesome type="far" size={18} name={item.icon} css={styles.icon(location.pathname.includes(item.type))} />
                  <View>{item.label}</View>
                </NavLinkWithStyles>
              );
            })}
          </View>

          <View>
            <FontAwesome
              type="far"
              size={18}
              name="gift"
              style={{ borderRadius: '50%', marginBottom: '0' }}
              css={[styles.icon(false), { color: colors.light, cursor: 'pointer', backgroundColor: colors.tertiary }]}
              onClick={() => {
                setValidateVisible(true);
              }}
            />

            {adminTypeRoute.map(item => {
              return (
                <NavLinkWithStyles
                  key={item.id}
                  color="gray8"
                  colorHover="primary"
                  backgroundColor="light"
                  to={item.href}
                  exact={item.exact}
                  css={styles.link}
                  activeClassName={classNames(styles.active)}
                >
                  <FontAwesome
                    type="far"
                    size={18}
                    name={item.icon}
                    style={{ borderRadius: '50%', marginBottom: '0' }}
                    css={styles.icon(location.pathname.includes(item.href))}
                  />
                  <View>{item.label}</View>
                </NavLinkWithStyles>
              );
            })}
            <CrispChat>
              <FontAwesome
                backgroundColor="secondary"
                type="far"
                size={18}
                name="comments"
                style={{ borderRadius: '50%', marginBottom: '0' }}
                css={[styles.icon(false), { background: colors.secondary, color: colors.light }]}
              />
            </CrispChat>
          </View>
        </View>

        <ScrollBars>
          {location.pathname.includes('/theme') && <Navigation containerCss={styles.navBar} data={themeItems} />}
          {location.pathname.includes('/page') && <Navigation counter={pageCounter} containerCss={styles.navBar} data={menuItem(isUser)} />}
          {location.pathname.includes('/manager') && <Navigation containerCss={styles.navBar} data={managerItems(isDev)} />}
        </ScrollBars>
      </View>
    </View>
  );
};
