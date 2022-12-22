import { ArticlePickerProps } from 'components/ArticlePicker/types';
import { BlogPickerProps } from 'components/BlogPicker/types';
import { ChooseImageProps } from 'components/ChooseImage';
import { CollectionPickerProps } from 'components/CollectionPicker';
import { IconUIFieldProps } from 'components/IconUIField';
import { MultiProductsPickerProps, SingleProductPickerProps } from 'components/ProductPicker';
import { createStackNavigator, useStackNavigator } from 'components/StackNavigator';
import { DraggableMenuProps, DragMenuPath, SettingDragMenu } from 'containers/BuilderPage/components/DraggableMenu/types';
import { useParentPostMessageForLeftBarScreen } from 'hooks/useParentPostMessage';
import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { pmParent } from 'utils/functions/postMessage';
import { PostMessageOff } from 'wiloke-react-core/utils';
import { useSectionDeleteFlow, useSectionDuplicateFlow } from 'containers/BuilderPage/store/toolbarActions/action';
import { selectPageSelector } from 'containers/BuilderPage/store/selectPage/slice';
import ArticlePickerFieldScreen from 'containers/BuilderPage/screens/ArticlePickerFieldScreen';
import BlogPickerFieldScreen from 'containers/BuilderPage/screens/BlogPickerFieldScreen';
import ChooseImageFieldScreen from 'containers/BuilderPage/screens/ChooseImageFieldScreen';
import CollectionPickerFieldScreen from 'containers/BuilderPage/screens/CollectionPickerFieldScreen';
import FieldSettingsScreen from 'containers/BuilderPage/screens/FieldSettings/FieldSettingsScreen';
import FieldsScreen from 'containers/BuilderPage/screens/FieldSettings/FieldsScreen';
import IconFieldScreen from 'containers/BuilderPage/screens/IconFieldScreen';
import LeftBarMainScreen from 'containers/BuilderPage/screens/LeftBarMain/LeftBarMainScreen';
import NavigationFieldScreen from 'containers/BuilderPage/screens/NavigationFieldScreen';
import SingleProductPickerFieldScreen from 'containers/BuilderPage/screens/SingleProductPickerFieldScreen';
import { MegaMenuUserScreen } from 'containers/BuilderPage/screens/MegaMenuUserScreen';
import StyleBoxScreen from 'containers/BuilderPage/screens/StyleBoxScreen';
import { MegaMenuDraftScreen } from 'containers/BuilderPage/screens/MegaMenuDraftScreen';
import { MegaMenuAtomScreen } from 'containers/BuilderPage/screens/MegaMenuAtomScreen';
import MultiProductsPickerFieldScreen from 'containers/BuilderPage/screens/MultiProductsPickerFieldScreen';
import { MetaFieldScreen } from 'containers/BuilderPage/screens/MetaFieldScreen';
import { StyleBoxProps } from '../StyleBox/StyleBox';
import ModalSectionDuplicate from '../ModalSectionDuplicate/ModalSectionDuplicate';

export interface LeftBarParamList {
  sectionsScreen: undefined;
  fieldSettingsScreen: {
    // Chỉ dành cho trường hợp megamenu
    sectionId: string;
    componentName: string;
  };
  iconFieldScreen: Required<Pick<IconUIFieldProps, 'value' | 'onChange' | 'label'>> & Pick<IconUIFieldProps, 'onImageClick'>;
  fieldsScreen?: {
    componentName: string;
  };
  styleBoxScreen: Required<StyleBoxProps> & {
    label: string;
  };
  navigationFieldScreen: Required<Pick<DraggableMenuProps, 'settings' | 'onChange' | 'label' | 'multiLevelEnabled'>>;
  chooseImageFieldScreen: Required<Pick<ChooseImageProps, 'value' | 'onChange'>> & {
    label: string;
  };
  singleProductPickerFieldScreen: Required<Pick<SingleProductPickerProps, 'product' | 'onChange'>> & {
    label: string;
  };
  multiProductsPickerFieldScreen: Required<Pick<MultiProductsPickerProps, 'products' | 'onChange'>> & {
    label: string;
  };
  collectionPickerFieldScreen: Required<Pick<CollectionPickerProps, 'collection' | 'onChange'>> & {
    label: string;
  };
  sectionMegaMenu: {
    currentNode: SettingDragMenu;
    path: DragMenuPath;
    sectionParentId: string;
  };
  sectionMegaMenuDraft: {
    currentNode: SettingDragMenu;
    path: DragMenuPath;
    sectionParentId: string;
  };
  sectionMegaMenuAtom: {
    currentNode: SettingDragMenu;
    path: DragMenuPath;
    sectionParentId: string;
  };
  blogPickerFieldScreen: BlogPickerProps & {
    label: string;
  };
  articlePickerFieldScreen: ArticlePickerProps & {
    label: string;
  };
  metaFieldScreen: {
    label: string;
    onChange: (metaField: string) => void;
  };
}

