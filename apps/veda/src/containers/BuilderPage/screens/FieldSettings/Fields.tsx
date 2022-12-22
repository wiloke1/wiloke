import Button from 'components/Button';
import DragItem from 'components/DragItem';
import DragItemRight from 'components/DragItemRight';
import Dropdown from 'components/Dropdown';
import { DataItem } from 'components/Dropdown/Dropdown';
import Field from 'components/Field';
import Sortable, { RenderItemParam } from 'components/Sortable';
import Tooltip from 'components/Tooltip';
import { DataBindingFieldNameSelected } from 'containers/BuilderPage/components/DataBindingFieldNameSelected/DataBindingFieldNameSelected';
import getDescription from 'containers/BuilderPage/utils';
import { isEqual, throttle } from 'lodash';
import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  useAddArraySettingChildren,
  useAddArraySettingComponent,
  useDeleteArraySettingChildren,
  useDuplicateArraySettingChildren,
  useSortArraySettingChildren,
} from 'store/actions/actionPages';
import { useSetSectionArrFieldIndexActive } from 'store/actions/actionSectionArrFieldIndexActive';
import { componentNameSelector, sectionArrFieldIndexActiveSelector, sectionIdActiveSelector } from 'store/selectors';
import { i18n } from 'translation';
import { SettingArray, SettingArrayValue } from 'types/Schema';
import getPageInfo from 'utils/functions/getInfo';
import { getLabel, getSummary } from 'utils/functions/getLabel';
import { getFirstSelectField, getLabelComponent, getNameComponent, isComponent } from 'utils/functions/getLabelComponentInArray';
import { getStrTemplate } from 'utils/functions/getStrTemplate';
import { pmParent } from 'utils/functions/postMessage';
import { FontAwesome, View } from 'wiloke-react-core';
import { IGNORE_LABEL, THROTTLE_TIME } from './consts';
import FieldDepsWrapper from './FieldDepsWrapper/FieldDepsWrapper';
import AnimateFieldSchema from './Fields/AnimateField';
import AnimateInOutFieldSchema from './Fields/AnimateInOutField';
import ArticlePickerField from './Fields/ArticlePickerField';
import BlogPickerField from './Fields/BlogPickerField';
import ChooseImageField from './Fields/ChooseImageField';
import CollectionPicker from './Fields/CollectionPickerField';
import ColorField from './Fields/ColorField';
import DatePickerField from './Fields/DatePickerField';
import DividerField from './Fields/DividerField';
import DragNavigationField from './Fields/DragNavigation';
import FlexOrderField from './Fields/FlexOrderField';
import FontFamilyField from './Fields/FontFamilyField';
import IconField from './Fields/IconField';
import { SelectTagsPickerField } from './Fields/InputTagsPickerField';
import LinkPickerField from './Fields/LinkPickerField';
import { MultiProductsPickerField } from './Fields/MultiProductsPickerField';
import RadioGroupField from './Fields/RadioGroupField';
import ResponsiveField from './Fields/ResponsiveField';
import SelectField from './Fields/SelectField';
import SingleProductPickerField from './Fields/SingleProductPickerField';
import SliderField from './Fields/SliderField';
import SpaceFieldRedux from './Fields/SpaceFieldRedux';
import StyleBoxField from './Fields/StyleBoxField';
import SwitchField from './Fields/SwitchField';
import { TextareaField } from './Fields/TextareaField';
import TextEditorField from './Fields/TextEditorField';
import TextInputField from './Fields/TextInputField';
import VideoField from './Fields/VideoField';
import * as styles from './styles';
import { FieldsProps, SettingDefaultFieldMapping, SettingMappingType } from './types';

