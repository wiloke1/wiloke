import BoxCenter from 'components/BoxCenter';
import DragItem from 'components/DragItem';
import Field from 'components/Field';
import FontIconField from 'components/IconUIField';
import LinkPicker from 'components/LinkPicker';
import { useStackNavigator } from 'components/StackNavigator';
import SwitchBeauty from 'components/SwitchBeauty';
import TextInput from 'components/TextInput';
import Tooltip from 'components/Tooltip';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useGetAdminMegaMenu, useGetDraftMegaMenu } from 'containers/ChooseTemplate/store/actions';
import withDebounce from 'hocs/withDebounce';
import useDelay from 'hooks/useDelay';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import useGuarded from 'routes/useGuarded';
import { useDeleteSection } from 'store/actions/actionPages';
import { useSetSectionIdActive } from 'store/actions/actionSectionIdActive';
import { useDeleteMegaMenuOfHeaderFooter } from 'store/global/megaMenusOfHeaderFooter';
import { useSetSectionEdittingId } from 'store/global/sectionEdittingId/actions';
import { useSetSectionIdCodeVisible } from 'store/global/sectionIdCodeVisible/slice';
import { componentNameSelector, pageSectionsSelector, sectionIdActiveSelector } from 'store/selectors';
import { i18n } from 'translation';
import { ProductSection } from 'types/Sections';
import { isSectionAddons } from 'utils/functions/checkSectionType';
import { pmParent } from 'utils/functions/postMessage';
import { v4 } from 'uuid';
import { FontAwesome, useTheme, View } from 'wiloke-react-core';
import { SettingDragMenuChildren, useGetSectionsMegaMenu } from '..';
import UpdateVersion from '../../UpdateVersion/UpdateVersion';
import { MenuFormProps } from '../types';
import * as styles from './styles';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange', 200);

