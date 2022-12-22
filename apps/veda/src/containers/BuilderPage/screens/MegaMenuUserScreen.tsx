import AsyncComponent from 'components/AsyncComponent';
import HeaderDrawer from 'components/HeaderDrawer';
import ImageTextCard from 'components/ImageTextCard';
import ScrollBars from 'components/ScrollBars';
import { ScreenProps, useStackNavigator } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { megaMenuSelector } from 'store/selectors';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { useInstallUserMegaMenu } from '../components/DraggableMenu';
import { useAddUserMegaMenuFlow } from '../components/DraggableMenu/store/actions';
import { SettingDragMenuChildren } from '../components/DraggableMenu/types';
import { useActionMenu } from '../components/DraggableMenu/utils/useActionMenu';

export const MegaMenuUserScreen: FC<ScreenProps<LeftBarParamList, 'sectionMegaMenu'>> = ({ params }) => {
  const { currentNode, path, sectionParentId } = params;
  const { megaSections, getSectionsStatus, installStatus } = useSelector(megaMenuSelector.userMegaMenu);

  const navigation = useStackNavigator<LeftBarParamList>();
  const { handleChangeForm } = useActionMenu();
  const installMegaMenu = useInstallUserMegaMenu();
  const addUserMegaMenuFlow = useAddUserMegaMenuFlow();

  const handleChooseMegaMenu = (commandId: string) => () => {
    if (commandId) {
      installMegaMenu.request({
        commandId,
        onFulFill: dataResponse => {
          addUserMegaMenuFlow({
            megaMenu: dataResponse,
            node: currentNode as SettingDragMenuChildren,
            sectionParentId,
            onDone: () => {
              handleChangeForm({ megaMenuId: dataResponse.id } as SettingDragMenuChildren, currentNode, path);
              navigation.goBack();
            },
          });
        },
      });
    }
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
          status={getSectionsStatus}
          isEmpty={megaSections.length === 0}
          Success={
            <View css={{ padding: '10px' }}>
              {megaSections.map(item => (
                <ImageTextCard
                  key={item.commandId}
                  containerCss={{ marginBottom: '5px' }}
                  loading={installStatus[item.parentCommandId ?? ''] === 'loading'}
                  label={item.label}
                  src={item.image?.src}
                  widthImage={item.image?.width}
                  heightImage={item.image?.height}
                  buttonText={i18n.t('general.choose')}
                  onAdd={handleChooseMegaMenu(item.parentCommandId ?? '')}
                  disableText={'Mega menu này đã tồn tại'}
                />
              ))}
            </View>
          }
        />
      </ScrollBars>
    </View>
  );
};
