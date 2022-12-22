import { ArticlePicker } from 'components/ArticlePicker';
import { ScreenProps } from 'components/StackNavigator';
import { FC } from 'react';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import DefaultScreen from '../components/DefaultScreen';

const ArticlePickerFieldScreen: FC<ScreenProps<LeftBarParamList, 'articlePickerFieldScreen'>> = ({ params }) => {
  const { value, onChange, label } = params;

  return (
    <DefaultScreen contentCss={{ height: '100%' }} title={label}>
      <ArticlePicker value={value} onChange={onChange} />
    </DefaultScreen>
  );
};

export default ArticlePickerFieldScreen;
