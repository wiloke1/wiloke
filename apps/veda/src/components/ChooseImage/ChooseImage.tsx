import { FC, ReactNode, useEffect } from 'react';
import { PreviewImage } from 'types/Page';
import { View } from 'wiloke-react-core';
import { ChooseImageButton } from './ChooseImageButton';
import { ModeDrawer } from './components/ModeDrawer/ModeDrawer';
import { ModePopup } from './components/ModePopup/ModePopup';
import { ChooseImageProvider, useChooseImage } from './context/ChooseImageContext';
// import { useChooseImageMode, useNumberOfColumn, useVisible } from './globalState';

export interface ChooseImageProps {
  /** image đầu vào component */
  value?: PreviewImage;
  mode?: 'drawer' | 'popup';
  /** thông số bắn lên api để resize image */
  imageWidth?: number;
  /** Sự kiện onChange có params: src: string, width?: number, height?: number */
  onChange?: ({ src, height, width }: PreviewImage) => void;
  onGoBack?: () => void;
}

type ChooseImageStatic = FC<ChooseImageProps> & {
  Button: typeof ChooseImageButton;
};

const Content = ({ mode }: { mode: 'drawer' | 'popup' }) => {
  const { imageMode, image, dispatch, imageWidth } = useChooseImage();

  useEffect(() => {
    if (mode !== undefined) {
      dispatch({
        type: 'SetImage',
        payload: {
          imageMode: mode,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const _mappingMode: Record<Exclude<typeof imageMode, undefined>, ReactNode> = {
    drawer: <ModeDrawer />,
    popup: <ModePopup />,
  };

  const _handleClick = () => {
    dispatch({
      type: 'SetImage',
      payload: {
        visible: true,
      },
    });
  };

  const handleClear = ({ height, src, width }: PreviewImage) => {
    dispatch({
      type: 'SetImage',
      payload: {
        image: {
          src,
          height,
          width,
        },
      },
    });
  };

  return (
    <View css={{ height: '100%' }}>
      {_mappingMode[imageMode || 'drawer']}
      {imageMode === 'popup' && <ChooseImageButton image={image} onClick={_handleClick} onClear={handleClear} imageWidth={imageWidth} />}
    </View>
  );
};

const ChooseImage: ChooseImageStatic = ({ value, mode = 'drawer', onChange, onGoBack: onSelect, imageWidth }) => {
  return (
    <ChooseImageProvider mode={mode} value={value} onChange={onChange} onGoBack={onSelect} imageWidth={imageWidth}>
      <Content mode={mode} />
    </ChooseImageProvider>
  );
};

ChooseImage.Button = ChooseImageButton;

export default ChooseImage;
