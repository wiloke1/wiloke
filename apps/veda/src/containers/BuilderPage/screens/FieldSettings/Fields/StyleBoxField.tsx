import NavigateItem from 'components/NavigateItem';
import { useStackNavigator } from 'components/StackNavigator';
import { DataBindingFieldNameSelected } from 'containers/BuilderPage/components/DataBindingFieldNameSelected/DataBindingFieldNameSelected';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useSetSettingsVisible } from 'containers/BuilderPage/store/settingsVisible/slice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { cssVariablesSelector, sectionIdActiveSelector } from 'store/selectors';
import stringHash from 'string-hash';
import { StyleBoxChildren } from 'types/Schema';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface StyleBoxFieldProps<T> extends FieldContainerProps<T> {
  label: string;
  name: string;
  summary?: string;
}

const ID_CSS_EMPTY = 'css_2416369068';

const StyleBoxField = <T extends string>({
  value,
  name,
  settingId,
  childId,
  grandChildId,
  label,
  summary,
  forceRenderSection,
}: StyleBoxFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const cssVariables = useSelector(cssVariablesSelector);
  const navigation = useStackNavigator<LeftBarParamList>();
  const setSettingsVisible = useSetSettingsVisible();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (cssBase64: string) => {
    const cssId = `css_${stringHash(cssBase64)}`;
    const value: StyleBoxChildren = cssId === ID_CSS_EMPTY ? { id: '', css: '' } : { id: cssId, css: cssBase64 };
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'StyleBoxField.tsx' });
    }
  };

  useEffect(() => {
    navigation.emit('styleBoxScreen', {
      value,
      label,
      colors: cssVariables.colors,
      fonts: cssVariables.fonts.map(item => item.value),
      onChange: handleChange,
      onAddOrEditColor: () => setSettingsVisible({ visible: true, keys: ['theme', 'colors'] }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, cssVariables]);

  return (
    <NavigateItem
      label={label}
      summary={summary}
      AfterLabel={<DataBindingFieldNameSelected fieldName={name} />}
      onClick={() => {
        navigation.push('styleBoxScreen', {
          value,
          label,
          colors: cssVariables.colors,
          fonts: cssVariables.fonts.map(item => item.value),
          onChange: handleChange,
          onAddOrEditColor: () => setSettingsVisible({ visible: true, keys: ['theme', 'colors'] }),
        });
      }}
    />
  );
};

export default StyleBoxField;
