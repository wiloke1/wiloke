import { message } from 'antd';
import BoxCenter from 'components/BoxCenter';
import Field from 'components/Field';
import { SchemaField } from 'containers/BuilderPage/components/SchemaField';
import ScrollBars from 'components/ScrollBars';
import TextInput from 'components/TextInput';
import Tooltip from 'components/Tooltip';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCopySchema, usePasteSchema, useRenameSection, useUpdateSchemaBlocks, useUpdateSchemaSettings } from 'store/actions/actionPages';
import { clipboardSelector, pageSectionsSelector, sectionEdittingIdSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PageSection } from 'types/Sections';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

const TextInputDebounce = withDebounce(TextInput, 'value', 'onValueChange');

export const EditorSchema = () => {
  const updateSchemaBlocks = useUpdateSchemaBlocks();
  const updateSchemaSettings = useUpdateSchemaSettings();
  const renameSection = useRenameSection();
  const copySchema = useCopySchema();
  const pasteSchema = usePasteSchema();
  const pageSections = useSelector(pageSectionsSelector);
  const sectionEdittingId = useSelector(sectionEdittingIdSelector);
  const section = pageSections.find(section => section.id === sectionEdittingId) as PageSection;
  const clipboard = useSelector(clipboardSelector);
  const [state, setState] = useState(false);
  const timeoutRef = useRef<number | undefined>();

  const _renderHeader = () => {
    return (
      <View css={styles.header}>
        <View css={styles.headerLeft}>
          <Field label={i18n.t('general.name')}>
            <TextInputDebounce
              block
              value={section?.label}
              onValueChange={value => {
                renameSection({
                  sectionId: sectionEdittingId,
                  newName: value,
                });
              }}
            />
          </Field>
        </View>
        <View css={styles.headerRight}>
          <Tooltip text={i18n.t('general.copy', { text: i18n.t('general.schema'), textTransform: 'capitalize' })}>
            <BoxCenter
              size={40}
              css={styles.button(false)}
              color={state ? 'success' : 'dark'}
              onClick={() => {
                copySchema({
                  schema: section.data.schema,
                  settings: section.data.settings,
                });
                setState(true);
                message.success('Copied to clipboard');
              }}
            >
              <FontAwesome type="far" size={18} name={state ? 'check' : 'copy'} />
            </BoxCenter>
          </Tooltip>
          <Tooltip text={i18n.t('general.paste', { text: i18n.t('general.schema'), textTransform: 'capitalize' })}>
            <BoxCenter
              size={40}
              disabled={!clipboard}
              css={styles.button(!clipboard)}
              color="dark"
              onClick={() => {
                if (clipboard) {
                  pasteSchema({
                    settings: clipboard.settings,
                    schema: clipboard.schema,
                    sectionId: sectionEdittingId,
                  });
                }
              }}
            >
              <FontAwesome type="far" size={18} name="paste" />
            </BoxCenter>
          </Tooltip>
        </View>
      </View>
    );
  };

  const _renderBody = () => {
    return (
      <View css={styles.body}>
        <SchemaField
          section={section}
          onUpdateBlocks={data => {
            updateSchemaBlocks({ data, sectionId: section?.id });
          }}
          onUpdateSettings={data => {
            updateSchemaSettings({ data, sectionId: section?.id });
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    if (state) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setState(false);
        clearTimeout(timeoutRef.current);
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [state]);

  return (
    <ScrollBars>
      <View container css={styles.container}>
        {_renderHeader()}
        {_renderBody()}
      </View>
    </ScrollBars>
  );
};
