import { NumberInput } from 'components/NumberInput';
import React, { FC } from 'react';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export type Placement =
  | 'margin-top'
  | 'margin-bottom'
  | 'margin-left'
  | 'margin-right'
  | 'padding-top'
  | 'padding-bottom'
  | 'padding-left'
  | 'padding-right';

export interface BoxModelProps {
  min?: number;
  max?: number;
  top: {
    margin: number;
    padding: number;
  };
  bottom: {
    margin: number;
    padding: number;
  };
  left: {
    margin: number;
    padding: number;
  };
  right: {
    margin: number;
    padding: number;
  };
  onChangeAll?: () => void;
  onChange?: (placement: Placement, value: number) => void;
}

const BoxModel: FC<BoxModelProps> = ({
  min = 0,
  max = 100,
  top = { margin: 0, padding: 0 },
  bottom = { margin: 0, padding: 0 },
  left = { margin: 0, padding: 0 },
  right = { margin: 0, padding: 0 },
  onChange,
  onChangeAll,
}) => {
  return (
    <View css={styles.container} backgroundColor="gray1" borderColor="dark" borderStyle="dashed" borderWidth={1}>
      {/* margin */}
      <View css={[styles.item, styles.top]}>
        <NumberInput
          block
          radius={4}
          borderWidth={1}
          borderColor="gray3"
          sizeInput="small"
          min={min}
          max={max}
          value={top.margin}
          onValueChange={val => {
            onChange?.('margin-top', val);
          }}
        />
      </View>

      <View css={[styles.item, styles.bottom]}>
        <NumberInput
          block
          radius={4}
          borderWidth={1}
          borderColor="gray3"
          sizeInput="small"
          min={min}
          max={max}
          value={bottom.margin}
          onValueChange={val => {
            onChange?.('margin-bottom', val);
          }}
        />
      </View>
      <View css={[styles.item, styles.left]}>
        <NumberInput
          radius={4}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="small"
          min={min}
          max={max}
          value={left.margin}
          onValueChange={val => {
            onChange?.('margin-left', val);
          }}
        />
      </View>

      <View css={[styles.item, styles.right]}>
        <NumberInput
          radius={4}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="small"
          min={min}
          max={max}
          value={right.margin}
          onValueChange={val => {
            onChange?.('margin-right', val);
          }}
        />
      </View>

      {/* padding */}
      <View css={styles.innerDiv} borderColor="dark" borderStyle="dashed" borderWidth={1} backgroundColor="gray2">
        <View css={[styles.item, styles.top]}>
          <NumberInput
            radius={4}
            block
            borderWidth={1}
            borderColor="gray3"
            sizeInput="small"
            min={min}
            max={max}
            value={top.padding}
            onValueChange={val => {
              onChange?.('padding-top', val);
            }}
          />
        </View>

        <View css={[styles.item, styles.bottom]}>
          <NumberInput
            radius={4}
            block
            borderWidth={1}
            borderColor="gray3"
            sizeInput="small"
            min={min}
            max={max}
            value={bottom.padding}
            onValueChange={val => {
              onChange?.('padding-bottom', val);
            }}
          />
        </View>

        <View css={[styles.item, styles.left]}>
          <NumberInput
            block
            radius={4}
            borderWidth={1}
            borderColor="gray3"
            sizeInput="small"
            min={min}
            max={max}
            value={left.padding}
            onValueChange={val => {
              onChange?.('padding-left', val);
            }}
          />
        </View>

        <View css={[styles.item, styles.right]}>
          <NumberInput
            block
            radius={4}
            borderWidth={1}
            borderColor="gray3"
            sizeInput="small"
            min={min}
            max={max}
            value={right.padding}
            onValueChange={val => {
              onChange?.('padding-right', val);
            }}
          />
        </View>
      </View>

      <View backgroundColor="light" borderColor="gray3" borderStyle="solid" borderWidth={1} css={styles.reset} onClick={onChangeAll}></View>
    </View>
  );
};

export default BoxModel;
