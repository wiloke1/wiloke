import Field from 'components/Field';
import { useSelector } from 'react-redux';
import { versionSelector } from 'store/selectors';
import { Text, View } from 'wiloke-react-core';
import * as styles from '../styles';

export const SettingsChanges: React.FC = () => {
  const {
    newestUpdateSectionInfo: {
      comparedJs,
      comparedJsHook,
      comparedLiquid,
      comparedScss,
      deletedBlocks,
      deletedSettings,
      newBlocks,
      newSettings,
      updatedBlocks,
      updatedSettings,
    },
  } = useSelector(versionSelector);

  const getSettingsChange = () => {
    if (deletedSettings.length > 0 || newSettings.length > 0 || updatedSettings.length > 0) {
      return [...deletedSettings, ...newSettings, ...updatedSettings].map(item => item.name);
    } else {
      return [];
    }
  };

  const getBlocksChange = () => {
    if (deletedBlocks.length > 0 || newBlocks.length > 0 || updatedBlocks.length > 0) {
      return [...deletedBlocks, ...newBlocks, ...updatedBlocks].map(item => item.name);
    } else {
      return [];
    }
  };

  const renderSchemaChanges = [...getSettingsChange(), ...getBlocksChange()].join(', ');

  return (
    <Field>
      <View tagName="table" css={styles.table}>
        <View tagName="thead">
          <View tagName="tr">
            <View tagName="th">Fields</View>
            <View tagName="th">Update</View>
          </View>
        </View>
        <View tagName="tbody">
          <View tagName="tr">
            <View tagName="td">Js</View>
            <Text tagName="td">{comparedJs === 'changes' ? 'Có sự thay đổi' : 'Không có sự thay đổi'}</Text>
          </View>
          <View tagName="tr">
            <View tagName="td">Js Hook</View>
            <Text tagName="td">{comparedJsHook === 'changes' ? 'Có sự thay đổi' : 'Không có sự thay đổi'}</Text>
          </View>
          <View tagName="tr">
            <View tagName="td">Scss</View>
            <Text tagName="td">{comparedScss === 'changes' ? 'Có sự thay đổi' : 'Không có sự thay đổi'}</Text>
          </View>
          <View tagName="tr">
            <View tagName="td">Liquid</View>
            <Text tagName="td">{comparedLiquid === 'changes' ? 'Có sự thay đổi' : 'Không có sự thay đổi'}</Text>
          </View>
          <View tagName="tr">
            <View tagName="td">Schema</View>
            <Text tagName="td">{renderSchemaChanges === '' ? 'Không có sự thay đổi' : renderSchemaChanges}</Text>
          </View>
        </View>
      </View>
    </Field>
  );
};
