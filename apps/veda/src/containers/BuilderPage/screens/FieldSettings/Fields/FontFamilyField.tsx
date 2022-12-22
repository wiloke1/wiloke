import FontField, { GoogleFonts } from 'components/FontField/FontField';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { cssVariablesSelector, sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface FontFamilyFieldProps<T> extends FieldContainerProps<T> {}

const FontFamilyField = <T extends GoogleFonts>({ value, settingId, childId, grandChildId, forceRenderSection }: FontFamilyFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const cssVariables = useSelector(cssVariablesSelector);
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: string) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'FontFamily.tsx' });
    }
  };

  return <FontField fonts={cssVariables.fonts.map(item => item.value)} value={value} onChange={handleChange} />;
};

export default FontFamilyField;
