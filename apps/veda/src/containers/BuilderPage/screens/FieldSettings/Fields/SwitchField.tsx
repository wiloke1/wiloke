import SwitchBeauty from 'components/SwitchBeauty';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { i18n } from 'translation';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { useSelector } from 'react-redux';
import { FieldContainerProps } from '../types';

export interface SwitchFieldProps<T> extends FieldContainerProps<T> {}

const SwitchField = <T extends boolean>({ value, settingId, childId, grandChildId, forceRenderSection }: SwitchFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: boolean) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'SwitchField.tsx' });
    }
  };

  return (
    <SwitchBeauty
      checked={value}
      radius={6}
      borderColor="gray3"
      borderWidth={1}
      enableText={i18n.t('general.enable')}
      disableText={i18n.t('general.disable')}
      onValueChange={handleChange}
    />
  );
};

export default SwitchField;
