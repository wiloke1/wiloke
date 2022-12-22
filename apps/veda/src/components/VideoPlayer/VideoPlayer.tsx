import ImagePlaceholder from 'components/ImagePlaceholder';
import TextInput from 'components/TextInput';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { css, Theme, View, ViewProps } from 'wiloke-react-core';
import checkUrlVideo from './checkUrlVideo';

export interface VideoPlayerProps {
  cssContainer?: ViewProps['css'];
  aspectRatio?: number;
  src?: string;
  onChange?: (src: string) => void;
}

const styles = {
  container: ({ colors }: Theme) => css`
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid ${colors.gray3};
  `,
  iframe: (aspectRatio: number) => css`
    padding-top: ${aspectRatio}%;
    overflow: hidden;
  `,
};

const videoPLayerStyles: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  bottom: 0,
  right: 0,
  border: 'none',
};

const VideoPlayer: FC<VideoPlayerProps> = ({ aspectRatio = 56.25, cssContainer, onChange, src = '' }) => {
  const [urlState, setUrl] = useState(src);

  useEffect(() => {
    if (typeof src !== undefined) {
      setUrl(src);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDeepCompareEffect(() => {
    if (urlState !== undefined && urlState !== src) {
      onChange?.(urlState);
    }
  }, [[urlState]]);

  const _handleChange = (value: string) => {
    setUrl(checkUrlVideo(value));
  };

  return (
    <View css={[styles.container, cssContainer]}>
      {urlState ? (
        <View css={styles.iframe(aspectRatio)} className="VideoPlayer-container">
          <iframe
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
            title="video"
            src={urlState}
            style={videoPLayerStyles}
          />
        </View>
      ) : (
        <View css={{ overflow: 'hidden' }}>
          <ImagePlaceholder icon="play" aspectRatio={16 / 9} />
        </View>
      )}

      <TextInput radius={0} borderWidth={0} placeholder="Youtube or vimeo url" block value={urlState} onValueChange={_handleChange} />
    </View>
  );
};

export default VideoPlayer;
