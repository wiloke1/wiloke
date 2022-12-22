import { ArticlePickerProps } from 'components/ArticlePicker/types';
import NavigateItem from 'components/NavigateItem';
import { useStackNavigator } from 'components/StackNavigator';
import { DataBindingFieldNameSelected } from 'containers/BuilderPage/components/DataBindingFieldNameSelected/DataBindingFieldNameSelected';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { SettingArticlePicker } from 'types/Schema';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface ArticlePickerFieldProps<T> extends FieldContainerProps<T> {
  label: string;
  name: string;
}

const ArticlePickerField = ({
  value,
  name,
  settingId,
  childId,
  grandChildId,
  label,
  forceRenderSection,
}: ArticlePickerFieldProps<SettingArticlePicker['children']>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const navigation = useStackNavigator<LeftBarParamList>();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange: ArticlePickerProps['onChange'] = article => {
    updateSettingsValue({
      value: article,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      // TODO: @tuong -> Có hay không việc nên để mặc định "forceRenderSection=true" vì đại đa số các trường hợp section có dữ liệu shopify đều sẽ có "JS"
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'ArticlePickerField.tsx' });
    }
  };

  return (
    <NavigateItem
      label={label}
      AfterLabel={<DataBindingFieldNameSelected fieldName={name} />}
      onClick={() => {
        navigation.push('articlePickerFieldScreen', {
          label,
          value: value,
          onChange: handleChange,
        });
      }}
    />
  );
};

export default ArticlePickerField;