const Fields: FC<FieldsProps> = ({ setting }) => {
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const sortArraySettingChildren = useSortArraySettingChildren();
  const deleteArraySettingChildren = useDeleteArraySettingChildren();
  const duplicateArraySettingChildren = useDuplicateArraySettingChildren();
  const addArraySettingChildren = useAddArraySettingChildren();
  const addArraySettingComponent = useAddArraySettingComponent();
  const sectionArrIndexActive = useSelector(sectionArrFieldIndexActiveSelector);
  const setSectionArrFieldIndexActive = useSetSectionArrFieldIndexActive();
  const componentName = useSelector(componentNameSelector);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDuplicate = useCallback(
    throttle((index: number) => {
      duplicateArraySettingChildren({
        sectionId: sectionIdActive,
        settingId: setting.id,
        settingChildIndex: index,
      });
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'Fields.tsx' });
    }, THROTTLE_TIME),
    [sectionIdActive, setting.id],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDelete = useCallback(
    throttle((id: string) => {
      deleteArraySettingChildren({
        sectionId: sectionIdActive,
        settingId: setting.id,
        settingChildId: id,
      });
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'Fields.tsx' });
    }, THROTTLE_TIME),
    [sectionIdActive, setting.id],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAddArrayItem = useCallback(
    throttle(() => {
      addArraySettingChildren({ settingId: setting.id });
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'Fields.tsx' });
    }, THROTTLE_TIME),
    [sectionIdActive, setting.id],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAddArrayComponent = useCallback(
    throttle((componentChildren: string) => {
      addArraySettingComponent({ settingId: setting.id, componentChildren });
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'Fields.tsx' });
    }, THROTTLE_TIME),
    [sectionIdActive, setting.id],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSortArrayItem = useCallback(
    throttle(result => {
      if (!result.destination) {
        return;
      }
      sortArraySettingChildren({
        destinationIndex: result.destination.index,
        sourceIndex: result.source.index,
        settingId: setting.id,
        sectionId: sectionIdActive,
      });
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'Fields.tsx' });
    }, THROTTLE_TIME),
    [sectionIdActive, setting.id],
  );

  const handleCollapse = (index: number, active: boolean, name: string) => () => {
    if (active) {
      setSectionArrFieldIndexActive(-1);
      pmParent.emit('@component/clickArrayIndex', {
        sectionId: sectionIdActive,
        index: -1,
        name,
      });
    } else {
      setSectionArrFieldIndexActive(index);
      pmParent.emit('@component/clickArrayIndex', {
        sectionId: sectionIdActive,
        index,
        name,
      });
    }
  };

  const settingDefaultFieldMapping: SettingDefaultFieldMapping = {
    animateInOut: (setting, ids) => (
      <AnimateInOutFieldSchema
        label={getLabel(setting.label)}
        summary={getSummary(setting.label, setting.summary)}
        value={setting.children}
        forceRenderSection={setting.forceRenderSection}
        {...ids}
      />
    ),
    animate: (setting, ids) => <AnimateFieldSchema value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />,
    color: (setting, ids) => <ColorField value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />,
    text: (setting, ids) => <TextInputField value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />,
    textarea: (setting, ids) => <TextareaField value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />,
    richText: (setting, ids) => <TextEditorField value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />,
    switch: (setting, ids) => <SwitchField value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />,
    slider: (setting, ids) => (
      <SliderField
        {...ids}
        value={setting.children}
        forceRenderSection={setting.forceRenderSection}
        step={setting.step}
        max={setting.max}
        min={setting.min}
      />
    ),
    divider: setting => <DividerField label={getLabel(setting.label)} />,
    select: (setting, ids) => (
      <SelectField value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} options={setting.options} />
    ),
    radioGroup: (setting, ids) => (
      <RadioGroupField value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} options={setting.options} />
    ),
    styleBox: (setting, ids) => (
      <StyleBoxField
        label={getLabel(setting.label)}
        summary={getSummary(setting.label, setting.summary)}
        name={setting.name}
        value={typeof setting.children === 'string' ? setting.children : setting.children.css}
        forceRenderSection={setting.forceRenderSection}
        {...ids}
      />
    ),
    font: (setting, ids) => <FontFamilyField value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />,
    image: (setting, ids) => (
      <ChooseImageField
        label={getLabel(setting.label)}
        value={setting.children ? setting.children : { src: '', height: 0, width: 0 }}
        forceRenderSection={setting.forceRenderSection}
        {...ids}
      />
    ),
    icon: (setting, ids) => (
      <IconField label={getLabel(setting.label)} value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />
    ),
    space: (setting, ids) => <SpaceFieldRedux value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />,
    date: (setting, ids) => <DatePickerField value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />,
    navigation: (setting, ids) => (
      <DragNavigationField
        label={getLabel(setting.label)}
        summary={getSummary(setting.label, setting.summary)}
        name={setting.name}
        value={setting.children}
        forceRenderSection={setting.forceRenderSection}
        enabledMulti={setting.enabledMulti}
        {...ids}
      />
    ),
    collectionPicker: (setting, ids) => (
      <CollectionPicker
        label={getLabel(setting.label)}
        summary={getSummary(setting.label, setting.summary)}
        name={setting.name}
        value={setting.children}
        forceRenderSection={setting.forceRenderSection}
        {...ids}
      />
    ),
    linkPicker: (setting, ids) => (
      <LinkPickerField
        label={getLabel(setting.label)}
        summary={getSummary(setting.label, setting.summary)}
        name={setting.name}
        value={setting.children}
        forceRenderSection={setting.forceRenderSection}
        {...ids}
      />
    ),
    flexOrder: (setting, ids) => (
      <FlexOrderField
        label={getLabel(setting.label)}
        summary={getSummary(setting.label, setting.summary)}
        name={setting.name}
        value={setting.children}
        options={setting.options}
        forceRenderSection={setting.forceRenderSection}
        {...ids}
      />
    ),
    productPicker: (setting, ids) => (
      <SingleProductPickerField
        label={getLabel(setting.label)}
        summary={getSummary(setting.label, setting.summary)}
        name={setting.name}
        value={setting.children}
        forceRenderSection={setting.forceRenderSection}
        {...ids}
      />
    ),
    responsive: (setting, ids) => (
      <ResponsiveField
        label={getLabel(setting.label)}
        summary={getSummary(setting.label, setting.summary)}
        name={setting.name}
        value={setting.children}
        forceRenderSection={setting.forceRenderSection}
        {...ids}
        min={setting.min}
        max={setting.max}
      />
    ),
    video: (setting, ids) => <VideoField value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />,
    blogPicker: (setting, ids) => (
      <BlogPickerField
        value={setting.children}
        label={getLabel(setting.label)}
        name={setting.name}
        forceRenderSection={setting.forceRenderSection}
        {...ids}
      />
    ),
    articlePicker: (setting, ids) => (
      <ArticlePickerField
        value={setting.children}
        label={getLabel(setting.label)}
        name={setting.name}
        forceRenderSection={setting.forceRenderSection}
        {...ids}
      />
    ),
    textReadOnly: setting => {
      const shop = getPageInfo('shop');
      return (
        <View
          css={{ padding: '10px 15px' }}
          borderWidth={1}
          borderColor="gray3"
          borderStyle="solid"
          backgroundColor="gray1"
          radius={6}
          dangerouslySetInnerHTML={{ __html: getStrTemplate(setting.children, { shop }) }}
        />
      );
    },
    tags: (setting, ids) => <SelectTagsPickerField value={setting.children} forceRenderSection={setting.forceRenderSection} {...ids} />,
    hidden: () => null,
    products: (setting, ids) => (
      <MultiProductsPickerField
        label={getLabel(setting.label)}
        name={setting.name}
        value={setting.children}
        forceRenderSection={setting.forceRenderSection}
        {...ids}
      />
    ),
  };

  const renderSortableItem = (setting: SettingArray) => ({ item: settingChild, index, dragHandleProps }: RenderItemParam<SettingArrayValue>) => {
    const active = index === sectionArrIndexActive && componentName === setting.name;
    const isComponentField = isComponent(settingChild);
    const label = isComponentField ? getLabelComponent(settingChild) : `${i18n.t('general.item')} ${index + 1}`;
    const name = isComponentField ? getNameComponent(settingChild) : '';
    const description = getDescription(settingChild.children, name);

    const isMaxItem = setting.max && setting.max === setting.children.length;

    return (
      <View
        data-child-name={setting.name}
        css={styles.collapse(active)}
        onMouseEnter={() => {
          pmParent.emit('@component/hoverArrayIndex', {
            sectionId: sectionIdActive,
            index,
            name: setting.name,
          });
        }}
        onMouseLeave={() => {
          pmParent.emit('@component/hoverArrayIndex', {
            sectionId: sectionIdActive,
            index: -1,
            name: '',
          });
        }}
      >
        <View {...dragHandleProps}>
          <DragItem
            variant="variant2"
            active={active}
            label={label}
            description={description}
            onEdit={handleCollapse(index, active, setting.name)}
            RightItem={
              <DragItemRight
                onEdit={handleCollapse(index, active, setting.name)}
                onDuplicate={isMaxItem ? undefined : () => handleDuplicate(index)}
                onDelete={setting.children.length > 1 ? () => handleDelete(settingChild.id) : undefined}
              />
            }
          />
        </View>
        {active && (
          <View css={{ padding: '10px' }}>
            {settingChild.children.map(grandChild => {
              const _grandChild = (grandChild as unknown) as any;
              const label = IGNORE_LABEL.includes(grandChild.type) ? '' : getLabel(_grandChild.label);
              const summary = IGNORE_LABEL.includes(grandChild.type) ? '' : getSummary(label, grandChild.summary);
              const AfterLabel = IGNORE_LABEL.includes(grandChild.type) ? null : <DataBindingFieldNameSelected fieldName={grandChild.name} />;

              if (grandChild.type === 'hidden' || (grandChild.type === 'select' && grandChild.name === 'component')) {
                return null;
              }
              return (
                <FieldDepsWrapper arrayIndex={index} key={`${setting.id}${settingChild.id}${_grandChild.id}`} setting={grandChild}>
                  <Field label={label} note={summary} AfterLabel={AfterLabel}>
                    {settingDefaultFieldMapping[grandChild.type](_grandChild, {
                      settingId: setting.id,
                      childId: settingChild.id,
                      grandChildId: grandChild.id,
                    })}
                  </Field>
                </FieldDepsWrapper>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  const renderArrayAddItem = (setting: SettingArray) => {
    const isMaxItem = !!setting.max && setting.children.length === setting.max;

    const button = (
      <Button
        onClick={setting.children.length > 0 ? () => handleDuplicate(setting.children.length - 1) : handleAddArrayItem}
        backgroundColor="gray4"
        color="gray9"
        size="small"
        block
        radius={6}
        fontFamily="secondary"
        disabled={isMaxItem}
        css={{ height: '45px', padding: '0 15px', fontSize: '13px' }}
      >
        {i18n.t('general.duplicate_the_last_item')}
      </Button>
    );

    return (
      <View css={{ display: 'flex', marginTop: '10px', marginBottom: '20px' }}>
        {!isMaxItem ? (
          button
        ) : (
          <Tooltip portal css={{ display: 'block', width: '100%' }} text={i18n.t('general.item_reach_limit')}>
            {button}
          </Tooltip>
        )}

        <Tooltip
          portal
          text={
            isMaxItem
              ? i18n.t('general.item_reach_limit')
              : i18n.t('general.add', { text: i18n.t('general.blank_item'), textTransform: 'capitalize' })
          }
        >
          <Button
            onClick={handleAddArrayItem}
            backgroundColor="gray4"
            color="gray9"
            size="small"
            radius={6}
            fontFamily="secondary"
            css={{ marginLeft: '10px', flexShrink: 0, padding: '0', width: '45px', height: '45px' }}
            disabled={isMaxItem}
          >
            <FontAwesome type="far" name="plus" size={16} />
          </Button>
        </Tooltip>
      </View>
    );
  };

  const renderArrayAddComponent = (setting: SettingArray) => {
    const selectField = getFirstSelectField(setting.children[0]);
    const data = selectField?.options.map(item => ({
      label: item.label,
      value: item.value.toString(),
      icon: 'dice-d6' as string,
    })) as DataItem[];

    return (
      <View css={{ marginTop: '10px', marginBottom: '20px' }}>
        <Dropdown data={data} onClick={handleAddArrayComponent} overlayCss={{ minWidth: '280px' }}>
          <Button
            backgroundColor="gray4"
            color="gray9"
            size="small"
            block
            radius={6}
            fontFamily="secondary"
            css={{ height: '45px', padding: '0 15px', fontSize: '13px' }}
          >
            {i18n.t('general.add_component')}
          </Button>
        </Dropdown>
      </View>
    );
  };

  const settingMapping: SettingMappingType = {
    ...settingDefaultFieldMapping,
    object: setting => {
      return setting.children.map(settingChild => {
        const label = IGNORE_LABEL.includes(settingChild.type) ? '' : getLabel(settingChild.label);
        const summary = IGNORE_LABEL.includes(settingChild.type) ? '' : getSummary(settingChild.label, settingChild.summary);
        if (settingChild.type === 'hidden') {
          return null;
        }
        return (
          <FieldDepsWrapper arrayIndex={null} key={`${setting.id}${settingChild.id}`} setting={settingChild}>
            <Field label={label} note={summary}>
              {settingDefaultFieldMapping[settingChild.type](settingChild as any, { settingId: setting.id, childId: settingChild.id })}
            </Field>
          </FieldDepsWrapper>
        );
      });
    },
    array: setting => {
      return (
        <View>
          <Sortable
            keyExtractor={settingChild => `${setting.id}${settingChild.id}`}
            data={setting.children}
            onDragEnd={handleSortArrayItem}
            itemCss={{ marginBottom: '5px' }}
            renderItem={renderSortableItem(setting)}
          />
          {isComponent(setting.children[0]) ? renderArrayAddComponent(setting) : renderArrayAddItem(setting)}
        </View>
      );
    },
  };

  return <>{settingMapping[setting.type](setting as any, { settingId: setting.id })}</>;
};

export default memo(Fields, isEqual);
