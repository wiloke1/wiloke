import SpaceField from 'components/SpaceField';
import { omit } from 'lodash';
import { equals } from 'ramda';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { SettingSpaceChildren } from 'types/Schema';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface SpaceFieldReduxProps<T> extends FieldContainerProps<T> {}

const SpaceFieldRedux = <T extends SettingSpaceChildren>({
  value,
  settingId,
  childId,
  grandChildId,
  forceRenderSection,
}: SpaceFieldReduxProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const [state, setState] = useState<SettingSpaceChildren>(value);
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  useEffect(() => {
    if (!equals(state, value)) {
      updateSettingsValue({
        value: state,
        settingId,
        childId,
        grandChildId,
      });
      if (forceRenderSection) {
        pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'SpceField.tsx' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childId, grandChildId, settingId, state]);

  useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <SpaceField
      top={state.top}
      right={state.right}
      bottom={state.bottom}
      left={state.left}
      onChangeAll={() => {
        setState(state => {
          if (state.top === undefined) {
            return {};
          } else {
            return {
              ...state,
              right: state.top,
              bottom: state.top,
              left: state.top,
            };
          }
        });
      }}
      onChange={(placement, value) => {
        setState(state => {
          if (value === undefined) {
            return omit(state, [placement]);
          } else {
            return {
              ...state,
              [placement]: value,
            };
          }
        });
      }}
    />
  );
};

export default SpaceFieldRedux;
