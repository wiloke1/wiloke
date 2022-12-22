import { useStackNavigator } from 'components/StackNavigator';
import { TextEditor2 } from 'components/TextEditor2';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface TextEditorFieldProps<T> extends FieldContainerProps<T> {}

const TextEditorDebounce = withDebounce(TextEditor2, 'value', 'onChange');

const TextEditorField = <T extends string>({ value, settingId, childId, grandChildId, forceRenderSection }: TextEditorFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const navigation = useStackNavigator<LeftBarParamList>();
  const [valueState, setValueState] = useState(value as string);

  const handleChange = (value: string) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'TextEditorField.tsx' });
    }
  };

  useEffect(() => {
    handleChange(valueState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingId, childId, grandChildId, valueState, sectionIdActive, forceRenderSection]);

  return (
    <TextEditorDebounce
      value={valueState}
      onChange={setValueState}
      onClickMetaField={editor => {
        navigation.push('metaFieldScreen', {
          label: 'Metafield',
          onChange: metaField => {
            const viewFragment = editor.data.processor.toView(metaField);
            const modelFragment = editor.data.toModel(viewFragment);
            editor.model.insertContent(modelFragment);
          },
        });
      }}
    />
  );
};

export default TextEditorField;
