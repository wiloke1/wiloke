import AddonsCard from 'components/AddonsCard';
import AsyncComponent from 'components/AsyncComponent';
import BoxCenter from 'components/BoxCenter';
import Dropdown from 'components/Dropdown';
import MyModal from 'components/MyModal';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import { useAddAddons, useDeleteProductAddons, useGetAddonsTemplate, useLoadMoreAddonsTemplate } from 'containers/ChooseTemplate/store/actions';
import parse from 'html-react-parser';
import { range } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import GuardedComponent from 'routes/components/GuardedComponent';
import { addonSelector } from 'store/selectors';
import { i18n } from 'translation';
import { ProductAddon } from 'types/Addons';
import { imageUrl } from 'utils/functions/imageUrl';
import { FontAwesome, GridSmart, View, ViewportTracking } from 'wiloke-react-core';

export const AddonsContent = () => {
  const { addAddonStatus, getAddonsStatus, loadMoreStatus, deleteStatus, addons: publishAddons, hasNextPage } = useSelector(addonSelector.userAddons);
  const { navAddonSlug, getNavStatus, addonQuantityOfCategory } = useSelector(addonSelector.userAddonsCategory);

  const [addonDetail, setAddonDetail] = useState('');
  const [visible, setVisible] = useState(false);

  const installAddons = useAddAddons();
  const getAddonsTemplate = useGetAddonsTemplate();
  const deleteAddon = useDeleteProductAddons();
  const loadMoreAddons = useLoadMoreAddonsTemplate();

  useEffect(() => {
    if (getNavStatus === 'success') {
      getAddonsTemplate.request({ categoryName: navAddonSlug, limit: 20 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navAddonSlug, getNavStatus]);

  const _handleInstall = (item: ProductAddon) => () => {
    if (!!item.saved && !item.canAddMulti) {
      return;
    }
    installAddons.request({ commandId: item.parentCommandId ?? '' });
  };

  const renderLoading = (
    <GridSmart columnWidth={200} columnCount={3} columnGap={10}>
      {range(0, addonQuantityOfCategory).map(i => (
        <AddonsCard.Loading key={i} />
      ))}
    </GridSmart>
  );

  const TrackingLoadMore = useMemo(() => {
    const lastCursor = publishAddons.at(-1)?.commandId;
    if (lastCursor && hasNextPage) {
      return (
        <ViewportTracking
          offsetTop={-200}
          onEnterViewport={() => {
            if (loadMoreStatus !== 'loading') {
              loadMoreAddons.request({ cursor: lastCursor });
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
  }, [hasNextPage, loadMoreAddons, loadMoreStatus, publishAddons]);

  const renderSuccess = () => {
    return (
      <View>
        <GridSmart columnWidth={120} columnCount={3}>
          {publishAddons.map(item => {
            return (
              <AddonsCard key={item.commandId} hide={!!item.saved && !item.canAddMulti}>
                <AddonsCard.Feature
                  onClick={_handleInstall(item)}
                  loading={addAddonStatus[item.parentCommandId ?? ''] === 'loading' || deleteStatus[item.commandId ?? ''] === 'loading'}
                  image={item.image?.src ? imageUrl(item.image.src, 500) : ''}
                  buttonDetailText={item.detail ? 'Detail' : ''}
                  onClickDetail={() => {
                    setAddonDetail(item.detail ?? '');
                    setVisible(true);
                  }}
                />
                <AddonsCard.Body logo={item.logo} title={item.label} text={item.tagLine} type={item.type} typeColor="#292dcb" />
                <AddonsCard.Footer
                  author={item.authorName}
                  Right={
                    <GuardedComponent roles={['admin']}>
                      <Dropdown
                        data={[{ label: i18n.t('general.delete'), value: 'delete' }]}
                        onClick={type => {
                          if (type === 'delete') {
                            deleteAddon.request({ commandId: item.commandId });
                          }
                        }}
                      >
                        <BoxCenter size={15}>
                          <FontAwesome type="far" name="ellipsis-v" size={16} color="gray6" colorHover="primary" />
                        </BoxCenter>
                      </Dropdown>
                    </GuardedComponent>
                  }
                />
              </AddonsCard>
            );
          })}
        </GridSmart>
        {TrackingLoadMore}
      </View>
    );
  };

  return (
    <View css={{ padding: '10px' }}>
      <AsyncComponent Request={renderLoading} isEmpty={publishAddons.length === 0} status={getAddonsStatus} Success={renderSuccess()} />

      <MyModal
        headerText="Addons Detail"
        bodyCss={{
          width: '800px',
          height: '700px',
        }}
        isVisible={visible}
        depsHeightRecalculation={addonDetail}
        onCancel={() => {
          setVisible(false);
        }}
        okText=""
        cancelText=""
      >
        {parse(addonDetail)}
      </MyModal>
    </View>
  );
};
