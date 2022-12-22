import useDelay from 'hooks/useDelay';
import { PreviewImage } from 'types/Page';
import { removeResizeWidthImage } from 'utils/functions/removeResizeWidthImage';
import { useChooseImage } from '../context/ChooseImageContext';

export const useOnChangeImage = () => {
  const { dispatch: setImage, onSelect } = useChooseImage();
  const [delay] = useDelay();

  /**
   * Luồng: sau khi chọn ảnh sẽ
   *  set loading = true -> dispatch action setImage ->
   *  set loading = false -> đóng modal chọn ảnh(nếu mode = modal)
   */

  const _handleChangeImage = ({ height, src, width }: PreviewImage) => async () => {
    setImage({
      type: 'SetImage',
      payload: {
        loading: {
          [src]: true,
        },
      },
    });
    await delay(400);
    setImage({
      type: 'SetImage',
      payload: {
        image: {
          src: removeResizeWidthImage(src),
          width,
          height,
        },
        visible: false,
        loading: {
          [src]: false,
        },
      },
    });
    onSelect?.();
  };

  return {
    handleChangeImage: _handleChangeImage,
  };
};
