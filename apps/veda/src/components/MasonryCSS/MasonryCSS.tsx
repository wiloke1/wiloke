import React, { ReactNode, FC, Children, CSSProperties } from 'react';
import { View } from 'wiloke-react-core';
import * as css from './styles';

export interface MasonryCSSProps {
  /** React children */
  children: ReactNode;
  /** Css column-width — https://developer.mozilla.org/docs/Web/CSS/column-width */
  columnWidth?: number;
  /** Css column-count — https://developer.mozilla.org/docs/Web/CSS/column-count */
  columnCount?: number;
  /** Css column-gap — https://developer.mozilla.org/docs/Web/CSS/column-gap */
  columnGap?: number;
}

const MasonryCSS: FC<MasonryCSSProps> = ({ children, columnWidth = 300, columnCount = 3, columnGap = 30 }) => {
  const colStyles: CSSProperties = { marginBottom: columnGap };
  const renderChildren = () => {
    return Array.isArray(children) ? (
      Children.map(children, child => (
        <View css={css.column} style={colStyles}>
          {child}
        </View>
      ))
    ) : (
      <View css={css.column} style={colStyles}>
        {children}
      </View>
    );
  };

  return <View style={{ columnCount, columnWidth, columnGap }}>{renderChildren()}</View>;
};

export default MasonryCSS;
