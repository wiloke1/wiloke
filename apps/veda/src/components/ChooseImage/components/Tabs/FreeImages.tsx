import AsyncComponent from 'components/AsyncComponent';
import { ChooseCard } from 'components/ChooseCard';
import ChooseCardLoading from 'components/ChooseCard/ChooseCardLoading';
import { useGetCategoriesOfFreeImages, useGetFreeImages, useLoadMoreFreeImages } from 'components/ChooseImage/actions/actionGetFreeImages';
import { useChooseImage } from 'components/ChooseImage/context/ChooseImageContext';
import { imageGallerySelector } from 'components/ChooseImage/selector';
import { swapPickedImage } from 'components/ChooseImage/utils/swapPickedImage';
import { useOnChangeImage } from 'components/ChooseImage/utils/useSetImage';
import Field from 'components/Field';
import { IconPopupBox } from 'components/IconPopupBox';
import SelectAntd from 'components/SelectAntd';
import TextInput from 'components/TextInput';
import VirtualList from 'components/VirtualList/VirtualList';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { debounce } from 'utils/functions/debounce';
import { imageUrl } from 'utils/functions/imageUrl';
import { GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import * as styles from '../../styles';
import { COLUMN_GAP, ROW_HEIGHT } from './constants';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange', 300);

export const FreeImages = () => {
  const {
    free_images: { getRequest, images: data, loadMoreStatus, categories, getCategoriesStatus, hasNextPage },
  } = useSelector(imageGallerySelector);
  const { loading, image, imageMode } = useChooseImage();

  const getImages = useGetFreeImages();
  const getCategories = useGetCategoriesOfFreeImages();
  const loadMoreFreeImages = useLoadMoreFreeImages();
  const { handleChangeImage } = useOnChangeImage();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const numOfCols = imageMode === 'popup' ? 4 : 1;

  useEffect(() => {
    getImages.request({ search, category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  useEffect(() => {
    getCategories.request(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = debounce(() => {
    if (loadMoreStatus !== 'loading' && hasNextPage) {
      loadMoreFreeImages.request({ category, search });
    }
  }, 50);

  const renderSuccess = () => {
    const rowCount = Math.ceil(data.length / numOfCols) + 1;

    return (
      <VirtualList
        rowCount={rowCount}
        rowHeight={ROW_HEIGHT}
        rowRender={index => {
          const _data = swapPickedImage(data, image?.src ?? '');
          const dataSlice = _data.slice(index * numOfCols, index * numOfCols + numOfCols);
          const rowItem = dataSlice.length ? dataSlice : hasNextPage ? Array(numOfCols).fill(undefined) : [];

          return (
            <GridSmart columnWidth={230} columnCount={numOfCols} columnGap={COLUMN_GAP}>
              {rowItem.map((item, index) => {
                if (typeof item === 'undefined' && loadMoreStatus !== 'failure') {
                  return (
                    <ViewportTracking key={index} offsetTop={-100} onEnterViewport={handleLoadMore}>
                      <ChooseCardLoading containerStyle={{ height: ROW_HEIGHT - COLUMN_GAP }} />
                    </ViewportTracking>
                  );
                } else {
                  return (
                    <ChooseCard
                      key={item.id}
                      containerStyle={{ height: ROW_HEIGHT - COLUMN_GAP }}
                      uri={imageUrl(item.url, 300)}
                      onEdit={handleChangeImage({ src: item.url, height: item.height, width: item.width })}
                      isRequesting={loading[item.url]}
                    />
                  );
                }
              })}
            </GridSmart>
          );
        }}
      />
    );
  };

  return (
    <View css={styles.uploadContainer}>
      <View css={[styles.iconContainer, { marginBottom: '12px' }]}>
        <DebounceInput placeholder="Search something..." css={{ flex: '1' }} block value={search} onValueChange={setSearch} />

        <IconPopupBox
          size={44}
          containerCss={{ marginLeft: '4px' }}
          popupPlacement="left"
          content={
            <Field label={i18n.t('general.category')}>
              <SelectAntd
                loading={getCategoriesStatus === 'loading'}
                data={[{ label: 'All', value: 'all' }, ...categories.map(item => ({ label: item.name, value: item.handle }))]}
                value={category}
                onChange={val => {
                  setCategory(val);
                }}
              />
            </Field>
          }
        />
      </View>

      <AsyncComponent status={getRequest} Success={renderSuccess()} />
    </View>
  );
};
