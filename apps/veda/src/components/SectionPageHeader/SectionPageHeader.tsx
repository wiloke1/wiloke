import Button from 'components/Button';
import Title from 'components/Title';
import React, { FC, ReactNode } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface SectionPageHeaderProps {
  title: string;
  description: string;
  buttonContent?: string;
  cssContainer?: ViewProps['css'];
  Left?: ReactNode;
  disableButton?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const SectionPageHeader: FC<SectionPageHeaderProps> = ({
  title,
  description,
  buttonContent = 'Create new page',
  Left,
  cssContainer,
  disableButton = false,
  isLoading = false,
  onClick,
}) => {
  return (
    <View css={[styles.container, cssContainer]}>
      <View columns={[12, 12, 8]} css={{ paddingLeft: 0 }}>
        <Title size="large" title={title} text={description} />
      </View>
      {Left || !disableButton ? (
        <View columns={[12, 12, 4]} css={{ textAlign: 'right', paddingRight: 0 }}>
          <Button loading={isLoading} radius={6} size="small" onClick={onClick}>
            {buttonContent}
          </Button>
        </View>
      ) : null}
    </View>
  );
};

export default SectionPageHeader;
