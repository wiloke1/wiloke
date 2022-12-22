import AsyncComponent from 'components/AsyncComponent';
import HeaderDrawer from 'components/HeaderDrawer';
import ScrollBars from 'components/ScrollBars';
import { ScreenProps, useStackNavigator } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useAddAdminMegaMenu } from 'containers/ChooseTemplate/store/actions';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useAddMegaMenuToPage, useChangeMegaMenuSection } from 'store/actions/actionPages';
import { megaMenuSelector, pageSectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { Styles, View } from 'wiloke-react-core';
import {
  megaMenusOfHeaderFooterSelector,
  useAddSectionToMegaMenuOfHeaderFooter,
  useChangeSectionToMegaMenuOfHeaderFooter,
} from 'store/global/megaMenusOfHeaderFooter/sliceMegaMenusOfHeaderFooter';
import SectionCard from 'components/SectionCard';
import { getDate, timeAgo, timeConverter } from 'utils/timeAgo';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { AdminSection } from 'types/Sections';
import { SettingDragMenuChildren } from '../components/DraggableMenu/types';
import { useActionMenu } from '../components/DraggableMenu/utils/useActionMenu';

const draftItemButton: Styles = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const adminButton: Styles = {
  padding: '2px 4px',
  fontSize: '12px',
  cursor: 'pointer',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '3px',
  margin: '0 2px',
};

export const MegaMenuAtomScreen: FC<ScreenProps<LeftBarParamList, 'sectionMegaMenuAtom'>> = ({ params }) => {
  const { currentNode, path } = params;
  const { getAllStatus, data, addStatus } = useSelector(megaMenuSelector.adminMegaMenu);
  const pageSections = useSelector(pageSectionsSelector);
  const { megaMenusOfHeaderFooter } = useSelector(megaMenusOfHeaderFooterSelector);
  const { role } = getUserInfo();

  const navigation = useStackNavigator<LeftBarParamList>();
  const { handleChangeForm } = useActionMenu();
  const addMegaMenu = useAddMegaMenuToPage();
  const changeMegaMenu = useChangeMegaMenuSection();
  const installMegaMenu = useAddAdminMegaMenu();
  const addSectionToMegaMenuOfHeaderFooter = useAddSectionToMegaMenuOfHeaderFooter();
  const changeSectionToMegaMenuOfHeaderFooter = useChangeSectionToMegaMenuOfHeaderFooter();

  const _handleAddSection = (commandId: string) => () => {
    if (commandId) {
      installMegaMenu.request({
        commandId,
        onFulFill: dataResponse => {
          if ((currentNode as SettingDragMenuChildren).megaMenuId !== '') {
            const index = pageSections.findIndex(section => section.id === (currentNode as SettingDragMenuChildren).megaMenuId);
            if (index > -1) {
              changeMegaMenu(index, dataResponse);
            } else {
              addMegaMenu(dataResponse);
            }

            const indexInMegaMenusOfHeaderFooter = megaMenusOfHeaderFooter.findIndex(
              section => section.id === (currentNode as SettingDragMenuChildren).megaMenuId,
            );
            changeSectionToMegaMenuOfHeaderFooter({
              index: indexInMegaMenusOfHeaderFooter,
              megaMenu: dataResponse,
            });
          } else {
            addMegaMenu(dataResponse);
            addSectionToMegaMenuOfHeaderFooter({ megaMenu: dataResponse });
          }
          handleChangeForm({ megaMenuId: dataResponse.id } as SettingDragMenuChildren, currentNode, path);
          navigation.goBack();
        },
      });
    }
  };

  const handleUpdate = (item: AdminSection) => () => {
    if ((currentNode as SettingDragMenuChildren).megaMenuId !== '') {
      const index = pageSections.findIndex(section => section.id === (currentNode as SettingDragMenuChildren).megaMenuId);
      if (index > -1) {
        changeMegaMenu(index, item);
      } else {
        addMegaMenu(item);
      }

      const indexInMegaMenusOfHeaderFooter = megaMenusOfHeaderFooter.findIndex(
        section => section.id === (currentNode as SettingDragMenuChildren).megaMenuId,
      );
      changeSectionToMegaMenuOfHeaderFooter({
        index: indexInMegaMenusOfHeaderFooter,
        megaMenu: item,
      });
    } else {
      addMegaMenu(item);
      addSectionToMegaMenuOfHeaderFooter({ megaMenu: item });
    }
    handleChangeForm({ megaMenuId: item.id } as SettingDragMenuChildren, currentNode, path);
    navigation.goBack();
  };

  return (
    <View css={{ height: '100%' }}>
      <HeaderDrawer
        title={i18n.t('general.back')}
        goBack={() => {
          navigation.goBack();
        }}
      />

      <ScrollBars css={{ height: 'calc(100% - 200px)' }}>
        <AsyncComponent
          status={getAllStatus}
          isEmpty={data.length === 0}
          Success={
            <View css={{ padding: '10px' }}>
              {data.map(item => (
                <SectionCard
                  key={item.commandId}
                  title={item.label}
                  loading={addStatus[item.commandId ?? ''] === 'loading'}
                  buttonText={i18n.t('general.install')}
                  onClick={_handleAddSection(item.commandId ?? '')}
                  date={
                    item.createdDateTimestamp
                      ? timeConverter(item.createdDateTimestamp)
                      : timeAgo(item.modifiedDateTimestamp ?? 0, getDate(item.modifiedDateTimestamp ?? Date.now()))
                  }
                  image={item.image?.src}
                  css={{ marginBottom: '5px' }}
                  Right={
                    <View css={draftItemButton}>
                      {role === 'admin' && (
                        <View
                          backgroundColor="primary"
                          borderColor="primary"
                          color="light"
                          fontFamily="secondary"
                          css={adminButton}
                          onClick={handleUpdate(item)}
                        >
                          {i18n.t('general.update')}
                        </View>
                      )}
                    </View>
                  }
                />
              ))}
            </View>
          }
        />
      </ScrollBars>
    </View>
  );
};
