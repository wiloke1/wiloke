import { VedaLoadingItem } from 'components/VedaLoadingItem';
import { FC, Ref, useState } from 'react';
import delay from 'utils/functions/delay';
import { View, ViewProps } from 'wiloke-react-core';

export interface IframeWrapperProps {
  src: string;
  iframeCss?: ViewProps['css'];
  id?: string;
  innerRef?: Ref<HTMLIFrameElement>;
  onLoaded?: () => void;
}

const IframeWrapper: FC<IframeWrapperProps> = ({ src, iframeCss, id = 'iframe-wrapper', innerRef, onLoaded }) => {
  const [loading, setLoading] = useState(true);

  const handleIframeLoaded = async () => {
    // Đề phòng iframe chưa thực sự được load
    await delay(200);
    setLoading(false);
    onLoaded?.();
  };
  return (
    <>
      {loading ? (
        <View css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
          <VedaLoadingItem />
        </View>
      ) : null}
      <View
        tagName="iframe"
        ref={innerRef !== undefined ? innerRef : null}
        id={id}
        src={src}
        style={{ display: loading ? 'none' : 'block', border: 'none', boxShadow: 'none', outline: 'none' }}
        css={{ width: '100%', height: '100%', ...iframeCss }}
        onLoad={handleIframeLoaded}
      />
    </>
  );
};

export default IframeWrapper;
