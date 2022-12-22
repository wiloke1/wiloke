import AsyncComponent from 'components/AsyncComponent';
import DraftBox from 'components/DraftBox';
import FieldBox from 'components/FieldBox';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { i18n } from 'translation';
import { AdminTheme } from 'types/Theme';
import { at } from 'utils/at';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { ActivityIndicator, GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import PopConfirmAntd from 'components/ConfirmAntd';
import { ModalHotfixThemeAtom } from './components/ModalHotfixThemeAtom';
import { ModalPublishTheme } from './components/ModalPublishTheme';
import { ModalAppendPageToThemeAtom } from './components/ModalAppendPageToThemeAtom';
import { useDeleteThemeAtom, useGetThemesAtom, useLoadMoreThemesAtom } from './store/actions/actionThemesAtom';
import { useForkThemeAtom } from './store/actions/actionThemesDraft';
import {
  themesAtomSelector,
  useModalPublishThemeAtom,
  useSetModalHotfixThemeAtom,
  useSetModalAppendPageToThemeAtom,
} from './store/reducers/sliceThemesAtom';
import { themesDraftSelector } from './store/reducers/sliceThemesDraft';
import * as styles from './styles';

export const ThemesAtom = () => {
  const { data, hasNextPage, getStatus, loadMoreStatus, queueDeleting, queueHotfixing } = useSelector(themesAtomSelector);
  const { queueForking } = useSelector(themesDraftSelector);
  const { shopName, role } = getUserInfo();

  const history = useHistory();
  const getThemesAtom = useGetThemesAtom();
  const loadmoreThemesAtom = useLoadMoreThemesAtom();
  const deleteThemeAtom = useDeleteThemeAtom();
  const forkThemeAtom = useForkThemeAtom();

  const setModalPublishThemeAtom = useModalPublishThemeAtom();
  const setModalHotfixThemeAtom = useSetModalHotfixThemeAtom();
  const setModalAppendPageToThemeAtom = useSetModalAppendPageToThemeAtom();

  useEffect(() => {
    getThemesAtom.request(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreview = (theme: AdminTheme) => () => {
    const themeId = theme.commandId;
    const firstPageId = at(theme.pageCommandIds, 0);
    if (themeId && firstPageId) {
      history.push(`/builder?shop=${shopName}&id=${firstPageId}&themeId=${themeId}&entityVariant=Atom`, {
        label: '',
        isCreate: false,
        backToPage: '/manager-theme',
        entityVariant: 'Atom',
      });
    }
  };

  const Actions = (item: typeof data[number]) => {
    const { commandId, label } = item;
    if (role === 'admin' && commandId) {
      return (
        <View css={{ display: 'flex', padding: '0' }}>
          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="secondary"
            css={styles.rightItem}
            onClick={() => {
              setModalPublishThemeAtom(item);
            }}
          >
            {i18n.t('general.publish')}
          </View>

          <PopConfirmAntd
            title={`You want delete ${label}`}
            onConfirm={() => {
              deleteThemeAtom.request({ commandId, name: label });
            }}
          >
            <View color="light" fontFamily="secondary" backgroundColor="danger" css={styles.rightItem}>
              {i18n.t('general.delete')}
            </View>
          </PopConfirmAntd>

          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="linkedin"
            css={styles.rightItem}
            onClick={() => {
              setModalHotfixThemeAtom(item);
            }}
          >
            {i18n.t('general.hotfix')}
          </View>
          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="reddit"
            css={styles.rightItem}
            onClick={() => {
              setModalAppendPageToThemeAtom(item);
            }}
          >
            {i18n.t('general.append_page')}
          </View>
        </View>
      );
    }
    if (role === 'dev' && commandId) {
      return (
        <View css={{ display: 'flex', padding: '0' }}>
          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="primary"
            css={styles.rightItem}
            onClick={() => {
              forkThemeAtom.request({ commandId, callback: () => {} });
            }}
          >
            {i18n.t('general.fork')}
          </View>
        </View>
      );
    }
    return null;
  };

  const TrackingLoadmore = useMemo(() => {
    const cursor = at(data, -1)?.commandId;
    if (hasNextPage && cursor) {
      return (
        <ViewportTracking
          onEnterViewport={() => {
            if (loadMoreStatus !== 'loading') {
              loadmoreThemesAtom.request({ cursor });
            }
          }}
        >
          <View css={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
            <ActivityIndicator size={40} />
          </View>
        </ViewportTracking>
      );
    }
    return null;
  }, [data, hasNextPage, loadMoreStatus, loadmoreThemesAtom]);

  return (
    <FieldBox radius={6} borderColor="gray2" css={{ padding: '20px 10px' }}>
      <AsyncComponent
        status={getStatus}
        isEmpty={data.length === 0}
        Success={
          <View>
            <GridSmart columnCount={2} columnWidth={300}>
              {data.map(item => (
                <DraftBox
                  key={item.commandId}
                  title={item.label}
                  image={item.featuredImage}
                  CustomDropdown={<></>}
                  onClick={handlePreview(item)}
                  loading={queueDeleting.includes(item.commandId) || queueHotfixing.includes(item.commandId) || queueForking.includes(item.commandId)}
                  Right={Actions(item)}
                />
              ))}
            </GridSmart>
            {TrackingLoadmore}
            <ModalHotfixThemeAtom />
            <ModalPublishTheme />
            <ModalAppendPageToThemeAtom />
          </View>
        }
      />
    </FieldBox>
  );
};
