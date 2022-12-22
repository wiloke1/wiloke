import { BlogPickerProps } from 'components/BlogPicker/types';
import NavigateItem from 'components/NavigateItem';
import { useStackNavigator } from 'components/StackNavigator';
import { DataBindingFieldNameSelected } from 'containers/BuilderPage/components/DataBindingFieldNameSelected/DataBindingFieldNameSelected';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { useGetBlogsObject } from 'store/actions/liquid/actionLiquidVariables';
import { sectionIdActiveSelector } from 'store/selectors';
import { SettingBlogPicker } from 'types/Schema';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface BlogPickerFieldProps<T> extends FieldContainerProps<T> {
  label: string;
  name: string;
}

const BlogPickerField = ({
  value,
  name,
  settingId,
  childId,
  grandChildId,
  label,
  forceRenderSection,
}: BlogPickerFieldProps<SettingBlogPicker['children']>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const navigation = useStackNavigator<LeftBarParamList>();
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const getBlogsObject = useGetBlogsObject();

  const handleChange: BlogPickerProps['onChange'] = blog => {
    if (!blog) {
      return;
    }
    getBlogsObject.request({
      blogs: [blog],
      onSuccess: () => {
        updateSettingsValue({
          value: blog,
          settingId,
          childId,
          grandChildId,
        });
        if (forceRenderSection) {
          // TODO: @tuong -> Có hay không việc nên để mặc định "forceRenderSection=true" vì đại đa số các trường hợp section có dữ liệu shopify đều sẽ có "JS"
          pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'BlogPickerField.tsx' });
        }
      },
    });
  };

  return (
    <NavigateItem
      label={label}
      AfterLabel={<DataBindingFieldNameSelected fieldName={name} />}
      onClick={() => {
        navigation.push('blogPickerFieldScreen', {
          label,
          value,
          onChange: handleChange,
        });
      }}
    />
  );
};

export default BlogPickerField;
