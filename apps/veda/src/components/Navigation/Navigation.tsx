import Hotspot from 'components/Hotspot';
import React, { FC, ReactNode } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { PageCounter } from 'store/global/pageCounter';
import { PageType } from 'types/Page';
import { FontAwesome, FontAwesomeName, Text, useStyleSheet, useTheme, View, withStyles, WithStylesProps, ViewProps } from 'wiloke-react-core';
import * as css from './styles';

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  exact?: boolean;
  icon: FontAwesomeName;
  isReactRouter: boolean;
  hasDivider?: boolean;
  textHeader?: string;
  pageType?: PageType;
  hotspot?: boolean;
}

export interface NavigationProps {
  data: MenuItem[];
  containerCss?: ViewProps['css'];
  counter?: PageCounter;
  onClick?: (item: MenuItem) => void;
}

// @ts-ignore
const NavLinkWithStyles = withStyles(NavLink);

export const Navigation: FC<NavigationProps> = ({ counter, data, containerCss, onClick }) => {
  const { colors } = useTheme();
  const { styles } = useStyleSheet(colors);
  const match = useRouteMatch();

  const linkProps: Pick<WithStylesProps, 'color' | 'colorHover' | 'css'> = {
    css: css.link,
    color: 'gray8',
    colorHover: 'primary',
  };

  const renderLink = (item: MenuItem): ReactNode => {
    const { isReactRouter, href, label, icon, exact, id, pageType } = item;
    const _counter = counter && pageType ? counter[pageType] : 0;
    const isActive = match.path === href;

    const anchorContent = (
      <>
        <View css={css.flex}>
          <FontAwesome type="far" size={14} name={icon} css={css.icon} />
          {label}
          {!!item.hotspot && <Hotspot css={{ marginLeft: '10px' }} />}
        </View>

        {_counter > 0 && (
          <Text fontFamily="primary" css={css.num} backgroundColor={isActive ? 'gray3' : 'gray2'}>
            {_counter}
          </Text>
        )}
      </>
    );

    if (isReactRouter) {
      return (
        <NavLinkWithStyles
          {...linkProps}
          sidebar-id={id}
          activeClassName={styles(css.active)}
          exact={exact}
          to={href as any}
          onClick={() => {
            onClick?.(item);
          }}
        >
          {anchorContent}
        </NavLinkWithStyles>
      );
    }
    return (
      <Text
        {...linkProps}
        sidebar-id={id}
        tagName="a"
        target="blank"
        href={href}
        onClick={() => {
          onClick?.(item);
        }}
      >
        {anchorContent}
      </Text>
    );
  };

  const renderMenuItem = (item: MenuItem): ReactNode => {
    const { id, hasDivider, textHeader } = item;
    return (
      <View key={id}>
        {!!textHeader && (
          <Text size={12} fontFamily="secondary" css={css.title}>
            {textHeader}
          </Text>
        )}

        <View className="Navigation-parent" css={css.parent}>
          {renderLink(item)}
        </View>
        {!!hasDivider && (
          <View height={1} backgroundColor="gray2" css={{ position: 'relative', marginTop: '15px', marginBottom: '15px', width: '100%' }} />
        )}
      </View>
    );
  };

  return (
    <View tagName="nav" css={[css.container, containerCss]}>
      {data.map(renderMenuItem)}
    </View>
  );
};
