import Title from 'components/Title';
import { FC } from 'react';
import { i18n } from 'translation';
import { PageSection } from 'types/Sections';
import { Schema } from 'types/Schema';
import { GridSmart, View } from 'wiloke-react-core';
import { SchemaBlocks, SchemaBlocksProps } from './SchemaBlocks';
import { SchemaSetingsProps, SchemaSettings } from './SchemaSettings/SchemaSettings';

export interface SchemaFieldProps {
  section: PageSection;
  onChange?: (result: Schema) => void;
  onUpdateBlocks?: SchemaBlocksProps['onUpdate'];
  onUpdateSettings?: SchemaSetingsProps['onUpdate'];
}

export const SchemaField: FC<SchemaFieldProps> = ({ section, onChange, onUpdateBlocks, onUpdateSettings }) => {
  return (
    <GridSmart columnWidth={400} columnCount={2}>
      <View>
        <Title title={i18n.t('builderPage.schema.settings.title')} text={i18n.t('builderPage.schema.settings.text')} css={{ marginBottom: '8px' }} />
        <SchemaSettings
          section={section}
          onUpdate={action => {
            onUpdateSettings?.(action);
          }}
          onChange={settings => {
            onChange?.({
              blocks: section.data.schema.blocks,
              settings,
            });
          }}
        />
      </View>
      <View>
        <Title title={i18n.t('builderPage.schema.blocks.title')} text={i18n.t('builderPage.schema.blocks.text')} css={{ marginBottom: '8px' }} />
        <SchemaBlocks
          section={section}
          onUpdate={action => {
            onUpdateBlocks?.(action);
          }}
          onChange={blocks => {
            onChange?.({
              blocks,
              settings: section.data.schema.settings,
            });
          }}
        />
      </View>
    </GridSmart>
  );
};