const StackNavigator = createStackNavigator<LeftBarParamList>({
  duration: 100,
});

const StackNavigatorInit: FC = () => {
  const selectPage = useSelector(selectPageSelector);
  const pmParentOff = useRef<PostMessageOff | undefined>();
  const pmParentOff2 = useRef<PostMessageOff | undefined>();
  const navigation = useStackNavigator<LeftBarParamList>();
  const sectionDuplicateFlow = useSectionDuplicateFlow();
  const sectionDeleteFlow = useSectionDeleteFlow();
  useParentPostMessageForLeftBarScreen();

  useEffect(() => {
    // Thêm vedaNavigation để có thể navigate từ iframe
    window.vedaNavigation = navigation;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectPage) {
      navigation.navigate('sectionsScreen');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPage]);

  useEffect(() => {
    pmParentOff.current = pmParent.on('@component/duplicate', ({ sectionId }) => {
      sectionDuplicateFlow({
        sectionIdActive: sectionId,
        goBack: () => {
          navigation.navigate('sectionsScreen');
        },
      });
    });
    pmParentOff2.current = pmParent.on('@section/delete', ({ sectionId }) => {
      sectionDeleteFlow({
        sectionIdActive: sectionId,
        goBack: () => {
          navigation.navigate('sectionsScreen');
        },
      });
    });
    return () => {
      pmParentOff.current?.();
      pmParentOff2.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalSectionDuplicate />
    </>
  );
};

export const SidebarScreen: FC = () => {
  return (
    <StackNavigator initialName="sectionsScreen" containerCss={{ height: '100vh' }} header={<StackNavigatorInit />}>
      <StackNavigator.Screen name="sectionsScreen" component={LeftBarMainScreen} />
      <StackNavigator.Screen name="fieldSettingsScreen" component={FieldSettingsScreen} />
      <StackNavigator.Screen name="fieldsScreen" component={FieldsScreen} />
      <StackNavigator.Screen name="iconFieldScreen" component={IconFieldScreen} />
      <StackNavigator.Screen name="styleBoxScreen" component={StyleBoxScreen} />
      <StackNavigator.Screen name="navigationFieldScreen" component={NavigationFieldScreen} />
      <StackNavigator.Screen name="chooseImageFieldScreen" component={ChooseImageFieldScreen} />
      <StackNavigator.Screen name="singleProductPickerFieldScreen" component={SingleProductPickerFieldScreen} />
      <StackNavigator.Screen name="multiProductsPickerFieldScreen" component={MultiProductsPickerFieldScreen} />
      <StackNavigator.Screen name="collectionPickerFieldScreen" component={CollectionPickerFieldScreen} />
      <StackNavigator.Screen name="sectionMegaMenu" component={MegaMenuUserScreen} />
      <StackNavigator.Screen name="sectionMegaMenuDraft" component={MegaMenuDraftScreen} />
      <StackNavigator.Screen name="sectionMegaMenuAtom" component={MegaMenuAtomScreen} />
      <StackNavigator.Screen name="blogPickerFieldScreen" component={BlogPickerFieldScreen} />
      <StackNavigator.Screen name="articlePickerFieldScreen" component={ArticlePickerFieldScreen} />
      <StackNavigator.Screen name="metaFieldScreen" component={MetaFieldScreen} />
    </StackNavigator>
  );
};
