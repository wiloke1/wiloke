import ColorPicker2 from 'components/ColorPicker2';
import { useSetSettingsVisible } from 'containers/BuilderPage/store/settingsVisible/slice';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { cssVariablesSelector, sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface ColorFieldProps<T> extends FieldContainerProps<T> {}

const ColorField = <T extends string>({ value, settingId, childId, grandChildId, forceRenderSection }: ColorFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const cssVariables = useSelector(cssVariablesSelector);
  const setSettingsVisible = useSetSettingsVisible();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: string) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'ColorField.tsx' });
    }
  };

  return (
    <ColorPicker2
      color={value}
      data={cssVariables.colors}
      onChange={handleChange}
      onAddOrEditColor={() => {
        setSettingsVisible({ visible: true, keys: ['theme', 'colors'] });
      }}
    />
  );
};

export default ColorField;
