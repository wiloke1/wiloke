import DragCoordinates from 'components/DragCoordinates';
import { NumberInput } from 'components/NumberInput';
import { FC } from 'react';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export type Placement = 'top' | 'right' | 'bottom' | 'left';

export interface SpaceFieldProps {
  top: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  left: number | undefined;
  min?: number;
  max?: number;
  onChange: (placement: Placement, value: number | undefined) => void;
  onChangeAll: () => void;
}

const SpaceField: FC<SpaceFieldProps> = ({ top, right, bottom, left, min, max = 300, onChange, onChangeAll }) => {
  return (
    <View css={styles.container}>
      <View css={[styles.item, styles.top]}>
        <DragCoordinates
          x={top}
          css={styles.dragCoordinates}
          onDrag={({ x }) => {
            if (x !== undefined) {
              onChange('top', x);
            }
          }}
        >
          <NumberInput
            value={top}
            placeholder="Top"
            block
            borderWidth={1}
            borderColor="gray3"
            sizeInput="small"
            radius={4}
            min={min}
            max={max}
            clearEnabled
            onValueChange={value => {
              onChange('top', value);
            }}
          />
        </DragCoordinates>
      </View>
      <View css={[styles.item, styles.right]}>
        <DragCoordinates
          x={right}
          css={styles.dragCoordinates}
          onDrag={({ x }) => {
            if (x !== undefined) {
              onChange('right', x);
            }
          }}
        >
          <NumberInput
            value={right}
            placeholder="Right"
            block
            borderWidth={1}
            borderColor="gray3"
            sizeInput="small"
            radius={4}
            min={min}
            max={max}
            clearEnabled
            onValueChange={value => {
              onChange('right', value);
            }}
          />
        </DragCoordinates>
      </View>
      <View css={[styles.item, styles.bottom]}>
        <DragCoordinates
          x={bottom}
          css={styles.dragCoordinates}
          onDrag={({ x }) => {
            if (x !== undefined) {
              onChange('bottom', x);
            }
          }}
        >
          <NumberInput
            value={bottom}
            placeholder="Bottom"
            block
            borderWidth={1}
            borderColor="gray3"
            sizeInput="small"
            radius={4}
            min={min}
            max={max}
            clearEnabled
            onValueChange={value => {
              onChange('bottom', value);
            }}
          />
        </DragCoordinates>
      </View>
      <View css={[styles.item, styles.left]}>
        <DragCoordinates
          x={left}
          css={styles.dragCoordinates}
          onDrag={({ x }) => {
            if (x !== undefined) {
              onChange('left', x);
            }
          }}
        >
          <NumberInput
            value={left}
            placeholder="Left"
            block
            borderWidth={1}
            borderColor="gray3"
            sizeInput="small"
            radius={4}
            min={min}
            max={max}
            clearEnabled
            onValueChange={value => {
              onChange('left', value);
            }}
          />
        </DragCoordinates>
      </View>
      <View css={styles.center} onClick={onChangeAll}>
        <FontAwesome type="far" name="link" size={12} color="gray8" />
      </View>
    </View>
  );
};

export default SpaceField;
