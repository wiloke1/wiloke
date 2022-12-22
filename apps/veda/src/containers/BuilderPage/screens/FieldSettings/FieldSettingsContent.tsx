import DragIcon from 'components/DragIcon/DragIcon';
import Field from 'components/Field';
import NavigateItem from 'components/NavigateItem';
import Sortable from 'components/Sortable';
import { useStackNavigator } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useReorderSettings } from 'store/actions/actionPages';
import { useSetComponentName } from 'store/global/componentName/slice';
import {
  allowReorderingFieldsSelector,
  pageSectionsSelector,
  sectionArrFieldIndexActiveSelector,
  sectionIdActiveSelector,
  themeAddonsSelector,
} from 'store/selectors';
import { i18n } from 'translation';
import { SettingArray, SettingBlockObject } from 'types/Schema';
import { isSectionAddons, isSectionAddonsOrMegamenu } from 'utils/functions/checkSectionType';
import { getLabel, getSummary } from 'utils/functions/getLabel';
import { pmParent } from 'utils/functions/postMessage';
import { Space, Text, View } from 'wiloke-react-core';
import { AddonStaticActions } from './AddonStaticActions';
import { IGNORE_LABEL } from './consts';
import FieldDepsWrapper from './FieldDepsWrapper/FieldDepsWrapper';
import Fields from './Fields';
import SectionCardContainer from './SectionCardContainer';
import * as styles from './styles';

const FieldSettingsContent: FC = () => {
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const sectionArrFieldIndexActive = useSelector(sectionArrFieldIndexActiveSelector);
  const sectionActive = pageSections.find(section => section.id === sectionIdActive);
  const navigation = useStackNavigator<LeftBarParamList>();
  const allowReorderingFields = useSelector(allowReorderingFieldsSelector);
  const reorderSettings = useReorderSettings();
  const setComponentName = useSetComponentName();
  const themeAddons = useSelector(themeAddonsSelector);
  const themeAddonsActive = themeAddons.data.find(item => item.sectionId === sectionIdActive);

  if (!sectionActive) {
    return null;
  }

  const renderToggleScreen = (setting: SettingBlockObject | SettingArray) => {
    return (
      <NavigateItem
        summary={getSummary(setting.label, setting.summary)}
        label={getLabel(setting.label)}
        onHover={value => {
          pmParent.emit('@component/hoverComponent', {
            sectionId: sectionIdActive,
            name: value ? setting.name : '',
          });
        }}
        onClick={() => {
          navigation.push('fieldsScreen', {
            componentName: setting.name,
          });
          setComponentName(setting.name);
          if (setting.type === 'object') {
            pmParent.emit('@component/componentNameActive', {
              sectionId: sectionIdActive,
              componentName: setting.name,
              value: true,
            });
          } else if (setting.type === 'array') {
            pmParent.emit('@component/componentNameActive', {
              sectionId: sectionIdActive,
              componentName: setting.name,
              value: true,
            });
            pmParent.emit('@component/clickArrayIndex', {
              sectionId: sectionIdActive,
              index: sectionArrFieldIndexActive,
              name: setting.name,
            });
          }
        }}
        containerCss={allowReorderingFields ? { width: 'calc(100% - 20px)' } : {}}
      />
    );
  };

  return (
    <View css={{ padding: '10px', minHeight: '100%' }} backgroundColor="gray2">
      {!isSectionAddonsOrMegamenu(sectionActive.type) && (
        <Field label={i18n.t('general.presets')}>
          <SectionCardContainer />
        </Field>
      )}
      {isSectionAddons(sectionActive.type) && themeAddonsActive?.positionEnabled && (
        <AddonStaticActions addonsSectionId={themeAddonsActive.sectionId} />
      )}
      {allowReorderingFields && (
        <Text size={13} color="gray8" css={{ marginBottom: '10px' }}>
          {i18n.t('builderPage.fields.reorder')}
        </Text>
      )}
      <Sortable
        keyExtractor={setting => setting.id}
        data={sectionActive.data.settings}
        onDragEnd={result => {
          if (!result.destination) {
            return;
          }
          reorderSettings({
            sectionId: sectionIdActive,
            srcIndex: result.source.index,
            desIndex: result.destination.index,
          });
        }}
        itemCss={{ marginBottom: '12px' }}
        renderItem={({ item: setting, index, dragHandleProps }) => {
          const even = index % 2 === 0;
          if (setting.type === 'object' || setting.type === 'array') {
            return (
              <FieldDepsWrapper arrayIndex={null} setting={setting} {...dragHandleProps}>
                <View
                  data-name={setting.name}
                  css={styles.allowReordering(allowReorderingFields, even)}
                  {...(allowReorderingFields ? dragHandleProps : {})}
                >
                  {allowReorderingFields ? <DragIcon /> : <View {...dragHandleProps} />}
                  {renderToggleScreen(setting)}
                </View>
              </FieldDepsWrapper>
            );
          }
          const label = IGNORE_LABEL.includes(setting.type) ? '' : getLabel(setting.label);

          return (
            // FieldDepsWrapper phải để ...dragHandleProps để khắc phục warning của react-beauty-dnd
            <FieldDepsWrapper arrayIndex={null} setting={setting} {...dragHandleProps}>
              <View css={styles.allowReordering(allowReorderingFields, even)} {...(allowReorderingFields ? dragHandleProps : {})}>
                {allowReorderingFields ? <DragIcon /> : <View {...dragHandleProps} />}
                {setting.type === 'hidden' ? null : (
                  <Field
                    data-name={setting.name}
                    label={label}
                    fontSize={14}
                    css={[{ marginBottom: 0 }, allowReorderingFields ? { width: 'calc(100% - 20px)' } : {}]}
                    onMouseEnter={() => {
                      pmParent.emit('@component/hoverComponent', {
                        sectionId: sectionIdActive,
                        name: setting.name,
                      });
                    }}
                    onMouseLeave={() => {
                      pmParent.emit('@component/hoverComponent', {
                        sectionId: sectionIdActive,
                        name: '',
                      });
                    }}
                  >
                    <Fields setting={setting} />
                  </Field>
                )}
              </View>
            </FieldDepsWrapper>
          );
        }}
      />
      <Space size={20} />
    </View>
  );
};

export default FieldSettingsContent;
