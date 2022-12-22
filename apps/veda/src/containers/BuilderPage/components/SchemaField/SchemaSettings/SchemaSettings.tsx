import Button from 'components/Button';
import Collapse, { useCollapseActions } from 'components/Collapse';
import DragItem from 'components/DragItem';
import DragItemRight from 'components/DragItemRight';
import Sortable from 'components/Sortable';
import { equals } from 'ramda';
import { FC, useEffect, useReducer } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { i18n } from 'translation';
import { PageSection } from 'types/Sections';
import { SchemaSettingField } from 'types/Schema';
import { getLabel } from 'utils/functions/getLabel';
import { v4 } from 'uuid';
import { View } from 'wiloke-react-core';
import { message } from 'antd';
import storage from 'utils/functions/storage';
import { FormSchemaSetting } from '../components/FormSchemaSetting/FormSchemaSetting';
import { CLIPBOARD_OF_SCHEMA_SETTING_IN_LOCAL_STORAGE, COLLAPSE_GROUP_NAME } from './const';
import { Actions, OnUpdate, reducer } from './reducer';
import { getDescriptionOfSettingsField, getError } from './utils';

export interface SchemaSetingsProps {
  section: PageSection;
  onChange?: (result: SchemaSettingField[]) => void;
  onUpdate?: (action: OnUpdate) => void;
}

const count: Record<string, number> = {};

export const SchemaSettings: FC<SchemaSetingsProps> = ({ section, onChange, onUpdate, ...props }) => {
  const { blocks, settings } = section.data.schema;
  const { onClose, onOpen } = useCollapseActions();
  const [{ settings: _settings, clipboard }, dispatch] = useReducer(reducer, {
    settings,
    clipboard: (() => {
      try {
        const data = storage.getItem(CLIPBOARD_OF_SCHEMA_SETTING_IN_LOCAL_STORAGE);
        return data ? JSON.parse(data) : undefined;
      } catch {
        localStorage.removeItem(CLIPBOARD_OF_SCHEMA_SETTING_IN_LOCAL_STORAGE);
        return undefined;
      }
    })(),
  });

  const _dispatch = (action: Actions) => {
    dispatch(action);
    if (action.type !== '@SchemaSettings/copySetting' && action.type !== '@SchemaSettings/setSettings') {
      onUpdate?.(action);
    }
  };

  const _handleAddSetting = () => {
    const newSetting: SchemaSettingField = {
      id: `id_${v4()}`,
      type: 'text',
      children: '',
      label: ``,
      summary: ``,
      name: ``,
      disable: false,
      deps: undefined,
      // @ts-ignore
      enabledMulti: true,
    };
    _dispatch({
      type: '@SchemaSettings/addSetting',
      payload: {
        newSetting: newSetting,
      },
    });
    onClose({ groupName: COLLAPSE_GROUP_NAME });
    onOpen({ groupName: COLLAPSE_GROUP_NAME, name: newSetting.id });
  };

  const _handleDuplicateSetting = (settingIndex: number) => {
    const setting = _settings[settingIndex];
    const sourceItem = setting;
    count[sourceItem.name] = count[sourceItem.name] ? count[sourceItem.name] + 1 : 1;
    const newSetting = {
      ...sourceItem,
      id: `id_${v4()}`,
      name: sourceItem.name.concat(count[sourceItem.name].toString()),
      label: typeof sourceItem.label === 'string' ? sourceItem.label.concat(count[sourceItem.name].toString()) : sourceItem.label,
    };
    _dispatch({
      type: '@SchemaSettings/insertSetting',
      payload: {
        settingId: setting.id,
        index: settingIndex + 1,
        newSetting,
      },
    });
    onClose({ groupName: COLLAPSE_GROUP_NAME });
    onOpen({ groupName: COLLAPSE_GROUP_NAME, name: newSetting.id });
  };

  const _renderSetting = (item: SchemaSettingField, index: number, dragHandleProps: DraggableProvidedDragHandleProps | undefined) => {
    const { label, id } = item;
    return (
      <Collapse
        groupName={COLLAPSE_GROUP_NAME}
        name={id}
        renderHeader={(handler, active) => (
          <View {...dragHandleProps}>
            <DragItem
              variant="variant2"
              active={active}
              onEdit={handler}
              label={getLabel(label)}
              description={getDescriptionOfSettingsField(item)}
              innerCss={{ backgroundColor: 'transparent' }}
              RightItem={
                <DragItemRight
                  onEdit={handler}
                  onDuplicate={() => {
                    _handleDuplicateSetting(index);
                  }}
                  onDelete={() => {
                    _dispatch({
                      type: '@SchemaSettings/deleteSetting',
                      payload: {
                        settingId: id,
                      },
                    });
                  }}
                  additionalItems={[
                    {
                      iconName: 'copy',
                      text: i18n.t('general.copy', { text: i18n.t('builderPage.schema.settings.title') }),
                      key: v4(),
                      disabled: !clipboard,
                      onClick: () => {
                        message.success(i18n.t('general.copied'));
                        _dispatch({
                          type: '@SchemaSettings/copySetting',
                          payload: { settingId: id },
                        });
                      },
                    },
                    {
                      iconName: 'paste',
                      text: i18n.t('general.paste', { text: i18n.t('builderPage.schema.settings.title') }),
                      key: v4(),
                      disabled: !clipboard,
                      onClick: () => {
                        console.log(clipboard);
                        if (clipboard) {
                          _dispatch({
                            type: '@SchemaSettings/pasteSetting',
                            payload: {
                              settingId: id,
                              newData: clipboard,
                            },
                          });
                        }
                      },
                    },
                  ]}
                />
              }
            />
          </View>
        )}
      >
        <FormSchemaSetting
          {...props}
          section={section}
          variant="settings"
          data={item}
          error={getError({ settings, blocks, formData: item })}
          onChange={data => {
            _dispatch({
              type: '@SchemaSettings/editSetting',
              payload: {
                settingId: id,
                newData: data,
              },
            });
          }}
        />
      </Collapse>
    );
  };

  useEffect(() => {
    if (!equals(settings, _settings)) {
      _dispatch({
        type: '@SchemaSettings/setSettings',
        payload: {
          settings,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  useEffect(() => {
    onChange?.(_settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_settings]);

  useEffect(() => {
    return () => {
      onClose({ groupName: COLLAPSE_GROUP_NAME });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Sortable
        data={_settings}
        keyExtractor={block => block.id}
        itemCss={{ marginBottom: '5px' }}
        onBeforeCapture={() => {
          onClose({ groupName: COLLAPSE_GROUP_NAME });
        }}
        renderItem={({ item, index, dragHandleProps }) => {
          return _renderSetting(item, index, dragHandleProps);
        }}
        onDragEnd={({ source, destination }) => {
          const sourceIndex = source.index;
          const destinationIndex = destination?.index;
          if (destinationIndex !== undefined) {
            _dispatch({
              type: '@SchemaSettings/sortSetting',
              payload: {
                destinationIndex,
                sourceIndex,
              },
            });
          }
        }}
      />
      <Button block size="small" radius={6} backgroundColor="gray3" color="gray8" onClick={_handleAddSetting}>
        {i18n.t('general.add', { text: i18n.t('general.setting'), textTransform: 'capitalize' })}
      </Button>
    </View>
  );
};
