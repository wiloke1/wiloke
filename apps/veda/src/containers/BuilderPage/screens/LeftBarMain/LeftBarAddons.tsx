import AddonListItem from 'components/AddonListItem';
import Button from 'components/Button';
import ScrollBars from 'components/ScrollBars';
import { useStackNavigator } from 'components/StackNavigator';
import SectionDropDown from 'containers/BuilderPage/components/SectionDropDown/SectionDropDown';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import UpdateVersion from 'containers/BuilderPage/components/UpdateVersion/UpdateVersion';
import { addonsPositionStartSelector } from 'containers/BuilderPage/store/addonPosition/slice';
import { useSetTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions/actionTemplateBoardVisible';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSetSectionIdActive } from 'store/actions/actionSectionIdActive';
import { sectionIdHoverSelector, useSetSectionIdHover } from 'store/global/sectionIdHover/slice';
import { useSetActiveAddon } from 'store/global/themeAddons';
import { chooseTemplateVisibleSelector, pageSectionsSelector, sectionIdActiveSelector, themeAddonsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { ThemeAddon } from 'types/Addons';
import { pmParent } from 'utils/functions/postMessage';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';

const LeftBarAddons: FC = () => {
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const themeAddons = useSelector(themeAddonsSelector);
  const navigation = useStackNavigator<LeftBarParamList>();
  const setSectionIdActive = useSetSectionIdActive();
  const addonsPositionStart = useSelector(addonsPositionStartSelector);

  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const setActiveAddon = useSetActiveAddon();
  const setSectionIdHover = useSetSectionIdHover();
  const sectionIdHover = useSelector(sectionIdHoverSelector);
  const { navKeys } = useSelector(chooseTemplateVisibleSelector);

  useEffect(() => {
    if (!addonsPositionStart.value && !!sectionIdActive) {
      navigation.navigate('fieldSettingsScreen');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addonsPositionStart.value, sectionIdActive]);

  const renderAddonsItem = (item: ThemeAddon) => {
    const labels = pageSections.reduce<string[]>((arr, section) => {
      if (section.addonIds?.includes(item.sectionId)) {
        return [...arr, section.label];
      }
      return arr;
    }, []);

    return (
      <View
        key={item.id}
        onMouseEnter={() => {
          setSectionIdHover(item.sectionId);
        }}
        onMouseLeave={() => {
          setSectionIdHover('');
        }}
        onClick={() => {
          setActiveAddon({ addon: item });
          navigation.navigate('fieldSettingsScreen');
          setSectionIdActive(item.sectionId);
          pmParent.emit('@section/sectionIdActive', item.sectionId);
        }}
      >
        <AddonListItem
          key={item.id}
          image={item.logo}
          label={item.label}
          description={item.tagLine}
          active={!!item.sectionId && sectionIdHover === item.sectionId}
          Right={
            <>
              <View
                onClick={event => {
                  event.stopPropagation();
                  setActiveAddon({ addon: item });
                }}
              >
                <SectionDropDown sectionId={item.sectionId} />
              </View>
              <UpdateVersion type="addons" item={item} />
            </>
          }
          Footer={
            !!labels.length && (
              <>
                <Text tagName="span" size={12} css={{ fontStyle: 'italic', marginRight: '4px' }}>
                  {i18n.t('builderPage.in')}
                </Text>
                {labels.map((label, index) => {
                  return (
                    <Text
                      key={index}
                      tagName="span"
                      color="primary"
                      size={12}
                      radius={4}
                      css={({ colors }) => ({
                        backgroundColor: `rgba(${colors.rgbPrimary}, 0.2)`,
                        padding: '2px 5px',
                        marginRight: '3px',
                        marginBottom: '3px',
                      })}
                    >
                      {label}
                    </Text>
                  );
                })}
              </>
            )
          }
        />
      </View>
    );
  };

  const _handleOpenModal = () => {
    setTemplateBoardVisible({ visible: true });
    setTemplateBoardVisible({
      navKeys: navKeys.length > 0 ? navKeys : ['addons'],
    });
  };

  return (
    <>
      <ScrollBars css={{ height: 'calc(100% - 130px) !important' }}>
        <View css={styles.content}>{themeAddons.data.map(renderAddonsItem)}</View>
      </ScrollBars>

      <View css={styles.footer}>
        <Button backgroundColor="primary" size="small" block radius={6} fontFamily="secondary" css={styles.btn} onClick={_handleOpenModal}>
          {i18n.t('general.add', { text: i18n.t('general.addons'), textTransform: 'capitalize' })}
        </Button>
      </View>
    </>
  );
};

export default LeftBarAddons;
