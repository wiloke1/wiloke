import { FC } from 'react';
import { Styles, Text, View } from 'wiloke-react-core';

export interface ListCardProps {
  imgSrc: string;
  title: string;
  horizontal?: boolean;
}

const containerStyles = (horizontal: boolean): Styles => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: horizontal ? 'row' : 'column',
  padding: '10px',
});

const leftStyles = (horizontal: boolean): Styles => {
  if (!horizontal) {
    return {};
  }
  return {
    width: 'calc(40% - 10px)',
  };
};

const rightStyles = (horizontal: boolean): Styles => {
  if (!horizontal) {
    return {};
  }
  return {
    width: 'calc(60% + 10px)',
    paddingLeft: '10px',
  };
};

const ListCard: FC<ListCardProps> = ({ imgSrc, title, horizontal = false }) => {
  return (
    <View css={containerStyles(horizontal)}>
      <View css={leftStyles(horizontal)}>
        <img src={imgSrc} alt="" />
      </View>
      <View css={rightStyles(horizontal)}>
        <Text size={14} color="gray7" css={{ lineHeight: '1.4' }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default ListCard;