export const MenuForm: FC<MenuFormProps> = ({ data, path, onChange }) => {
  const navigation = useStackNavigator<LeftBarParamList>();
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const componentName = useSelector(componentNameSelector);
  const { colors } = useTheme();
  const sectionActive = pageSections.find(item => item.id === sectionIdActive);
  const guard = useGuarded();
  const [delay] = useDelay();
  const megaMenuEnabled = (data as SettingDragMenuChildren).megaMenuEnabled;
  const isSecondNode = (data as SettingDragMenuChildren)['megaMenuEnabled'] !== undefined;
  const canAddMegaMenu = isSectionAddons(sectionActive?.type) ? false : true;

  const setSectionIdCodeVisible = useSetSectionIdCodeVisible();
  const setSectionEdittingId = useSetSectionEdittingId();
  const setSectionIdActive = useSetSectionIdActive();
  const deleteSection = useDeleteSection();
  const deleteMegaMenuOfHeaderFooter = useDeleteMegaMenuOfHeaderFooter();
  const getUserMegaMenu = useGetSectionsMegaMenu();
  const getMegaMenusAtom = useGetAdminMegaMenu();
  const getMegaMenusDraft = useGetDraftMegaMenu();

  // chọn section cho mega menu
  const navigateToUserScreen = () => {
    getUserMegaMenu.request(undefined);
    navigation.navigate('sectionMegaMenu', {
      currentNode: data,
      path,
      sectionParentId: sectionIdActive,
    });
  };

  const navigateToAtom = () => {
    getMegaMenusAtom.request(undefined);
    navigation.navigate('sectionMegaMenuAtom', {
      currentNode: data,
      path,
      sectionParentId: sectionIdActive,
    });
  };

  const navigateToDraft = () => {
    getMegaMenusDraft.request(undefined);
    navigation.navigate('sectionMegaMenuDraft', {
      currentNode: data,
      path,
      sectionParentId: sectionIdActive,
    });
  };

  // mở editor code
  const openCode = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    navigation.goBack(0);
    await setSectionEdittingId((data as SettingDragMenuChildren).megaMenuId);
    setSectionIdCodeVisible({ sectionId: (data as SettingDragMenuChildren).megaMenuId ?? '' });
    setSectionIdActive('');
    pmParent.emit('@section/sectionIdActive', '');
  };

  const handleSetting = async () => {
    if (!!(data as SettingDragMenuChildren).megaMenuId) {
      const _sectionId = (data as SettingDragMenuChildren).megaMenuId;

      navigation.push('fieldSettingsScreen', {
        // id này của section cha của megamenu
        sectionId: sectionIdActive,
        componentName,
      });
      setSectionIdActive(_sectionId);
      pmParent.emit('@section/sectionIdActive', _sectionId);
    }
  };

  const renderUpdateVersion = () => {
    const _data = data as SettingDragMenuChildren;
    if (sectionActive && _data.megaMenuId) {
      const currentMegaMenu = pageSections.find(item => item.id === _data.megaMenuId) as ProductSection | undefined;
      if (currentMegaMenu) {
        return <UpdateVersion key={v4()} item={currentMegaMenu} type="section" />;
      }
      return null;
    }
    return null;
  };

  const renderMegaMenuSetting = () => {
    return (
      <View>
        <View css={styles.buttonContainer}>
          {!!(data as SettingDragMenuChildren).megaMenuId ? (
            <DragItem
              css={{ width: '100%', border: `1px solid ${colors.gray3}`, borderRadius: '6px', paddingRight: '4px' }}
              innerCss={{ padding: '0px', height: '40px' }}
              Icon={() => <View />}
              label={i18n.t('general.content')}
              variant="variant2"
              onEdit={() => {
                (guard('admin') ? navigateToAtom : guard('dev') ? navigateToDraft : navigateToUserScreen)();
              }}
              RightItem={[
                renderUpdateVersion(),
                ...(guard('admin', 'dev')
                  ? [
                      <Tooltip key={v4()} portal text={'Change Atom'}>
                        <BoxCenter size={22} onClick={navigateToAtom}>
                          <FontAwesome type="far" name="atom" size={12} color="gray6" />
                        </BoxCenter>
                      </Tooltip>,
                      <Tooltip key={v4()} portal text={'Change Draft'}>
                        <BoxCenter size={22} onClick={navigateToDraft}>
                          <FontAwesome type="far" name="user" size={12} color="gray6" />
                        </BoxCenter>
                      </Tooltip>,
                    ]
                  : []),
                <Tooltip key={v4()} portal text={i18n.t('general.change', { text: i18n.t('general.content') })}>
                  <BoxCenter size={22} onClick={navigateToUserScreen}>
                    <FontAwesome type="far" name="exchange-alt" size={12} color="gray6" />
                  </BoxCenter>
                </Tooltip>,
                <Tooltip key={v4()} portal text={`${i18n.t('general.edit', { text: i18n.t('general.setting') })}`}>
                  <BoxCenter size={22} onClick={handleSetting}>
                    <FontAwesome type="far" name="pencil" size={12} color="gray6" />
                  </BoxCenter>
                </Tooltip>,
                <Tooltip key={v4()} portal text={`${i18n.t('general.edit', { text: i18n.t('general.code') })}`}>
                  <BoxCenter size={22} onClick={openCode}>
                    <FontAwesome type="far" name="code" size={12} color="gray6" />
                  </BoxCenter>
                </Tooltip>,
              ]}
            />
          ) : (
            <DragItem
              css={{ width: '100%', border: `1px solid ${colors.gray3}`, borderRadius: '6px', paddingRight: '4px' }}
              innerCss={{ padding: '0px', height: '40px' }}
              Icon={() => <View />}
              label={i18n.t('general.content')}
              variant="variant2"
              onEdit={() => {
                (guard('admin') ? navigateToAtom : guard('dev') ? navigateToDraft : navigateToUserScreen)();
              }}
              RightItem={[
                ...(guard('admin', 'dev')
                  ? [
                      <Tooltip key={v4()} portal text={'Change Atom'}>
                        <BoxCenter size={22} onClick={navigateToAtom}>
                          <FontAwesome type="far" name="atom" size={12} color="gray6" />
                        </BoxCenter>
                      </Tooltip>,
                      <Tooltip key={v4()} portal text={'Change Draft'}>
                        <BoxCenter size={22} onClick={navigateToDraft}>
                          <FontAwesome type="far" name="user" size={12} color="gray6" />
                        </BoxCenter>
                      </Tooltip>,
                    ]
                  : []),
                <Tooltip key={v4()} portal text={i18n.t('general.change', { text: i18n.t('general.content') })}>
                  <BoxCenter size={22} onClick={navigateToUserScreen}>
                    <FontAwesome type="far" name="exchange-alt" size={12} color="gray6" />
                  </BoxCenter>
                </Tooltip>,
              ]}
            />
          )}
        </View>
      </View>
    );
  };

  const handleEnableMegaMenu = async (enable: boolean) => {
    if (enable) {
      onChange?.({ label: i18n.t('general.megamenu'), megaMenuEnabled: true });
    } else {
      const sectionMegaMenu = pageSections.find(item => item.id === (data as SettingDragMenuChildren).megaMenuId);
      if (sectionMegaMenu) {
        deleteSection(sectionMegaMenu.id);
        deleteMegaMenuOfHeaderFooter({ sectionId: sectionMegaMenu.id });
      }
      await delay(100);
      onChange?.({ megaMenuEnabled: false, megaMenuId: '' });
    }
  };

  return (
    <View>
      {isSecondNode && canAddMegaMenu && (
        <Field label={i18n.t('general.megamenu')} note={i18n.t('builderPage.mega_menu.warning')}>
          <View css={{ marginBottom: '7px' }}>
            <SwitchBeauty borderColor="gray3" size="medium" checked={megaMenuEnabled} onValueChange={handleEnableMegaMenu} />
            {megaMenuEnabled && renderMegaMenuSetting()}
          </View>
        </Field>
      )}

      {!megaMenuEnabled && (
        <Field label={i18n.t('general.label')}>
          <DebounceInput
            block
            multiline
            value={data.label as string}
            onValueChange={value => {
              onChange?.({
                label: value,
              });
            }}
          />
        </Field>
      )}

      {!megaMenuEnabled && (
        <Field label={i18n.t('general.link')}>
          <LinkPicker
            value={data.href}
            onChange={value => {
              onChange?.({
                href: value,
              });
            }}
          />
        </Field>
      )}

      {!megaMenuEnabled && (
        <Field label={i18n.t('builderPage.mega_menu.icon')}>
          <View css={{ marginBottom: '7px' }}>
            <SwitchBeauty
              borderColor="gray3"
              size="medium"
              checked={data.iconEnabled}
              onValueChange={value => {
                onChange?.({ iconEnabled: value });
              }}
            >
              {`${i18n.t('general.enable', { text: i18n.t('builderPage.mega_menu.icon') })}`}
            </SwitchBeauty>
          </View>
          {data.iconEnabled && (
            <FontIconField.Button
              value={data.icon}
              onClick={() => {
                navigation.push('iconFieldScreen', {
                  value: data.icon,
                  label: i18n.t('builderPage.mega_menu.icon'),
                  onImageClick: () => {
                    navigation.push('chooseImageFieldScreen', {
                      value: { src: data.icon, width: 0, height: 0 },
                      onChange: ({ src }) => {
                        onChange?.({ icon: `<img src="${src}" width="30" alt="" />` });
                      },
                      label: `${i18n.t('general.upload', { text: i18n.t('schema.fieldLabel.icon') })}`,
                    });
                  },
                  onChange: value => {
                    onChange?.({ icon: value });
                  },
                });
              }}
            />
          )}
        </Field>
      )}

      {!megaMenuEnabled && (
        <Field label={i18n.t('builderPage.mega_menu.hot_spot')}>
          <View css={{ marginBottom: '7px' }}>
            <SwitchBeauty
              borderColor="gray3"
              size="medium"
              checked={data.hotSpotEnabled}
              onValueChange={value => {
                onChange?.({ hotSpotEnabled: value });
              }}
            />
          </View>
          {data.hotSpotEnabled && (
            <DebounceInput
              block
              placeholder="Text"
              value={data.hotSpotContent}
              onValueChange={value => {
                onChange?.({ hotSpotContent: value });
              }}
            />
          )}
        </Field>
      )}
    </View>
  );
};
