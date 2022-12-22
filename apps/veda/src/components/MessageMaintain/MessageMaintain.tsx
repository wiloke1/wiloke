import { useCountDown } from 'hooks/useCountDown';
import parser from 'html-react-parser';
import { FC } from 'react';
import { Image, View, ViewProps } from 'wiloke-react-core';
import bellImg from './bell.png';
import * as styles from './styles';

interface MessageMaintainProps {
  contentHtml?: string;
  timeEnd?: number;
  containerCss?: ViewProps['css'];
}

export const MessageMaintain: FC<MessageMaintainProps> = ({
  contentHtml = '<p style="color:white;font-size:16px;">Add, edit and publish a theme to change your store on <span style="font-weight:600;">30/12/2022</span>. Test component, chưa check điền kiện để show/hide!</p>',
  timeEnd = 1672333200000,
  containerCss,
}) => {
  const { days, hours, minutes, seconds } = useCountDown({ endDate: timeEnd });

  const renderTime = (time: number, type: 'days' | 'hours' | 'mins' | 'secs') => {
    return (
      <View css={styles.timeContainer}>
        <View css={styles.timeNumber}>{time}</View>
        <View css={styles.timeType}>{type}</View>
      </View>
    );
  };

  return (
    <View className="MessageMaintain-container" css={[styles.container, containerCss]}>
      <View css={styles.body}>
        <Image src={bellImg} containerCss={styles.bell} />
        <View fontFamily="secondary" css={styles.content}>
          {parser(contentHtml)}
        </View>
        <View css={{ display: 'flex', alignItems: 'center' }}>
          {renderTime(days, 'days')}
          <View css={styles.dot}>:</View>
          {renderTime(hours, 'hours')}
          <View css={styles.dot}>:</View>
          {renderTime(minutes, 'mins')}
          <View css={styles.dot}>:</View>
          {renderTime(seconds, 'secs')}
        </View>
      </View>
    </View>
  );
};
