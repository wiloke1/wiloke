import Avatar from 'components/Avatar';
import Box from 'components/FieldBox';
import Title from 'components/Title';
import React, { FC } from 'react';
import { Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface NotificationCardProps {
  active?: boolean;
  /* Tiêu đề */
  title?: string;
  /* mô tả */
  description?: string;
  /* thời gian tin được đăng */
  publishedDate?: string;
  css?: ViewProps['css'];
  onClick?: () => void;
}

const NotificationCard: FC<NotificationCardProps> = ({
  active = false,
  title = '',
  description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  publishedDate = '4:20 pm',
  css,
  onClick,
}) => {
  return (
    <Box onClick={onClick} borderColor="gray3" css={[styles.container, css]}>
      <View className="NotificationCard-dot" backgroundColor={active ? 'secondary' : 'gray4'} width={14} height={14} radius="pill" />
      <Avatar name={title} radius={6} css={styles.avatar} />
      <Title title={title} text={description} />
      <Text color="gray6" css={{ whiteSpace: 'nowrap' }}>
        {publishedDate}
      </Text>
    </Box>
  );
};

export default NotificationCard;
