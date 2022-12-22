import ImagePlaceholder from 'components/ImagePlaceholder';
import LazyImage from 'components/LazyImage';
import Title from 'components/Title';
import { FC, ReactNode, Ref } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import { DraftBoxDropdown, DraftBoxDropdownProps } from './DraftBoxDropdown';
import * as styles from './styles';

export interface DraftBoxProps {
  title: ReactNode;
  slug?: string;
  image?: string;
  Right?: ReactNode;
  CustomDropdown?: ReactNode;
  cssContainer?: ViewProps['css'];
  loading?: boolean;
  innerRef?: Ref<HTMLElement>;
  onClickDropdown?: DraftBoxDropdownProps['onClickDropdown'];
  onClick?: () => void;
}

const DraftBox: FC<DraftBoxProps> = ({
  image,
  slug,
  title,
  Right,
  CustomDropdown,
  cssContainer,
  loading = false,
  innerRef,
  onClickDropdown,
  onClick,
}) => {
  return (
    <View ref={innerRef} className="DraftBox-container" css={[styles.container, cssContainer]}>
      {!!loading && <View css={styles.overlay} />}
      <View css={styles.item}>
        <View css={styles.imageContainer} onClick={onClick}>
          {image ? (
            <LazyImage
              src={image}
              containerCss={{ width: `70px`, height: `60px`, maxHeight: `60px` }}
              imageCss={{ height: '100%' }}
              ratioPercent={0}
            />
          ) : (
            <ImagePlaceholder css={{ width: '70px !important' }} height={60} size={24} />
          )}
        </View>

        <View css={styles.itemContent} onClick={onClick}>
          <Title title={title} text={slug} />
        </View>
        <View css={styles.actions}>
          {CustomDropdown ? CustomDropdown : <DraftBoxDropdown onClickDropdown={onClickDropdown} />}
          {Right}
        </View>
      </View>
    </View>
  );
};

export default DraftBox;
