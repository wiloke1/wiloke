import { notification } from 'antd';
import Dragger, { DraggerProps } from 'antd/lib/upload/Dragger';
import { CSSProperties, FC, ReactNode } from 'react';
import { FontAwesome, Text, useStyleSheet, useTheme, View, ViewProps } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import * as css from './styles';

export interface DragUploadAntdProps extends Omit<DraggerProps, 'style' | 'className'> {
  containerClassName?: string;
  containerStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  Content?: ReactNode;
  maxSize?: number;
  wrapperCss?: ViewProps['css'];
}

const DragUploadAntd: FC<DragUploadAntdProps> = ({
  containerStyle = {},
  containerClassName = '',
  contentClassName = '',
  contentStyle = {},
  Content,
  maxSize = 5,
  wrapperCss,
  ...rest
}) => {
  const { styles } = useStyleSheet();
  const { colors } = useTheme();

  const _renderContent = () => {
    return (
      <View
        css={css.container}
        style={contentStyle}
        className={contentClassName}
        borderWidth={1}
        borderColor="gray5"
        borderStyle="dashed"
        borderColorHover="primary"
      >
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

  return (
    <View className="DragUpload-wrapper" css={{ ...css.wrapper, ...wrapperCss }}>
      <Dragger
        {...rest}
        listType="picture"
        className={classNames('DragUpload-container', containerClassName, styles(css.uploadAntdContainer(colors)))}
        style={{ ...containerStyle, border: 'none' }}
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
      >
        {Content ? Content : _renderContent()}
      </Dragger>
    </View>
  );
};

export { DragUploadAntd };
