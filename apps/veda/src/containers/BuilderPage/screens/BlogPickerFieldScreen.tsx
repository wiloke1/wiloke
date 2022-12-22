import { BlogPicker } from 'components/BlogPicker';
import { ScreenProps } from 'components/StackNavigator';
import { FC } from 'react';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import DefaultScreen from '../components/DefaultScreen';

const BlogPickerFieldScreen: FC<ScreenProps<LeftBarParamList, 'blogPickerFieldScreen'>> = ({ params }) => {
  const { value, onChange, label } = params;

  return (
    <DefaultScreen title={label} contentCss={{ height: '100%', padding: '0px' }} withScrollbars={false}>
      <BlogPicker value={value} onChange={onChange} />
    </DefaultScreen>
  );
};

export default BlogPickerFieldScreen;
