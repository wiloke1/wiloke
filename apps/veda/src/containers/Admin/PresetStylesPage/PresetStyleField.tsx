import AsyncComponent from 'components/AsyncComponent';
import PresetStyleBox from 'components/PresetStyleBox';
import { isEqual } from 'lodash';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { cssVariablesSelector, presetStyleSelector } from 'store/selectors';
import { PresetStyle } from 'types/PresetStyles';
import { GridSmart } from 'wiloke-react-core';
import { useGetPresetStyles, useInstallPresetStyle } from '.';

interface PresetStyleFieldProps {
  onDone?: () => void;
}

export const PresetStyleField: FC<PresetStyleFieldProps> = ({ onDone }) => {
  const { getStatus, installStatus, presetStyles } = useSelector(presetStyleSelector);
  const { fonts: fontsState, colors: colorsState } = useSelector(cssVariablesSelector);
  const fontStateValue = fontsState.map(item => item.value);
  const colorStateValue = colorsState.map(item => item.name);

  const getPresets = useGetPresetStyles();
  const installPreset = useInstallPresetStyle();

  useEffect(() => {
    if (getStatus === 'idle' || getStatus === 'failure') {
      getPresets.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStatus]);

  const _handleInstall = (item: PresetStyle) => () => {
    installPreset.request({ id: item.id });
    onDone?.();
  };

  return (
    <AsyncComponent
      status={getStatus}
      Success={
        <GridSmart columnWidth={300} columnCount={3}>
          {presetStyles.map(item => {
            const colors = item.colors.map(item => item.light);
            const fonts = item.fonts.map(item => item.value);
            const colorsValue = item.colors.map(item => item.name);

            return (
              <PresetStyleBox
                key={item.id}
                title={item.title}
                isActive={isEqual(fontStateValue, fonts) && isEqual(colorStateValue, colorsValue)}
                loading={installStatus[item.id] === 'loading'}
                fontFamilies={fonts}
                colors={colors}
                onClick={_handleInstall(item)}
              />
            );
          })}
        </GridSmart>
      }
    />
  );
};

export default PresetStyleField;
