import { notification } from 'antd';
import AsyncComponent from 'components/AsyncComponent';
import { ChooseCard } from 'components/ChooseCard';
import ChooseCardLoading from 'components/ChooseCard/ChooseCardLoading';
import {
  useDeleteMyMedia,
  useFilterMyMedia,
  useGetMyMedia,
  useLoadMoreMyMedia,
  useRemoveBackground,
  useUploadFileToMyMedia,
} from 'components/ChooseImage/actions/actionMyMedia';
import { useChooseImage } from 'components/ChooseImage/context/ChooseImageContext';
import { imageGallerySelector } from 'components/ChooseImage/selector';
import { imageUrlToFile } from 'components/ChooseImage/utils/imageUrlToFile';
import { swapPickedImage } from 'components/ChooseImage/utils/swapPickedImage';
import { useOnChangeImage } from 'components/ChooseImage/utils/useSetImage';
import { DragUploadAntdProps, MyUpload } from 'components/DragUploadAntd';
import Field from 'components/Field';
import { IconPopupBox } from 'components/IconPopupBox';
import SingleDatePicker from 'components/SingleDatePicker';
import TextInput from 'components/TextInput';
import UploadPlaceholder from 'components/UploadPlaceholder';
import VirtualList from 'components/VirtualList/VirtualList';
import withDebounce from 'hocs/withDebounce';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { debounce } from 'utils/functions/debounce';
import { imageUrl } from 'utils/functions/imageUrl';
import { v4 } from 'uuid';
import { GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import * as styles from '../../styles';
import { COLUMN_GAP, ROW_HEIGHT } from './constants';
import { SettingTabProps } from './Tabs';

const InputDebounce = withDebounce(TextInput, 'value', 'onValueChange', 500);

const MyMedias: FC<SettingTabProps> = () => {
  const { my_media } = useSelector(imageGallerySelector);
  const { data, hasNextPage, statusRequest, statusLoadmore, queueDelete, statusUpload, filterDate, imageName, removeBackgroundStatus } = my_media;
  const getMyMedia = useGetMyMedia();
  const loadmoreMyMedia = useLoadMoreMyMedia();
  const uploadImage = useUploadFileToMyMedia();
  const deleteImage = useDeleteMyMedia();
  const removeBackground = useRemoveBackground();

  const { loading, image, imageMode } = useChooseImage();
  const { handleChangeImage } = useOnChangeImage();
  const filterMyMedia = useFilterMyMedia();
  const numOfCols = imageMode === 'popup' ? 4 : 1;

  useEffect(() => {
    getMyMedia.request({ date: filterDate, name: imageName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDate, imageName]);

  const handleLoadMore = debounce(() => {
    if (statusLoadmore !== 'loading' && hasNextPage) {
      loadmoreMyMedia.request({ date: filterDate, name: imageName });
    }
  }, 50);

  const handleRemoveBg = ({ url, name, id }: { url: string; name: string; id: string }) => async () => {
    const file = await imageUrlToFile({
      url: url,
      name: name,
    });

    removeBackground.request({
      data: { file },
      id: id,
      name,
    });
  };

  const handleUpdate: DragUploadAntdProps['customRequest'] = ({ file, onSuccess, onError }) => {
    const _file = file as File;

    const isLessThan2mb = _file.size / 1024 / 1024 < 2;
    if (!isLessThan2mb) {
      notification.error({
        message: `Image must be smaller ${2}MB`,
      });
    } else {
      notification.info({
        message: i18n.t('general.uploading', { text: _file.name }),
        key: _file.name,
      });
      uploadImage.request({
        file: _file,
        uniqId: v4(),
        onSuccess: () => {
          onSuccess?.(i18n.t('general.success'));
          notification.close(_file.name);
        },
        onFailure: message => {
          onError?.(new Error(message));
          notification.close(_file.name);
          notification.error({
            message: `Upload failed: ${_file.name}`,
            key: _file.name,
          });
        },
      });
    }
  };

  const renderSuccess = () => {
    const rowCount = Math.ceil(data.length / numOfCols) + (hasNextPage ? 2 : 1);
    return (
      <VirtualList
        rowCount={rowCount}
        rowHeight={ROW_HEIGHT}
        rowRender={index => {
          const _data = swapPickedImage(data, image?.src ?? '');
          const dataSlice = _data.slice(index * numOfCols, index * numOfCols + numOfCols);
          const rowItem = dataSlice.length ? dataSlice : hasNextPage ? Array(numOfCols).fill(undefined) : [];

          return (
            <GridSmart columnWidth={230} columnGap={COLUMN_GAP}>
              {rowItem.map((item, index) => {
                if (typeof item === 'undefined' && statusLoadmore !== 'failure') {
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
                      isRequesting={
                        !!queueDelete.find(queueId => queueId === item.id) || loading[item.url] || removeBackgroundStatus[item.id] === 'loading'
                      }
                      onEdit={handleChangeImage({ src: item.url, height: item.height, width: item.width })}
                      onDelete={() => {
                        deleteImage.request({ id: item.id });
                      }}
                      onRemoveBg={handleRemoveBg({ id: item.id, url: item.url, name: item.name })}
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
      <MyUpload
        containerCss={{ width: '100%', height: '100%' }}
        showUploadList={false}
        multiple
        accept=".png, .jpeg, .jpg, .gif, .webp, .heic, .svg"
        customRequest={handleUpdate}
        disabled={statusUpload === 'loading'}
        Icon={
          <View css={styles.iconContainer}>
            <UploadPlaceholder css={{ flex: '1' }} loading={statusUpload === 'loading'} />
            <IconPopupBox
              containerCss={{ marginLeft: '4px', border: 'unset' }}
              popupPlacement="left"
              content={
                <View>
                  <Field label={i18n.t('builderPage.search')} css={styles.field}>
                    <InputDebounce
                      value={imageName ?? ''}
                      block
                      onValueChange={val => {
                        filterMyMedia({
                          name: val,
                        });
                      }}
                    />
                  </Field>
                  <Field label={i18n.t('schema.fieldLabel.date')} css={{ marginBottom: '0px' }}>
                    <SingleDatePicker
                      minDate={null}
                      date={null}
                      onChange={date => {
                        filterMyMedia({
                          date: date ? date.getTime() : undefined,
                        });
                      }}
                    />
                  </Field>
                </View>
              }
            />
          </View>
        }
      >
        <AsyncComponent status={statusRequest} isEmpty={data.length === 0} Success={renderSuccess()} />
      </MyUpload>
    </View>
  );
};

export default MyMedias;
