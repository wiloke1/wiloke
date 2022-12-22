import AsyncComponent from 'components/AsyncComponent';
import ImageTextCard from 'components/ImageTextCard';
import Masonry from 'components/Masonry';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import {
  useGetSavedSections,
  useInstallFavoriteSection,
  useLoadMoreSavedSections,
  useRemoveSavedSection,
} from 'containers/ChooseTemplate/store/actions';
import { isString } from 'lodash';
import { isEmpty } from 'ramda';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { sectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { imageUrl } from 'utils/functions/imageUrl';
import { View, ViewportTracking } from 'wiloke-react-core';

export const SavedContent = () => {
  const {
    data: savedSections,
    getStatus: getSavedSectionStatus,
    deleteStatus,
    installSectionStatus,
    categorySlug,
    hasNextPage,
    loadMoreStatus,
  } = useSelector(sectionsSelector.savedSections);

  const getSavedSections = useGetSavedSections();
  const removeSavedSections = useRemoveSavedSection();
  const installFavoriteSection = useInstallFavoriteSection();
  const loadMoreSections = useLoadMoreSavedSections();

  useEffect(() => {
    getSavedSections.request({ categories: [categorySlug === 'All' ? '' : categorySlug] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug]);

  const TrackingLoadMore = useMemo(() => {
    const lastCursor = savedSections.at(-1)?.commandId;
    if (lastCursor && hasNextPage) {
      return (
        <ViewportTracking
          offsetTop={-200}
          onEnterViewport={() => {
            if (loadMoreStatus !== 'loading') {
              loadMoreSections.request({ categories: [categorySlug === 'All' ? '' : categorySlug], cursor: lastCursor });
            }
          }}
        >
          <View css={{ padding: '30px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <VedaLoadingItem />
          </View>
        </ViewportTracking>
      );
    }

    return null;
  }, [categorySlug, hasNextPage, loadMoreSections, loadMoreStatus, savedSections]);

  const _renderSuccess = () => {
    return (
      <View>
        <Masonry defaultColumn={4}>
          {savedSections.map(item => (
            <ImageTextCard
              disabledIconSave
              key={item.commandId}
              backgroundSize="contain"
              placeholderAspectRatio={16 / 9}
              label={item.label}
              src={isString(item.image) ? imageUrl(item.image, 300) : imageUrl(item.image?.src ?? '', 300)}
              loading={installSectionStatus[item.parentCommandId] === 'loading' || deleteStatus[item.commandId ?? ''] === 'loading'}
              buttonText={i18n.t('general.install')}
              onDelete={() => {
                removeSavedSections.request({ id: item.commandId ?? '' });
              }}
              onAdd={() => {
                installFavoriteSection.request({
                  parentCommandId: item.parentCommandId,
                });
              }}
            />
          ))}
        </Masonry>
        {TrackingLoadMore}
      </View>
    );
  };

  return (
    <View css={{ padding: '10px' }}>
      <AsyncComponent isEmpty={isEmpty(savedSections)} Success={_renderSuccess()} status={getSavedSectionStatus} />
    </View>
  );
};
