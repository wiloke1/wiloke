import Checkbox from 'components/Checkbox';
import { CheckProgress } from 'components/CircleProgress';
import Box from 'components/FieldBox';
import { GoogleFonts } from 'components/FontField/FontField';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface PresetStyleBoxProps {
  /* title component */
  title: string;
  /* mảng màu hex được truyền vào */
  colors: string[];
  /* mảng font familty được truyền vào */
  fontFamilies: GoogleFonts[];
  loading?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

const PresetStyleBox: FC<PresetStyleBoxProps> = ({ colors, loading = false, fontFamilies, title, isActive = false, onClick }) => {
  const [loadingState, setLoading] = useState(loading);
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    if (loading) {
      setLoading(loading);
    }
  }, [loading]);

  useEffect(() => {
    if (!!loadingState) {
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [loadingState]);

  return (
    <Box
      radius={6}
      borderColor="gray3"
      css={styles.container}
      onClick={() => {
        onClick?.();
      }}
    >
      {loadingState ? (
        <View css={styles.loading}>
          <CheckProgress />
        </View>
      ) : null}
      {loadingState ? <View css={styles.overlay} /> : null}

      <View css={styles.titleContainer}>
        <Text color="primary" fontFamily="secondary" css={styles.title}>
          {title}
        </Text>

        {isActive && <Checkbox checked={isActive} disabledOnChange />}
      </View>
      <View backgroundColor="gray3" height={1} css={styles.line} />

      <View row css={[styles.innerBox, styles.spaceBox]}>
        <View columns={[12, 3, 3]} color="gray8" fontFamily="secondary" css={styles.innerBoxText}>
          Colors
        </View>

        <View columns={[12, 9, 9]} css={styles.colorGrid}>
          {colors.map((item, index) => (
            <View radius={4} key={index} css={{ backgroundColor: item }} />
          ))}
        </View>
      </View>

      <View row css={styles.innerBox}>
        <View columns={[12, 3, 3]} color="gray8" fontFamily="secondary" css={styles.innerBoxText}>
          Typography
        </View>

        <View columns={[12, 9, 9]} css={styles.fontContainer}>
          {fontFamilies.map((item, index) => {
            const fontSize: number = 20 - (index + 2);
            return (
              <View key={index} css={styles.font}>
                <Text size={fontSize} css={{ fontFamily: item }}>
                  Aa
                </Text>
                <Text size={fontSize} css={{ fontFamily: item }}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </Box>
  );
};

export default PresetStyleBox;
