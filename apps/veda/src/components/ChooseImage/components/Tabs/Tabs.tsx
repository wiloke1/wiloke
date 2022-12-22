import SimpleTabs from 'components/SimpleTabs';
import { FC } from 'react';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { FreeImages } from './FreeImages';
import MyMedias from './MyMedias';

export interface SettingTabProps {}

const Tabs: FC<SettingTabProps> = () => {
  return (
    <SimpleTabs
      defaultValue="upload"
      data={[
        { label: i18n.t('general.upload'), value: 'upload' },
        { label: 'Free Images', value: 'free_images' },
      ]}
      tabItemCss={() => ({
        fontSize: '13px',
        width: '50%',
        textAlign: 'center',
      })}
      tabCss={({ colors }) => ({
        backgroundColor: colors.light,
        borderBottom: `1px solid ${colors.gray3}`,
      })}
      containerCss={{ height: '100%' }}
    >
      {value => (
        <View className="ChooseImage-tab-container" backgroundColor="light" css={{ height: '100%' }}>
          {value === 'upload' && <MyMedias />}
          {value === 'free_images' && <FreeImages />}
        </View>
      )}
    </SimpleTabs>
  );
};

export default Tabs;
