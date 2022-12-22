import SelectAntd from 'components/SelectAntd';
import { Tabs } from 'components/Tabs';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { useSelector } from 'react-redux';
import { pageBuilderSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PageType } from 'types/Page';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { Text, View } from 'wiloke-react-core';
import { useChangeSelectPageType, useChangeTabActive, useChangeSearchKeyMyTemplates, useChangeSearchKeyAllTemplates } from '..';
import * as styles from '../styles';
import { AllTemplates } from './AllTemplates';
import { MyTemplates } from './MyTemplates';
import { filterPageType } from './data';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange', 200);

export const TemplateContent = () => {
  const {
    tabKey,
    selectPageType,
    myTemplates: { searchKey: searchKeyMyTemplates },
    allTemplates: { searchKey: searchKeyAllTemplates },
  } = useSelector(pageBuilderSelector.templates);
  const changeTabActive = useChangeTabActive();
  const changeSelectPageType = useChangeSelectPageType();
  const changeSearchKeyMyTemplates = useChangeSearchKeyMyTemplates();
  const changeSearchKeyAllTemplates = useChangeSearchKeyAllTemplates();
  const { role } = getUserInfo();

  const FilterAction =
    tabKey === 'all' ? (
      <View css={{ width: '300px' }}>
        <SelectAntd
          value={selectPageType}
          data={[
            {
              label: 'All Categories',
              value: 'all',
            },
            ...filterPageType(role === 'user'),
          ]}
          onChange={val => {
            changeSelectPageType(val as PageType);
          }}
        />
      </View>
    ) : (
      <View css={{ width: '300px' }}>
        <DebounceInput
          value={searchKeyMyTemplates}
          placeholder={i18n.t('adminDashboard.search', { text: i18n.t('general.page') })}
          block
          onValueChange={changeSearchKeyMyTemplates}
        />
      </View>
    );

  const LeftAction =
    tabKey === 'all' ? (
      <View css={{ width: '300px' }}>
        <DebounceInput
          value={searchKeyAllTemplates}
          placeholder={i18n.t('adminDashboard.search', { text: i18n.t('general.page') })}
          block
          onValueChange={changeSearchKeyAllTemplates}
        />
      </View>
    ) : null;

  return (
    <View>
      <View css={styles.filterTemplatePageContainer}>
        <View css={styles.leftAction}>
          {FilterAction}
          <Tabs
            variants="style2"
            tabTitleGutter={10}
            defaultActiveKey={tabKey}
            activeKey={tabKey}
            onChange={val => {
              changeTabActive({ tabKey: val });
            }}
          >
            <Tabs.Pane tab={<Text fontFamily="secondary">{i18n.t('adminDashboard.all')}</Text>} key="all" />
            <Tabs.Pane tab={<Text fontFamily="secondary">{i18n.t('general.saved')}</Text>} key="my-template" />
          </Tabs>
        </View>
        {LeftAction}
      </View>

      {tabKey === 'all' ? <AllTemplates /> : <MyTemplates />}
    </View>
  );
};

export default TemplateContent;
