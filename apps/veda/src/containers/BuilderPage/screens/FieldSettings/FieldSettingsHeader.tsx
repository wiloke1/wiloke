import Button from 'components/Button';
import HeaderDrawer from 'components/HeaderDrawer';
import { useStackNavigator, useStackState } from 'components/StackNavigator';
import Tooltip from 'components/Tooltip';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import SectionDropDown from 'containers/BuilderPage/components/SectionDropDown/SectionDropDown';
import SectionShowHide from 'containers/BuilderPage/components/SectionShowHide/SectionShowHide';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSetSectionArrFieldIndexActive } from 'store/actions/actionSectionArrFieldIndexActive';
import { useSetSectionIdActive } from 'store/actions/actionSectionIdActive';
import { useReorderFields } from 'store/global/allowReorderingFields/slice';
import { useSetComponentName } from 'store/global/componentName/slice';
import { allowReorderingFieldsSelector, pageSectionsSelector, sectionIdActiveSelector } from 'store/selectors';
import { i18n } from 'translation';
import { pmParent } from 'utils/functions/postMessage';

const FieldSettingsHeader: FC = () => {
  const pageSections = useSelector(pageSectionsSelector);
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const sectionActive = pageSections.find(section => section.id === sectionIdActive);
  const allowReorderingFields = useSelector(allowReorderingFieldsSelector);
  const [sectionIdOfParentMegamenu, setSectionIdOfParentMegamenu] = useState('');
  const [componentNameOfParentMegamenu, setComponentNameOfParentMegamenu] = useState('');
  const setSectionIdActive = useSetSectionIdActive();
  const setComponentName = useSetComponentName();
  const setSectionArrFieldIndexActive = useSetSectionArrFieldIndexActive();
  const navigation = useStackNavigator<LeftBarParamList>();
  const state = useStackState<LeftBarParamList, 'fieldSettingsScreen'>();
  const reorderFields = useReorderFields();

  useEffect(() => {
    setSectionIdOfParentMegamenu(state.params?.sectionId ?? '');
    setComponentNameOfParentMegamenu(state.params?.componentName ?? '');
  }, [state]);

  if (!sectionActive) {
    return null;
  }

  const renderRightItem = () => {
    if (allowReorderingFields) {
      return (
        <Button
          size="extra-small"
          radius={4}
          backgroundColor="primary"
          css={{ padding: '6px 14px' }}
          onClick={() => {
            reorderFields(false);
          }}
        >
          {i18n.t('general.done')}
        </Button>
      );
    }
    return (
      <>
        <Tooltip placement="bottom" text={i18n.t(sectionActive.enable ? 'general.hide' : 'general.show')}>
          <SectionShowHide sectionId={sectionIdActive} iconName={sectionActive.enable ? 'eye' : 'eye-slash'} />
        </Tooltip>
        <SectionDropDown sectionId={sectionIdActive} placement="in" />
      </>
    );
  };

  return (
    <HeaderDrawer
      title={sectionActive.label}
      goBack={() => {
        navigation.goBack();
        setSectionIdActive(sectionIdOfParentMegamenu);
        setComponentName(componentNameOfParentMegamenu);
        setSectionArrFieldIndexActive(-1);
        pmParent.emit('@section/sectionIdActive', sectionIdOfParentMegamenu ?? '');
        if (!!componentNameOfParentMegamenu) {
          pmParent.emit('@component/componentNameActive', {
            sectionId: sectionIdOfParentMegamenu,
            componentName: componentNameOfParentMegamenu,
            value: true,
          });
        }
      }}
      Right={renderRightItem()}
    />
  );
};

export default FieldSettingsHeader;
