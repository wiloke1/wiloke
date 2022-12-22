import { notification, Upload, UploadProps } from 'antd';
import { DragEvent, FC, ReactNode, useRef, useState } from 'react';
import { FontAwesome, Space, Text, useStyleSheet, useTheme, View, ViewProps } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import * as css from './styles';

export interface MyUploadProps extends UploadProps {
  maxSize?: number;
  Icon?: ReactNode;
  containerCss?: ViewProps['css'];
}

export const MyUpload: FC<MyUploadProps> = ({ Icon, maxSize = 5, containerCss, children, ...rest }) => {
  const { styles } = useStyleSheet();
  const { colors } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const renderIcon = () => {
    return (
      <View css={css.container} borderWidth={1} borderColor="gray5" borderStyle="dashed" borderColorHover="primary">
        <FontAwesome type="far" css={css.uploadIcon} color="primary" name="cloud-upload" size={56} />
        <Text color="gray8" css={css.title}>
          Click or drag file to this area to upload
        </Text>
        <Text color="gray6" css={css.desc}>
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
        </Text>
      </View>
    );
  };

  const handleDragEnter = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (wrapperRef.current && wrapperRef.current.contains(e.target as Element)) {
      return;
    }
    setIsDragging(false);
  };

  return (
    <View ref={wrapperRef} css={[css.wrapper, containerCss]} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <Upload
        {...rest}
        listType="picture"
        beforeUpload={file => {
          const sizeMB = file.size / 1024 / 1024;
          if (maxSize && sizeMB > maxSize) {
            notification.error({
              message: `Image must be smaller ${maxSize}MB`,
            });
            return false;
          }
          return true;
        }}
        className={classNames('DragUpload-container', styles(css.myUploadContainer(colors)))}
      >
        {Icon ? Icon : renderIcon()}
        <Space size={12} />
        <View
          onClick={e => {
            e.stopPropagation();
          }}
          css={{ width: '100%', height: '100%' }}
        >
          {children}
        </View>
        {isDragging ? (
          <View
            css={css.overlay}
            onDragLeave={e => {
              e.preventDefault();
              e.stopPropagation();
              if ((e?.relatedTarget as Element)?.localName === 'h3' || (e?.target as Element)?.localName === 'h3') {
                return;
              }
              setIsDragging(false);
            }}
          >
            <Text tagName="h3" color="light">
              Drag files to this area to upload
            </Text>
          </View>
        ) : null}
      </Upload>
    </View>
  );
};
