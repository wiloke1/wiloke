import { notification } from 'antd';
import AsyncComponent from 'components/AsyncComponent';
import DraftBox from 'components/DraftBox';
import FieldBox from 'components/FieldBox';
import PopConfirmAntd from 'components/ConfirmAntd';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { i18n } from 'translation';
import { DevTheme } from 'types/Theme';
import { at } from 'utils/at';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { ActivityIndicator, GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import { ModalAppendPageToThemeDraft } from './components/ModalAppendPageToThemeDraft';
import { ModalCommitThemeDraft } from './components/ModalCommitThemeDraft';
import { ModalRejectThemeDraft } from './components/ModalRejectThemeDraft';
import { useApproveThemeDraft, useDeleteThemeDraft, useGetThemesDraft, useLoadMoreThemesDraft } from './store/actions/actionThemesDraft';
import {
  themesDraftSelector,
  useSetModalAppendPageToThemeDraft,
  useSetModalCommitDraft,
  useSetModalRejectDraft,
} from './store/reducers/sliceThemesDraft';
import * as styles from './styles';

export const ThemesDraft = () => {
  const { data, hasNextPage, getStatus, loadMoreStatus, queueDeleting, queueRejecting, queueApproving, queueCommiting } = useSelector(
    themesDraftSelector,
  );
  const { shopName, role } = getUserInfo();

  const history = useHistory();
  const getThemesDraft = useGetThemesDraft();
  const loadmoreThemesDraft = useLoadMoreThemesDraft();
  const approveThemeDraft = useApproveThemeDraft();
  const deleteThemeDraft = useDeleteThemeDraft();

  const setModalCommitDraft = useSetModalCommitDraft();
  const setModalRejectDraft = useSetModalRejectDraft();
  const setModalAppendPageToThemeDraft = useSetModalAppendPageToThemeDraft();

  useEffect(() => {
    getThemesDraft.request(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreview = (theme: DevTheme) => () => {
    const themeId = theme.commandId;
    const firstPageId = at(theme.pageCommandIds, 0);
    if (themeId && firstPageId) {
      history.push(`/builder?shop=${shopName}&id=${firstPageId}&themeId=${themeId}&entityVariant=Draft`, {
        headerFooterEnabled: false,
        label: '',
        backToPage: '/manager-theme',
        isCreate: false,
        entityVariant: 'Draft',
      });
    } else {
      notification.error({ message: i18n.t('publish_shopify.error_unknown.message') });
    }
  };

  const Actions = (item: typeof data[number]) => {
    const { commandId, status, label } = item;

    if (role === 'admin') {
      return (
        <View css={{ display: 'flex', padding: '0' }}>
          <View
            color="light"
            backgroundColor="secondary"
            css={styles.rightItem}
            fontFamily="secondary"
            onClick={() => {
              approveThemeDraft.request({ commandId });
            }}
          >
            {i18n.t('general.approve')}
          </View>

          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="danger"
            css={styles.rightItem}
            onClick={() => {
              setModalRejectDraft(item);
            }}
          >
            {i18n.t('general.reject')}
          </View>
        </View>
      );
    }

    if (role === 'dev') {
      return (
        <View css={{ display: 'flex', padding: '0' }}>
          <PopConfirmAntd
            title={i18n.t('general.delete_confirm_message', { text: label })}
            onConfirm={() => {
              deleteThemeDraft.request({ commandId, name: label });
            }}
          >
            <View color="light" fontFamily="secondary" backgroundColor="danger" css={styles.rightItem}>
              {i18n.t('general.delete')}
            </View>
          </PopConfirmAntd>

          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="success"
            css={styles.rightItem}
            onClick={() => {
              setModalCommitDraft(item);
            }}
          >
            {status === 'pending' ? i18n.t('general.recommit') : i18n.t('general.commit')}
          </View>
          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="reddit"
            css={styles.rightItem}
            onClick={() => {
              setModalAppendPageToThemeDraft(item);
            }}
          >
            {i18n.t('general.append_page')}
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
              loadmoreThemesDraft.request({ cursor });
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
  }, [data, hasNextPage, loadMoreStatus, loadmoreThemesDraft]);

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
                  cssContainer={{ padding: '15px 20px', marginBottom: '0' }}
                  onClick={handlePreview(item)}
                  loading={
                    queueApproving.includes(item.commandId) ||
                    queueDeleting.includes(item.commandId) ||
                    queueRejecting.includes(item.commandId) ||
                    queueCommiting.includes(item.commandId)
                  }
                  Right={Actions(item)}
                />
              ))}
            </GridSmart>
            {TrackingLoadmore}
            <ModalCommitThemeDraft />
            <ModalRejectThemeDraft />
            <ModalAppendPageToThemeDraft />
          </View>
        }
      />
    </FieldBox>
  );
};
