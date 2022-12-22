import Box from 'components/FieldBox';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesome, Text, withStyles, ViewProps, View, ColorNames } from 'wiloke-react-core';
import * as styles from './styles';

export interface QuickGuideBoxProps {
  title?: string;
  description?: string;
  isReactRouter?: boolean;
  href?: string;
  color?: ColorNames;
}

const LinkWithStyle = withStyles<any, any>(Link);

const QuickGuideBox: FC<QuickGuideBoxProps> = ({ color = 'behance', title = '', description = '', isReactRouter = false, href = '#' }) => {
  const linkProps: Pick<ViewProps, 'css'> = {
    css: styles.link,
  };

  return (
    <Box css={styles.container} borderWidth={0}>
      {isReactRouter ? <LinkWithStyle {...linkProps} to={href as any} /> : <Text {...linkProps} tagName="a" target="blank" href={href} />}

      <View color={color} css={styles.icon}>
        <FontAwesome size={18} type="fal" name="question" />
        <View css={styles.iconOverlay(color)} />
      </View>

      <View css={{ marginLeft: '10px' }}>
        <Text numberOfLines={1} color="dark" fontFamily="secondary" css={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={2} color="gray6">
          {description}
        </Text>
      </View>
    </Box>
  );
};

export default QuickGuideBox;
