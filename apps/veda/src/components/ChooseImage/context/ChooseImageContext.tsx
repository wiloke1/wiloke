import { createContext, FC, useContext, useReducer } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { PreviewImage } from 'types/Page';
import { ChooseImageProps } from '../ChooseImage';
import { Actions, defaultState, reducerImage } from '../reducers/reducerImage';

export type ChooseImageMode = 'drawer' | 'popup';

interface ChooseImageContext {
  image?: PreviewImage;
  visible: boolean;
  imageMode: ChooseImageMode;
  loading: Record<string | number, boolean>;
  imageWidth?: number;
  onSelect?: () => void;
  dispatch: React.Dispatch<Actions>;
}

const ChooseImageContext = createContext<ChooseImageContext | null>(null);

export const useChooseImage = () => {
  const context = useContext(ChooseImageContext);
  if (context === null) {
    console.log('Error to connect Context');
  }
  return context as ChooseImageContext;
};

export const ChooseImageProvider: FC<Omit<ChooseImageProps, 'drawerContainerCss' | 'drawerCss'>> = ({
  mode = 'popup',
  value,
  onChange,
  onGoBack: onSelect,
  imageWidth,
  children,
}) => {
  const [state, dispatch] = useReducer(reducerImage, { ...defaultState, image: value });

  // set ảnh khi truyền default image tùw ngoài vào
  useDeepCompareEffect(() => {
    if (value !== undefined) {
      dispatch({
        type: 'SetImage',
        payload: {
          image: value,
          imageMode: mode,
          visible: false,
          imageWidth,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[value]]);

  useDeepCompareEffect(() => {
    if (state.image !== undefined && state.image.src !== value?.src) {
      onChange?.({ height: state.image.height, src: state.image.src, width: state.image.width });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[state.image]]);

  return (
    <ChooseImageContext.Provider
      value={{
        image: state.image,
        dispatch: dispatch,
        onSelect,
        imageMode: state.imageMode,
        visible: state.visible,
        loading: state.loading,
        imageWidth: state.imageWidth,
      }}
    >
      {children}
    </ChooseImageContext.Provider>
  );
};
