import ColorPicker2 from 'components/ColorPicker2';
import { NumberInput } from 'components/NumberInput';
import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { i18n } from 'translation';
import { CssColorVariable } from 'types/PresetStyles';
import { css, View } from 'wiloke-react-core';
import { replaceUnit } from './utils';

export interface BoxShadowProps {
  value: string;
  colors: CssColorVariable[];
  onAddOrEditColor?: () => void;
  onChange: (value: string) => void;
}

const styles = {
  dragCoordinates: css`
    input {
      cursor: ew-resize !important;
      padding: 0 8px !important;
    }
  `,
  tooltip: css`
    padding: 0 3px;
    display: block;
    width: 25%;
  `,
};

export const BoxShadow: FC<BoxShadowProps> = ({ value = '0px 0px 0px 0px transparent', colors, onAddOrEditColor, onChange }) => {
  const valArr = value.split('px ');

  return (
    <View css={{ display: 'flex', margin: '0 -3px' }}>
      <Tooltip portal text="Offset X" css={styles.tooltip}>
        <NumberInput
          value={replaceUnit(valArr[0])}
          block
          min={0}
          max={100}
          step={1}
          radius={4}
          sizeInput="small"
          borderColor="gray3"
          borderWidth={1}
          onValueChange={value => {
            onChange(`${value}px ${replaceUnit(valArr[1])}px ${replaceUnit(valArr[2])}px ${replaceUnit(valArr[3])}px ${valArr[4]}`);
          }}
        />
      </Tooltip>
      <Tooltip portal text="Offset Y" css={styles.tooltip}>
        <NumberInput
          value={replaceUnit(valArr[1])}
          block
          min={0}
          max={100}
          step={1}
          radius={4}
          sizeInput="small"
          borderColor="gray3"
          borderWidth={1}
          onValueChange={value => {
            onChange(`${replaceUnit(valArr[0])}px ${value}px ${replaceUnit(valArr[2])}px ${replaceUnit(valArr[3])}px ${valArr[4]}`);
          }}
        />
      </Tooltip>
      <Tooltip portal text="Blur Radius" css={styles.tooltip}>
        <NumberInput
          value={replaceUnit(valArr[2])}
          block
          min={0}
          max={100}
          step={1}
          radius={4}
          sizeInput="small"
          borderColor="gray3"
          borderWidth={1}
          onValueChange={value => {
            onChange(`${replaceUnit(valArr[0])}px ${replaceUnit(valArr[1])}px ${value}px ${replaceUnit(valArr[3])}px ${valArr[4]}`);
          }}
        />
      </Tooltip>
      <Tooltip portal text="Spread Radius" css={styles.tooltip}>
        <NumberInput
          value={replaceUnit(valArr[3])}
          block
          min={0}
          max={100}
          step={1}
          radius={4}
          sizeInput="small"
          borderColor="gray3"
          borderWidth={1}
          css={{ padding: '0' }}
          onValueChange={value => {
            onChange(`${replaceUnit(valArr[0])}px ${replaceUnit(valArr[1])}px ${replaceUnit(valArr[2])}px ${value}px ${valArr[4]}`);
          }}
        />
      </Tooltip>
      <Tooltip portal text={i18n.t('general.color')} css={styles.tooltip}>
        <ColorPicker2
          triggerSmall
          triggerCss={{ height: '32px !important', width: '100% !important' }}
          color={valArr[4] === 'transparent' ? undefined : valArr[4]}
          onChange={value => {
            onChange(`${replaceUnit(valArr[0])}px ${replaceUnit(valArr[1])}px ${replaceUnit(valArr[2])}px ${replaceUnit(valArr[3])}px ${value}`);
          }}
          onAddOrEditColor={onAddOrEditColor}
          data={colors}
        />
      </Tooltip>
    </View>
  );
};
