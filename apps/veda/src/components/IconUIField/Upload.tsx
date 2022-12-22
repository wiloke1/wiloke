import ChooseImage from 'components/ChooseImage';
import Field from 'components/Field';
import SliderBeauty from 'components/SliderBeauty';
import { useStackNavigator } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import withDebounce from 'hocs/withDebounce';
import { FC } from 'react';
import { i18n } from 'translation';
import { PreviewImage } from 'types/Page';
import { Space, View } from 'wiloke-react-core';
import { IconUIFieldProps } from './types';

const NOOP = 0;

const getImage = (imgStr: string) => {
  if (!imgStr) {
    return null;
  }

  const domParser = new DOMParser();
  const doc = domParser.parseFromString(imgStr, 'text/html');
  const img = doc.body.querySelector('img');
  return img;
};

export const getImageSrc = (imgStr: string) => {
  if (!imgStr) {
    return '';
  }

  const img = getImage(imgStr);
  if (img) {
    return img.src;
  }
  return '';
};

export const getSize = (imgStr: string) => {
  if (!imgStr) {
    return { width: undefined, height: undefined };
  }

  const img = getImage(imgStr);
  if (img) {
    const width = img.getAttribute('width') != null ? Number(img.getAttribute('width')) : NaN;
    const height = img.getAttribute('height') != null ? Number(img.getAttribute('height')) : NaN;
    return { width: isNaN(width) ? undefined : width, height: isNaN(height) ? undefined : height };
  }
  return { width: undefined, height: undefined };
};

export const isImage = (imgStr: string) => {
  return !!getImage(imgStr);
};

const SliderBeautyDebounce = withDebounce(SliderBeauty, 'value', 'onValueChange', 300);

export const Upload: FC<IconUIFieldProps> = ({ value = '', onChange }) => {
  const { width, height } = getSize(value);
  const navigation = useStackNavigator<LeftBarParamList>();

  const _handleChange = ({ src }: PreviewImage) => {
    const newValue = src ? `<img src="${src}" width="30" alt="" />` : '';
    onChange?.(newValue);
  };

  const handleClick = () => {
    navigation.push('chooseImageFieldScreen', {
      label: '',
      onChange: val => {
        const newValue = val.src ? `<img src="${val.src}" width="30" alt="" />` : '';
        onChange?.(newValue);
      },
      value: { src: value, height: 0, width: 0 },
    });
  };

  const renderSize = () => {
    if (!getImageSrc(value)) {
      return null;
    }
    return (
      <>
        <Space size={12} />
        <Field label={i18n.t('general.width')}>
          <SliderBeautyDebounce
            defaultValue={30}
            value={width}
            min={0}
            max={200}
            borderColor="gray3"
            borderInputColor="gray3"
            clearEnabled
            onValueChange={width => {
              const src = getImageSrc(value);
              const size = {
                ...getSize(value),
                width,
              };
              const widthStr = size.width === undefined ? '' : ` width="${size.width}"`;
              const heightStr = size.height === undefined ? '' : ` height="${size.height}"`;
              const newValue = src ? `<img src="${src}"${widthStr}${heightStr} alt="" />` : '';
              if (newValue !== value) {
                onChange?.(newValue);
              }
            }}
          />
        </Field>
        <Field label={i18n.t('general.height')}>
          <SliderBeautyDebounce
            value={height}
            min={0}
            max={200}
            borderColor="gray3"
            borderInputColor="gray3"
            clearEnabled
            onValueChange={height => {
              const src = getImageSrc(value);
              const size = {
                ...getSize(value),
                height,
              };
              const widthStr = size.width === undefined ? '' : ` width="${size.width}"`;
              const heightStr = size.height === undefined ? '' : ` height="${size.height}"`;
              const newValue = src ? `<img src="${src}"${widthStr}${heightStr} alt="" />` : '';
              if (newValue !== value) {
                onChange?.(newValue);
              }
            }}
          />
        </Field>
      </>
    );
  };

  return (
    <View css={{ padding: '10px' }}>
      <ChooseImage.Button
        image={{ src: getImageSrc(value), width: NOOP, height: NOOP }}
        onClick={handleClick}
        onClear={() => {
          onChange?.('');
        }}
      />

      {renderSize()}
    </View>
  );
};
